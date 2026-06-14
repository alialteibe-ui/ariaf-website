"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/site";
import { WhatsAppIcon, CalendarIcon } from "@/components/icons";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface PeriodOption {
  label: string;
  price: number;
}

interface ChaletOption {
  id: string;
  label: string;
  isMini: boolean;
  periods: PeriodOption[];
}

const CHALETS: ChaletOption[] = [
  {
    id: "mini",
    label: "شاليهات الميني",
    isMini: true,
    periods: [
      { label: "ساعة واحدة",               price: 99  },
      { label: "ساعتان",                    price: 149 },
      { label: "٣ ساعات",                   price: 199 },
      { label: "بكج ٨ أيام (ساعة يومياً)", price: 500 },
    ],
  },
  {
    id: "small",
    label: "الشاليهات الصغيرة 101 — 102",
    isMini: false,
    periods: [
      { label: "٥ ساعات",       price: 350 },
      { label: "١١ ساعة",       price: 600 },
      { label: "مبيت ٢٣ ساعة", price: 750 },
    ],
  },
  {
    id: "medium",
    label: "الشاليهات الوسط 103 — 104",
    isMini: false,
    periods: [
      { label: "٥ ساعات",       price: 450 },
      { label: "١١ ساعة",       price: 800 },
      { label: "مبيت ٢٣ ساعة", price: 950 },
    ],
  },
  {
    id: "dome105",
    label: "القبة المالديفية 105",
    isMini: false,
    periods: [
      { label: "٥ ساعات",       price: 499  },
      { label: "١٠ ساعات",      price: 699  },
      { label: "مبيت ٢٣ ساعة", price: 950  },
    ],
  },
  {
    id: "vip115",
    label: "القبة المالديفية VIP 115",
    isMini: false,
    periods: [
      { label: "٥ ساعات",       price: 550  },
      { label: "١٠ ساعات",      price: 799  },
      { label: "مبيت ٢٣ ساعة", price: 1150 },
    ],
  },
];

const GUESTS_OPTIONS: Record<string, string[]> = {
  mini: [
    "١ — ٣ أفراد",
    "٣ — ٥ أفراد",
  ],
  small: [
    "١ — ٣ أفراد",
    "٣ — ٥ أفراد",
    "٦ — ٨ أفراد",
  ],
  medium: [
    "١ — ٣ أفراد",
    "٣ — ٥ أفراد",
    "٦ — ٨ أفراد",
    "٩ — ١٢ فردًا",
  ],
  dome105: [
    "١ — ٣ أفراد",
    "٣ — ٥ أفراد",
    "٦ — ٨ أفراد",
    "٩ — ١٢ فردًا",
    "١٣ — ٢٠ فردًا",
  ],
  vip115: [
    "١ — ٣ أفراد",
    "٣ — ٥ أفراد",
    "٦ — ٨ أفراد",
    "٩ — ١٢ فردًا",
    "١٣ — ٢٠ فردًا",
  ],
};

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

// ─── State ────────────────────────────────────────────────────────────────────

interface FormState {
  fullName:  string;
  phone:     string;
  chaletId:  string;
  date:      string;
  period:    string;
  guests:    string;
  notes:     string;
}

const INITIAL: FormState = {
  fullName:  "",
  phone:     "",
  chaletId:  "",
  date:      "",
  period:    "",
  guests:    "",
  notes:     "",
};


const N8N_WEBHOOK = "https://n8n.srv1620367.hstgr.cloud/webhook/ariaf-booking-request";

/** Other sections (e.g. ChaletTypes cards) fire this to pre-select a chalet
 *  in the form. Detail is the CHALETS id. */
export const SELECT_CHALET_EVENT = "ariaf:select-chalet";

