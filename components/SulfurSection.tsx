"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { waterImages } from "@/lib/site";

const benefits = [
  {
    icon: "🫧",
    title: "تنظيف طبيعي للجلد",
    desc: "المعادن الطبيعية في المياه الكبريتية تساعد على تلطيف الجلد وتنظيفه بشكل طبيعي.",
  },
  {
    icon: "🌊",
    title: "استرخاء عميق",
    desc: "حرارة المياه الطبيعية تمنح الجسم إحساساً بالدفء والراحة بعد يوم طويل.",
  },
  {
    icon: "💆",
    title: "هدوء ذهني",
    desc: "جلسة في الماء الطبيعي وسط النخيل تساعد على تصفية الذهن والاسترخاء.",
  },
  {
    icon: "🌿",
    title: "مياه طبيعية أصيلة",
    desc: "نبع طبيعي غني بالمعادن، بدون إضافات صناعية — تماماً كما أعطتنا إياه الأرض.",
  },
];

export default function SulfurSection() {
  return (
    <section id="sulfur" className="py-14 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Visual column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Decorative offset background */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl bg-teal-300/15 border border-teal-300/20" />

              {/* Main pool image */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_20px_60px_rgba(61,43,31,0.12)]">
                <Image
                  src={waterImages.pool}
                  alt="حوض المياه الكبريتية في أرياف زكي السالم"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                {/* Bottom gradient for the authentic sulfur badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Authentic sulfur water badge */}
                <div className="absolute bottom-0 right-0 left-0 p-5">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                    {/* Thumbnail of real sulfur water */}
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/20">
                      <Image
                        src={waterImages.sulfur}
                        alt="المياه الكبريتية الطبيعية"
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">
                        المياه الكبريتية الطبيعية
                      </p>
                      <p className="text-white/65 text-xs mt-0.5">
                        نبع حقيقي من باطن الأرض
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">
              التجربة الكبريتية
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl text-charcoal leading-tight mb-5">
              المياه الكبريتية
              <br />
              <span className="text-teal-500">سر الراحة والعافية</span>
            </h2>
            <span className="gold-divider mb-8" style={{ display: "block" }} />
            <p className="text-brown-400 text-lg leading-relaxed mb-5 lg:mb-10">
              تُعدّ المياه الكبريتية الطبيعية من أعرق الوسائل الترفيهية والعلاجية في التاريخ.
              في أرياف زكي السالم، نُحضرها إليك في فضاء خاص ومريح وسط نخيل الأحساء.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 p-5 bg-sand-50 rounded-2xl border border-sand-100"
                >
                  <span className="text-3xl flex-shrink-0">{b.icon}</span>
                  <div>
                    <div className="font-semibold text-charcoal text-sm mb-1">
                      {b.title}
                    </div>
                    <div className="text-xs text-brown-400 leading-relaxed">
                      {b.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
