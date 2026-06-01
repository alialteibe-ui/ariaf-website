"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WHATSAPP_URL, WHATSAPP_GREETING } from "@/lib/site";
import { WhatsAppIcon } from "@/components/icons";

const photos = [
  { src: "/image/farm/farm-crowd-01.png",    label: "حركة وزوار",      hero: true  },
  { src: "/image/farm/farm-crowd-02.png",    label: "أجواء المزرعة"             },
  { src: "/image/farm/farm-water.png",       label: "المياه الكبريتية"          },
  { src: "/image/farm/farm-green-area.png",  label: "مساحات خضراء"             },
  { src: "/image/farm/farm-green-area1.png", label: "الحديقة الخضراء"           },
  { src: "/image/farm/farm-green-area2.png", label: "إطلالة عامة"              },
  { src: "/image/farm/farm-kids-play.png",   label: "ألعاب أطفال"              },
  { src: "/image/farm/farm-kids-play2.png",  label: "مساحة الأطفال"            },
  { src: "/image/farm/farm-family-walk.png", label: "زيارة عائلية"             },
];

export default function FarmSection() {
  const heroPhoto  = photos[0];
  const gridPhotos = photos.slice(1);

  return (
    <section className="py-14 lg:py-24 bg-sand-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10 lg:mb-14"
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
            داخل أرياف زكي السالم، تبدأ التجربة من أجواء المزرعة قبل الشاليه؛ مياه كبريتية،
            شاليهات خاصة، مساحات خضراء، مطاعم وكافيهات، محلات تجارية، ألعاب أطفال،
            ومرافق عائلية تجعل الزيارة يومًا كاملًا في قلب الطبيعة.
          </p>
        </motion.div>

        {/* Photo grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Hero photo — full width */}
          <div className="relative rounded-3xl overflow-hidden mb-3 h-52 sm:h-72 lg:h-80 shadow-[0_4px_28px_rgba(61,43,31,0.10)]">
            <Image
              src={heroPhoto.src}
              alt={heroPhoto.label}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <span className="absolute bottom-4 right-5 text-white text-sm font-semibold drop-shadow-md">
              {heroPhoto.label}
            </span>
          </div>

          {/* Grid of 8 photos — 2-col mobile, 4-col desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {gridPhotos.map(({ src, label }, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_2px_14px_rgba(61,43,31,0.07)]"
              >
                <Image
                  src={src}
                  alt={label}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 right-3 text-white text-xs font-medium drop-shadow leading-tight">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Free entry note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-8 mb-7"
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
          transition={{ duration: 0.5, delay: 0.3 }}
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
