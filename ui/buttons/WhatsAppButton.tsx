"use client";

import { whatsAppUrl } from "@/lib/constants";
import { sendGTMEvent } from "@next/third-parties/google";
import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton() {

  const handleCaptureClick = () => {
    sendGTMEvent({
      event: "Whatsapp_buttonClicked",
      value: "whatsapp_contact",
      click_id: "whatsapp_button",
      click_text: "WhatsApp Us",
    });
  };

  return (
    <a
      href={whatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="w-full md:w-fit flex justify-center cursor-pointer items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold shadow-lg transition rounded focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      onClick={handleCaptureClick}
    >
      <FaWhatsapp className="w-5 h-5" aria-hidden="true" /> 
      <span>WhatsApp Us</span>
    </a>
  );
}