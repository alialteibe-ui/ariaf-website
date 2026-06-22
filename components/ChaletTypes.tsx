"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  WhatsAppIcon,
  UsersIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/icons";
import { SELECT_CHALET_EVENT } from "@/components/BookingForm";
import { CHALETS, type Chalet } from "@/lib/chalets";

/** Pre-select this chalet in the booking form, then scroll there. */
function openBookingWithChalet(id: string) {
  window.dispatchEvent(new CustomEvent(SELECT_CHALET_EVENT, { detail: id }));
  document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChaletTypes() {
  return (
    <section id="chalets" className="py-14 lg:py-28 bg-sand-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10 lg:mb-16"
        >
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">
            أنواع الشاليهات
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-charcoal mb-5">
            اختر ما يناسبك
          </h2>
          <span className="gold-divider mx-auto mb-6" />
          <p className="text-brown-400 text-lg max-w-xl mx-auto leading-relaxed">
            أربعة خيارات لتناسب كل حاجة — من الزيارة القصيرة إلى المبيت الفاخر.
          </p>
        </motion.div>

        {/* Row 1: mini, small, medium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {CHALETS.slice(0, 3).map((chalet, i) => (
            <ChaletCard key={chalet.id} chalet={chalet} index={i} />
          ))}
        </div>

        {/* Row 2: VIP — centered at 1/3 width on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:max-w-md lg:max-w-sm sm:mx-auto">
          {CHALETS.slice(3).map((chalet, i) => (
            <ChaletCard key={chalet.id} chalet={chalet} index={i + 3} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function ChaletCard({ chalet, index }: { chalet: Chalet; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`relative bg-white rounded-2xl border-2 ${chalet.accentClass} shadow-[0_3px_20px_rgba(61,43,31,0.06)] hover:shadow-[0_8px_36px_rgba(61,43,31,0.1)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col overflow-hidden`}
    >
      {/* Photo carousel */}
      <ChaletCarousel images={chalet.images} alt={`${chalet.name} — ${chalet.numbersLabel}`}>
        {/* Badge — overlaid on the photo */}
        <span className={`absolute top-3 right-3 z-20 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm ${chalet.badgeClass}`}>
          {chalet.badge}
        </span>
        {/* Pool capacity — overlaid bottom-left */}
        <span className="absolute bottom-3 left-3 z-20 inline-flex items-center gap-1.5 text-[11px] font-medium text-white bg-black/35 backdrop-blur-sm rounded-full px-2.5 py-1">
          <UsersIcon className="w-3.5 h-3.5" />
          بركة تكفي {chalet.poolCapacity} أشخاص
        </span>
      </ChaletCarousel>

      {/* Card header */}
      <div className="p-6 pb-3">
        <h3 className="font-serif text-xl text-charcoal leading-tight">
          {chalet.name}
        </h3>
        <p className="text-brown-400/70 text-xs mt-0.5">
          الشاليهات: {chalet.numbersLabel}
        </p>
      </div>

      {/* Spec chips */}
      <div className="px-6 pb-4 flex flex-wrap gap-2">
        <span className="text-[11px] font-medium text-brown-600 bg-sand-50 border border-sand-200 rounded-full px-2.5 py-1">
          {chalet.bathrooms}
        </span>
        <span className="text-[11px] font-medium text-brown-600 bg-sand-50 border border-sand-200 rounded-full px-2.5 py-1">
          {chalet.rooms}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-sand-100 mx-6" />

      {/* Features */}
      <div className="px-6 py-4">
        <p className="text-[11px] font-semibold text-brown-400/60 uppercase tracking-wider mb-3">
          أهم المميزات
        </p>
        <ul className="space-y-2">
          {chalet.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-sm text-charcoal">
              <CheckCircleIcon className="w-4 h-4 text-palm-500 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div className="h-px bg-sand-100 mx-6" />

      {/* Pricing / durations */}
      <div className="px-6 py-4 flex-1">
        <p className="text-[11px] font-semibold text-brown-400/60 uppercase tracking-wider mb-3">
          الأسعار ومدة الحجز
        </p>

        {chalet.isMini ? (
          <div className="space-y-1.5">
            <p className="text-sm text-charcoal font-semibold">{chalet.priceNote}</p>
            <p className="text-xs text-brown-400">
              المدة: {chalet.durationNote}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {chalet.periods.map(({ label, price }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-2 py-1.5 border-b border-sand-50 last:border-none"
              >
                <span className="text-sm text-charcoal">{label}</span>
                <span className="font-bold text-sm text-charcoal whitespace-nowrap">
                  {price.toLocaleString("en-US")}
                  <span className="font-normal text-brown-400 text-xs"> ريال</span>
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Price/availability confirmation note */}
        <p className="mt-3 text-[11px] text-brown-400/70 leading-relaxed">
          تأكيد السعر والتوفر عبر واتساب.
        </p>
      </div>

      {/* CTA — opens the booking form with this chalet pre-selected */}
      <div className="px-6 pb-6 mt-auto">
        <button
          type="button"
          onClick={() => openBookingWithChalet(chalet.id)}
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md ${chalet.ctaClass}`}
        >
          <WhatsAppIcon className="w-4 h-4" />
          احجز هذا الشاليه
        </button>
      </div>
    </motion.div>
  );
}

// ─── Carousel ─────────────────────────────────────────────────────────────────
// Self-contained: arrows + dots + touch swipe, no external library.

function ChaletCarousel({
  images,
  alt,
  children,
}: {
  images: string[];
  alt: string;
  children?: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const count = images.length;

  const go = (i: number) => setActive((i + count) % count);
  const prev = () => go(active - 1);
  const next = () => go(active + 1);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    // RTL-friendly: drag content leftwards → next, rightwards → previous
    if (dx < -40) next();
    else if (dx > 40) prev();
    touchStartX.current = null;
  };

  return (
    <div
      className="relative w-full aspect-[16/10] select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides — stacked, cross-fade via opacity */}
      {images.map((src, i) => (
        <Image
          key={src + i}
          src={src}
          alt={`${alt} — صورة ${i + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className={`object-cover object-center transition-opacity duration-500 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i === active ? undefined : true}
          draggable={false}
        />
      ))}

      {/* Bottom gradient for overlay legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />

      {/* Card overlays (badge, capacity) */}
      {children}

      {/* Arrows — only when there's more than one image */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="الصورة السابقة"
            className="absolute top-1/2 right-2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/35 hover:bg-black/55 text-white backdrop-blur-sm transition-colors"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="الصورة التالية"
            className="absolute top-1/2 left-2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/35 hover:bg-black/55 text-white backdrop-blur-sm transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => go(i)}
                aria-label={`اذهب إلى الصورة ${i + 1}`}
                aria-current={i === active}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-5 bg-white" : "w-1.5 bg-white/55 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
