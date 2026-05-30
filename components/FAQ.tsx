"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "هل الشاليه خاص لنا فقط؟",
    a: "نعم، كل شاليه محجوز بشكل حصري لمجموعتك فقط — لا يشاركك أحد المكان طوال فترة الإقامة. خصوصيتك التامة ضمانة أساسية لدينا.",
  },
  {
    q: "هل الشاليه مناسب للعائلات؟",
    a: "بالتأكيد. صُمِّمت شاليهاتنا خصيصاً للعائلات في بيئة هادئة وآمنة بعيدة عن الازدحام، مع مساحات مريحة تلائم جميع الأعمار من الكبير إلى الصغير.",
  },
  {
    q: "ما الفرق بين الشاليه الصغير والكبير؟",
    a: "الشاليه الصغير يستوعب حتى ٨ أفراد ويضم غرفتي نوم وحوضاً كبريتياً خاصاً. الشاليه الكبير يستوعب حتى ٢٠ فردًا ويضم أربع غرف نوم ومجلساً عربياً وحوضاً أوسع — مثالي للتجمعات العائلية.",
  },
  {
    q: "هل الحجز يتم مباشرةً من الموقع؟",
    a: "الحجز يتم عبر واتساب. يمكنك ملء نموذج الحجز في الصفحة وسيُفتح واتساب تلقائياً برسالتك كاملة — ما عليك إلا الضغط على إرسال وسنتولى الباقي.",
  },
  {
    q: "هل يمكن الحجز عبر واتساب مباشرةً؟",
    a: "نعم، واتساب هو قناتنا الرئيسية للحجز والتواصل. راسلنا على الرقم +966567717401 بالتاريخ ونوع الشاليه وسنساعدك في إتمام حجزك فوراً.",
  },
  {
    q: "كيف أعرف هل المواعيد متاحة؟",
    a: "أرسل لنا رسالة واتساب بالتاريخ الذي تريده، وسنرد خلال ساعات العمل بتأكيد التوفر المتاح. يُنصح بالحجز المسبق قبل ٢٤ ساعة على الأقل لضمان موعدك.",
  },
  {
    q: "متى يتم تأكيد الحجز؟",
    a: "يُؤكَّد الحجز فور التحقق من التوفر والاتفاق على الموعد عبر واتساب. ستتلقى رسالة تأكيد تحتوي على كافة التفاصيل والاتجاهات لموقعنا.",
  },
  {
    q: "هل يوجد دفع إلكتروني؟",
    a: "حالياً يتم الدفع عند الوصول أو عبر التحويل البنكي بعد تأكيد الحجز. نعمل على إضافة خيارات الدفع الإلكتروني قريباً لمزيد من الراحة.",
  },
  {
    q: "ما طبيعة المياه الكبريتية في الشاليهات؟",
    a: "المياه الكبريتية نبع طبيعي من باطن الأرض، غني بالمعادن، ويُعدّ الاستجمام بها تجربة استرخاء طبيعية مميزة. لا تُعدّ بديلاً عن الاستشارة الطبية، وننصح بمراجعة طبيبك في الحالات الصحية الخاصة.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-14 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 lg:mb-16"
        >
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">
            الأسئلة الشائعة
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-charcoal mb-5">
            كل ما تحتاج معرفته
          </h2>
          <span className="gold-divider mx-auto mb-5" />
          <p className="text-brown-400 text-base max-w-md mx-auto leading-relaxed">
            أجوبة واضحة وصريحة على أكثر ما يسأل عنه ضيوفنا.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="border border-sand-100 rounded-2xl overflow-hidden bg-sand-50 hover:border-gold-300/40 transition-colors duration-200"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-5 text-right gap-4"
              >
                <span className="font-semibold text-charcoal text-sm sm:text-base leading-snug">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.22 }}
                  className="text-gold-400 text-2xl font-light flex-shrink-0"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5">
                      <div className="h-px bg-sand-200 mb-4" />
                      <div className="flex gap-3">
                        <span className="w-0.5 flex-shrink-0 bg-gold-400/60 rounded-full self-stretch" />
                        <p className="text-brown-400 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
