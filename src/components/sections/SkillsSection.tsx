// src/components/sections/SkillsSection.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// ============================================================
//  DATA
// ============================================================
type SkillLevel = "Proficient" | "Capable" | "Familiar" | "Exploring";

interface Skill {
  name: string;
  level: SkillLevel;
  accent: string; // warna badge
  icon?: string; // emoji / teks ikon (fallback)
  logo?: string; // path ke logo asli (.svg / .png)
}

interface SkillCategory {
  title: string;
  emoji: string;
  accent: string; // warna strip atas card kategori
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Backend & Database",
    emoji: "⚙️",
    accent: "#4361EE",
    skills: [
      {
        name: "Laravel",
        level: "Proficient",
        accent: "#FF2D20",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg?",
      },
      {
        name: "PHP Native",
        level: "Proficient",
        accent: "#777BB4",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg?",
      },
      {
        name: "MySQL",
        level: "Capable",
        accent: "#4479A1",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg?",
      },
      {
        name: "Supabase",
        level: "Familiar",
        accent: "#3ECF8E",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg?",
      },
      { name: "REST API", level: "Capable", accent: "#4361EE", icon: "🔗" },
    ],
  },
  {
    title: "Frontend & Styling",
    emoji: "🎨",
    accent: "#FF6B9D",
    skills: [
      {
        name: "React",
        level: "Capable",
        accent: "#61DAFB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg?",
      },
      {
        name: "Next.js",
        level: "Capable",
        accent: "#000000",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg?",
      },
      {
        name: "Tailwind CSS",
        level: "Proficient",
        accent: "#06B6D4",
        logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg?",
      },
      {
        name: "React Native",
        level: "Familiar",
        accent: "#61DAFB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg?",
      },
      {
        name: "TypeScript",
        level: "Familiar",
        accent: "#3178C6",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg?",
      },
    ],
  },
  {
    title: "IoT & Hardware",
    emoji: "🔌",
    accent: "#06D6A0",
    skills: [
      {
        name: "ESP32",
        level: "Capable",
        accent: "#E7352C",
        logo: "/images/logos/espressif.svg",
      },
      {
        name: "ESP8266",
        level: "Capable",
        accent: "#FFD60A",
        logo: "/images/logos/espressif.svg",
      },
      {
        name: "C++",
        level: "Familiar",
        accent: "#00599C",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg?",
      },
      {
        name: "Blynk IoT",
        level: "Capable",
        accent: "#4361EE",
        logo: "/images/logos/blynk.png",
      },
      {
        name: "Otomasi Sistem",
        level: "Familiar",
        accent: "#06D6A0",
        icon: "🤖",
      },
    ],
  },
  {
    title: "Tools & Workflow",
    emoji: "🛠️",
    accent: "#FFD60A",
    skills: [
      {
        name: "Git & GitHub",
        level: "Capable",
        accent: "#181717",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg?",
      },
      {
        name: "Figma",
        level: "Familiar",
        accent: "#F24E1E",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg?",
      },
      {
        name: "VS Code",
        level: "Proficient",
        accent: "#007ACC",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg?",
      },
      {
        name: "Postman",
        level: "Capable",
        accent: "#FF6C37",
        logo: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg?",
      },
      {
        name: "Arduino IDE",
        level: "Capable",
        accent: "#FCC624",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg?",
      },
    ],
  },
];

const LEVEL_CONFIG: Record<
  SkillLevel,
  { label: string; color: string; bars: number }
> = {
  Proficient: { label: "Proficient", color: "#06D6A0", bars: 4 },
  Capable: { label: "Capable", color: "#4361EE", bars: 3 },
  Familiar: { label: "Familiar", color: "#FFD60A", bars: 2 },
  Exploring: { label: "Exploring", color: "#FF6B9D", bars: 1 },
};

// ============================================================
//  SUB-COMPONENTS
// ============================================================

/** Indikator level berbentuk 4 bar vertikal */
function LevelBars({ level }: { level: SkillLevel }) {
  const { color, bars } = LEVEL_CONFIG[level];
  return (
    <div className="flex items-end gap-[3px]">
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[4px] rounded-[1px]"
          style={{
            height: `${8 + i * 3}px`,
            backgroundColor: i < bars ? color : "var(--color-border)",
            opacity: i < bars ? 1 : 0.25,
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            delay: 0.05 * i,
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
        />
      ))}
    </div>
  );
}

