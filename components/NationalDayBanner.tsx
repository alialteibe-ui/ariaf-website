"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NATIONAL_DAY_OFFER, useNationalDayOfferActive } from "@/lib/offer";
import { SparkleIcon, XIcon } from "@/components/icons";

/**
 * Compact promo card floating in the Hero's upper band, between the site name
 * in the navbar and the Hero headline.
 *
 * It is `fixed`, so the Hero keeps its exact layout — nothing is moved or
 * resized. The vertical slot it occupies on mobile:
 *
 *   navbar (fixed, h-20)            ends   80px
 *   this card            100px  →   ~185px
 *   Hero location badge     128px  →  164px   (hidden while the offer runs)
 *   Hero <h1>                       starts 196px   ← never covered
 *
 * So it lands exactly over the location badge's slot and clears the headline,
 * the description and the buttons. On sm+ the Hero centres its content
 * vertically, leaving the upper image area free, so the card floats clear and
 * the badge stays visible.
 *
 * z-40 keeps it under the navbar and its mobile menu (both z-50).
 * Dismissal is per-session state only; reloading brings it back.
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
          initial={{ opacity: 0, y: -10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed z-40 top-[100px] sm:top-[96px] left-0 right-0 flex justify-center px-3 sm:px-6 pointer-events-none"
        >
          <div className="pointer-events-auto relative w-full max-w-[400px] sm:w-fit sm:max-w-none overflow-hidden rounded-2xl sm:rounded-full bg-gradient-to-bl from-palm-600 via-[#35412F] to-[#20281D] ring-1 ring-gold-300/45 shadow-[0_8px_30px_rgba(10,6,2,0.45)] px-4 py-2.5 sm:px-8 sm:py-4">

            {/* Soft gold glow — signals "special" without being loud */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-9 -right-7 w-36 h-36 rounded-full bg-gold-400/15 blur-2xl"
            />

            <div className="relative flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-5">

              {/* Title */}
              <div className="flex items-center gap-2 pl-7 sm:pl-0">
                <SparkleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gold-300 flex-shrink-0" />
                <h2 className="font-serif text-ivory text-[15px] sm:text-lg lg:text-xl leading-tight whitespace-nowrap">
                  عرض اليوم الوطني 96
                </h2>
              </div>

              {/* Discount + period + CTA */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="flex-shrink-0 bg-gold-400 text-charcoal font-extrabold text-xl sm:text-2xl lg:text-3xl leading-none px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl shadow-[0_4px_18px_rgba(197,160,89,0.50)] whitespace-nowrap">
                  خصم {NATIONAL_DAY_OFFER.discount}
                </span>
                <span className="text-sand-100 text-[11.5px] sm:text-sm font-semibold leading-snug whitespace-nowrap">
                  17 — 23 سبتمبر
                </span>

                {/* Scrolls to the offer section on the same page */}
                <button
                  type="button"
                  onClick={scrollToOffer}
                  className="flex-shrink-0 mr-auto sm:mr-0 bg-gold-400 hover:bg-gold-300 text-charcoal font-bold text-[13px] sm:text-base px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-full transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  شاهد العرض
                </button>
              </div>

              {/* Last in the row, so RTL places it at the far left on sm+ */}
              <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="إغلاق شريط العرض"
                className="absolute top-0 left-0 sm:static w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors duration-200 flex-shrink-0"
              >
                <XIcon className="w-3 h-3" />
              </button>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
