// src/components/sections/AboutSection.tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { NeubrutalCard } from "@/components/ui/NeubrutalCard";

const FACTS = [
  { emoji: "🎓", label: "Universitas", value: "Duta Bangsa Surakarta" },
  { emoji: "📍", label: "Lokasi", value: "Surakarta, Jawa Tengah" },
  { emoji: "💻", label: "Focus", value: "Web + IoT Development" },
  { emoji: "⚡", label: "Currently", value: "Building cool stuff" },
];

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 28 },
    },
  } as const;

  return (
    <section id="about" className="py-20 md:py-28 relative">
      {/* Section accent strip kiri */}
      <div
        className="
          absolute left-0 top-1/4 bottom-1/4 w-1
          bg-[var(--color-accent)]
          hidden lg:block
        "
      />

      <div className="section-container" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* --- Section Header --- */}
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-[var(--color-text-muted)]">
                01.
              </span>
              <div className="h-[2px] w-10 bg-[var(--color-border)]" />
              <span className="font-mono text-sm text-[var(--color-text-muted)]">
                about me
              </span>
            </div>
            <h2 className="neu-heading text-4xl md:text-5xl">
              Siapa{" "}
              <span className="relative inline-block">
                Saya?
                <motion.span
                  className="
                    absolute -bottom-1 left-0
                    h-[5px] bg-[var(--color-accent)]
                  "
                  initial={{ width: "0%" }}
                  animate={inView ? { width: "100%" } : { width: "0%" }}
                  transition={{ delay: 0.4, duration: 0.45, ease: "easeOut" }}
                />
              </span>
            </h2>
          </motion.div>

          {/* --- Content Grid --- */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            {/* Left: Bio text */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3 space-y-5"
            >
              <p className="font-body text-base md:text-lg text-[var(--color-text)] leading-relaxed">
                Saya adalah{" "}
                <strong className="font-bold font-mono text-[var(--color-text)] border-b-2 border-[var(--color-accent)]">
                  {"<JuniorFullStack />"}
                </strong>{" "}
                yang memiliki passion kuat di dunia{" "}
                <strong className="font-bold border-b-2 border-[#4361EE]">
                  IoT (Internet of Things)
                </strong>
                . Sebagai seorang Junior, saya berfokus pada penulisan kode yang dapat dirawat (<em>maintainable</em>) dan <em>problem-solving</em> yang terstruktur. Saat ini saya menempuh studi di Fakultas Ilmu Komputer, Universitas Duta Bangsa Surakarta.
              </p>

              <p className="font-body text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed">
                Meskipun berada di tahap awal karir profesional, saya terbiasa membangun solusi <em>end-to-end</em> — dari merancang RESTful API di{" "}
                <strong className="text-[var(--color-text)]">
                  Laravel
                </strong>
                , membuat UI interaktif dengan{" "}
                <strong className="text-[var(--color-text)]">
                  Next.js
                </strong>
                , hingga memprogram mikrokontroler{" "}
                <strong className="text-[var(--color-text)]">
                  ESP32
                </strong>{" "}
                untuk sistem <em>real-time monitoring</em>.
              </p>

              <p className="font-body text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed">
                Filosofi saya sederhana: kode yang baik harus bisa dipahami,
                dirawat, dan yang paling penting — menyelesaikan masalah nyata.
              </p>

              {/* Fun fact card */}
              <NeubrutalCard
                accent="yellow"
                hoverable={false}
                className="!bg-[var(--color-bg)]"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">💡</span>
                  <div>
                    <p className="font-bold text-sm text-[var(--color-text)] mb-1">
                      Fun Fact
                    </p>
                    <p className="font-body text-sm text-[var(--color-text-muted)] leading-relaxed">
                      Saya sering menulis kode sambil mendengarkan Musik, dan
                      percaya bahwa dokumentasi yang baik adalah bentuk empati
                      terhadap developer lain.
                    </p>
                  </div>
                </div>
              </NeubrutalCard>
            </motion.div>

            {/* Right: Facts grid */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
            >
              {FACTS.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  className="
                    flex items-center gap-4
                    border-2 border-[var(--color-border)]
                    bg-[var(--color-bg-alt)]
                    px-4 py-3.5 rounded-[4px]
                  "
                  style={{ boxShadow: "var(--neu-shadow-sm)" }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                  }
                  transition={{
                    delay: 0.3 + i * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 28,
                  }}
                  whileHover={{
                    x: 3,
                    y: 3,
                    boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color,0,0,0))",
                    transition: { type: "spring", stiffness: 500, damping: 25 },
                  }}
                >
                  <span className="text-2xl flex-shrink-0 w-8 text-center">
                    {fact.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-[var(--color-text-muted)] mb-0.5">
                      {fact.label}
                    </p>
                    <p className="font-body font-semibold text-sm text-[var(--color-text)] truncate">
                      {fact.value}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Download CV button */}
              <motion.a
                href="/cv.pdf"
                download
                className="
                  flex items-center justify-center gap-2
                  border-4 border-[var(--color-border)]
                  bg-[var(--color-accent)] text-[#0D0D0D]
                  px-4 py-3.5 rounded-[4px]
                  font-body font-bold text-sm
                  cursor-pointer
                "
                style={{ boxShadow: "var(--neu-shadow)" }}
                whileHover={{
                  x: 3,
                  y: 3,
                  boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color,0,0,0))",
                }}
                whileTap={{ scale: 0.97, x: 4, y: 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download CV
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
