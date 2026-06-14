"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons";
import { SELECT_CHALET_EVENT } from "@/components/BookingForm";

/** Pre-select this chalet in the booking form, then scroll there. */
function openBookingWithChalet(bookingId: string) {
  window.dispatchEvent(new CustomEvent(SELECT_CHALET_EVENT, { detail: bookingId }));
  document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
}

// ─── Data ─────────────────────────────────────────────────────────────────────

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
  badge: string;
  badgeClass: string;
  desc: string;
  pricing: PricingRow[];
  note?: string;
  ctaLabel: string;
  ctaClass: string;
  accentClass: string;
  isMini: boolean;
  featured?: boolean;
  waMsg: string;
}

const chalets: ChaletDef[] = [
  {
    id: "mini",
    bookingId: "mini",
    name: "شاليهات الميني",
    subtitle: "بالساعة",
    badge: "حجز مباشر",
    badgeClass: "bg-sand-200 text-brown-600 border border-sand-300",
    desc: "حجز مباشر من المكتب عند بوابة ٢. مناسب للزيارات القصيرة والاستمتاع بالمياه الكبريتية بالساعة.",
    pricing: [
      { label: "ساعة واحدة",              price: 99  },
      { label: "ساعتان",                   price: 149 },
      { label: "٣ ساعات",                  price: 199 },
      { label: "بكج ٨ أيام (ساعة يومياً)", price: 500 },
    ],
    note: "الويكند قد يشهد ازدحامًا وانتظارًا.",
    ctaLabel: "تفاصيل شاليهات الميني",
    ctaClass: "bg-sand-200 hover:bg-sand-300 text-charcoal border border-sand-300",
    accentClass: "border-sand-300",
    isMini: true,
    waMsg: "مرحباً، أرغب بالاستفسار عن شاليهات الميني في أرياف زكي السالم للمياه الكبريتية. أفهم أن الحجز مباشر من المكتب عند بوابة ٢.",
  },
  {
    id: "small",
    bookingId: "small",
    name: "الشاليهات الصغيرة",
    subtitle: "101 — 102",
    badge: "مناسب للعائلات",
    badgeClass: "bg-teal-50 text-teal-700 border border-teal-200",
    desc: "شاليهات مناسبة للجلسات العائلية الهادئة والحجز المتوسط.",
    pricing: [
      { label: "٥ ساعات",       price: 350 },
      { label: "١١ ساعة",       price: 600 },
      { label: "مبيت ٢٣ ساعة", price: 750 },
    ],
    ctaLabel: "احجز الشاليه الصغير",
    ctaClass: "bg-palm-600 hover:bg-palm-500 text-white",
    accentClass: "border-teal-400/50",
    isMini: false,
    waMsg: "مرحباً، أرغب بحجز الشاليه الصغير (101 — 102) في أرياف زكي السالم للمياه الكبريتية. أرجو تزويدي بالتوفر والأسعار.",
  },
  {
    id: "medium",
    bookingId: "medium",
    name: "الشاليهات الوسط",
    subtitle: "103 — 104",
    badge: "خيار أوسع",
    badgeClass: "bg-sand-100 text-brown-600 border border-sand-200",
    desc: "مساحة أوسع وتجربة مريحة للعائلات والمجموعات.",
    pricing: [
      { label: "٥ ساعات",       price: 450 },
      { label: "١١ ساعة",       price: 800 },
      { label: "مبيت ٢٣ ساعة", price: 950 },
    ],
    ctaLabel: "احجز الشاليه الوسط",
    ctaClass: "bg-palm-600 hover:bg-palm-500 text-white",
    accentClass: "border-gold-300/60",
    isMini: false,
    waMsg: "مرحباً، أرغب بحجز شاليه الوسط (103 — 104) في أرياف زكي السالم للمياه الكبريتية. أرجو تزويدي بالتوفر والأسعار.",
  },
  {
    id: "dome-105",
    bookingId: "dome105",
    name: "القبة المالديفية",
    subtitle: "105",
    badge: "قبة خاصة",
    badgeClass: "bg-teal-50 text-teal-700 border border-teal-200",
    desc: "تجربة قبة خاصة بطابع مختلف ومناسبة لمن يبحث عن تجربة أميز.",
    pricing: [
      { label: "٥ ساعات",       price: 499 },
      { label: "١٠ ساعات",      price: 699 },
      { label: "مبيت ٢٣ ساعة", price: 950 },
    ],
    ctaLabel: "احجز القبة المالديفية",
    ctaClass: "bg-teal-500 hover:bg-teal-400 text-white",
    accentClass: "border-teal-400/60",
    isMini: false,
    waMsg: "مرحباً، أرغب بحجز القبة المالديفية (105) في أرياف زكي السالم للمياه الكبريتية. أرجو تزويدي بالتوفر والأسعار.",
  },
  {
    id: "dome-115",
    bookingId: "vip115",
    name: "القبة المالديفية VIP",
    subtitle: "115",
    badge: "VIP",
    badgeClass: "bg-gold-300/20 text-gold-600 border border-gold-300/50",
    desc: "الخيار الأفخم ضمن القباب المالديفية، بتجربة أكثر خصوصية وتميزًا.",
    pricing: [
      { label: "٥ ساعات",       price: 550  },
      { label: "١٠ ساعات",      price: 799  },
      { label: "مبيت ٢٣ ساعة", price: 1150 },
    ],
    ctaLabel: "احجز القبة VIP",
    ctaClass: "bg-gold-500 hover:bg-gold-400 text-white",
    accentClass: "border-gold-400",
    isMini: false,
    featured: true,
    waMsg: "مرحباً، أرغب بحجز القبة المالديفية VIP (115) في أرياف زكي السالم للمياه الكبريتية. أرجو تزويدي بالتوفر والأسعار.",
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
      className={`relative bg-white rounded-2xl border-2 ${chalet.accentClass} shadow-[0_3px_20px_rgba(61,43,31,0.06)] hover:shadow-[0_8px_36px_rgba(61,43,31,0.1)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col`}
    >
      {/* Card header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1">
            <h3 className="font-serif text-xl text-charcoal leading-tight">
              {chalet.name}
            </h3>
            <p className="text-brown-400/70 text-xs mt-0.5">{chalet.subtitle}</p>
          </div>
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${chalet.badgeClass}`}>
            {chalet.badge}
          </span>
        </div>
        <p className="text-brown-400 text-sm leading-relaxed">{chalet.desc}</p>
      </div>

      {/* Divider */}
      <div className="h-px bg-sand-100 mx-6" />

      {/* Pricing table */}
      <div className="px-6 py-4 flex-1">
        <p className="text-[11px] font-semibold text-brown-400/60 uppercase tracking-wider mb-3">
          الأسعار
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
          {chalet.ctaLabel}
        </button>
      </div>
    </motion.div>
  );
}
