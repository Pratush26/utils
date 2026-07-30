"use client";

import { contactNo } from "@/lib/constants";
import { FaWhatsapp } from "react-icons/fa";
import { useWhatsApp } from "@/Providers/WhatsAppContext";

type WhatsAppVariant = "default" | "outline";

const baseClasses =
  "relative z-20 overflow-hidden group w-full md:w-fit flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm font-black uppercase tracking-[.1em] text-[13px] transition-all duration-200";

const variants: Record<WhatsAppVariant, string> = {
  default:
    "text-white bg-green-600 border-2 border-[#25D366]/60 hover:bg-[#25D366] hover:border-[#25D366] hover:shadow-[0_8px_28px_rgba(37,211,102,0.35)] hover:-translate-y-0.5",
  outline:
    "border border-green-500/30 bg-green-500/10 text-green-500 hover:scale-[1.02] hover:bg-green-500 hover:text-white hover:border-green-500",
};

export function WhatsAppButton({
  serviceName,
  variant = "default",
  className,
  label = "Chat With Us",
}: {
  serviceName?: string;
  variant?: WhatsAppVariant;
  className?: string;
  label?: string;
}) {
  const { openPopup } = useWhatsApp();

  const waUrl = `https://wa.me/${contactNo}?text=${encodeURIComponent(
    `Hello! I am interested in your ${serviceName ? `${serviceName} service` : "services"}. Can you help me?`,
  )}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        openPopup();
      }}
      className={[baseClasses, variants[variant], className]
        .filter(Boolean)
        .join(" ")}
    >
      {/* WhatsApp icon — bounce driven by group-hover, no JS state needed */}
      <FaWhatsapp className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-[-8deg]" />
      <span
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        className="text-sm font-bold tracking-widest uppercase"
      >
        {label}
      </span>
    </a>
  );
}