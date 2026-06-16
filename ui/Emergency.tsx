import Image from "next/image";
import { companyName } from "@/lib/constants";
import { Clock, Phone, ShieldCheck } from "lucide-react";
import EmergencyCallBtn from "../buttons/CallNow";
import { WhatsAppButton } from "../buttons/WhatsAppButton";

const STATS = [
  { icon: Clock, label: "Response Time", value: "< 1 Hour" },
  { icon: Phone, label: "Availability", value: "24 / 7" },
  { icon: ShieldCheck, label: "Satisfaction", value: "100%" },
];

export default function Emergency() {
  return (
    <section className="relative overflow-hidden bg-[#09142b] py-20 px-4 sm:px-6 lg:px-20">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/04.webp"
          fill
          alt="emergency background"
          style={{ objectFit: "cover" }}
          className="object-center opacity-5"
        />
      </div>

      {/* Glow blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-primary/15 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text content */}
          <div className="flex flex-col items-start gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Emergency Service Available
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Your call matters —{" "}
              <span className="text-primary">anytime,</span>{" "}
              anywhere,{" "}
              <span className="text-primary">we will handle it.</span>
            </h2>

            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-lg">
              Get fast, professional service from {companyName} Singapore.
              Our experienced team is always on standby — no delays, no excuses.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <EmergencyCallBtn styles="bg-primary hover:bg-white hover:text-primary text-white font-bold transition-all hover:scale-105 shadow-lg shadow-primary/30" />
              <WhatsAppButton />
            </div>
          </div>

          {/* Right: Icon + Stats */}
          <div className="sm:flex flex-col items-center gap-8 hidden">
            {/* 24h icon */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
              {/* Animated rings */}
              <span className="absolute inset-0 rounded-full border border-primary/20 animate-ping" style={{ animationDuration: "2.5s" }} />
              <span className="absolute inset-3 rounded-full border border-primary/15 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.4s" }} />
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white/75 border border-white/10 backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-xl">
                <Image
                  src="/24-hours-emergency-service-icon-disign-vector-removebg-preview-e1768495204402.png"
                  fill
                  alt="24/7 emergency icon"
                  style={{ objectFit: "contain" }}
                  className="p-5"
                />
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {STATS.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 bg-white/5 border border-white/10 rounded-2xl py-5 px-3 text-center hover:bg-white/8 transition-colors duration-200"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-lg font-extrabold text-white leading-none">{value}</span>
                  <span className="text-[10px] text-white/45 uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}