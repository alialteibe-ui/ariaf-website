"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NATIONAL_DAY_OFFER, useNationalDayOfferActive } from "@/lib/offer";

/**
 * Compact promo pill shown inside the first viewport during the offer window,
 * so the offer is seen without scrolling.
 *
 * It is `fixed`, so the Hero keeps its exact position and size — nothing is
 * pushed down. The placement threads the gap every other fixed element leaves:
 *   - Navbar is fixed top-0 with h-20  → ends at 80px
 *   - Hero content starts at pt-32     → begins at 128px
 *   - this pill sits at top-[84px], ~40px tall, inside that 48px gap, so it
 *     covers neither the navbar nor the Hero's "احجز شاليهك الآن" button
 *   - FloatingWhatsApp is bottom-left  → nowhere near it
 * z-40 keeps it under the navbar and its mobile menu (both z-50).
 *
 * Dismissal is per-session component state only; reloading brings it back.
 */
export default function NationalDayBanner() {
  const offerActive = useNationalDayOfferActive();
  const [dismissed, setDismissed] = useState(false);

  const scrollToOffer = () =>
    document
      .querySelector("#national-day-offer")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <AnimatePresence>
      {offerActive && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed z-40 top-[84px] left-2 right-2 sm:left-0 sm:right-0 pointer-events-none"
        >
          <div className="pointer-events-auto mx-auto w-full sm:w-fit sm:max-w-3xl flex items-center gap-1.5 sm:gap-3 bg-palm-600/95 backdrop-blur-md border border-gold-300/35 rounded-full shadow-[0_6px_24px_rgba(20,12,5,0.30)] pr-3 pl-1.5 py-1.5 sm:pr-5 sm:pl-2.5 sm:py-2">

            <p className="flex-1 sm:flex-none min-w-0 text-white text-[10px] max-[389px]:text-[9px] sm:text-[13px] font-semibold leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
              {`عرض اليوم الوطني 96 🇸🇦 خصم ${NATIONAL_DAY_OFFER.discount} حتى 23 سبتمبر`}
            </p>

            {/* Scrolls to the offer section further down the same page */}
            <button
              type="button"
              onClick={scrollToOffer}
              className="flex-shrink-0 bg-gold-400 hover:bg-gold-300 text-charcoal text-[10px] max-[389px]:text-[9px] sm:text-xs font-bold px-2 sm:px-3.5 py-1.5 rounded-full transition-colors duration-200 whitespace-nowrap"
            >
              شاهد العرض
            </button>

            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="إغلاق شريط العرض"
              className="flex-shrink-0 w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-colors duration-200 text-sm sm:text-lg leading-none"
            >
              ×
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