/** Badge individual skill */
function SkillBadge({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      className="
        group flex items-center gap-2.5
        border-2 border-[var(--color-border)]
        bg-[var(--color-bg)]
        px-3 py-2.5 rounded-[4px]
        cursor-default select-none
      "
      style={{ boxShadow: "var(--neu-shadow-sm)" }}
      // Stagger: muncul dari bawah
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 350,
            damping: 24,
            delay: index * 0.07,
          },
        },
      }}
      // Hover spring
      whileHover={{
        x: 3,
        y: 3,
        boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color,0,0,0))",
        transition: { type: "spring", stiffness: 500, damping: 25 },
      }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Accent dot warna skill */}
      <span
        className="w-2 h-2 rounded-full flex-shrink-0 border border-[var(--color-border)]"
        style={{ backgroundColor: skill.accent }}
      />

      {/* Nama skill */}
      <div className="flex items-center gap-1.5 flex-1 min-w-0">
        {skill.logo ? (
          <div className="relative w-5 h-5 flex-shrink-0">
            <Image
              src={skill.logo}
              alt={skill.name}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          skill.icon && <span className="text-[13px]">{skill.icon}</span>
        )}
        <span className="font-body font-semibold text-sm text-[var(--color-text)] truncate">
          {skill.name}
        </span>
      </div>

      {/* Level bars */}
      <LevelBars level={skill.level} />
    </motion.div>
  );
}

/** Card satu kategori skill */
function SkillCategoryCard({
  category,
  catIndex,
}: {
  category: SkillCategory;
  catIndex: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="
        relative overflow-hidden
        border-4 border-[var(--color-border)]
        bg-[var(--color-bg-alt)]
        rounded-[4px] p-5
        flex flex-col gap-4
      "
      style={{ boxShadow: "var(--neu-shadow)" }}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 26,
        delay: catIndex * 0.1,
      }}
    >
      {/* Accent strip atas */}
      <div
        className="absolute top-0 left-0 right-0 h-[5px]"
        style={{ backgroundColor: category.accent }}
      />

      {/* Header kategori */}
      <div className="flex items-center gap-3 pt-1">
        <span
          className="
            text-xl w-10 h-10 flex items-center justify-center
            border-2 border-[var(--color-border)]
            bg-[var(--color-bg)] rounded-[4px]
            flex-shrink-0
          "
          style={{ boxShadow: "var(--neu-shadow-sm)" }}
        >
          {category.emoji}
        </span>
        <h3 className="font-display font-black text-base text-[var(--color-text)] leading-tight">
          {category.title}
        </h3>
      </div>

      {/* Divider */}
      <div className="h-[2px] bg-[var(--color-border)] opacity-30" />

      {/* Skills list dengan staggerChildren */}
      <motion.div
        className="flex flex-col gap-2.5"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0 } },
        }}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {category.skills.map((skill, i) => (
          <SkillBadge key={skill.name} skill={skill} index={i} />
        ))}
      </motion.div>

      {/* Footer: jumlah skill */}
      <div
        className="
        mt-auto pt-1
        flex items-center justify-between
        border-t-2 border-[var(--color-border)] border-opacity-20
      "
      >
        <span className="font-mono text-xs text-[var(--color-text-muted)]">
          {category.skills.length} skills
        </span>
        {/* Legend level */}
        <div className="flex items-center gap-2">
          {(["Proficient", "Capable", "Familiar"] as SkillLevel[]).map(
            (lvl) => (
              <div key={lvl} className="flex items-center gap-1">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: LEVEL_CONFIG[lvl].color }}
                />
                <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                  {lvl.charAt(0)}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </motion.div>
  );
}

/** Ticker marquee technology scroll */
const MARQUEE_ITEMS = [
  "PHP",
  "Laravel",
  "MySQL",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "ESP32",
  "ESP8266",
  "C++",
  "Blynk",
  "Git",
  "Supabase",
  "React Native",
  "Figma",
  "REST API",
  "Linux",
];

function TechMarquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]; // duplikat untuk seamless loop

  return (
    <div
      className="
        relative overflow-hidden
        border-y-2 border-[var(--color-border)]
        bg-[var(--color-accent)] dark:bg-[var(--color-bg-alt)]
        py-3
      "
    >
      <motion.div
        className="flex gap-6 whitespace-nowrap w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="
              inline-flex items-center gap-2
              font-mono font-bold text-sm
              text-[#0D0D0D] dark:text-[var(--color-text)]
              px-4 py-1
              border-2 border-[#0D0D0D] dark:border-[var(--color-border)]
              bg-white dark:bg-[var(--color-bg)]
              rounded-[3px]
              flex-shrink-0
            "
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D0D0D] dark:bg-[var(--color-border)]" />
            {item}
          </span>
        ))}
      </motion.div>

      {/* Fade edge kiri & kanan */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--color-accent)] dark:from-[var(--color-bg-alt)] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--color-accent)] dark:from-[var(--color-bg-alt)] to-transparent pointer-events-none" />
    </div>
  );
}