// ─── Component ────────────────────────────────────────────────────────────────

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [chaletError, setChaletError] = useState(false);
  const [guestsError, setGuestsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dateRef = useRef<HTMLInputElement>(null);

  // location.href navigation means the page may be restored from bfcache
  // when the customer comes back from WhatsApp — re-enable the button then
  useEffect(() => {
    const reset = () => setIsSubmitting(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  const chalet         = CHALETS.find((c) => c.id === form.chaletId) ?? null;
  const isMini         = chalet?.isMini ?? false;
  const estimatedPrice = chalet?.periods.find((p) => p.label === form.period)?.price ?? null;
  const guestOptions   = form.chaletId ? (GUESTS_OPTIONS[form.chaletId] ?? []) : [];

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

  // Selecting a chalet (from the dropdown or from a ChaletTypes card) resets
  // the period and keeps the guest count only if it's still valid for the type.
  const selectChalet = useCallback((value: string) => {
    setChaletError(false);
    setForm((prev) => {
      const validOptions = GUESTS_OPTIONS[value] ?? [];
      return {
        ...prev,
        chaletId: value,
        period: "",
        guests: validOptions.includes(prev.guests) ? prev.guests : "",
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
    const priceStr = estimatedPrice
      ? `${estimatedPrice.toLocaleString("en-US")} ريال`
      : "—";

    if (isMini) {
      const lines = [
        "مرحبًا، لدي استفسار عن شاليهات الميني في أرياف زكي السالم للمياه الكبريتية.",
        "",
        form.fullName ? `الاسم: ${form.fullName}`        : null,
        form.phone    ? `رقم الجوال: ${form.phone}`      : null,
        form.date     ? `تاريخ الزيارة: ${dateAr}`       : null,
        form.period   ? `المدة المطلوبة: ${form.period}` : null,
        form.guests   ? `عدد الأشخاص: ${form.guests}`    : null,
        form.notes    ? `ملاحظات: ${form.notes}`         : null,
        "",
        "أفهم أن شاليهات الميني حجزها مباشر من المكتب عند بوابة 2، وأرغب بالاستفسار عن التفاصيل.",
      ];
      return lines
        .filter((l): l is string => l !== null)
        .join("\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
    }

    const lines = [
      "مرحبًا، أرغب بحجز شاليه في أرياف زكي السالم للمياه الكبريتية.",
      "",
      form.fullName      ? `الاسم: ${form.fullName}`           : null,
      form.phone         ? `رقم الجوال: ${form.phone}`         : null,
      chalet             ? `نوع الشاليه: ${chalet.label}`      : null,
      form.date          ? `تاريخ الوصول: ${dateAr}`           : null,
      form.period        ? `مدة الحجز: ${form.period}`         : null,
      form.guests        ? `عدد الأشخاص: ${form.guests}`       : null,
      estimatedPrice     ? `السعر التقديري: ${priceStr}`       : null,
      form.notes         ? `ملاحظات: ${form.notes}`            : null,
      "",
      "أرجو تأكيد التوفر والسعر النهائي.",
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
      chaletType:      chalet?.label ?? form.chaletId,
      arrivalDate:     form.date,
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
                {isMini ? "استفسر عن شاليهات الميني" : "أرسل طلب حجزك"}
              </h3>
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
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                  {chaletError && (
                    <p className="text-xs text-red-500 mt-1.5">يرجى اختيار نوع الشاليه قبل الإرسال</p>
                  )}
                </div>

                {/* تنبيه الميني */}
                {isMini && (
                  <div className="px-4 py-3 bg-amber-50 border border-amber-200/70 rounded-xl">
                    <p className="text-sm text-amber-800 leading-relaxed">
                      شاليهات الميني حجزها مباشر من المكتب عند بوابة 2، ولا تحتاج حجز مسبق عبر الموقع.
                    </p>
                  </div>
                )}

                {/* الاسم والجوال */}
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

                {/* تاريخ الوصول */}
                <div>
                  <label className={labelClass}>
                    {isMini ? "تاريخ الزيارة" : "تاريخ الوصول"}
                  </label>
                  <div
                    className="relative cursor-pointer"
                    onClick={openDatePicker}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && openDatePicker()}
                    aria-label={isMini ? "اختر تاريخ الزيارة" : "اختر تاريخ الوصول"}
                  >
                    <div className={`${inputClass} flex items-center justify-between gap-2 pointer-events-none`}>
                      <span className={form.date ? "text-charcoal" : "text-brown-400/50"}>
                        {form.date ? formatDate(form.date) : "اختر تاريخ الوصول"}
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

                {/* مدة الحجز — ديناميكية */}
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
                      السعر والتوفر يتم تأكيدهما من الإدارة عبر واتساب.
                    </p>
                  </div>
                )}

                {/* عدد الأشخاص */}
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

                {/* ملاحظات */}
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
                      {isMini ? "استفسر عبر واتساب" : "أرسل طلب الحجز عبر واتساب"}
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
