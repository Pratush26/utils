"use client";

import React, { createContext, useContext, useState } from "react";

interface WhatsAppContextType {
  showPopup: boolean;
  openPopup: (text?: string) => void;
  closePopup: () => void;
  customText?: string;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const [showPopup, setShowPopup] = useState(false);
  const [customText, setCustomText] = useState<string | undefined>(undefined);

  const openPopup = (text?: string) => {
    setCustomText(text);
    setShowPopup(true);
  };
  const closePopup = () => setShowPopup(false);

  return (
    <WhatsAppContext.Provider value={{ showPopup, openPopup, closePopup, customText }}>
      {children}
    </WhatsAppContext.Provider>
  );
}

export function useWhatsApp() {
  const context = useContext(WhatsAppContext);
  if (context === undefined) {
    throw new Error("useWhatsApp must be used within a WhatsAppProvider");
  }
  return context;
}
