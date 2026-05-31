"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { YOUTUBE_EMBED_URL, YOUTUBE_SHARE_URL, videoSection } from "@/lib/site";

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-14 lg:py-28 bg-charcoal overflow-hidden relative">
      {/* Subtle background texture using the poster image at very low opacity */}
      <div className="absolute inset-0">
        <Image
          src={videoSection.poster}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-10"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-charcoal/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 lg:mb-14"
        >
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">
            شاهد بنفسك
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-white mb-5">
            شاهد التجربة
          </h2>
          <span className="gold-divider mx-auto mb-6" />
          <p className="text-white/60 text-base max-w-md mx-auto leading-relaxed">
            جولة حقيقية داخل أرياف زكي السالم — الطبيعة، الهدوء، والمياه الكبريتية.
          </p>
        </motion.div>

        {/* Video player — portrait ratio for YouTube Shorts */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] border border-white/10">
            {/* 9:16 aspect ratio for Shorts */}
            <div className="relative" style={{ paddingBottom: "177.78%" }}>
              {!playing ? (
                /* Thumbnail + play overlay */
                <button
                  onClick={() => setPlaying(true)}
                  aria-label="تشغيل الفيديو"
                  className="absolute inset-0 w-full h-full group text-right"
                >
                  {/* Custom thumbnail */}
                  <Image
                    src="/image/chalets/video-thumbnail.jpg"
                    alt="شاهد تجربة المياه الكبريتية في أرياف زكي السالم"
                    fill
                    sizes="(max-width: 640px) 100vw, 384px"
                    className="object-cover object-center"
                  />

                  {/* Dark overlay — stronger at bottom for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-black/70" />

                  {/* Play button — centered */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm border border-white/35 flex items-center justify-center group-hover:bg-white/28 group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <svg
                        className="w-9 h-9 text-white translate-x-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Title + description — bottom of card */}
                  <div className="absolute bottom-0 right-0 left-0 px-5 pb-6 pt-10 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="font-serif text-base text-gold-300 font-semibold leading-snug mb-1">
                      شاهد تجربة المياه الكبريتية
                    </p>
                    <p className="text-white/70 text-xs leading-relaxed">
                      جولة سريعة داخل أرياف زكي السالم
                    </p>
                  </div>
                </button>
              ) : (
                /* Actual YouTube embed — only loads when user clicks play */
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`${YOUTUBE_EMBED_URL}&autoplay=1`}
                  title="أرياف زكي السالم للمياه الكبريتية"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Open in YouTube link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8"
        >
          <a
            href={YOUTUBE_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/50 hover:text-gold-400 text-sm transition-colors duration-200"
          >
            <YouTubeIcon />
            فتح في يوتيوب
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  );
}
