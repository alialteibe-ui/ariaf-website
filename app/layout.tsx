import type { Metadata } from "next";
import "./globals.css";

// ── Update SITE_URL before going live ────────────────────────────────────────
const SITE_URL = "https://ariafzaki.com"; // replace with production domain

const OG_IMAGE = "/image/chalets/hero-02.jpg";
const OG_TITLE = "أرياف زكي السالم للمياه الكبريتية | شاليهات خاصة في الأحساء";
const OG_DESC  =
  "شاليهات خاصة وسط نخيل الأحساء مع تجربة استرخاء بمياه كبريتية طبيعية، مناسبة للعائلات، والحجز عبر واتساب بعد تأكيد التوفر.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: OG_TITLE,
    template: "%s | أرياف زكي السالم",
  },
  description: OG_DESC,

  keywords: [
    "شاليهات الأحساء",
    "مياه كبريتية طبيعية",
    "شاليهات خاصة",
    "استجمام الأحساء",
    "شاليه عائلي",
    "حجز شاليه واتساب",
    "أرياف زكي السالم",
    "المياه الكبريتية الأحساء",
  ],

  // ── Open Graph ───────────────────────────────────────────────────────────
  openGraph: {
    title: OG_TITLE,
    description: OG_DESC,
    siteName: "أرياف زكي السالم للمياه الكبريتية",
    locale: "ar_SA",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1280,
        height: 720,
        alt: "أرياف زكي السالم للمياه الكبريتية — شاليهات في الأحساء",
        type: "image/jpeg",
      },
    ],
  },

  // ── Twitter / X card ─────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESC,
    images: [OG_IMAGE],
  },

  // ── Robots ───────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  // ── Canonical / alternates ───────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-ivory font-sans text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
