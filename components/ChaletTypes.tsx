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

/** Pre-select this chalet in the booking form, then scroll there. */
function openBookingWithChalet(bookingId: string) {
  window.dispatchEvent(new CustomEvent(SELECT_CHALET_EVENT, { detail: bookingId }));
  document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
}

// ─── Data ─────────────────────────────────────────────────────────────────────
//
// HOW TO ADD THE REAL PHOTOS LATER
// Each chalet's `images` array holds 4 photos. Drop the real files into the
// matching folder under public/image/chalets/<id>/ and replace the 4 strings
// below with their paths, e.g. for "mini":
//   images: [
//     "/image/chalets/mini/mini-1.jpg",
//     "/image/chalets/mini/mini-2.jpg",
//     "/image/chalets/mini/mini-3.jpg",
//     "/image/chalets/mini/mini-4.jpg",
//   ],
// The carousel adapts automatically to however many images are in the array.
// The paths below are TEMPORARY — they reuse existing photos so the carousel
// is testable now.

interface PricingRow {
  label: string;
  price: number;
}

interface ChaletDef {
  id: string;
  /** Matching id in BookingForm's CHALETS list (pre-selects the form). */
  bookingId: string;
  name: string;
  subtitle: string;
  /** 4 photos per chalet — replace with /image/chalets/<id>/<id>-1..4.jpg */
  images: string[];
  capacity: string;
  badge: string;
  badgeClass: string;
  desc: string;
  features: string[];
  pricing: PricingRow[];
  note?: string;
  ctaClass: string;
  accentClass: string;
  isMini: boolean;
  featured?: boolean;
}

