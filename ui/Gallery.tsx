"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";
import Image from "next/image";

export default function Portfolio({ images = [], col }: { images: string[], col: number }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [imgRatios, setImgRatios] = useState<number[]>([]);
  const [resolvedCols, setResolvedCols] = useState(2);

  useEffect(() => {
    function update() {
      if (window.innerWidth < 640) setResolvedCols(1);
      else if (window.innerWidth < 1024) setResolvedCols(2);
      else setResolvedCols(col === 4 ? 4 : 3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [col]);

  useEffect(() => {
    if (images.length === 0) return;
    const ratios = new Array(images.length).fill(1);
    let loaded = 0;
    images.forEach((src, i) => {
      const img = new window.Image();
      img.onload = () => {
        ratios[i] = img.naturalHeight / img.naturalWidth;
        loaded++;
        if (loaded === images.length) setImgRatios([...ratios]);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === images.length) setImgRatios([...ratios]);
      };
      img.src = src;
    });
  }, [images]);

  const columns = useMemo(() => {
    const cols: number[][] = Array.from({ length: resolvedCols }, () => []);

    if (imgRatios.length !== images.length) {
      images.forEach((_, i) => cols[i % resolvedCols].push(i));
      return cols;
    }

    const colHeights = new Array(resolvedCols).fill(0);
    images.forEach((_, i) => {
      const shortest = colHeights.indexOf(Math.min(...colHeights));
      cols[shortest].push(i);
      colHeights[shortest] += imgRatios[i];
    });

    return cols;
  }, [imgRatios, images, resolvedCols]);

  if (images.length === 0) return null;

  const closeModal = useCallback(() => setSelectedIndex(null), []);
  const prevImage = useCallback(
    () => setSelectedIndex((prev) => prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : null),
    [images.length],
  );
  const nextImage = useCallback(
    () => setSelectedIndex((prev) => prev !== null ? (prev === images.length - 1 ? 0 : prev + 1) : null),
    [images.length],
  );

  useEffect(() => {
    if (selectedIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, closeModal, prevImage, nextImage]);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedIndex]);

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-8 md:px-20 bg-gray-950">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Images className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-semibold tracking-widest uppercase text-white">
            Our Work
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-2">
          Explore our <span className="text-primary">Portfolio</span>
        </h2>
        <p className="text-sm text-gray-500 mb-6 sm:mb-10">
          Tap any image to view full size
        </p>

        {/* ── Balanced Masonry Grid ── */}
        <div className="flex gap-2 sm:gap-3">
          {columns.map((colImages, colIdx) => (
            <div key={colIdx} className="flex-1 flex flex-col gap-2 sm:gap-3">
              {colImages.map((imgIdx) => (
                <button
                  key={imgIdx}
                  onClick={() => setSelectedIndex(imgIdx)}
                  className="group relative w-full rounded-lg overflow-hidden bg-gray-800
                             border border-white/5 hover:border-emerald-500/30
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
                             active:scale-[0.98] transition-all duration-200
                             hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40"
                >
                  <Image
                    src={images[imgIdx]}
                    alt={`Portfolio project ${imgIdx + 1}`}
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover/tap overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent
                                  opacity-0 group-hover:opacity-100 group-active:opacity-100
                                  transition-opacity duration-200 flex items-end p-2 sm:p-3">
                    <span className="text-[10px] sm:text-xs text-white/80 font-medium">
                      Photo {imgIdx + 1}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox Modal ── */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative flex items-center justify-center w-full h-full
                            px-12 py-16 sm:px-16 sm:py-12">
              <Image
                src={images[selectedIndex]}
                alt={`Portfolio project ${selectedIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded"
                style={{ maxHeight: "80vh" }}
              />
            </div>

            {/* Counter text */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-gray-400 tabular-nums bg-black/40 px-3 py-1 rounded-full">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/10 border border-white/10
                         hover:bg-white/20 active:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Prev */}
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2
                         w-9 h-9 sm:w-10 sm:h-10 rounded-xl
                         bg-white/10 border border-white/10 hover:bg-white/20 active:bg-white/20
                         text-white flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next */}
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2
                         w-9 h-9 sm:w-10 sm:h-10 rounded-xl
                         bg-white/10 border border-white/10 hover:bg-white/20 active:bg-white/20
                         text-white flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dot counter — hidden on mobile if too many images */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 max-w-[80vw] overflow-hidden">
              {images.length <= 12 && images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={`rounded-full transition-all duration-200 shrink-0
                    ${i === selectedIndex
                      ? "w-5 h-1.5 bg-emerald-400"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                />
              ))}
              {/* Fallback text counter for many images */}
              {images.length > 12 && (
                <span className="text-xs text-gray-400">
                  {selectedIndex + 1} of {images.length}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}