// ============================================================
//  MAIN SECTION EXPORT
// ============================================================
export function SkillsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="skills" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background blobs dekoratif */}
      <div
        className="
          absolute top-0 right-0
          w-72 h-72 rounded-full
          bg-[#4361EE] opacity-[0.04]
          translate-x-1/2 -translate-y-1/2
          pointer-events-none
        "
      />
      <div
        className="
          absolute bottom-0 left-0
          w-56 h-56 rounded-full
          bg-[#FF6B9D] opacity-[0.04]
          -translate-x-1/2 translate-y-1/2
          pointer-events-none
        "
      />

      <div className="section-container space-y-12">
        {/* ---- Section Header ---- */}
        <motion.div
          ref={headerRef}
          className="space-y-3"
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-[var(--color-text-muted)]">
              02.
            </span>
            <div className="h-[2px] w-10 bg-[var(--color-border)]" />
            <span className="font-mono text-sm text-[var(--color-text-muted)]">
              tech stack & skills
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="neu-heading text-4xl md:text-5xl">
              Senjata{" "}
              <span className="relative inline-block">
                Andalan
                <motion.span
                  className="absolute -bottom-1 left-0 h-[5px] bg-[var(--color-accent)]"
                  initial={{ width: "0%" }}
                  animate={headerInView ? { width: "100%" } : { width: "0%" }}
                  transition={{ delay: 0.35, duration: 0.45, ease: "easeOut" }}
                />
              </span>
            </h2>

            {/* Legend level bar */}
            <motion.div
              className="
                flex flex-wrap items-center gap-x-4 gap-y-2
                border-2 border-[var(--color-border)]
                bg-[var(--color-bg-alt)]
                px-4 py-2 rounded-[4px] self-start sm:self-auto
              "
              style={{ boxShadow: "var(--neu-shadow-sm)" }}
              initial={{ opacity: 0, x: 20 }}
              animate={
                headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
              }
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 300,
                damping: 28,
              }}
            >
              <span className="font-mono text-[11px] text-[var(--color-text-muted)] font-bold w-full sm:w-auto">
                Level:
              </span>
              {(
                Object.entries(LEVEL_CONFIG) as [
                  SkillLevel,
                  (typeof LEVEL_CONFIG)[SkillLevel],
                ][]
              ).map(([key, val]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: val.color }}
                  />
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
                    {val.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.p
            className="font-body text-base text-[var(--color-text-muted)] max-w-xl"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            Teknologi yang saya gunakan sehari-hari untuk membangun web app
            modern dan sistem IoT yang handal.
          </motion.p>
        </motion.div>

        {/* ---- Tech Marquee Ticker ---- */}
        <TechMarquee />

        {/* ---- Skills Grid (2 kolom desktop, 1 kolom mobile) ---- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCategoryCard key={cat.title} category={cat} catIndex={i} />
          ))}
        </div>

        {/* ---- Currently Learning Banner ---- */}
        <CurrentlyLearningBanner />
      </div>
    </section>
  );
}

/** Banner "Currently Learning" di bagian bawah skills */
function CurrentlyLearningBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const items = [
    { name: "Docker", icon: "🐳" },
    { name: "Prisma ORM", icon: "◭" },
    { name: "Redis", icon: "🔴" },
    { name: "tRPC", icon: "🔷" },
  ];

  return (
    <motion.div
      ref={ref}
      className="
        relative overflow-hidden
        border-4 border-[var(--color-border)]
        bg-[var(--color-bg-alt)]
        rounded-[4px] p-5
        flex flex-col sm:flex-row items-start sm:items-center gap-5
      "
      style={{ boxShadow: "var(--neu-shadow-lg)" }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
    >
      {/* Accent strip */}
      <div className="absolute top-0 left-0 right-0 h-[5px] bg-[#FF6B9D]" />

      {/* Label */}
      <div className="flex items-center gap-3 flex-shrink-0 pt-1">
        <motion.span
          className="text-2xl"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          🌱
        </motion.span>
        <div>
          <p className="font-display font-black text-sm text-[var(--color-text)]">
            Currently Learning
          </p>
          <p className="font-mono text-xs text-[var(--color-text-muted)]">
            always growing
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-[2px] self-stretch bg-[var(--color-border)] opacity-30" />
      <div className="sm:hidden h-[2px] w-full bg-[var(--color-border)] opacity-30" />

      {/* Learning items */}
      <div className="flex flex-wrap gap-3">
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            className="
              flex items-center gap-2
              border-2 border-[var(--color-border)]
              bg-[var(--color-bg)]
              px-3 py-1.5 rounded-[4px]
              font-body font-semibold text-sm
              text-[var(--color-text)]
            "
            style={{ boxShadow: "var(--neu-shadow-sm)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{
              delay: 0.2 + i * 0.08,
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            whileHover={{
              x: 2,
              y: 2,
              boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color,0,0,0))",
              transition: { type: "spring", stiffness: 500, damping: 25 },
            }}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
            {/* Blinking dot = sedang dipelajari */}
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#FF6B9D] flex-shrink-0"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