const chalets: ChaletDef[] = [
  {
    id: "mini",
    bookingId: "mini",
    name: "شاليه ميني",
    subtitle: "بالساعة",
    // TODO: replace with /image/chalets/mini/mini-1..4.jpg
    images: [
      "/image/chalets/water-01.jpg",
      "/image/chalets/water-02.jpg",
      "/image/chalets/water-03.jpg",
      "/image/chalets/water-04.jpg",
    ],
    capacity: "حتى ٥ أفراد",
    badge: "حجز مباشر",
    badgeClass: "bg-sand-200 text-brown-600 border border-sand-300",
    desc: "حجز مباشر من المكتب عند بوابة ٢. مناسب للزيارات القصيرة والاستمتاع بالمياه الكبريتية بالساعة.",
    features: ["مياه كبريتية طبيعية", "مناسب للعوائل", "أجواء هادئة"],
    pricing: [
      { label: "ساعة واحدة",              price: 99  },
      { label: "ساعتان",                   price: 149 },
      { label: "٣ ساعات",                  price: 199 },
      { label: "بكج ٨ أيام (ساعة يومياً)", price: 500 },
    ],
    note: "الويكند قد يشهد ازدحامًا وانتظارًا.",
    ctaClass: "bg-sand-200 hover:bg-sand-300 text-charcoal border border-sand-300",
    accentClass: "border-sand-300",
    isMini: true,
  },
  {
    id: "small",
    bookingId: "small",
    name: "الشاليهات الصغيرة",
    subtitle: "101 — 102",
    // TODO: replace with /image/chalets/small/small-1..4.jpg
    images: [
      "/image/chalets/exterior-01.jpg",
      "/image/chalets/interior-01.jpg",
      "/image/chalets/bedroom-01.jpg",
      "/image/chalets/outdoor-seating-01.jpg",
    ],
    capacity: "حتى ٨ أفراد",
    badge: "مناسب للعائلات",
    badgeClass: "bg-teal-50 text-teal-700 border border-teal-200",
    desc: "شاليهات مناسبة للجلسات العائلية الهادئة والحجز المتوسط.",
    features: ["حوض مياه كبريتية خاص", "جلسة خاصة", "مناسب للعوائل", "دورة مياه"],
    pricing: [
      { label: "٥ ساعات",       price: 350 },
      { label: "١١ ساعة",       price: 600 },
      { label: "مبيت ٢٣ ساعة", price: 750 },
    ],
    ctaClass: "bg-palm-600 hover:bg-palm-500 text-white",
    accentClass: "border-teal-400/50",
    isMini: false,
  },
  {
    id: "medium",
    bookingId: "medium",
    name: "الشاليهات الوسط",
    subtitle: "103 — 104",
    // TODO: replace with /image/chalets/medium/medium-1..4.jpg
    images: [
      "/image/chalets/exterior-02.jpg",
      "/image/chalets/interior-02.jpg",
      "/image/chalets/interior-03.jpg",
      "/image/chalets/outdoor-seating-02.jpg",
    ],
    capacity: "حتى ١٢ فردًا",
    badge: "خيار أوسع",
    badgeClass: "bg-sand-100 text-brown-600 border border-sand-200",
    desc: "مساحة أوسع وتجربة مريحة للعائلات والمجموعات.",
    features: ["حوض مياه كبريتية خاص", "جلسة خاصة", "مناسب للعوائل", "خصوصية كاملة"],
    pricing: [
      { label: "٥ ساعات",       price: 450 },
      { label: "١١ ساعة",       price: 800 },
      { label: "مبيت ٢٣ ساعة", price: 950 },
    ],
    ctaClass: "bg-palm-600 hover:bg-palm-500 text-white",
    accentClass: "border-gold-300/60",
    isMini: false,
  },
  {
    id: "dome-105",
    bookingId: "dome105",
    name: "القبة المالديفية",
    subtitle: "105",
    // TODO: replace with /image/chalets/maldives-dome/maldives-dome-1..4.jpg
    images: [
      "/image/chalets/exterior-03.jpg",
      "/image/chalets/hero-01.jpg",
      "/image/chalets/interior-05.jpg",
      "/image/chalets/water-01.jpg",
    ],
    capacity: "حتى ٢٠ فردًا",
    badge: "قبة خاصة",
    badgeClass: "bg-teal-50 text-teal-700 border border-teal-200",
    desc: "تجربة قبة خاصة بطابع مختلف ومناسبة لمن يبحث عن تجربة أميز.",
    features: ["حوض مياه كبريتية خاص", "جلسة خاصة", "خصوصية كاملة", "أجواء هادئة"],
    pricing: [
      { label: "٥ ساعات",       price: 499 },
      { label: "١٠ ساعات",      price: 699 },
      { label: "مبيت ٢٣ ساعة", price: 950 },
    ],
    ctaClass: "bg-teal-500 hover:bg-teal-400 text-white",
    accentClass: "border-teal-400/60",
    isMini: false,
  },
  {
    id: "dome-115",
    bookingId: "vip115",
    name: "القبة المالديفية VIP",
    subtitle: "115",
    // TODO: replace with /image/chalets/maldives-vip/maldives-vip-1..4.jpg
    images: [
      "/image/chalets/outdoor-seating-03.jpg",
      "/image/chalets/hero-02.jpg",
      "/image/chalets/hero-03.jpg",
      "/image/chalets/exterior-04.jpg",
    ],
    capacity: "حتى ٢٠ فردًا",
    badge: "VIP",
    badgeClass: "bg-gold-300/20 text-gold-600 border border-gold-300/50",
    desc: "الخيار الأفخم ضمن القباب المالديفية، بتجربة أكثر خصوصية وتميزًا.",
    features: [
      "حوض مياه كبريتية خاص",
      "جلسة خاصة",
      "خصوصية كاملة",
      "دورة مياه",
      "أجواء هادئة",
      "مناسب للعوائل",
    ],
    pricing: [
      { label: "٥ ساعات",       price: 550  },
      { label: "١٠ ساعات",      price: 799  },
      { label: "مبيت ٢٣ ساعة", price: 1150 },
    ],
    ctaClass: "bg-gold-500 hover:bg-gold-400 text-white",
    accentClass: "border-gold-400",
    isMini: false,
    featured: true,
  },
];

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
            خمسة خيارات لتناسب كل حاجة — من الزيارة القصيرة إلى المبيت الفاخر.
          </p>
        </motion.div>

        {/* Row 1: mini, small, medium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {chalets.slice(0, 3).map((chalet, i) => (
            <ChaletCard key={chalet.id} chalet={chalet} index={i} />
          ))}
        </div>

        {/* Row 2: dome-105, dome-115 — centered at 2/3 width on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:w-2/3 lg:mx-auto">
          {chalets.slice(3).map((chalet, i) => (
            <ChaletCard key={chalet.id} chalet={chalet} index={i + 3} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function ChaletCard({ chalet, index }: { chalet: ChaletDef; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`relative bg-white rounded-2xl border-2 ${chalet.accentClass} shadow-[0_3px_20px_rgba(61,43,31,0.06)] hover:shadow-[0_8px_36px_rgba(61,43,31,0.1)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col overflow-hidden`}
    >
      {/* Photo carousel */}
      <ChaletCarousel images={chalet.images} alt={`${chalet.name} — ${chalet.subtitle}`}>
        {/* Badge — overlaid on the photo */}
        <span className={`absolute top-3 right-3 z-20 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm ${chalet.badgeClass}`}>
          {chalet.badge}
        </span>
        {/* Capacity — overlaid bottom-left */}
        <span className="absolute bottom-3 left-3 z-20 inline-flex items-center gap-1.5 text-[11px] font-medium text-white bg-black/35 backdrop-blur-sm rounded-full px-2.5 py-1">
          <UsersIcon className="w-3.5 h-3.5" />
          {chalet.capacity}
        </span>
      </ChaletCarousel>

      {/* Card header */}
      <div className="p-6 pb-4">
        <h3 className="font-serif text-xl text-charcoal leading-tight">
          {chalet.name}
        </h3>
        <p className="text-brown-400/70 text-xs mt-0.5">{chalet.subtitle}</p>
        <p className="text-brown-400 text-sm leading-relaxed mt-3">{chalet.desc}</p>
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

      {/* Pricing table */}
      <div className="px-6 py-4 flex-1">
        <p className="text-[11px] font-semibold text-brown-400/60 uppercase tracking-wider mb-3">
          الأسعار ومدة الحجز
        </p>
        <div className="space-y-2">
          {chalet.pricing.map(({ label, price }) => (
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

        {/* Mini note */}
        {chalet.note && (
          <div className="mt-4 px-3 py-2.5 bg-amber-50 border border-amber-200/70 rounded-xl">
            <p className="text-xs text-amber-700 leading-relaxed">{chalet.note}</p>
          </div>
        )}
      </div>

      {/* CTA — opens the booking form with this chalet pre-selected */}
      <div className="px-6 pb-6 mt-auto">
        <button
          type="button"
          onClick={() => openBookingWithChalet(chalet.bookingId)}
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
