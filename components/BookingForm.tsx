"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { WHATSAPP_URL, WHATSAPP_NUMBER } from "@/lib/site";
import { WhatsAppIcon, ShieldIcon, ClockIcon, MapPinIcon, CalendarIcon } from "@/components/icons";

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

const DIRECT_WA_MSG =
  "مرحباً، أرغب بحجز شاليه في أرياف زكي السالم للمياه الكبريتية. أرجو تزويدي بالتوفر والأسعار.";

// ─── Component ────────────────────────────────────────────────────────────────

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const dateRef = useRef<HTMLInputElement>(null);

  const chalet         = CHALETS.find((c) => c.id === form.chaletId) ?? null;
  const isMini         = chalet?.isMini ?? false;
  const estimatedPrice = chalet?.periods.find((p) => p.label === form.period)?.price ?? null;

  const openDatePicker = () => {
    const input = dateRef.current;
    if (!input) return;
    if (typeof (input as HTMLInputElement & { showPicker?: () => void }).showPicker === "function") {
      (input as HTMLInputElement & { showPicker: () => void }).showPicker();
    } else {
      input.click();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === "chaletId") return { ...prev, chaletId: value, period: "" };
      return { ...prev, [name]: value };
    });
  };

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
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(buildMessage())}`, "_blank");
  };

  const inputClass =
    "w-full bg-white border border-sand-200 rounded-xl px-4 py-3.5 text-charcoal text-sm placeholder:text-brown-400/50 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-300/20 transition-all duration-200";
  const labelClass = "block text-sm font-semibold text-charcoal mb-2";

  return (
    <section id="booking" className="py-14 lg:py-28 bg-ivory">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ── Left panel ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">
              احجز الآن
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl text-charcoal leading-tight mb-5">
              ابدأ تجربتك
              <br />
              <span className="text-gold-500">معنا اليوم</span>
            </h2>
            <span className="gold-divider mb-8" style={{ display: "block" }} />
            <p className="text-brown-400 text-base leading-relaxed mb-10">
              أكمل البيانات أدناه وسيُفتح واتساب تلقائياً برسالة جاهزة —
              ما عليك إلا الإرسال وسنرد عليك بأقرب وقت.
            </p>

            <div className="space-y-4">
              <InfoItem Icon={WhatsAppIcon} label="تواصل مباشر عبر واتساب" />
              <InfoItem Icon={ClockIcon}    label="رد سريع خلال ساعات العمل" />
              <InfoItem Icon={ShieldIcon}   label="حجزك محفوظ وخاص تماماً" />
              <InfoItem Icon={MapPinIcon}   label="الأحساء، المملكة العربية السعودية" />
            </div>

            <div className="mt-10 p-5 bg-palm-600/5 border border-palm-500/15 rounded-2xl">
              <p className="text-xs text-brown-400 mb-3 font-medium">
                أو تواصل مباشرةً دون ملء النموذج:
              </p>
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(DIRECT_WA_MSG)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 group"
              >
                <div className="w-10 h-10 bg-palm-600 group-hover:bg-palm-500 rounded-xl flex items-center justify-center transition-colors duration-200">
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-charcoal">واتساب</div>
                  <div className="text-xs text-brown-400">+{WHATSAPP_NUMBER}</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* ── Right panel — form ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl shadow-[0_8px_50px_rgba(61,43,31,0.07)] border border-sand-100 p-8 lg:p-10">
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
                    className={inputClass}
                  >
                    <option value="">اختر نوع الشاليه</option>
                    {CHALETS.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
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
                  <div className="relative">
                    <button
                      type="button"
                      onClick={openDatePicker}
                      className={`${inputClass} flex items-center justify-between gap-2 cursor-pointer`}
                    >
                      <span className={form.date ? "text-charcoal" : "text-brown-400/50"}>
                        {form.date ? formatDate(form.date) : "اختر تاريخ الوصول"}
                      </span>
                      <CalendarIcon className="w-4 h-4 text-brown-400/40 flex-shrink-0" />
                    </button>
                    <input
                      ref={dateRef}
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      tabIndex={-1}
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
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
                    className={inputClass}
                  >
                    <option value="">اختر العدد</option>
                    <option value="١ — ٢ أفراد">١ — ٢ أفراد</option>
                    <option value="٣ — ٥ أفراد">٣ — ٥ أفراد</option>
                    <option value="٦ — ٨ أفراد">٦ — ٨ أفراد</option>
                    <option value="٩ — ١٢ فرداً">٩ — ١٢ فرداً</option>
                    <option value="١٣ — ٢٠ فرداً">١٣ — ٢٠ فرداً</option>
                  </select>
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
                  className="w-full flex items-center justify-center gap-3 bg-palm-600 hover:bg-palm-500 text-white font-bold text-base py-4 rounded-2xl shadow-[0_4px_20px_rgba(74,103,65,0.25)] hover:shadow-[0_6px_30px_rgba(74,103,65,0.35)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 mt-2"
                >
                  <WhatsAppIcon className="w-[18px] h-[18px] text-white" />
                  {isMini ? "استفسر عبر واتساب" : "أرسل طلب الحجز عبر واتساب"}
                </button>

                <p className="text-center text-xs text-brown-400/55 pt-1">
                  {isMini
                    ? "سيُفتح واتساب برسالة استفسار جاهزة للإرسال"
                    : "سيُفتح واتساب تلقائياً مع تفاصيل حجزك جاهزة للإرسال"}
                </p>

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── InfoItem ─────────────────────────────────────────────────────────────────

function InfoItem({
  Icon,
  label,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-sand-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-gold-500" />
      </div>
      <span className="text-charcoal text-sm">{label}</span>
    </div>
  );
}
