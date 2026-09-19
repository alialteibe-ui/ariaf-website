"use client";

/**
 * National Day 96 promotional offer — marketing copy only.
 *
 * IMPORTANT: no discount is ever applied in code. Prices in lib/chalets.ts and
 * the BookingForm estimate are untouched; the offer is shown as text and the
 * final price is agreed manually over WhatsApp, exactly like every other booking.
 *
 * The date window is evaluated on the CLIENT at view time, never at build time.
 * The site is statically prerendered, so a build-time check would bake the
 * offer into the HTML and it could never expire without a redeploy.
 */

import { useSyncExternalStore } from "react";

export const NATIONAL_DAY_OFFER = {
  /** Section heading */
  title:    "عرض اليوم الوطني السعودي 96",
  /** Marketing line shown under the heading */
  tagline:  "احتفل بالوطن واسترح بين النخيل",
  discount: "35%",

  /** Inclusive window, as Riyadh calendar dates (Asia/Riyadh = UTC+3, no DST) */
  startDate: "2026-09-17",
  endDate:   "2026-09-23",
  /** Human-readable period used in the UI copy */
  periodLabel: "من 17 إلى 23 سبتمبر",

  /** Poster artwork — lightweight WebP built from the untouched PNG original */
  image:       "/image/offers/national-day-96.webp",
  imageWidth:  1024,
  imageHeight: 1536,
  imageAlt:    "عرض اليوم الوطني السعودي 96 — خصم 35% في أرياف زكي السالم للمياه الكبريتية",

  /** Line added to the WhatsApp message while the offer is running */
  bookingNote: "طلب الاستفادة من عرض اليوم الوطني 35%",
} as const;

/** Built once — constructing an Intl formatter per call is measurably slow. */
let riyadhFormatter: Intl.DateTimeFormat | null = null;

/**
 * Today's calendar date in Riyadh as "YYYY-MM-DD".
 * "en-CA" is the locale that formats dates in ISO order, so the result sorts
 * lexicographically and can be compared with plain string operators.
 */
export function riyadhToday(now: Date = new Date()): string {
  riyadhFormatter ??= new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Riyadh",
    year:  "numeric",
    month: "2-digit",
    day:   "2-digit",
  });
  return riyadhFormatter.format(now);
}

/** True while the offer window is open in Saudi local time — both ends inclusive. */
export function isNationalDayOfferActive(now: Date = new Date()): boolean {
  const today = riyadhToday(now);
  return today >= NATIONAL_DAY_OFFER.startDate && today <= NATIONAL_DAY_OFFER.endDate;
}

// ─── React binding ────────────────────────────────────────────────────────────

/** The window only turns over at Riyadh midnight — nothing to subscribe to. */
const subscribe = () => () => {};
const getClientSnapshot = () => isNationalDayOfferActive();
/** Prerendered HTML always renders the "no offer" branch, so the static markup
 *  matches the client's first paint and never causes a hydration mismatch. */
const getServerSnapshot = () => false;

/**
 * Reads the offer window on the client only.
 *
 * useSyncExternalStore is the supported way to return a different value on the
 * server than on the client; an effect + setState would work too but triggers a
 * cascading render (and the react-hooks/set-state-in-effect lint rule).
 */
export function useNationalDayOfferActive(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
