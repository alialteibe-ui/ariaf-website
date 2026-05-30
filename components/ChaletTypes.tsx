"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WHATSAPP_URL, chaletImages } from "@/lib/site";

const chalets = [
  {
    type: "small",
    name: "الشاليه الصغير",
    subtitle: "مثالي للعائلات الصغيرة",
    capacity: "حتى ٨ أفراد",
    imageSrc: chaletImages.small,
    imageAlt: "الشاليه الصغير — حوض المياه والحديقة",
    features: [
      "حوض مياه كبريتية خاص",
      "غرفتان نوم مريحتان",
      "مطبخ مجهز بالكامل",
      "جلسة خارجية في الهواء الطلق",
      "حمامان",
      "حديقة صغيرة خاصة",
    ],
    tagColor: "bg-teal-300/20 text-teal-500",
    accentColor: "border-teal-400",
    ctaBg: "bg-teal-500 hover:bg-teal-400",
    count: "٨ شاليهات متاحة",
    featured: false,
  },
  {
    type: "large",
    name: "الشاليه الكبير",
    subtitle: "للعائلات الكبيرة والتجمعات",
    capacity: "حتى ٢٠ فردًا",
    imageSrc: chaletImages.large,
    imageAlt: "الشاليه الكبير — منطقة الاسترخاء والحوض الواسع",
    features: [
      "حوض مياه كبريتية واسع",
      "أربع غرف نوم فاخرة",
      "مطبخ احترافي كبير",
      "جلسات خارجية متعددة",
      "ثلاثة حمامات",
      "مجلس عربي أصيل",
    ],
    tagColor: "bg-gold-300/20 text-gold-500",
    accentColor: "border-gold-400",
    ctaBg: "bg-gold-500 hover:bg-gold-400",
    count: "٢ شاليهات متاحة",
    featured: true,
  },
];

export default function ChaletTypes() {
  return (
    <section id="chalets" className="py-14 lg:py-28 bg-sand-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 lg:mb-20"
        >
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">
            شاليهاتنا
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-charcoal mb-5">
            اختر ما يناسب عائلتك
          </h2>
          <span className="gold-divider mx-auto mb-6" />
          <p className="text-brown-400 text-lg max-w-xl mx-auto leading-relaxed">
            لدينا نوعان من الشاليهات — كلاهما مستقل وخاص، مزود بالمياه
            الكبريتية الطبيعية.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {chalets.map((chalet, i) => (
            <motion.div
              key={chalet.type}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`card-lift relative bg-white rounded-3xl overflow-hidden border-2 ${chalet.accentColor} shadow-[0_4px_30px_rgba(61,43,31,0.07)] ${chalet.featured ? "lg:-mt-4 lg:mb-4" : ""}`}
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${chalet.featured ? "h-72" : "h-64"}`}>
                <Image
                  src={chalet.imageSrc}
                  alt={chalet.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                {/* Subtle overlay for warmth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {chalet.featured && (
                  <div className="absolute top-4 right-4 bg-gold-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    الأكثر طلباً
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-2xl text-charcoal mb-1">
                      {chalet.name}
                    </h3>
                    <p className="text-brown-400 text-sm">{chalet.subtitle}</p>
                  </div>
                  <span
                    className={`${chalet.tagColor} text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0`}
                  >
                    {chalet.capacity}
                  </span>
                </div>

                <div className="mb-2 text-xs text-brown-400/60 font-medium">
                  {chalet.count}
                </div>
                <div className="h-px bg-sand-100 mb-6" />

                {/* Features */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {chalet.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-charcoal"
                    >
                      <span className="text-gold-400 text-base flex-shrink-0">
                        ✦
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(`مرحباً، أود الاستفسار عن ${chalet.name} في أرياف زكي السالم للمياه الكبريتية`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 ${chalet.ctaBg} text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm`}
                >
                  <WhatsAppIcon />
                  احجز {chalet.name}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
