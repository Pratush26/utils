"use client";
import { useState } from "react";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { sendGTMEvent } from "@next/third-parties/google";
import { companyName, contactNo, whatsAppNo } from "@/lib/constants";

export default function FloatingButtons() {
  const [showPopup, setShowPopup] = useState(false);
  const waUrl = `https://wa.me/${whatsAppNo ?? contactNo}?text=${encodeURIComponent(
    `Hello! I am interested in your services. Can you help me?`
  )}`;
  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        
        {/* WhatsApp Floating Icon */}
        <div className="group relative flex items-center">
          <span className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-out bg-green-600 text-white px-3 py-1 rounded-full text-sm shadow">
            WhatsApp
          </span>
          <button
            onClick={() => {
              setShowPopup(true);
              sendGTMEvent({ 
                event: "whatsapp_popup_opened",
                click_id: "floating_wa_icon" 
              });
            }}
            className="flex items-center justify-center bg-green-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-green-700 transition"
          >
            <FaWhatsapp className="w-7 h-7" />
          </button>
        </div>

        {/* Call Now Floating Icon */}
        <div className="group relative flex items-center">
          <span className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-out bg-red-600 text-white px-3 w-24 text-center py-1 rounded-full text-sm shadow">
            Call Now
          </span>
          <a
            href={`tel:${contactNo}`}
            className="flex items-center justify-center bg-primary text-white w-12 h-12 rounded-full shadow-lg hover:bg-red-700 transition"
            onClick={() =>
              sendGTMEvent({
                event: "CallNow_button Clicked",
                value: "phone_contact",
                click_id: "floating_call_button",
                click_text: "Call Now",
                click_url: `tel:${contactNo}`,
              })
            }
          >
            <Phone className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* WhatsApp Popup */}
      {showPopup && (
        <div className="fixed bottom-34 right-6 w-80 bg-white rounded-lg shadow-xl z-50 animate-slideIn">
          {/* Header */}
          <div className="bg-[#075e54] text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo/logo.png"
                  alt={`${companyName} Logo`}
                  width={60}
                  height={60}
                  className="w-auto"
                />
              </div>
              <span className="font-semibold leading-tight">
                {companyName}
              </span>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="text-white font-bold cursor-pointer hover:text-gray-200 transition"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="bg-gray-50 bg-[url('/utilsimg/whatsappbg.jpg')] bg-cover bg-center rounded-b-lg flex flex-col gap-4">
            <p className="text-gray-800 shadow bg-[#dcf8c6] m-5 rounded font-bold p-3 text-md leading-relaxed ">
              Hello.
              <br />
              Can we help you?
            </p>
            <div className="bg-white p-4 flex justify-center items-center w-full rounded-b-lg">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
                onClick={() =>
                  sendGTMEvent({
                    event: "Whatsapp_buttonClicked", // Match your naming convention
                    value: "whatsapp_contact",
                    click_id: "whatsapp_popup_button",
                    click_text: "WhatsApp Us",
                    click_url: waUrl,
                  })
                }
              >
                <FaWhatsapp className="w-5 h-5" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}