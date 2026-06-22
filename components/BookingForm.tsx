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
function computeHours(checkIn: string, checkOut: string): number | null {
  if (!checkIn || !checkOut) return null;
  const [h1, m1] = checkIn.split(":").map(Number);
  const [h2, m2] = checkOut.split(":").map(Number);
  if ([h1, m1, h2, m2].some((n) => Number.isNaN(n))) return null;
  const start = h1 * 60 + m1;
  const end = h2 * 60 + m2;
  if (end <= start) return null;
  return Math.ceil((end - start) / 60);
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
  period:       string;
  guests:       string;
  notes:        string;
}

const INITIAL: FormState = {
  fullName:     "",
  phone:        "",
  chaletId:     "",
  chaletNumber: "",
  date:         "",
  checkIn:      "",
  checkOut:     "",
  period:       "",
  guests:       "",
  notes:        "",
};

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
  const hours        = computeHours(form.checkIn, form.checkOut);
  // both times entered but the window can't be computed (overnight / reversed)
  const timesPending = Boolean(form.checkIn && form.checkOut) && hours === null;
  const guestOptions = chalet?.guests ?? [];

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
        chaletId:     value,
        chaletNumber: validNumbers.includes(prev.chaletNumber) ? prev.chaletNumber : "",
        period:       "",
        guests:       validGuests.includes(prev.guests) ? prev.guests : "",
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
    const priceStr = estimatedPrice ? `${estimatedPrice.toLocaleString("en-US")} ريال` : null;
    const hoursStr = hours ? `${hours} ساعة` : null;

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
      priceStr          ? `السعر التقديري: ${priceStr}`          : null,
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
            <h3 className="font-semibold text-charcoal text-lg mb-1">أرسل طلب حجزك</h3>
            <p className="text-xs text-brown-400 mb-7">
              جميع الحقول اختيارية — أرسل ما تعرفه والباقي نُكمله معاً.
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

              {/* ٢. رقم الشاليه — يعتمد على النوع */}
              <div>
                <label className={labelClass}>رقم الشاليه</label>
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

              {/* ٤ + ٥. وقت الدخول والخروج */}
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
                {timesPending && (
                  <div className="mt-2 px-3 py-2.5 bg-amber-50 border border-amber-200/70 rounded-xl">
                    <p className="text-xs text-amber-700 leading-relaxed">
                      سيتم تأكيد الوقت والتوفر عبر واتساب.
                    </p>
                  </div>
                )}
              </div>

              {/* ٧. مدة الحجز */}
              <div>
                <label className={labelClass}>مدة الحجز</label>
                {isMini ? (
                  <div className={`${inputClass} bg-sand-50`}>
                    <span className="text-brown-500 text-xs leading-relaxed">
                      تُحتسب مدة الميني من وقت الدخول والخروج — {chalet?.durationNote}
                    </span>
                  </div>
                ) : (
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
                )}
              </div>

              {/* السعر التقديري */}
              {estimatedPrice !== null && (
                <div className="px-4 py-3.5 bg-sand-50 border border-sand-200 rounded-xl">
                  <p className="text-sm text-charcoal font-semibold">
                    السعر التقديري:{" "}
                    <span className="text-gold-600">
                      {estimatedPrice.toLocaleString("en-US")} ريال
                    </span>
                  </p>
                  <p className="text-xs text-brown-400/70 mt-1">
                    {isMini
                      ? "محسوب بالساعة (٩٩ للأولى + ٥٠ لكل إضافية). السعر والتوفر يُؤكدان عبر واتساب."
                      : "السعر والتوفر يتم تأكيدهما من الإدارة عبر واتساب."}
                  </p>
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
                    أرسل طلب الحجز عبر واتساب
                  </>
                )}
              </button>

              <p className="text-center text-xs text-brown-400/70 leading-relaxed pt-1 max-w-xs mx-auto">
                بعد الضغط على الزر سيتم فتح واتساب برسالة جاهزة، فضلاً اضغط إرسال داخل واتساب لإتمام طلب الحجز.
              </p>

            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
