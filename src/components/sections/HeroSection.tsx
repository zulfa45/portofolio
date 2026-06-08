// src/components/sections/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { NeubrutalButton } from "@/components/ui/NeubrutalButton";
import Image from "next/image";

// --- Decorative floating logos ---
function FloatingLogo({
  src,
  alt,
  className,
  delay = 0,
  duration = 3,
}: {
  src: string;
  alt: string;
  className: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none flex items-center justify-center p-2 md:p-3 border-2 md:border-4 border-[var(--color-border)] bg-[var(--color-bg-alt)] rounded-[4px] ${className}`}
      style={{ boxShadow: "var(--neu-shadow)" }}
      animate={{ y: [0, -15, 0], rotate: [-8, 8, -8] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-contain filter drop-shadow-sm"
        />
      </div>
    </motion.div>
  );
}

// --- Animated text reveal ---
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 28 },
  },
} as const;

// --- Typewriter role badge ---
const ROLES = [
  "<JuniorFullStack />",
  "junior.iot_enthusiast",
  "Junior { Laravel } Dev",
  "Junior [ Next.js ] Builder",
  "Junior Web Designer",
];

function RoleBadge() {
  return (
    <motion.div
      className="
        inline-flex items-center gap-2
        border-2 border-[var(--color-border)]
        bg-[var(--color-bg-alt)]
        px-4 py-2 rounded-[4px]
        font-mono text-sm font-bold
        text-[var(--color-text)]
      "
      style={{ boxShadow: "var(--neu-shadow-sm)" }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
    >
      {/* Blinking cursor dot */}
      <motion.span
        className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] flex-shrink-0"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <RoleTypewriter roles={ROLES} />
    </motion.div>
  );
}

function RoleTypewriter({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80,
      );
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i: number) => (i + 1) % roles.length);
      }, 400);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, roles]);

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="ml-0.5 inline-block w-[2px] h-[1em] bg-[var(--color-text)] align-middle"
      />
    </span>
  );
}

export function HeroSection() {
  const { scrollY } = useScroll();
  // Parallax ringan: konten naik sedikit saat scroll
  const y = useTransform(scrollY, [0, 400], [0, -60]);

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden"
    >
      {/* ===== BACKGROUND DECORATIONS ===== */}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-text) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-text) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating decorative logos */}
      <FloatingLogo
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg?"
        alt="VS Code"
        delay={0}
        duration={4}
        className="top-20 right-[10%] w-14 h-14 md:w-20 md:h-20"
      />
      <FloatingLogo
        src="https://cdn.simpleicons.org/arduino/00979D"
        alt="Arduino IDE"
        delay={0.6}
        duration={3.5}
        className="top-[45%] right-[5%] w-12 h-12 md:w-16 md:h-16"
      />
      <FloatingLogo
        src="https://cdn.simpleicons.org/laravel/FF2D20"
        alt="Laravel"
        delay={1.2}
        duration={5}
        className="bottom-24 right-[12%] w-14 h-14 md:w-18 md:h-18"
      />
      <FloatingLogo
        src="https://cdn.simpleicons.org/react/61DAFB"
        alt="React"
        delay={0.3}
        duration={4.5}
        className="bottom-20 left-[8%] w-12 h-12 md:w-16 md:h-16"
      />
      <FloatingLogo
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg?"
        alt="Figma"
        delay={0.9}
        duration={4}
        className="top-[15%] left-[5%] w-10 h-10 md:w-14 md:h-14"
      />

      {/* Large background accent circle */}
      <motion.div
        className="
          absolute -top-32 -left-32
          w-[400px] h-[400px] md:w-[600px] md:h-[600px]
          rounded-full
          bg-[var(--color-accent)]
          opacity-[0.07] dark:opacity-[0.05]
          pointer-events-none
        "
        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ===== MAIN CONTENT ===== */}
      <motion.div
        className="section-container relative z-10 py-16 md:py-24"
        style={{ y }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* --- LEFT: Text Content --- */}
          <motion.div
            className="flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Role badge */}
            <motion.div variants={itemVariants}>
              <RoleBadge />
            </motion.div>

            {/* Greeting + Name */}
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="font-body text-lg font-semibold text-[var(--color-text-muted)]">
                Halo, saya 👋
              </p>
              <h1 className="neu-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
                Muhammad
                <br />
                <span className="relative inline-block">
                  Zulfa
                  {/* Highlight underline */}
                  <motion.span
                    className="
                      absolute -bottom-1 left-0
                      h-[6px] md:h-[8px]
                      bg-[var(--color-accent)]
                    "
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
                  />
                </span>{" "}
                Zaidan.
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="font-body text-base md:text-lg text-[var(--color-text-muted)] max-w-md leading-relaxed"
            >
              Mahasiswa{" "}
              <span
                className="
                font-bold text-[var(--color-text)]
                border-b-2 border-[var(--color-accent)]
              "
              >
                Ilmu Komputer
              </span>{" "}
              dengan fundamental solid. Menulis <code className="font-mono bg-[var(--color-border)] text-[var(--color-bg)] px-1 py-0.5 rounded text-sm">clean_code</code> untuk web app modern dan merancang arsitektur sistem IoT berbasis ESP32.
            </motion.p>

            {/* Stats chips */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
            >
              {[
                { label: "projects.count()", desc: "> 4" },
                { label: "tech_stack.length", desc: "> 5" },
                { label: "hardware.type", desc: '"IoT"' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="
                    flex flex-col items-center justify-center
                    border-2 border-[var(--color-border)]
                    bg-[var(--color-bg-alt)]
                    px-4 py-2.5 rounded-[4px]
                  "
                  style={{ boxShadow: "var(--neu-shadow-sm)" }}
                >
                  <span className="font-mono font-bold text-sm text-[var(--color-text)]">
                    {stat.label}
                  </span>
                  <span className="font-mono text-sm text-[var(--color-text-muted)] font-medium">
                    {stat.desc}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 pt-2"
            >
              <NeubrutalButton href="#projects" variant="primary" size="lg">
                Lihat Projects →
              </NeubrutalButton>
              <NeubrutalButton href="#contact" variant="secondary" size="lg">
                Contact Me
              </NeubrutalButton>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 pt-1"
            >
              <span className="font-body text-sm text-[var(--color-text-muted)] font-medium">
                Find me on:
              </span>
              {[
                {
                  label: "GitHub",
                  href: "https://github.com/zulfa45",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  ),
                },

              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="
                    w-9 h-9 flex items-center justify-center
                    border-2 border-[var(--color-border)]
                    bg-[var(--color-bg-alt)]
                    rounded-[4px]
                    text-[var(--color-text)]
                    hover:bg-[var(--color-accent)]
                    transition-colors duration-150
                  "
                  style={{ boxShadow: "var(--neu-shadow-sm)" }}
                  whileHover={{
                    x: 2,
                    y: 2,
                    boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color,0,0,0))",
                  }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* --- RIGHT: Profile Picture --- */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 28,
              delay: 0.4,
            }}
          >
            <div className="relative">
              {/* Decorative outer frame (bergeser sedikit) */}
              <div
                className="
                  absolute inset-0
                  border-4 border-[var(--color-border)]
                  rounded-[8px]
                  translate-x-4 translate-y-4
                  bg-[var(--color-accent)]
                "
              />

              {/* Profile picture frame — sedikit miring saat load */}
              <motion.div
                className="
                  relative z-10
                  w-64 h-64 md:w-80 md:h-80
                  border-4 border-[var(--color-border)]
                  rounded-[8px]
                  overflow-hidden
                  bg-[var(--color-bg-alt)]
                "
                style={{ boxShadow: "var(--neu-shadow-lg)" }}
                initial={{ rotate: -6, scale: 0.9, opacity: 0 }}
                animate={{ rotate: -3, scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.5,
                }}
                whileHover={{ rotate: 0, scale: 1.02 }}
              >
                {/* Placeholder avatar — ganti dengan <Image> saat foto tersedia */}
                <div
                  className="
                  w-full h-full
                  flex flex-col items-center justify-center gap-3
                  bg-gradient-to-br from-[var(--color-bg-alt)] to-[var(--color-bg)]
                "
                >
                  <div
                    className="
                    w-24 h-24 rounded-full
                    border-4 border-[var(--color-border)]
                    bg-[var(--color-accent)]
                    flex items-center justify-center
                    font-display font-black text-3xl text-[#0D0D0D]
                  "
                  >
                    ZZ
                  </div>
                  <p className="font-mono text-xs text-[var(--color-text-muted)] text-center px-4">
                    {"// Ganti dengan foto profil Anda"}
                  </p>
                </div>

                <Image
                  src="/images/profile.png"
                  alt="Muhammad Zulfa Zaidan Nafi'"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </motion.div>

              {/* Badge floating di atas frame */}
              <motion.div
                className="
                  absolute -top-4 -right-4 z-20
                  border-2 border-[var(--color-border)]
                  bg-[#FFD60A] text-[#0D0D0D]
                  px-3 py-1.5 rounded-[4px]
                  font-mono font-bold text-xs
                  whitespace-nowrap
                "
                style={{ boxShadow: "var(--neu-shadow-sm)" }}
                initial={{ opacity: 0, scale: 0, rotate: 12 }}
                animate={{ opacity: 1, scale: 1, rotate: 12 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 18,
                  delay: 0.9,
                }}
              >
                {"<Status status=\"OpenToWork\" />"}
              </motion.div>

              {/* Badge bawah */}
              <motion.div
                className="
                  absolute -bottom-4 -left-4 z-20
                  border-2 border-[var(--color-border)]
                  bg-[#4361EE] text-white
                  px-3 py-1.5 rounded-[4px]
                  font-mono font-bold text-xs
                  whitespace-nowrap
                "
                style={{ boxShadow: "var(--neu-shadow-sm)" }}
                initial={{ opacity: 0, scale: 0, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -8 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 18,
                  delay: 1.1,
                }}
              >
                FIKOM UDB 🎓
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ===== SCROLL INDICATOR ===== */}
        <motion.div
          className="
            absolute bottom-8 left-1/2 -translate-x-1/2
            flex flex-col items-center gap-1
            text-[var(--color-text-muted)]
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="font-mono text-xs">scroll down</span>
          <motion.div
            className="w-[2px] h-8 bg-[var(--color-border)] rounded-full origin-top"
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
