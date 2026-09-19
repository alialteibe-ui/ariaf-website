"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { NATIONAL_DAY_OFFER, useNationalDayOfferActive } from "@/lib/offer";

/**
 * Seasonal promo banner shown only inside the offer window (Riyadh time).
 *
 * The window is read through useNationalDayOfferActive, which resolves to false
 * during prerender and to the real date check on the client — the page is
 * statically generated, so a build-time check would freeze the offer into the
 * HTML and it could never expire on its own.
 *
 * Outside the window the component renders nothing at all — no wrapper, no
 * padding, no gap in the page flow.
 */
export default function NationalDayOffer() {
  const visible = useNationalDayOfferActive();

  if (!visible) return null;

  const scrollToBooking = () =>
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="national-day-offer" className="py-14 lg:py-20 bg-sand-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-8 lg:mb-10"
        >
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">
            عرض لفترة محدودة
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-5 leading-snug">
            {NATIONAL_DAY_OFFER.title}
          </h2>
          <span className="gold-divider mx-auto mb-6" />
          <p className="text-brown-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            {NATIONAL_DAY_OFFER.tagline}
          </p>

          {/* Discount + period pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <span className="inline-flex items-center gap-2 bg-palm-600 text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-sm">
              خصم {NATIONAL_DAY_OFFER.discount}
            </span>
            <span className="inline-flex items-center gap-2 bg-gold-100 border border-gold-300/50 text-gold-600 font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
              {NATIONAL_DAY_OFFER.periodLabel}
            </span>
          </div>
        </motion.div>

        {/* Poster — portrait 2:3, capped so it never dominates on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/*
            On mobile the -mx-6 cancels the section's px-6 so this block spans the
            full viewport, and px-3 then insets it by 12px a side — an effective
            width of calc(100vw - 24px). From sm up it returns to normal flow and
            is capped at a comfortable poster width so it never dominates desktop.
          */}
          <div className="-mx-6 px-3 sm:mx-0 sm:px-0">
            <div className="mx-auto w-full max-w-[430px] sm:max-w-[400px] lg:max-w-[440px]">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_4px_28px_rgba(61,43,31,0.10)] ring-1 ring-gold-300/25">
                <Image
                  src={NATIONAL_DAY_OFFER.image}
                  alt={NATIONAL_DAY_OFFER.imageAlt}
                  width={NATIONAL_DAY_OFFER.imageWidth}
                  height={NATIONAL_DAY_OFFER.imageHeight}
                  sizes="(max-width: 640px) calc(100vw - 24px), (max-width: 1024px) 400px, 440px"
                  className="w-full h-auto"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA — scrolls to the booking form, never opens WhatsApp directly */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-center mt-8"
        >
          <button
            type="button"
            onClick={scrollToBooking}
            className="inline-flex items-center gap-2.5 bg-palm-600 hover:bg-palm-500 text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            احجز واستفد من العرض
          </button>

          <p className="text-xs text-brown-400/80 leading-relaxed mt-4 max-w-sm mx-auto">
            العرض ساري من 17 إلى 23 سبتمبر، ويتم تأكيد التوفر عبر واتساب.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
