"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { WHATSAPP_URL, WHATSAPP_NUMBER } from "@/lib/site";
import { WhatsAppIcon, ShieldIcon, ClockIcon, MapPinIcon, CalendarIcon } from "@/components/icons";

interface FormData {
  chaletType: string;
  date: string;
  period: string;
  guests: string;
  notes: string;
}

const initialForm: FormData = {
  chaletType: "",
  date: "",
  period: "",
  guests: "",
  notes: "",
};

const DIRECT_WA_MSG =
  "مرحباً، أرغب بحجز شاليه في أرياف زكي السالم للمياه الكبريتية. أرجو تزويدي بالتوفر والأسعار.";

function formatDate(raw: string): string {
  if (!raw) return "";
  try {
    // Parse as local midnight to avoid UTC timezone shift
    const date = new Date(raw + "T00:00:00");
    // ar-SA-u-ca-gregory = Arabic Saudi Arabia + Gregorian calendar
    return new Intl.DateTimeFormat("ar-SA-u-ca-gregory", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return raw;
  }
}

export default function BookingForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const dateRef = useRef<HTMLInputElement>(null);

  const openDatePicker = () => {
    const input = dateRef.current;
    if (!input) return;
    // showPicker() is the modern API; fall back to .click() on older browsers
    if (typeof (input as HTMLInputElement & { showPicker?: () => void }).showPicker === "function") {
      (input as HTMLInputElement & { showPicker: () => void }).showPicker();
    } else {
      input.click();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const buildMessage = (): string => {
    const rows = [
      "مرحباً، أرغب بحجز شاليه في أرياف زكي السالم للمياه الكبريتية.",
      "",
      form.chaletType ? `*نوع الشاليه:* ${form.chaletType}` : null,
      form.date       ? `*تاريخ الوصول:* ${formatDate(form.date)}` : null,
      form.period     ? `*الفترة المطلوبة:* ${form.period}` : null,
      form.guests     ? `*عدد الأشخاص:* ${form.guests}` : null,
      form.notes      ? `*ملاحظات:* ${form.notes}` : null,
      "",
      "أرجو تزويدي بالتوفر والأسعار.",
    ];

    // Remove nulls then collapse consecutive blank lines
    const filtered = rows.filter((r) => r !== null) as string[];
    const collapsed: string[] = [];
    for (const line of filtered) {
      if (line === "" && collapsed.at(-1) === "") continue;
      collapsed.push(line);
    }
    return collapsed.join("\n").trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(buildMessage());
    window.open(`${WHATSAPP_URL}?text=${message}`, "_blank");
  };

  const inputClass =
    "w-full bg-white border border-sand-200 rounded-xl px-4 py-3.5 text-charcoal text-sm placeholder:text-brown-400/50 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-300/20 transition-all duration-200";

  const labelClass = "block text-sm font-semibold text-charcoal mb-2";

  return (
    <section id="booking" className="py-14 lg:py-28 bg-ivory">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ── Left panel — context ───────────────────────── */}
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

            {/* Direct WhatsApp shortcut */}
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

          {/* ── Right panel — form ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl shadow-[0_8px_50px_rgba(61,43,31,0.07)] border border-sand-100 p-8 lg:p-10">
              <h3 className="font-semibold text-charcoal text-lg mb-1">
                أرسل طلب حجزك
              </h3>
              <p className="text-xs text-brown-400 mb-7">
                جميع الحقول اختيارية — أرسل ما تعرفه والباقي نُكمله معاً.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* ١. نوع الشاليه */}
                <div>
                  <label className={labelClass}>نوع الشاليه</label>
                  <select
                    name="chaletType"
                    value={form.chaletType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">اختر نوع الشاليه</option>
                    <option value="الشاليه الصغير — حتى ٨ أفراد">
                      الشاليه الصغير — حتى ٨ أفراد
                    </option>
                    <option value="الشاليه الكبير — حتى ٢٠ فردًا">
                      الشاليه الكبير — حتى ٢٠ فردًا
                    </option>
                  </select>
                </div>

                {/* ٢. تاريخ الوصول — custom Arabic date picker */}
                <div>
                  <label className={labelClass}>تاريخ الوصول</label>
                  <div className="relative">
                    {/* Visible button — RTL Arabic display */}
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

                    {/* Hidden native input — handles actual date picking */}
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

                {/* ٣. الفترة المطلوبة */}
                <div>
                  <label className={labelClass}>الفترة المطلوبة</label>
                  <select
                    name="period"
                    value={form.period}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">اختر الفترة</option>
                    <option value="فترة صباحية (٨ص — ٢م)">
                      فترة صباحية (٨ص — ٢م)
                    </option>
                    <option value="فترة مسائية (٤م — ١٠م)">
                      فترة مسائية (٤م — ١٠م)
                    </option>
                    <option value="يوم كامل (٨ص — ١٠م)">
                      يوم كامل (٨ص — ١٠م)
                    </option>
                    <option value="ليلة كاملة">ليلة كاملة</option>
                  </select>
                </div>

                {/* ٤. عدد الأشخاص */}
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

                {/* ٥. ملاحظات */}
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

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-palm-600 hover:bg-palm-500 text-white font-bold text-base py-4 rounded-2xl shadow-[0_4px_20px_rgba(74,103,65,0.25)] hover:shadow-[0_6px_30px_rgba(74,103,65,0.35)] transition-all duration-300 hover:-translate-y-0.5 mt-2"
                >
                  <WhatsAppIcon className="w-[18px] h-[18px] text-white" />
                  أرسل طلب الحجز عبر واتساب
                </button>

                <p className="text-center text-xs text-brown-400/55 pt-1">
                  سيُفتح واتساب تلقائياً مع تفاصيل حجزك جاهزة للإرسال
                </p>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

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
