"use client";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { sendGTMEvent } from "@next/third-parties/google";
import { companyName, contactNo } from "@/lib/constants";
import { useWhatsApp } from "@/Providers/WhatsAppContext";

export default function FloatingButtons() {
  const { showPopup, openPopup, closePopup, customText } = useWhatsApp();
  const defaultText =
    "Hello! I am interested in your services. Can you help me?";
  const waUrl = `https://wa.me/${contactNo}?text=${encodeURIComponent(customText || defaultText)}`;
  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {/* WhatsApp */}
        <div className="group relative flex items-center">
          {/* Label */}
          <span className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-out bg-green-600 text-white px-3 py-1 rounded-full text-sm shadow">
            WhatsApp
          </span>
          <button
            onClick={() => openPopup()}
            className="flex items-center justify-center border border-white bg-green-600 text-white w-13 h-13 rounded-xl shadow-lg hover:bg-green-700 transition"
          >
            <FaWhatsapp className="w-8 h-8" />
          </button>
        </div>

        {/* Call Now */}
        <div className="group relative flex items-center">
          {/* Label */}
          <span className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0  transition-all duration-300 ease-out bg-primary text-white px-3 w-24 text-center py-1 rounded-full text-sm shadow">
            Call Us
          </span>
          <a
            href={`tel:${contactNo}`}
            onClick={() =>
              sendGTMEvent({
                event: "Call Us Button Clicked",
                value: "Call Us",
                click_id: "Call Us Button",
                click_text: "Call Us",
                click_url: `tel:${contactNo}`,
              })
            }
            className="flex items-center justify-center border border-white bg-primary text-white hover:text-white w-13 h-13 rounded-xl shadow-lg hover:bg-primary transition"
          >
            <Phone className="w-7 h-7" />
          </a>
        </div>
      </div>

      {/* WhatsApp Popup */}
      {showPopup && (
        <div className="fixed bottom-34 right-6 w-80 bg-white rounded-lg shadow-xl z-50 animate-slideIn">
          {/* Header */}
          <div className="bg-[#075e54] text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
            {/* Logo + Title */}
            <div className="flex items-center gap-2">
              {/* Replace with your logo image if available */}
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                {/* <span className="text-green-600 font-bold text-xs">H</span> */}
                <Image
                  src="/logo/logo.png"
                  alt=" HP Handyman Logo"
                  width={60}
                  height={60}
                  className="w-auto rounded-full"
                />
              </div>
              <span className="font-semibold capitalize">
                {companyName} <br /> Singapore
              </span>
            </div>
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="text-white font-bold cursor-pointer hover:text-gray-200 transition"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className=" bg-gray-50 bg-[url('/utilsimg/whatsappbg.jpg')] bg-cover bg-center rounded-b-lg flex flex-col  r gap-4">
            {/* <Image
              src={"/utilsimg/whatsappbg.jpg"}
              fill={true}
              alt="bg image"
              className="object-center  object-cover h-2 "
            /> */}

            <p className="text-gray-800 shadow bg-[#dcf8c6] m-5 rounded font-bold p-3 text-md leading-relaxed ">
              Hello.
              <br />
              Can we help you?
            </p>
            <div className="bg-white p-4 flex justify-center items-center w-full rounded-lg mt-5">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center w-full justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
                onClick={() =>
                  sendGTMEvent({
                    event: "buttonClicked",
                    value: "whatsappus",
                    click_id: "WHATSAPP_NOW_BUTTON",
                    click_text: "WHATSAPP_US",
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