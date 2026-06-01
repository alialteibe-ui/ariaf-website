import Navbar          from "@/components/Navbar";
import Hero            from "@/components/Hero";
import VideoSection    from "@/components/VideoSection";
import Experience      from "@/components/Experience";
import ChaletTypes     from "@/components/ChaletTypes";
import SulfurSection   from "@/components/SulfurSection";
import FarmSection     from "@/components/FarmSection";
import Gallery         from "@/components/Gallery";
import BookingSteps    from "@/components/BookingSteps";
import BookingForm     from "@/components/BookingForm";
import FAQ             from "@/components/FAQ";
import Footer          from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "أرياف زكي السالم للمياه الكبريتية",
  description:
    "شاليهات خاصة وسط نخيل الأحساء مع تجربة استرخاء بمياه كبريتية طبيعية، مناسبة للعائلات.",
  url: "https://ariafzaki.com",
  telephone: "+966567717401",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "الأحساء",
    addressRegion: "المنطقة الشرقية",
    addressCountry: "SA",
  },
  geo: {
    "@type": "GeoCoordinates",
    addressCountry: "SA",
  },
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "مياه كبريتية طبيعية",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "خصوصية كاملة لكل شاليه",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "مناسب للعائلات",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "حجز عبر واتساب",
      value: true,
    },
  ],
  numberOfRooms: 10,
  checkinTime: "08:00",
  checkoutTime: "22:00",
  availableLanguage: {
    "@type": "Language",
    name: "Arabic",
    alternateName: "ar",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+966567717401",
    contactType: "reservations",
    availableLanguage: "Arabic",
    contactOption: "TollFree",
  },
};

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <main>
        <Hero />
        <Experience />
        <VideoSection />
        <Gallery />
        <FarmSection />
        <ChaletTypes />
        <BookingSteps />
        <BookingForm />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
