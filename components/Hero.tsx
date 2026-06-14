"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { WHATSAPP_URL, WHATSAPP_GREETING, heroImages } from "@/lib/site";
import { HomeIcon, DropletIcon, PalmIcon } from "@/components/icons";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // Mouse parallax — the oversized background drifts gently opposite the
  // cursor; springs give the slow "lerp" feel without a rAF loop.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bgX = useSpring(mx, { stiffness: 40, damping: 22, mass: 0.9 });
  const bgY = useSpring(my, { stiffness: 40, damping: 22, mass: 0.9 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    // touch devices have no hover cursor — skip the listener entirely
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set(((e.clientX - cx) / cx) * -14);
      my.set(((e.clientY - cy) / cy) * -10);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, prefersReducedMotion]);

  const scrollToExperience = () => {
    document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
    >
      {/* Background image — scaled past the edges so the parallax drift never
          reveals them; settles from a deeper zoom on first paint */}
      <motion.div
        className="absolute inset-0 origin-center will-change-transform"
        style={{ x: bgX, y: bgY }}
        initial={{ scale: prefersReducedMotion ? 1.08 : 1.16 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={heroImages.primary}
          alt="أرياف زكي السالم للمياه الكبريتية — الشاليه والحوض"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Mobile overlay — lighter for image clarity */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(20,12,5,0.32)] via-[rgba(20,12,5,0.22)] to-[rgba(20,12,5,0.48)] sm:hidden" />
      {/* Desktop overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(20,12,5,0.55)] via-[rgba(20,12,5,0.40)] to-[rgba(20,12,5,0.65)] hidden sm:block" />

      {/* Subtle warm vignette on sides */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(20,12,5,0.30)] via-transparent to-transparent" />

      {/* Decorative vertical gold line — desktop only */}
      <div className="absolute right-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(212,181,90,0.35)] to-transparent hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-10">
        <div className="max-w-3xl">

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="liquid-glass inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-8"
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
            className="text-base sm:text-xl text-white/85 font-light leading-relaxed mb-12 max-w-xl"
          >
            استمتع بتجربة استجمام خاصة وسط نخيل الأحساء، مع مياه كبريتية
            طبيعية وأجواء هادئة تمنح عائلتك يومًا مختلفًا.
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
              className="liquid-glass inline-flex items-center justify-center gap-2 bg-white/5 text-white hover:bg-white/15 font-semibold text-base px-8 py-4 rounded-2xl transition-all duration-300"
            >
              اعرف المزيد
            </button>
          </motion.div>

        </div>
      </div>

      {/* ── Stat bar — anchored to bottom of hero ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.75 }}
        className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-8 lg:px-12 pb-5 sm:pb-10"
      >
        <div className="liquid-glass flex items-stretch bg-[rgba(10,6,2,0.42)] rounded-2xl max-w-lg lg:max-w-xl">
          <Stat Icon={HomeIcon}    title="شاليهات خاصة"  desc="خصوصية وراحة لعائلتك"  />
          <div className="w-px bg-white/15 my-3 sm:my-4 flex-shrink-0" />
          <Stat Icon={DropletIcon} title="مياه كبريتية"  desc="تجربة طبيعية هادئة"     />
          <div className="w-px bg-white/15 my-3 sm:my-4 flex-shrink-0" />
          <Stat Icon={PalmIcon}    title="وسط النخيل"    desc="أجواء أحسائية أصيلة"   />
        </div>
      </motion.div>
    </section>
  );
}

function Stat({
  Icon,
  title,
  desc,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1.5 py-3.5 sm:py-4 px-3 sm:px-5">
      <Icon className="w-5 h-5 sm:w-[18px] sm:h-[18px] text-gold-300" />
      <span className="font-serif text-xs sm:text-sm text-gold-100 font-semibold leading-tight text-center">
        {title}
      </span>
      <span className="text-[10px] sm:text-xs text-white/60 leading-tight text-center">
        {desc}
      </span>
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
