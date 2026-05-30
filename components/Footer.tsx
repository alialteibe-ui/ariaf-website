"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { WHATSAPP_URL, WHATSAPP_NUMBER, WHATSAPP_GREETING } from "@/lib/site";
import {
  WhatsAppIcon,
  InstagramIcon,
  TwitterXIcon,
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
} from "@/components/icons";

const navLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "تجربتنا", href: "#experience" },
  { label: "الشاليهات", href: "#chalets" },
  { label: "المياه الكبريتية", href: "#sulfur" },
  { label: "الحجز", href: "#booking" },
];

const WA_HREF = `${WHATSAPP_URL}?text=${WHATSAPP_GREETING}`;

export default function Footer() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer id="contact" className="bg-sand-200">
      {/* Final CTA banner */}
      <div className="bg-palm-600 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl text-white mb-4 leading-snug">
              جاهز لتجربة لا تُنسى؟
            </h2>
            <p className="text-white/65 text-base mb-8 leading-relaxed">
              تواصل معنا الآن واحجز مكانك في أجواء الأحساء الهادئة.
            </p>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white text-palm-600 font-bold text-base px-8 py-4 rounded-2xl hover:bg-sand-50 transition-all duration-300 shadow-lg hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-5 h-5 text-palm-600" />
              احجز عبر واتساب
            </a>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="font-serif text-xl text-charcoal mb-1">
              أرياف زكي السالم
            </div>
            <div className="text-xs text-gold-500 font-semibold tracking-widest mb-5">
              للمياه الكبريتية
            </div>
            <p className="text-brown-400 text-sm leading-relaxed mb-6">
              شاليهات خاصة بمياه كبريتية طبيعية في الأحساء — تجربة
              عائلية راقية في قلب الطبيعة.
            </p>
            <div className="flex items-center gap-2.5">
              <SocialBtn href={WA_HREF} label="واتساب" bg="bg-palm-600 hover:bg-palm-500">
                <WhatsAppIcon className="w-4 h-4 text-white" />
              </SocialBtn>
              <SocialBtn href="#" label="إنستغرام" bg="bg-sand-300 hover:bg-gold-300">
                <InstagramIcon className="w-4 h-4 text-charcoal" />
              </SocialBtn>
              <SocialBtn href="#" label="X / تويتر" bg="bg-sand-300 hover:bg-gold-300">
                <TwitterXIcon className="w-4 h-4 text-charcoal" />
              </SocialBtn>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="font-semibold text-charcoal text-sm mb-5">
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-brown-400 text-sm hover:text-gold-500 transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-charcoal text-sm mb-5">
              تواصل معنا
            </h4>
            <div className="space-y-4">
              <ContactRow Icon={MapPinIcon} label="الموقع">
                <span className="text-sm text-brown-400">
                  الأحساء، المملكة العربية السعودية
                </span>
              </ContactRow>
              <ContactRow Icon={PhoneIcon} label="واتساب">
                <a
                  href={WA_HREF}
                  className="text-sm text-brown-400 hover:text-gold-500 transition-colors"
                >
                  +{WHATSAPP_NUMBER}
                </a>
              </ContactRow>
              <ContactRow Icon={ClockIcon} label="ساعات الرد">
                <span className="text-sm text-brown-400">
                  ٨ صباحاً — ١٠ مساءً يومياً
                </span>
              </ContactRow>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-sand-300 mt-12 mb-5" />

        {/* Legal links */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-5 text-xs text-brown-400/55">
          <Link href="/privacy"        className="hover:text-gold-500 transition-colors duration-200">سياسة الخصوصية</Link>
          <span className="text-sand-300">·</span>
          <Link href="/terms"          className="hover:text-gold-500 transition-colors duration-200">الشروط والأحكام</Link>
          <span className="text-sand-300">·</span>
          <Link href="/booking-policy" className="hover:text-gold-500 transition-colors duration-200">سياسة الحجز</Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brown-400/50">
          <p>
            © {new Date().getFullYear()} أرياف زكي السالم للمياه الكبريتية.
            جميع الحقوق محفوظة.
          </p>
          <p>صُمِّم بعناية واهتمام</p>
        </div>
      </div>
    </footer>
  );
}

function SocialBtn({
  href,
  label,
  bg,
  children,
}: {
  href: string;
  label: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center transition-colors duration-200`}
    >
      {children}
    </a>
  );
}

function ContactRow({
  Icon,
  label,
  children,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-lg bg-sand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-gold-500" />
      </div>
      <div>
        <div className="text-xs font-semibold text-charcoal mb-0.5">{label}</div>
        {children}
      </div>
    </div>
  );
}
