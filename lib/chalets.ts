/**
 * Single source of truth for chalet types — imported by both the chalet cards
 * (components/ChaletTypes.tsx) and the booking form (components/BookingForm.tsx).
 *
 * IMAGES: each `images` array currently reuses existing photos under
 * public/image/chalets/. Real per-type photos will live in dedicated folders:
 *   public/image/chalets/mini/         public/image/chalets/medium/
 *   public/image/chalets/small/        public/image/chalets/maldives-vip/
 * To switch, replace the 4 strings in each `images` array with the new paths.
 * The carousel adapts to any number of images, so nothing breaks if a folder
 * is still empty — just keep at least the temporary paths below.
 *
 * PRICES: do not invent prices. Fixed-duration types keep their existing
 * prices; mini is billed hourly (see `hourlyPricing`). Anything unknown is
 * confirmed over WhatsApp.
 */

export interface ChaletPeriod {
  label: string;
  price: number;
}

export interface HourlyPricing {
  /** Price of the first hour (ر.س). */
  firstHour: number;
  /** Price of every additional hour after the first (ر.س). */
  extraHour: number;
}

export interface Chalet {
  /** Booking value used by the form select and the card pre-select event. */
  id: string;
  /** Image folder name (future real photos). */
  slug: string;
  name: string;
  /** Chalet unit numbers, e.g. ["106", "107", ...]. */
  numbers: string[];
  /** Short human label for the numbers, e.g. "106 — 113" or "115 / 105". */
  numbersLabel: string;
  /** People the sulfur pool fits. */
  poolCapacity: number;
  bathrooms: string;
  rooms: string;
  images: string[];
  /** Card highlights (keep to ~4–6). */
  features: string[];
  /** Fixed booking durations with prices; empty for hourly (mini). */
  periods: ChaletPeriod[];
  /** Shown when there are no fixed periods (mini). */
  durationNote?: string;
  /** Hourly billing model (mini only). */
  hourlyPricing?: HourlyPricing;
  /** Card price line for hourly types (mini). */
  priceNote?: string;
  /** عدد الأشخاص options. */
  guests: string[];
  badge: string;
  badgeClass: string;
  ctaClass: string;
  accentClass: string;
  isMini: boolean;
  featured?: boolean;
}

