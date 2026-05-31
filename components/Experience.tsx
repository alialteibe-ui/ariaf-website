"use client";

import { motion } from "framer-motion";
import {
  ShieldIcon,
  DropletIcon,
  LeafIcon,
  UsersIcon,
  SparkleIcon,
  MessageCircleIcon,
} from "@/components/icons";

const benefits = [
  {
    Icon: ShieldIcon,
    title: "خصوصية كاملة",
    desc: "كل شاليه مخصص لك ولعائلتك وحدكم — لا يشاركك أحد المكان طوال فترة الإقامة.",
  },
  {
    Icon: DropletIcon,
    title: "مياه كبريتية طبيعية",
    desc: "نبع طبيعي من باطن الأرض يصل مباشرةً إلى شاليهك، غني بالمعادن الأصيلة.",
  },
  {
    Icon: LeafIcon,
    title: "طبيعة الأحساء الهادئة",
    desc: "وسط النخيل والهواء النقي، بعيداً عن ضوضاء المدينة — أجواء تعيد الروح.",
  },
  {
    Icon: UsersIcon,
    title: "بيئة عائلية راقية",
    desc: "مساحة آمنة وهادئة تلائم جميع أفراد الأسرة — من الصغير إلى الكبير.",
  },
  {
    Icon: SparkleIcon,
    title: "تجربة لا تُنسى",
    desc: "فضاء يجمع بين الطبيعة والراحة والتصميم الأصيل — فارق تشعر به من اللحظة الأولى.",
  },
  {
    Icon: MessageCircleIcon,
    title: "حجز مباشر وسريع",
    desc: "تواصل معنا عبر واتساب، وسنؤكد حجزك في دقائق دون تعقيد.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="py-10 lg:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-7 lg:mb-20"
        >
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">
            لماذا أرياف زكي السالم
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-charcoal mb-5">
            تجربة لا تشبهها تجربة
          </h2>
          <span className="gold-divider mx-auto mb-6" />
          <p className="text-brown-400 text-lg max-w-lg mx-auto leading-relaxed">
            خصوصية كاملة، أجواء هادئة، ومياه طبيعية — كل شيء مصمم
            ليمنحك راحة حقيقية بعيداً عن صخب الحياة.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
        >
          {benefits.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group bg-white rounded-2xl p-4 sm:p-8 border border-sand-100 hover:border-gold-300/40 shadow-[0_2px_20px_rgba(61,43,31,0.04)] hover:shadow-[0_8px_36px_rgba(61,43,31,0.08)] hover:-translate-y-0.5 transition-all duration-350"
            >
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-sand-50 border border-sand-100 flex items-center justify-center mb-3 sm:mb-6 group-hover:bg-gold-300/10 group-hover:border-gold-300/30 transition-colors duration-300">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500" />
              </div>
              <h3 className="font-semibold text-sm sm:text-lg text-charcoal mb-1.5 sm:mb-3 leading-snug">
                {title}
              </h3>
              <p className="text-brown-400 leading-relaxed text-xs sm:text-sm">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
