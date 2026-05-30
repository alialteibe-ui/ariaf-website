"use client";

import { motion } from "framer-motion";
import { WHATSAPP_URL, WHATSAPP_GREETING } from "@/lib/site";
import {
  CoffeeIcon,
  PawPrintIcon,
  ShoppingBagIcon,
  SparkleIcon,
  LeafIcon,
  ShoppingCartIcon,
  WhatsAppIcon,
} from "@/components/icons";

const features = [
  {
    Icon: CoffeeIcon,
    title: "مطاعم وكافيهات",
    desc: "جلسات ومذاق متنوع وسط أجواء المزرعة الهادئة.",
  },
  {
    Icon: PawPrintIcon,
    title: "حديقة حيوانات مصغرة",
    desc: "تجربة ممتعة ومحببة للأطفال والعائلات.",
  },
  {
    Icon: ShoppingBagIcon,
    title: "منتجات أحسائية",
    desc: "تمور، عسل، حلويات ومنتجات محلية أصيلة.",
  },
  {
    Icon: SparkleIcon,
    title: "ألعاب أطفال",
    desc: "مساحة مخصصة وآمنة للصغار ضمن أجواء عائلية.",
  },
  {
    Icon: LeafIcon,
    title: "مساحات خضراء",
    desc: "جلسات مفتوحة واستراحة بين أحضان الطبيعة.",
  },
  {
    Icon: ShoppingCartIcon,
    title: "هايبر ماركت",
    desc: "خضار، فواكه ومواد غذائية لخدمة الزوار.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function FarmSection() {
  return (
    <section className="py-14 lg:py-24 bg-sand-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10 lg:mb-16"
        >
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">
            وجهة عائلية متكاملة
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-5 leading-snug">
            أكثر من شاليه…
            <br className="hidden sm:block" />
            <span className="text-palm-600"> وجهة عائلية متكاملة</span>
          </h2>
          <span className="gold-divider mx-auto mb-6" />
          <p className="text-brown-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            داخل أرياف زكي السالم، تنتظرك مزرعة عامة مفتوحة تضم مطاعم وكافيهات،
            محلات منتجات أحسائية، حديقة حيوانات مصغرة، ألعاب أطفال،
            مساحات خضراء وهايبر ماركت — والدخول إلى المزرعة العامة مجاني.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {features.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="group bg-white rounded-2xl p-5 border border-sand-100 hover:border-palm-400/30 shadow-[0_2px_16px_rgba(61,43,31,0.04)] hover:shadow-[0_6px_28px_rgba(61,43,31,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-sand-50 border border-sand-100 group-hover:bg-palm-600/8 group-hover:border-palm-400/25 flex items-center justify-center mb-3 transition-colors duration-300">
                <Icon className="w-5 h-5 text-palm-600 group-hover:text-palm-500 transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-charcoal text-sm mb-1.5 leading-snug">
                {title}
              </h3>
              <p className="text-brown-400 text-xs leading-relaxed hidden sm:block">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Free entry note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-palm-600/8 border border-palm-500/20 rounded-full px-5 py-2.5 text-center">
            <span className="w-1.5 h-1.5 rounded-full bg-palm-500 flex-shrink-0" />
            <p className="text-palm-600 text-xs font-medium leading-relaxed">
              الدخول إلى المزرعة العامة مجاني — بعض الخدمات داخلها قد تكون برسوم حسب النشاط أو المتجر.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <a
            href={`${WHATSAPP_URL}?text=${WHATSAPP_GREETING}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-palm-600 hover:bg-palm-500 text-white font-semibold text-sm px-7 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            احجز شاليهك واستمتع بيوم عائلي كامل
          </a>
        </motion.div>

      </div>
    </section>
  );
}
