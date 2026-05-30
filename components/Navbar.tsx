"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_URL, WHATSAPP_GREETING } from "@/lib/site";
import { WhatsAppIcon, XIcon } from "@/components/icons";

const WHATSAPP_HREF = `${WHATSAPP_URL}?text=${WHATSAPP_GREETING}`;

const navLinks = [
  { label: "الرئيسية",      href: "#home" },
  { label: "التجربة",       href: "#experience" },
  { label: "الشاليهات",    href: "#chalets" },
  { label: "المياه الكبريتية", href: "#sulfur" },
  { label: "الحجز",         href: "#booking" },
  { label: "تواصل معنا",   href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ivory/96 backdrop-blur-md shadow-[0_1px_24px_rgba(61,43,31,0.07)] border-b border-sand-200/70"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">

          {/* Logo */}
          <button onClick={() => handleNav("#home")} className="text-right group">
            <div
              className={`font-serif text-lg leading-tight transition-colors duration-300 group-hover:text-gold-400 ${
                scrolled ? "text-charcoal" : "text-white"
              }`}
            >
              أرياف زكي السالم
            </div>
            <div
              className={`text-[11px] tracking-widest font-medium transition-colors duration-300 ${
                scrolled ? "text-gold-400" : "text-gold-300"
              }`}
            >
              للمياه الكبريتية
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`text-sm font-medium transition-colors duration-200 relative group ${
                  scrolled
                    ? "text-brown-600 hover:text-gold-500"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-[-2px] right-0 w-0 h-[1px] group-hover:w-full transition-all duration-300 ${
                    scrolled ? "bg-gold-400" : "bg-white/60"
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${
                scrolled
                  ? "bg-palm-600 hover:bg-palm-500 text-white"
                  : "bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-sm"
              }`}
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              احجز الآن
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center"
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {menuOpen ? (
              <XIcon className={`w-5 h-5 ${scrolled ? "text-charcoal" : "text-white"}`} />
            ) : (
              <HamburgerIcon scrolled={scrolled} />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="fixed top-20 right-0 left-0 z-40 bg-ivory/97 backdrop-blur-md shadow-lg border-t border-sand-100"
          >
            <div className="flex flex-col px-6 py-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-right text-base font-medium text-charcoal hover:text-gold-500 py-3.5 border-b border-sand-100 last:border-none transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 bg-palm-600 hover:bg-palm-500 text-white font-semibold py-3.5 rounded-xl transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                احجز الآن عبر واتساب
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HamburgerIcon({ scrolled }: { scrolled: boolean }) {
  const color = scrolled ? "bg-charcoal" : "bg-white";
  return (
    <div className="flex flex-col gap-[5px] w-5">
      <span className={`block w-5 h-[1.5px] ${color} rounded-full transition-colors duration-300`} />
      <span className={`block w-4 h-[1.5px] ${color} rounded-full transition-colors duration-300`} />
      <span className={`block w-5 h-[1.5px] ${color} rounded-full transition-colors duration-300`} />
    </div>
  );
}