export const CHALETS: Chalet[] = [
  {
    id: "mini",
    slug: "mini",
    name: "شاليهات ميني",
    numbers: ["106", "107", "108", "109", "110", "111", "112", "113"],
    numbersLabel: "106 — 113",
    poolCapacity: 5,
    bathrooms: "دورة مياه",
    rooms: "غرفة نوم صغيرة",
    images: [
      "/image/chalets/mini/mini-01.webp",
      "/image/chalets/mini/mini-02.webp",
      "/image/chalets/mini/mini-03.webp",
      "/image/chalets/mini/mini-04.webp",
      "/image/chalets/mini/mini-05.webp",
      "/image/chalets/mini/mini-06.webp",
    ],
    features: [
      "بركة مياه كبريتية تكفي ٥ أشخاص",
      "غرفة نوم صغيرة",
      "دورة مياه",
      "مظلة صغيرة",
    ],
    periods: [],
    durationNote: "يتم التأكيد عبر واتساب",
    hourlyPricing: { firstHour: 99, extraHour: 50 },
    priceNote: "٩٩ ريال للساعة الأولى، وكل ساعة إضافية ٥٠ ريال.",
    guests: ["١ — ٣ أفراد", "٤ — ٥ أفراد"],
    badge: "حجز بالساعة",
    badgeClass: "bg-sand-200 text-brown-600 border border-sand-300",
    ctaClass: "bg-sand-200 hover:bg-sand-300 text-charcoal border border-sand-300",
    accentClass: "border-sand-300",
    isMini: true,
  },
  {
    id: "small",
    slug: "small",
    name: "شاليه صغير",
    numbers: ["101", "102"],
    numbersLabel: "101 / 102",
    poolCapacity: 7,
    bathrooms: "دورتين مياه",
    rooms: "غرفة نوم + مجلس",
    images: [
      "/image/chalets/small/small-01.webp",
      "/image/chalets/small/small-02.webp",
      "/image/chalets/small/small-03.webp",
      "/image/chalets/small/small-04.webp",
      "/image/chalets/small/small-05.webp",
      "/image/chalets/small/small-06.webp",
      "/image/chalets/small/small-07.webp",
    ],
    features: [
      "بركة مياه كبريتية تكفي ٧ أشخاص",
      "غرفة نوم + مجلس",
      "دورتين مياه",
      "جلسة صغيرة (كراسي)",
      "إمكانية طلب مرتبتين للمبيت",
    ],
    periods: [
      { label: "٥ ساعات",       price: 350 },
      { label: "١١ ساعة",       price: 600 },
      { label: "مبيت ٢٣ ساعة", price: 750 },
    ],
    guests: ["١ — ٣ أفراد", "٤ — ٧ أفراد"],
    badge: "مناسب للعائلات",
    badgeClass: "bg-teal-50 text-teal-700 border border-teal-200",
    ctaClass: "bg-palm-600 hover:bg-palm-500 text-white",
    accentClass: "border-teal-400/50",
    isMini: false,
  },
  {
    id: "medium",
    slug: "medium",
    name: "شاليه وسط",
    numbers: ["103", "104"],
    numbersLabel: "103 / 104",
    poolCapacity: 7,
    bathrooms: "دورتين مياه",
    rooms: "غرفة نوم + مجلس",
    images: [
      "/image/chalets/medium/medium-01.webp",
      "/image/chalets/medium/medium-02.webp",
      "/image/chalets/medium/medium-03.webp",
      "/image/chalets/medium/medium-04.webp",
      "/image/chalets/medium/medium-05.webp",
    ],
    features: [
      "بركة مياه كبريتية تكفي ٧ أشخاص",
      "غرفة نوم + مجلس",
      "دورتين مياه",
      "جلسة صغيرة + مشب نار",
      "رمل للأطفال",
      "إمكانية طلب مرتبتين للمبيت",
    ],
    periods: [
      { label: "٥ ساعات",       price: 450 },
      { label: "١١ ساعة",       price: 800 },
      { label: "مبيت ٢٣ ساعة", price: 950 },
    ],
    guests: ["١ — ٣ أفراد", "٤ — ٧ أفراد"],
    badge: "خيار أوسع",
    badgeClass: "bg-sand-100 text-brown-600 border border-sand-200",
    ctaClass: "bg-palm-600 hover:bg-palm-500 text-white",
    accentClass: "border-gold-300/60",
    isMini: false,
  },
  {
    id: "vip",
    slug: "maldives-vip",
    name: "قبة مالديفية VIP",
    numbers: ["115", "105"],
    numbersLabel: "115 / 105",
    poolCapacity: 10,
    bathrooms: "دورتين مياه",
    rooms: "غرفة نوم خاصة + صالة مكيفة",
    // Curated selection from public/image/chalets/maldives-vip/115/ (all .jpg).
    // Order: exterior impression → pool/water → bedroom → interior → outdoor seating.
    images: [
      "/image/chalets/maldives-vip/115/hero-02.jpg",
      "/image/chalets/maldives-vip/115/hero-01.jpg",
      "/image/chalets/maldives-vip/115/exterior-02.jpg",
      "/image/chalets/maldives-vip/115/exterior-03.jpg",
      "/image/chalets/maldives-vip/115/water-01.jpg",
      "/image/chalets/maldives-vip/115/water-03.jpg",
      "/image/chalets/maldives-vip/115/water-02.jpg",
      "/image/chalets/maldives-vip/115/bedroom-01.jpg",
      "/image/chalets/maldives-vip/115/bedroom-02.jpg",
      "/image/chalets/maldives-vip/115/interior-01.jpg",
      "/image/chalets/maldives-vip/115/interior-02.jpg",
      "/image/chalets/maldives-vip/115/interior-03.jpg",
      "/image/chalets/maldives-vip/115/outdoor-seating-03.jpg",
      "/image/chalets/maldives-vip/115/outdoor-seating-02.jpg",
    ],
    features: [
      "بركة مياه كبريتية تكفي ١٠ أشخاص",
      "غرفة نوم خاصة + صالة مكيفة",
      "دورتين مياه",
      "نتفلكس + إنترنت مجاني",
      "جلسة خارجية مكيفة",
      "إمكانية مراتب إضافية للمبيت",
    ],
    periods: [
      { label: "٥ ساعات",       price: 550  },
      { label: "١٠ ساعات",      price: 799  },
      { label: "مبيت ٢٣ ساعة", price: 1150 },
    ],
    guests: ["١ — ٣ أفراد", "٤ — ٧ أفراد", "٨ — ١٠ أفراد"],
    badge: "VIP",
    badgeClass: "bg-gold-300/20 text-gold-600 border border-gold-300/50",
    ctaClass: "bg-gold-500 hover:bg-gold-400 text-white",
    accentClass: "border-gold-400",
    isMini: false,
    featured: true,
  },
];

export function getChaletById(id: string): Chalet | undefined {
  return CHALETS.find((c) => c.id === id);
}

/** Mini hourly estimate: first hour + (hours − 1) × extra hour. */
export function estimateMiniPrice(hours: number, pricing: HourlyPricing): number {
  return pricing.firstHour + Math.max(0, hours - 1) * pricing.extraHour;
}
