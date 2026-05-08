// In the react app, sometime there arise a issue, the webpage load at the same scroll point of the previously scrolled position.
// In such case this will ensure, your webpages always load from the begging of the page.
// just use this component in you layout.tsx like this  <ScrollToTop />

// components/ScrollToTop.tsx
"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}