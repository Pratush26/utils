"use client";

import { contactNo } from "@/lib/constants";
import { sendGTMEvent } from "@next/third-parties/google";
import { Phone } from "lucide-react";
export default function EmergencyCallBtn({ styles }: { styles: string }) {
  return (
    <a
      href={`tel:${contactNo}`}
      className={`${styles}  px-6 py-3 cursor-pointer flex items-center justify-center gap-2 rounded font-semibold relative z-20 md:w-fit`}
      onClick={() =>
        sendGTMEvent({
          event: "Call_us_ButtonClicked",
          value: "Call_us",
          click_id: "Call_us",
          click_text: "Call_us",
        })
      }
    >
      <Phone className="w-5 h-5" /> Call Us
    </a>
  );
}
