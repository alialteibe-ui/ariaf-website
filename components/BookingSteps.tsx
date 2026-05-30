"use client";

import { motion } from "framer-motion";
import { HomeIcon, CalendarIcon, SendIcon, CheckCircleIcon } from "@/components/icons";

const steps = [
  {
    Icon: HomeIcon,
    num: "١",
    title: "اختر نوع الشاليه",
    desc: "الشاليه الصغير لعائلتك الصغيرة، أو الكبير للتجمعات العائلية.",
  },
  {
    Icon: CalendarIcon,
    num: "٢",
    title: "حدّد التاريخ المناسب",
    desc: "أخبرنا بيوم وصولك وعدد أفراد عائلتك لنتحقق من التوفر.",
  },
  {
    Icon: SendIcon,
    num: "٣",
    title: "تواصل عبر واتساب",
    desc: "أرسل لنا رسالة مباشرة وسنرد عليك خلال وقت قصير.",
  },
  {
    Icon: CheckCircleIcon,
    num: "٤",
    title: "تأكيد الحجز",
    desc: "نؤكد موعدك ونرسل لك كافة التفاصيل والاتجاهات. مرحباً بكم!",
  },
];

export default function BookingSteps() {
  return (
    <section className="py-14 lg:py-28 bg-sand-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10 lg:mb-20"
        >
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">
            كيف تحجز
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-charcoal mb-5">
            أربع خطوات، حجز مكتمل
          </h2>
          <span className="gold-divider mx-auto mb-6" />
          <p className="text-brown-400 text-lg max-w-md mx-auto leading-relaxed">
            لا تعقيد، لا انتظار — تواصل معنا عبر واتساب ونكمل الباقي فوراً.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop */}
          <div className="hidden lg:block absolute top-[2.2rem] right-[12.5%] left-[12.5%] h-px bg-gradient-to-l from-sand-200 via-gold-300/40 to-sand-200 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map(({ Icon, num, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                {/* Icon circle */}
                <div className="relative w-[4.5rem] h-[4.5rem] mx-auto mb-6">
                  <div className="w-full h-full rounded-full bg-white border border-sand-200 shadow-[0_2px_16px_rgba(201,168,76,0.12)] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold-500" />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold-400 flex items-center justify-center shadow-sm">
                    <span className="text-white text-[10px] font-bold leading-none">
                      {num}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-charcoal text-base mb-2 leading-snug">
                  {title}
                </h3>
                <p className="text-brown-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
