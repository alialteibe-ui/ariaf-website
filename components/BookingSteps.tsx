"use client";

import { motion } from "framer-motion";
import { HomeIcon, CalendarIcon, SendIcon, CheckCircleIcon } from "@/components/icons";

const steps = [
  {
    Icon: HomeIcon,
    num: "١",
    title: "اختر الشاليه",
    desc: "حسب العدد ومدة الزيارة.",
  },
  {
    Icon: CalendarIcon,
    num: "٢",
    title: "حدّد الموعد",
    desc: "اليوم، الوقت، وعدد الأشخاص.",
  },
  {
    Icon: SendIcon,
    num: "٣",
    title: "أرسل واتساب",
    desc: "فريق الحجز يراجع طلبك.",
  },
  {
    Icon: CheckCircleIcon,
    num: "٤",
    title: "أكّد الحجز",
    desc: "نرسل لك السعر والتفاصيل.",
  },
];

export default function BookingSteps() {
  return (
    <section className="py-8 lg:py-20 bg-sand-100">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 lg:mb-14"
        >
          <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase mb-2">
            كيف تحجز
          </p>
          <h2 className="font-serif text-2xl lg:text-4xl text-charcoal mb-2">
            حجزك يتم بسهولة
          </h2>
          <span className="gold-divider mx-auto mb-3" style={{ display: "block" }} />
          <p className="text-brown-400 text-sm max-w-sm mx-auto leading-relaxed">
            اختر الشاليه، أرسل طلبك عبر واتساب، ونؤكد لك التوفر بسرعة.
          </p>
        </motion.div>

        {/* Steps — 2-col grid on mobile, 4-col on desktop */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-[1.6rem] right-[12.5%] left-[12.5%] h-px bg-gradient-to-l from-sand-200 via-gold-300/40 to-sand-200 z-0" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8 relative z-10">
            {steps.map(({ Icon, num, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white/60 lg:bg-transparent rounded-2xl p-3.5 lg:p-0 lg:text-center border border-sand-200/60 lg:border-none shadow-[0_1px_8px_rgba(61,43,31,0.04)] lg:shadow-none"
              >
                {/* Icon circle */}
                <div className="relative w-10 h-10 lg:w-[4rem] lg:h-[4rem] mb-3 lg:mx-auto">
                  <div className="w-full h-full rounded-full bg-white border border-sand-200 shadow-[0_2px_10px_rgba(201,168,76,0.10)] flex items-center justify-center">
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-gold-500" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-gold-400 flex items-center justify-center shadow-sm">
                    <span className="text-white text-[9px] lg:text-[10px] font-bold leading-none">
                      {num}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-charcoal text-sm lg:text-base mb-1 leading-snug">
                  {title}
                </h3>
                <p className="text-brown-400 text-xs lg:text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
