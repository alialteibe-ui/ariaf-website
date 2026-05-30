"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryImages } from "@/lib/site";

// Grid layout: 3-column grid, some images span 2 columns
// Total: 9 images across 4 rows
const gridSpans: Record<number, number> = {
  0: 2, // exterior-04 (landscape door shot) → wide
  1: 1, // outdoor-seating-02
  2: 1, // interior-01
  3: 2, // exterior-03 (wide night) → wide
  4: 1, // outdoor-seating-03
  5: 1, // hero-01
  6: 1, // exterior-02
  7: 1, // bedroom-01
  8: 1, // water-04
};

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-14 lg:py-28 bg-sand-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 lg:mb-16"
        >
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">
            معرض الصور
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-charcoal mb-5">
            شاهد المكان بنفسك
          </h2>
          <span className="gold-divider mx-auto mb-6" />
          <p className="text-brown-400 text-base max-w-md mx-auto leading-relaxed">
            جولة مصورة حقيقية في الشاليهات والحوض والمجالس — كل ما يجعل تجربتك فريدة.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((img, i) => {
            const span = gridSpans[i] ?? 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                  span === 2 ? "col-span-2" : "col-span-1"
                }`}
                style={{ aspectRatio: span === 2 ? "16/9" : "4/5" }}
                onClick={() => setLightbox(i)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={
                    span === 2
                      ? "(max-width: 768px) 100vw, 66vw"
                      : "(max-width: 768px) 50vw, 33vw"
                  }
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                  <div className="w-full p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-xs font-medium bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1.5 inline-block">
                      {img.alt}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-4 left-4 text-white/70 hover:text-white text-3xl font-light w-10 h-10 flex items-center justify-center"
              onClick={() => setLightbox(null)}
              aria-label="إغلاق"
            >
              ✕
            </button>

            {/* Caption */}
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {galleryImages[lightbox]?.alt}
            </p>

            {/* Prev / Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl w-10 h-10 flex items-center justify-center"
              onClick={(e) => { e.stopPropagation(); setLightbox((l) => l !== null && l > 0 ? l - 1 : galleryImages.length - 1); }}
              aria-label="السابق"
            >
              ›
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl w-10 h-10 flex items-center justify-center"
              onClick={(e) => { e.stopPropagation(); setLightbox((l) => l !== null && l < galleryImages.length - 1 ? l + 1 : 0); }}
              aria-label="التالي"
            >
              ‹
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[85vh] max-w-[90vw] w-full"
              style={{ aspectRatio: "auto" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightbox]!.src}
                alt={galleryImages[lightbox]!.alt}
                width={1200}
                height={900}
                sizes="90vw"
                className="object-contain max-h-[85vh] w-auto mx-auto rounded-xl"
                style={{ maxHeight: "85vh" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
