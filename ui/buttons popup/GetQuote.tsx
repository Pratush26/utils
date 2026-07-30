"use client";

import { contactNo } from "@/lib/constants";
import { sendGTMEvent } from "@next/third-parties/google";
import { ArrowRight } from "lucide-react";

export default function GetQuoteBtn() {
    return (
        <a
            href={`tel:${contactNo}`}
            className="group inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/30"
            onClick={() =>
                sendGTMEvent({
                    event: "Get Quote Button Clicked",
                    value: "Get Quote",
                    click_id: "Get Quote Button",
                    click_text: "Get Quote",
                    click_url: `tel:${contactNo}`,
                })
            }
        >
            Get Free Quote
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
        </a>
    );
}
