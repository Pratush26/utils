"use client";
import { whatsAppNo } from "@/lib/constants";
import { sendGTMEvent } from "@next/third-parties/google";
import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";

type WhatsAppVariant = "default" | "outline";

const variants: Record<WhatsAppVariant, string> = {
  default:
    "relative overflow-hidden bg-green-500 border border-green-500/50 text-white text-[13px] font-black uppercase tracking-widest transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(37,211,102,0.28)] hover:brightness-110 active:translate-y-0",
  outline:
    "border border-green-500/30 bg-green-500/10 text-green-500 text-xs font-black uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] hover:bg-green-500 hover:text-white hover:border-green-500",
};

export function WhatsAppButton({
  serviceName,
  variant = "default",
  className,
}: {
  serviceName?: string;
  variant?: WhatsAppVariant;
  className?: string;
}) {
  const waUrl = `https://wa.me/${whatsAppNo}?text=${encodeURIComponent(
    `Hello! I am interested in your ${serviceName ?? ""} services. Can you help me?`
  )}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        sendGTMEvent({
          event: "buttonClicked",
          value: "whatsappus",
          click_id: "WHATSAPP_NOW_BUTTON",
          click_text: "WHATSAPP_US",
          click_url: waUrl,
        })
      }
      className={cn(
        "flex items-center justify-center gap-2 rounded-xl px-6 py-3 cursor-pointer w-full md:w-fit",
        variants[variant],
        className
      )}
    >
      <FaWhatsapp className={cn("h-5 w-5 transition-transform duration-300", variant === "default" && "group-hover:scale-110")} />
      WhatsApp Us
    </a>
  );
}