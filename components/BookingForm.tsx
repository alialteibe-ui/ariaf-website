"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/site";
import { CHALETS, getChaletById, estimateMiniPrice } from "@/lib/chalets";
import { WhatsAppIcon, CalendarIcon } from "@/components/icons";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(raw: string): string {
  if (!raw) return "";
  try {
    const date = new Date(raw + "T00:00:00");
    return new Intl.DateTimeFormat("ar-SA-u-ca-gregory", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return raw;
  }
}

/**
 * Whole hours between two "HH:MM" times on the same day, rounded up.
 * Returns null when either time is missing, or when check-out is not after
 * check-in (e.g. an overnight stay crossing midnight) — those are confirmed
 * over WhatsApp instead of computed here.
 */
interface Duration {
  hours: number | null;
  overnight: boolean;
}

/**
 * Whole hours between two "HH:MM" times, rounded up. If check-out is earlier
 * than check-in it is treated as the next day (overnight), e.g. 20:00 → 02:00
 * = 6 hours. hours is null only when a time is missing or both are identical.
 */
function computeDuration(checkIn: string, checkOut: string): Duration {
  if (!checkIn || !checkOut) return { hours: null, overnight: false };
  const [h1, m1] = checkIn.split(":").map(Number);
  const [h2, m2] = checkOut.split(":").map(Number);
  if ([h1, m1, h2, m2].some((n) => Number.isNaN(n))) {
    return { hours: null, overnight: false };
  }
  const start = h1 * 60 + m1;
  const end = h2 * 60 + m2;
  let diff = end - start;
  let overnight = false;
  if (diff < 0) {
    diff += 24 * 60; // check-out is on the next day
    overnight = true;
  }
  if (diff === 0) return { hours: null, overnight: false };
  return { hours: Math.ceil(diff / 60), overnight };
}

// ─── State ────────────────────────────────────────────────────────────────────

interface FormState {
  fullName:     string;
  phone:        string;
  chaletId:     string;
  chaletNumber: string;
  date:         string;
  checkIn:      string;
  checkOut:     string;
  /** عدد الساعات المتوقع للميني — استعلام توفر بالساعة (mini only). */
  expectedHours: string;
  period:       string;
  guests:       string;
  notes:        string;
}

const INITIAL: FormState = {
  fullName:      "",
  phone:         "",
  chaletId:      "",
  chaletNumber:  "",
  date:          "",
  checkIn:       "",
  checkOut:      "",
  expectedHours: "",
  period:        "",
  guests:        "",
  notes:         "",
};

/** Expected-hours options for the mini availability inquiry (1–8 hours). */
const MINI_HOUR_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

const N8N_WEBHOOK = "https://n8n.srv1620367.hstgr.cloud/webhook/ariaf-booking-request";

/** Other sections (e.g. ChaletTypes cards) fire this to pre-select a chalet
 *  in the form. Detail is the chalet id. */
export const SELECT_CHALET_EVENT = "ariaf:select-chalet";

// ─── Component ────────────────────────────────────────────────────────────────

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [chaletError, setChaletError] = useState(false);
  const [guestsError, setGuestsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dateRef = useRef<HTMLInputElement>(null);

  // location navigation means the page may be restored from bfcache when the
  // customer comes back from WhatsApp — re-enable the button then
  useEffect(() => {
    const reset = () => setIsSubmitting(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  const chalet       = getChaletById(form.chaletId) ?? null;
  const isMini       = chalet?.isMini ?? false;
  const { hours: computedHours, overnight } = computeDuration(form.checkIn, form.checkOut);
  // Mini is an availability inquiry billed by the hour — the customer picks the
  // expected number of hours directly rather than a check-out time.
  const miniHours    = form.expectedHours ? parseInt(form.expectedHours, 10) : null;
  const hours        = isMini ? miniHours : computedHours;
  const guestOptions = chalet?.guests ?? [];

  // The summary appears once the core choices are made. Mini has no chalet
  // number or check-out (number is assigned on arrival, duration is by hours).
  const showSummary = isMini
    ? Boolean(form.chaletId && form.date && form.checkIn && form.expectedHours)
    : Boolean(form.chaletId && form.chaletNumber && form.date && form.checkIn && form.checkOut);

  const estimatedPrice: number | null = (() => {
    if (!chalet) return null;
    if (isMini) {
      return hours && chalet.hourlyPricing
        ? estimateMiniPrice(hours, chalet.hourlyPricing)
        : null;
    }
    return chalet.periods.find((p) => p.label === form.period)?.price ?? null;
  })();

  const openDatePicker = () => {
    const input = dateRef.current;
    if (!input) return;
    input.focus();
    if (typeof (input as HTMLInputElement & { showPicker?: () => void }).showPicker === "function") {
      try {
        (input as HTMLInputElement & { showPicker: () => void }).showPicker();
      } catch {
        input.click();
      }
    } else {
      input.click();
    }
  };

  // Clicking anywhere on a time field opens its picker (not just the clock icon).
  const openTimePicker = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.currentTarget as HTMLInputElement & { showPicker?: () => void };
    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
      } catch {
        // showPicker can throw if not user-activated; the native click still focuses
      }
    }
  };

  // Selecting a chalet (from the dropdown or a ChaletTypes card) resets the
  // dependent fields, keeping a value only if it's still valid for the new type.
  const selectChalet = useCallback((value: string) => {
    setChaletError(false);
    setForm((prev) => {
      const c = getChaletById(value);
      const validGuests  = c?.guests  ?? [];
      const validNumbers = c?.numbers ?? [];
      return {
        ...prev,
        chaletId:      value,
        chaletNumber:  validNumbers.includes(prev.chaletNumber) ? prev.chaletNumber : "",
        period:        "",
        expectedHours: "",
        guests:        validGuests.includes(prev.guests) ? prev.guests : "",
      };
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "chaletId") {
      selectChalet(value);
      return;
    }
    if (name === "guests") setGuestsError(false);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // A chalet card elsewhere on the page can pre-select the type here, then
  // scroll the user to this form.
  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id) selectChalet(id);
    };
    window.addEventListener(SELECT_CHALET_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_CHALET_EVENT, onSelect);
  }, [selectChalet]);

  const buildMessage = (): string => {
    const dateAr   = formatDate(form.date);
    const hoursStr = hours
      ? `${hours} ساعة${overnight ? " (الخروج في اليوم التالي)" : ""}`
      : null;
    const priceLine = estimatedPrice
      ? `السعر التقديري: ${estimatedPrice.toLocaleString("en-US")} ريال`
      : "السعر: يتم تأكيده عبر واتساب";

    // Mini = availability inquiry, not a confirmed booking.
    if (isMini) {
      const miniLines = [
        "مرحبًا، أرغب بالاستعلام عن توفر شاليه ميني في أرياف زكي السالم للمياه الكبريتية.",
        "",
        "نوع الطلب: استعلام توفر شاليه ميني",
        form.date     ? `التاريخ: ${dateAr}`                        : null,
        form.checkIn  ? `وقت الوصول المتوقع: ${form.checkIn}`        : null,
        hours         ? `عدد الساعات المتوقع: ${hours} ساعة`         : null,
        priceLine,
        form.fullName ? `الاسم: ${form.fullName}`                   : null,
        form.phone    ? `رقم الجوال: ${form.phone}`                 : null,
        form.notes    ? `ملاحظات: ${form.notes}`                    : null,
        "",
        "ملاحظة: يتم تحديد رقم الشاليه حسب التوفر عند الوصول، ولا يعتبر الطلب حجزًا مؤكدًا.",
      ];
      return miniLines
        .filter((l): l is string => l !== null)
        .join("\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
    }

    const lines = [
      "مرحبًا، أرغب بحجز شاليه في أرياف زكي السالم للمياه الكبريتية.",
      "",
      form.fullName     ? `الاسم: ${form.fullName}`              : null,
      form.phone        ? `رقم الجوال: ${form.phone}`            : null,
      chalet            ? `نوع الشاليه: ${chalet.name}`          : null,
      form.chaletNumber ? `رقم الشاليه: ${form.chaletNumber}`    : null,
      form.date         ? `التاريخ: ${dateAr}`                   : null,
      form.checkIn      ? `وقت الدخول: ${form.checkIn}`          : null,
      form.checkOut     ? `وقت الخروج: ${form.checkOut}`         : null,
      hoursStr          ? `عدد الساعات: ${hoursStr}`             : null,
      form.period       ? `مدة الحجز: ${form.period}`            : null,
      form.guests       ? `عدد الأشخاص: ${form.guests}`          : null,
      priceLine,
      form.notes        ? `ملاحظات: ${form.notes}`               : null,
      "",
      "يرجى تأكيد السعر والتوفر.",
    ];
    return lines
      .filter((l): l is string => l !== null)
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.chaletId) {
      setChaletError(true);
      return;
    }
    if (!form.guests) {
      setGuestsError(true);
      return;
    }

    // iOS Safari blocks navigation that happens after an await — build the
    // WhatsApp link first and navigate synchronously, no async work before it.
    const waHref = `${WHATSAPP_URL}?text=${encodeURIComponent(buildMessage())}`;

    const payload = {
      // eslint-disable-next-line react-hooks/purity -- event handler, not render
      orderId:         `AR-${Date.now()}`,
      requestType:     isMini ? "استعلام توفر شاليه ميني" : "حجز",
      fullName:        form.fullName,
      phone:           form.phone,
      chaletType:      chalet?.name ?? form.chaletId,
      chaletNumber:    form.chaletNumber,
      arrivalDate:     form.date,
      checkIn:         form.checkIn,
      checkOut:        form.checkOut,
      hours:           hours ?? null,
      bookingDuration: form.period,
      guests:          form.guests,
      estimatedPrice:  estimatedPrice ?? 0,
      customerNotes:   form.notes,
    };

    // fire-and-forget — keepalive lets the request complete while the page
    // navigates away; a webhook failure must never block the customer journey
    try {
      fetch(N8N_WEBHOOK, {
        method:    "POST",
        headers:   { "Content-Type": "application/json" },
        body:      JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // silent
    }

    setIsSubmitting(true);
    // same-tab navigation (equivalent to setting location.href) — survives
    // iOS Safari's popup blocker because it runs in the click's sync path
    window.location.assign(waHref);
  };

  const inputClass =
    "w-full bg-white border border-sand-200 rounded-xl px-4 py-3.5 text-charcoal text-sm placeholder:text-brown-400/50 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-300/20 transition-all duration-200";
  const labelClass = "block text-sm font-semibold text-charcoal mb-2";

  return (
    <section id="booking" className="py-12 lg:py-24 bg-ivory">
      <div className="max-w-2xl mx-auto px-5 lg:px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-7"
        >
          <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase mb-2">
            احجز الآن
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl text-charcoal mb-2">
            أرسل طلب حجزك
          </h2>
          <span className="gold-divider mx-auto mb-3" style={{ display: "block" }} />
          <p className="text-brown-400 text-sm leading-relaxed">
            أكمل البيانات وسيُفتح واتساب برسالة جاهزة — ما عليك إلا الإرسال.
          </p>
        </motion.div>

        {/* ── Form ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="bg-white rounded-3xl shadow-[0_8px_50px_rgba(61,43,31,0.07)] border border-sand-100 p-7 lg:p-10">
            <h3 className="font-semibold text-charcoal text-lg mb-1">
              {isMini ? "استعلام توفر شاليه ميني" : "أرسل طلب حجزك"}
            </h3>
            <p className="text-xs text-brown-400 mb-7">
              {isMini
                ? "أرسل بياناتك وسنؤكد لك التوفر عبر واتساب — الميني بالساعة ودون حجز مسبق."
                : "جميع الحقول اختيارية — أرسل ما تعرفه والباقي نُكمله معاً."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* ١. نوع الشاليه */}
              <div>
                <label className={labelClass}>نوع الشاليه</label>
                <select
                  name="chaletId"
                  value={form.chaletId}
                  onChange={handleChange}
                  className={`${inputClass}${chaletError ? " border-red-400 ring-2 ring-red-200/50" : ""}`}
                >
                  <option value="">اختر نوع الشاليه</option>
                  {CHALETS.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {chaletError && (
                  <p className="text-xs text-red-500 mt-1.5">يرجى اختيار نوع الشاليه قبل الإرسال</p>
                )}
              </div>

              {/* تنبيه الميني — استعلام توفر وليس حجزًا مؤكدًا */}
              {isMini && (
                <div className="px-5 py-4 bg-amber-50 border border-amber-200 rounded-2xl">
                  <p className="text-sm font-semibold text-amber-800 mb-1.5">
                    تنبيه: استعلام توفر — وليس حجزًا مؤكدًا
                  </p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    شاليهات الميني تعمل بنظام التوفر الفوري، ولا يعتبر إرسال الطلب حجزًا مؤكدًا.
                    أوقات الذروة من ٤ إلى ٩ مساءً عليها طلب عالٍ، والأولوية حسب التوفر وقت الوصول.
                    للحجوزات المؤكدة مسبقًا نرشح الشاليهات الصغيرة أو الوسط.
                  </p>
                </div>
              )}

              {/* ٢. رقم الشاليه — يعتمد على النوع (الميني يُحدد عند الوصول) */}
              <div>
                <label className={labelClass}>رقم الشاليه</label>
                {isMini ? (
                  <div className={`${inputClass} bg-sand-50`}>
                    <span className="text-brown-500 text-sm leading-relaxed">
                      يتم تحديد رقم الشاليه عند الوصول حسب التوفر
                    </span>
                  </div>
                ) : (
                  <select
                    name="chaletNumber"
                    value={form.chaletNumber}
                    onChange={handleChange}
                    disabled={!chalet}
                    className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <option value="">
                      {chalet ? "اختر رقم الشاليه" : "اختر نوع الشاليه أولاً"}
                    </option>
                    {chalet?.numbers.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* ٣. التاريخ */}
              <div>
                <label className={labelClass}>التاريخ</label>
                <div
                  className="relative cursor-pointer"
                  onClick={openDatePicker}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && openDatePicker()}
                  aria-label="اختر التاريخ"
                >
                  <div className={`${inputClass} flex items-center justify-between gap-2 pointer-events-none`}>
                    <span className={form.date ? "text-charcoal" : "text-brown-400/50"}>
                      {form.date ? formatDate(form.date) : "اختر التاريخ"}
                    </span>
                    <CalendarIcon className="w-4 h-4 text-brown-400/40 flex-shrink-0 pointer-events-none" />
                  </div>
                  <input
                    ref={dateRef}
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
                  />
                </div>
              </div>

              {/* ٤ + ٥. الميني: وقت الوصول المتوقع + عدد الساعات المتوقع
                        غير الميني: وقت الدخول والخروج */}
              {isMini ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>وقت الوصول المتوقع</label>
                    <input
                      type="time"
                      name="checkIn"
                      value={form.checkIn}
                      onChange={handleChange}
                      onClick={openTimePicker}
                      lang="en"
                      dir="ltr"
                      className={`${inputClass} cursor-pointer text-left`}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>عدد الساعات المتوقع</label>
                    <select
                      name="expectedHours"
                      value={form.expectedHours}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">اختر عدد الساعات</option>
                      {MINI_HOUR_OPTIONS.map((n) => (
                        <option key={n} value={n}>{`${n} ساعة`}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>وقت الدخول</label>
                      <input
                        type="time"
                        name="checkIn"
                        value={form.checkIn}
                        onChange={handleChange}
                        onClick={openTimePicker}
                        lang="en"
                        dir="ltr"
                        className={`${inputClass} cursor-pointer text-left`}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>وقت الخروج</label>
                      <input
                        type="time"
                        name="checkOut"
                        value={form.checkOut}
                        onChange={handleChange}
                        onClick={openTimePicker}
                        lang="en"
                        dir="ltr"
                        className={`${inputClass} cursor-pointer text-left`}
                      />
                    </div>
                  </div>

                  {/* ٦. عدد الساعات — تلقائي */}
                  <div>
                    <label className={labelClass}>عدد الساعات</label>
                    <div className={`${inputClass} bg-sand-50`}>
                      <span className={hours ? "text-charcoal" : "text-brown-400/50"}>
                        {hours ? `${hours} ساعة` : "يُحسب تلقائيًا من وقت الدخول والخروج"}
                      </span>
                    </div>
                    {overnight && (
                      <p className="text-xs text-amber-700 mt-1.5">الخروج في اليوم التالي</p>
                    )}
                  </div>

                  {/* ٧. مدة الحجز */}
                  <div>
                    <label className={labelClass}>مدة الحجز</label>
                    <select
                      name="period"
                      value={form.period}
                      onChange={handleChange}
                      disabled={!chalet}
                      className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <option value="">
                        {chalet ? "اختر المدة" : "اختر نوع الشاليه أولاً"}
                      </option>
                      {chalet?.periods.map((p) => (
                        <option key={p.label} value={p.label}>
                          {p.label} — {p.price.toLocaleString("en-US")} ريال
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* السعر التقديري للميني */}
              {isMini && (
                <div>
                  <label className={labelClass}>السعر التقديري</label>
                  <div className={`${inputClass} bg-sand-50`}>
                    <span className={estimatedPrice !== null ? "text-charcoal" : "text-brown-400/50"}>
                      {estimatedPrice !== null
                        ? `${estimatedPrice.toLocaleString("en-US")} ريال`
                        : "٩٩ ريال للساعة الأولى، وكل ساعة إضافية ٥٠ ريال"}
                    </span>
                  </div>
                </div>
              )}

              {/* ٨. عدد الأشخاص */}
              <div>
                <label className={labelClass}>عدد الأشخاص</label>
                <select
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  disabled={!chalet}
                  className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed${guestsError ? " border-red-400 ring-2 ring-red-200/50" : ""}`}
                >
                  <option value="">
                    {chalet ? "اختر العدد" : "اختر نوع الشاليه أولاً"}
                  </option>
                  {guestOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {guestsError && (
                  <p className="text-xs text-red-500 mt-1.5">يرجى اختيار عدد الأشخاص قبل الإرسال</p>
                )}
              </div>

              {/* ٩. الاسم */}
              <div>
                <label className={labelClass}>الاسم الكامل</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="أدخل اسمك الكامل"
                  className={inputClass}
                />
              </div>

              {/* ١٠. رقم الجوال */}
              <div>
                <label className={labelClass}>رقم الجوال</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="05xxxxxxxx"
                  dir="ltr"
                  className={`${inputClass} text-left`}
                />
              </div>

              {/* ١١. ملاحظات */}
              <div>
                <label className={labelClass}>ملاحظات إضافية</label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="أي طلبات خاصة، وقت وصول مفضّل، استفسارات..."
                  value={form.notes}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* ملخص الحجز — يظهر بعد اختيار النوع والرقم والتاريخ والوقتين */}
              {showSummary && (
                <div className="px-5 py-4 bg-sand-50 border-2 border-gold-300/50 rounded-2xl">
                  <p className="font-serif text-base text-charcoal font-semibold mb-3">
                    {isMini ? "ملخص الاستعلام" : "ملخص الحجز"}
                  </p>
                  <dl className="space-y-1.5 text-sm">
                    <SummaryRow label="نوع الشاليه" value={chalet?.name ?? "—"} />
                    {isMini ? (
                      <>
                        <SummaryRow label="رقم الشاليه" value="يُحدد عند الوصول حسب التوفر" />
                        <SummaryRow label="التاريخ" value={formatDate(form.date)} />
                        <SummaryRow label="وقت الوصول المتوقع" value={form.checkIn} ltr />
                        <SummaryRow
                          label="عدد الساعات المتوقع"
                          value={hours ? `${hours} ساعة` : "—"}
                        />
                      </>
                    ) : (
                      <>
                        <SummaryRow label="رقم الشاليه" value={form.chaletNumber} />
                        <SummaryRow label="الدخول" value={form.checkIn} ltr />
                        <SummaryRow label="الخروج" value={form.checkOut} ltr />
                        <SummaryRow
                          label="عدد الساعات"
                          value={
                            hours
                              ? `${hours} ساعة${overnight ? " (الخروج في اليوم التالي)" : ""}`
                              : "—"
                          }
                        />
                      </>
                    )}
                    <SummaryRow
                      label="السعر التقديري"
                      value={
                        estimatedPrice !== null
                          ? `${estimatedPrice.toLocaleString("en-US")} ريال`
                          : "يتم تأكيد السعر عبر واتساب"
                      }
                      strong
                    />
                  </dl>
                  <p className="text-xs text-brown-400/70 mt-3 leading-relaxed">
                    {isMini
                      ? "ملاحظة: يتم تحديد رقم الشاليه حسب التوفر عند الوصول، ولا يعتبر الطلب حجزًا مؤكدًا."
                      : "ملاحظة: يتم تأكيد التوفر النهائي عبر واتساب."}
                  </p>
                </div>
              )}

              {/* زر الإرسال */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 bg-palm-600 hover:bg-palm-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-base py-4 rounded-2xl shadow-[0_4px_20px_rgba(74,103,65,0.25)] hover:shadow-[0_6px_30px_rgba(74,103,65,0.35)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <WhatsAppIcon className="w-[18px] h-[18px] text-white" />
                    {isMini ? "أرسل استعلام التوفر عبر واتساب" : "أرسل طلب الحجز عبر واتساب"}
                  </>
                )}
              </button>

              <p className="text-center text-xs text-brown-400/70 leading-relaxed pt-1 max-w-xs mx-auto">
                {isMini
                  ? "بعد الضغط على الزر سيتم فتح واتساب برسالة جاهزة، فضلاً اضغط إرسال داخل واتساب لإتمام استعلام التوفر."
                  : "بعد الضغط على الزر سيتم فتح واتساب برسالة جاهزة، فضلاً اضغط إرسال داخل واتساب لإتمام طلب الحجز."}
              </p>

            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// ─── Summary row ──────────────────────────────────────────────────────────────

function SummaryRow({
  label,
  value,
  ltr,
  strong,
}: {
  label: string;
  value: string;
  ltr?: boolean;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-brown-400">{label}</dt>
      <dd
        className={strong ? "font-bold text-gold-600" : "text-charcoal font-medium"}
        dir={ltr ? "ltr" : undefined}
      >
        {value}
      </dd>
    </div>
  );
}
