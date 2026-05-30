"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WHATSAPP_URL, WHATSAPP_GREETING, heroImages } from "@/lib/site";

export default function Hero() {
  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToExperience = () => {
    document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src={heroImages.primary}
        alt="أرياف زكي السالم للمياه الكبريتية — الشاليه والحوض"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Warm dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(20,12,5,0.55)] via-[rgba(20,12,5,0.40)] to-[rgba(20,12,5,0.65)]" />

      {/* Subtle warm vignette on sides */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(20,12,5,0.30)] via-transparent to-transparent" />

      {/* Decorative vertical gold line — desktop only */}
      <div className="absolute right-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(212,181,90,0.35)] to-transparent hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20">
        <div className="max-w-3xl">

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-sm font-medium text-white/90">
              الأحساء، المملكة العربية السعودية
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-tight text-white mb-6 drop-shadow-lg"
          >
            اكتشف راحةً
            <br />
            <span className="text-gold-300">لا مثيل لها</span>
            <br />
            في قلب الطبيعة
          </motion.h1>

          {/* Gold divider */}
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="gold-divider mb-8 origin-right"
            style={{ display: "block" }}
          />

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-xl sm:text-2xl text-white/85 font-light leading-relaxed mb-3 max-w-2xl"
          >
            شاليهات خاصة بمياه كبريتية طبيعية
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-base text-white/70 leading-relaxed mb-12 max-w-xl"
          >
            استمتع بخصوصية تامة وسط أجواء الأحساء الهادئة — مياه طبيعية،
            هواء نقي، وأوقات لا تُنسى مع العائلة.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={`${WHATSAPP_URL}?text=${WHATSAPP_GREETING}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-palm-600 hover:bg-palm-500 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-lg shadow-black/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <WhatsAppIcon />
              احجز شاليهك الآن
            </a>
            <button
              onClick={scrollToExperience}
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:bg-white/10 font-semibold text-base px-8 py-4 rounded-2xl transition-all duration-300 backdrop-blur-sm"
            >
              اعرف المزيد
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-8 mt-16 pt-8 border-t border-white/15"
          >
            <Stat number="١٠" label="شاليهات فاخرة" />
            <div className="w-px h-10 bg-white/20" />
            <Stat number="١٠٠٪" label="خصوصية تامة" />
            <div className="w-px h-10 bg-white/20" />
            <Stat number="طبيعية" label="مياه كبريتية" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/50 font-medium">مرر للأسفل</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-gold-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-serif text-2xl text-gold-300 font-bold drop-shadow">{number}</div>
      <div className="text-xs text-white/60 mt-0.5">{label}</div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
