/**
 * Central site configuration — all media, contact, and content constants live here.
 * Import from this file in every component instead of hardcoding paths or numbers.
 *
 * NOTE: images live in public/image/chalets/ (singular "image"), so all
 * src values start with /image/chalets/
 */

// ─── Contact ──────────────────────────────────────────────────────────────────

export const WHATSAPP_NUMBER = "966567717401";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/** Pre-filled greeting for direct links (no form) */
export const WHATSAPP_GREETING = encodeURIComponent(
  "مرحباً، أرغب بحجز شاليه في أرياف زكي السالم للمياه الكبريتية. أرجو تزويدي بالتوفر والأسعار."
);

// ─── YouTube ──────────────────────────────────────────────────────────────────

export const YOUTUBE_VIDEO_ID = "uYGkzdWd7FE";
/** privacy-enhanced embed URL — no tracking cookies */
export const YOUTUBE_EMBED_URL = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`;
/** Original Shorts link (for "فتح في يوتيوب" button) */
export const YOUTUBE_SHARE_URL = `https://youtube.com/shorts/${YOUTUBE_VIDEO_ID}`;

// ─── Image base path ──────────────────────────────────────────────────────────

const BASE = "/image/chalets";

// ─── Hero section ─────────────────────────────────────────────────────────────
// hero-02: professional evening shot — A-frame + lit pool + palm trees
// hero-01: daytime wide angle — natural green + water foreground
// exterior-04: through wooden arched door — unique framing, cinematic

export const heroImages = {
  primary:   `${BASE}/hero-02.jpg`,
  daytime:   `${BASE}/hero-01.jpg`,
  doorFrame: `${BASE}/exterior-04.jpg`,
} as const;

// ─── Video section ────────────────────────────────────────────────────────────
// exterior-03: widest night shot — best poster for the video section background

export const videoSection = {
  poster: `${BASE}/exterior-03.jpg`,
} as const;

// ─── Water / Sulfur section ───────────────────────────────────────────────────
// exterior-02: pool reflection at dusk — evocative, premium
// water-04: actual sulfur mineral water at night — steaming, authentic

export const waterImages = {
  pool:    `${BASE}/exterior-02.jpg`,
  sulfur:  `${BASE}/water-04.jpg`,
} as const;

// ─── Chalet card images ───────────────────────────────────────────────────────
// Both chalet types use the same exterior for now (one photo set covers all units)

export const chaletImages = {
  small: `${BASE}/exterior-01.jpg`,
  large: `${BASE}/outdoor-seating-03.jpg`,
} as const;

// ─── Interior section ─────────────────────────────────────────────────────────
// interior-01: ONLY professional shot — triangular glass facade, sofa, natural light

export const interiorImages = {
  hero:    `${BASE}/interior-01.jpg`,
  living1: `${BASE}/interior-02.jpg`,
  living2: `${BASE}/interior-03.jpg`,
  details: `${BASE}/interior-05.jpg`,
} as const;

// ─── Bedroom section ──────────────────────────────────────────────────────────

export const bedroomImages = {
  primary:   `${BASE}/bedroom-01.jpg`,
  entrance:  `${BASE}/bedroom-02.jpg`,
} as const;

// ─── Outdoor seating section ──────────────────────────────────────────────────
// outdoor-seating-02: luxury pergola with rattan lanterns — most professional
// outdoor-seating-03: wide night view chalet + pool + loungers

export const outdoorImages = {
  pergola:  `${BASE}/outdoor-seating-02.jpg`,
  poolside: `${BASE}/outdoor-seating-03.jpg`,
  loungers: `${BASE}/outdoor-seating-01.jpg`,
} as const;

// ─── Gallery grid (9 images, ordered for visual balance) ──────────────────────
// Skipped (phone quality): exterior-05, water-02, water-03
// interior-04 skipped (duplicate angle of interior-02)

export const galleryImages: Array<{
  src: string;
  alt: string;
  category: "exterior" | "interior" | "water" | "outdoor";
  quality: "pro" | "phone";
}> = [
  { src: `${BASE}/exterior-04.jpg`,       alt: "مدخل الشاليه عبر الباب الخشبي",  category: "exterior", quality: "pro"   },
  { src: `${BASE}/outdoor-seating-02.jpg`,alt: "جلسة المنزرة الخارجية الفاخرة",  category: "outdoor",  quality: "pro"   },
  { src: `${BASE}/interior-01.jpg`,       alt: "المجلس الداخلي والإطلالة الزجاجية",category: "interior", quality: "pro"   },
  { src: `${BASE}/exterior-03.jpg`,       alt: "الشاليه والحوض ليلاً",            category: "exterior", quality: "pro"   },
  { src: `${BASE}/outdoor-seating-03.jpg`,alt: "منطقة الاسترخاء المضاءة",         category: "outdoor",  quality: "pro"   },
  { src: `${BASE}/hero-01.jpg`,           alt: "حوض المياه الكبريتية نهاراً",    category: "water",    quality: "pro"   },
  { src: `${BASE}/exterior-02.jpg`,       alt: "انعكاس الشاليه في الماء",         category: "exterior", quality: "pro"   },
  { src: `${BASE}/bedroom-01.jpg`,        alt: "غرفة النوم",                       category: "interior", quality: "phone" },
  { src: `${BASE}/water-04.jpg`,          alt: "المياه الكبريتية الطبيعية",       category: "water",    quality: "phone" },
  { src: `${BASE}/outdoor-seating-01.jpg`,alt: "جلسة الاسترخاء الخارجية",        category: "outdoor",  quality: "pro"   },
];
