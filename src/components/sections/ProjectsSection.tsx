// src/components/sections/ProjectsSection.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { NeubrutalButton } from "@/components/ui/NeubrutalButton";
import Image from "next/image";

// ============================================================
//  DATA
// ============================================================
type ProjectCategory = "All" | "Web" | "IoT" | "Mobile" | "UI/UX";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: ProjectCategory[];
  accent: string;
  accentText: string;
  image: string;
  status: "Completed" | "In Progress" | "Prototype";
  featured?: boolean;
  links?: {
    demo?: string;
    github?: string;
    figma?: string;
  };
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Game Remi 41",
    subtitle: "Flutter Mobile Game",
    description:
      "Aplikasi mobile permainan kartu Remi 41 tradisional. Dibangun menggunakan framework Flutter dan Dart, mengimplementasikan logika permainan kartu yang kompleks, perhitungan skor otomatis, dan antarmuka interaktif yang mulus untuk perangkat mobile.",
    tags: ["Flutter", "Dart", "Mobile App", "Game Development"],
    category: ["Mobile"],
    accent: "#FF6B9D",
    accentText: "#0D0D0D",
    image: "/images/projects/project-1.jpg",
    status: "Completed",
    featured: true,
    links: { github: "https://github.com/zulfa45" },
  },
  {
    id: 2,
    title: "Spektrum Multi Grafika",
    subtitle: "Web App Percetakan Online",
    description:
      "Platform pemesanan jasa percetakan online berbasis Laravel. Fitur meliputi manajemen produk, kalkulasi harga otomatis, upload file desain, sistem pembayaran, dan dashboard admin untuk tracking order.",
    tags: ["Laravel", "MySQL", "Blade", "Bootstrap", "Midtrans", "tailwindcss"],
    category: ["Web"],
    accent: "#4361EE",
    accentText: "#FFFFFF",
    image: "/images/projects/project-2.jpg",
    status: "Completed",
    featured: true,
    links: {
      github:
        "https://github.com/zulfa45/Sistem-Pemesanan-Percetakan---Laravel.git",
    },
  },
  {
    id: 3,
    title: "Sistem Monitoring Bendungan",
    subtitle: "IoT Real-time Monitoring",
    description:
      "Sistem otomasi monitoring ketinggian air bendungan berbasis ESP32. Data sensor dikirim ke platform Blynk secara real-time. Dilengkapi alert otomatis via notifikasi ketika level air mencapai batas kritis.",
    tags: ["ESP32", "C++", "Blynk IoT", "Sensor Ultrasonik", "WiFi"],
    category: ["IoT"],
    accent: "#06D6A0",
    accentText: "#0D0D0D",
    image: "/images/projects/project-3.jpg",
    status: "Prototype",
    featured: true,
    links: { github: "https://github.com" },
  },
  {
    id: 4,
    title: "Web Desa Kelor & UMKM",
    subtitle: "Pemetaan Interaktif Desa",
    description:
      "Website profil desa lengkap dengan fitur pemetaan UMKM interaktif menggunakan integrasi Google Maps API. Warga bisa melihat lokasi dan info usaha sekitar.",
    tags: ["Google Maps API", "jQuery", "Bootstrap"],
    category: ["Web"],
    accent: "#FFD60A",
    accentText: "#0D0D0D",
    image: "/images/projects/project-4.jpg",
    status: "Completed",
    links: { github: "https://github.com/zulfa45/web-desa.git" },
  },
  {
    id: 5,
    title: "UI/UX Design ZZZ Music",
    subtitle: "Aplikasi Streaming Musik",
    description:
      "Prototype aplikasi streaming musik dengan fitur playlist, pencarian lagu, dan pemutar audio. Dibangun menggunakan Figma untuk desain UI/UX",
    tags: ["Figma", "UI/UX Design", "Prototype"],
    category: ["UI/UX"],
    accent: "#ff370a",
    accentText: "#0D0D0D",
    image: "/images/projects/project-5.jpg",
    status: "Completed",
    links: {
      figma:
        "https://www.figma.com/proto/86M5z328KItpTnANNoqOIg/Zzz-Music-Desain?page-id=0%3A1&type=design&node-id=29-2584&viewport=885%2C277%2C0.07&t=Ne1xJxh0Yf69A6f9-1&scaling=min-zoom&starting-point-node-id=3%3A808",
    },
  },
  {
    id: 6,
    title: "Gates of Olympus Simulator",
    subtitle: "Educational Algorithm Engine",
    description:
      "Simulasi probabilitas 1:1 murni untuk edukasi Computer Science. Mendemonstrasikan sistem RNG (Weighted Probability), logika runtuhan matriks 2D (Cascade), sinkronisasi AJAX, dan fitur Admin CMS untuk merekayasa tingkat kemenangan (God Mode). Disclaimer: Dilarang keras untuk perjudian.",
    tags: ["PHP Native", "Vanilla JS", "Algorithm", "AJAX", "Math"],
    category: ["Web"],
    accent: "#FFD60A",
    accentText: "#0D0D0D",
    image: "/images/projects/project-6.jpg",
    status: "Completed",
    featured: true,
    links: { github: "https://github.com/zulfa45/olympus-algorithm-simulator" },
  },
];

const CATEGORIES: ProjectCategory[] = ["All", "Web", "Mobile", "IoT", "UI/UX"];

const STATUS_CONFIG = {
  Completed: { color: "#06D6A0", dot: "#06D6A0", label: "Completed" },
  "In Progress": { color: "#FFD60A", dot: "#FFD60A", label: "In Progress" },
  Prototype: { color: "#FF6B9D", dot: "#FF6B9D", label: "Prototype" },
};

// ============================================================
//  PROJECT IMAGE
// ============================================================
function ProjectImage({
  src,
  accent,
  title,
}: {
  src: string;
  accent: string;
  title: string;
}) {
  const [error, setError] = useState(false);

  return (
    <div
      className="
        w-full h-48 md:h-56 relative overflow-hidden
        border-b-4 border-[var(--color-border)]
        bg-[var(--color-bg-alt)]
      "
    >
      {!error ? (
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setError(true)}
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center gap-3"
          style={{ backgroundColor: accent + "22" }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(${accent} 1px, transparent 1px),
                                linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <span className="text-4xl relative z-10">🖼️</span>
          <span
            className="
              relative z-10
              font-mono text-[10px] font-bold px-2 py-1
              border border-[var(--color-border)]
              bg-[var(--color-bg)] text-[var(--color-text-muted)]
              rounded-[2px]
            "
          >
            {`// image_not_found: ${title.toLowerCase().replace(/\s+/g, "_")}`}
          </span>
        </div>
      )}

      {/* Overlay gradient untuk estetika Neubrutalism */}
      <div className="absolute inset-0 pointer-events-none border-inset border-2 border-black/5" />
    </div>
  );
}

// ============================================================
//  PROJECT CARD
// ============================================================
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      className="
        group relative flex flex-col
        border-4 border-[var(--color-border)]
        bg-[var(--color-bg-alt)]
        rounded-[4px] overflow-hidden
      "
      style={{ boxShadow: "var(--neu-shadow-lg)" }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 26,
        delay: index * 0.1,
      }}
      whileHover={{
        x: 5,
        y: 5,
        boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color,0,0,0))",
        transition: { type: "spring", stiffness: 400, damping: 22 },
      }}
    >
      {/* ---- Gambar Project ---- */}
      <ProjectImage
        src={project.image}
        accent={project.accent}
        title={project.title}
      />

      {/* ---- Body ---- */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Header: status + featured badge */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* Status */}
          <div className="flex items-center gap-1.5">
            <motion.span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: STATUS_CONFIG[project.status].dot }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span className="font-mono text-[11px] font-bold text-[var(--color-text-muted)]">
              {STATUS_CONFIG[project.status].label}
            </span>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <span
              className="
                font-mono text-[10px] font-bold px-2 py-0.5
                border-2 border-[var(--color-border)]
                rounded-[2px]
              "
              style={{
                backgroundColor: project.accent,
                color: project.accentText,
              }}
            >
              ★ Featured
            </span>
          )}
        </div>

        {/* Title + subtitle */}
        <div>
          <h3 className="font-display font-black text-lg leading-tight text-[var(--color-text)]">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-[var(--color-text-muted)] mt-0.5">
            {project.subtitle}
          </p>
        </div>

        {/* Deskripsi */}
        <p className="font-body text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tags teknologi */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="
                font-mono text-[11px] font-bold px-2 py-0.5
                border-2 border-[var(--color-border)]
                bg-[var(--color-bg)]
                text-[var(--color-text)]
                rounded-[2px]
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-[2px] bg-[var(--color-border)] opacity-20" />

        {/* Links */}
        <div className="flex items-center gap-2">
          {project.links?.demo && (
            <motion.a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="
                flex items-center gap-1.5
                font-body font-bold text-xs
                px-3 py-1.5 rounded-[3px]
                border-2 border-[var(--color-border)]
                text-[var(--color-text)]
              "
              style={{
                backgroundColor: project.accent,
                color: project.accentText,
                boxShadow: "var(--neu-shadow-sm)",
              }}
              whileHover={{
                x: 2,
                y: 2,
                boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color,0,0,0))",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </motion.a>
          )}

          {project.links?.github && (
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="
                flex items-center gap-1.5
                font-body font-bold text-xs
                px-3 py-1.5 rounded-[3px]
                border-2 border-[var(--color-border)]
                bg-[var(--color-bg)] text-[var(--color-text)]
              "
              style={{ boxShadow: "var(--neu-shadow-sm)" }}
              whileHover={{
                x: 2,
                y: 2,
                boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color,0,0,0))",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </motion.a>
          )}

          {project.links?.figma && (
            <motion.a
              href={project.links.figma}
              target="_blank"
              rel="noreferrer"
              className="
                flex items-center gap-1.5
                font-body font-bold text-xs
                px-3 py-1.5 rounded-[3px]
                border-2 border-[var(--color-border)]
                bg-[#F24E1E] text-white
              "
              style={{ boxShadow: "var(--neu-shadow-sm)" }}
              whileHover={{
                x: 2,
                y: 2,
                boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color,0,0,0))",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 38 57"
                fill="currentColor"
              >
                <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
                <path d="M0 47.5a9.5 9.5 0 0 1 9.5-9.5H19v9.5a9.5 9.5 0 1 1-19 0z" />
                <path d="M19 19v19H9.5a9.5 9.5 0 1 1 0-19H19z" />
                <path d="M0 9.5a9.5 9.5 0 0 1 9.5-9.5H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" />
                <path d="M19 0h9.5a9.5 9.5 0 1 1 0 19H19V0z" />
              </svg>
              Figma Design
            </motion.a>
          )}

          {/* Placeholder jika tidak ada link */}
          {!project.links?.demo &&
            !project.links?.github &&
            !project.links?.figma && (
              <span className="font-mono text-xs text-[var(--color-text-muted)] italic">
                Link coming soon...
              </span>
            )}
        </div>
      </div>
    </motion.article>
  );
}

// ============================================================
//  FILTER TAB
// ============================================================
function FilterTab({
  label,
  active,
  onClick,
  count,
}: {
  label: ProjectCategory;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="
        relative flex items-center gap-2
        font-body font-bold text-sm
        px-4 py-2 rounded-[4px]
        border-2 border-[var(--color-border)]
        cursor-pointer select-none
        transition-colors duration-100
      "
      style={{
        backgroundColor: active ? "var(--color-accent)" : "var(--color-bg-alt)",
        color: "var(--color-text)",
        boxShadow: active ? "var(--neu-shadow)" : "var(--neu-shadow-sm)",
      }}
      whileHover={{
        x: active ? 3 : 2,
        y: active ? 3 : 2,
        boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color,0,0,0))",
        transition: { type: "spring", stiffness: 500, damping: 25 },
      }}
      whileTap={{ scale: 0.96 }}
    >
      {label}
      <span
        className="
          font-mono text-[10px] font-black
          w-5 h-5 flex items-center justify-center
          border border-[var(--color-border)]
          rounded-[2px]
        "
        style={{
          backgroundColor: active ? "var(--color-text)" : "var(--color-bg)",
          color: active ? "var(--color-bg)" : "var(--color-text)",
        }}
      >
        {count}
      </span>
    </motion.button>
  );
}

// ============================================================
//  MAIN EXPORT
// ============================================================
export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category.includes(activeFilter));

  const countFor = (cat: ProjectCategory) =>
    cat === "All"
      ? PROJECTS.length
      : PROJECTS.filter((p) => p.category.includes(cat)).length;

  return (
    <section id="projects" className="py-20 md:py-28 relative overflow-hidden">
      {/* Dekorasi background */}
      <div
        className="
          absolute inset-0 pointer-events-none
          opacity-[0.025] dark:opacity-[0.04]
        "
        style={{
          backgroundImage: `radial-gradient(var(--color-text) 1.5px, transparent 1.5px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="section-container space-y-10 relative z-10">
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
              03.
            </span>
            <div className="h-[2px] w-10 bg-[var(--color-border)]" />
            <span className="font-mono text-sm text-[var(--color-text-muted)]">
              portfolio
            </span>
          </div>

          <h2 className="neu-heading text-4xl md:text-5xl">
            Yang Sudah{" "}
            <span className="relative inline-block">
              Saya Bangun
              <motion.span
                className="absolute -bottom-1 left-0 h-[5px] bg-[var(--color-accent)]"
                initial={{ width: "0%" }}
                animate={headerInView ? { width: "100%" } : { width: "0%" }}
                transition={{ delay: 0.35, duration: 0.45, ease: "easeOut" }}
              />
            </span>
          </h2>

          <p className="font-body text-base text-[var(--color-text-muted)] max-w-xl">
            Kumpulan proyek pilihan — dari web app full-stack hingga sistem IoT
            berbasis mikrokontroler yang berjalan di dunia nyata.
          </p>
        </motion.div>

        {/* ---- Filter Tabs ---- */}
        <motion.div
          className="flex flex-wrap gap-2.5"
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 300,
            damping: 28,
          }}
        >
          {CATEGORIES.map((cat) => (
            <FilterTab
              key={cat}
              label={cat}
              active={activeFilter === cat}
              onClick={() => setActiveFilter(cat)}
              count={countFor(cat)}
            />
          ))}
        </motion.div>

        {/* ---- Projects Grid ---- */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ---- CTA: More on GitHub ---- */}
        <motion.div
          className="
            flex flex-col sm:flex-row items-center justify-between gap-5
            border-4 border-[var(--color-border)]
            bg-[var(--color-bg-alt)]
            rounded-[4px] p-6
          "
          style={{ boxShadow: "var(--neu-shadow-lg)" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
        >
          <div>
            <h3 className="font-display font-black text-xl text-[var(--color-text)]">
              Mau lihat lebih banyak?
            </h3>
            <p className="font-body text-sm text-[var(--color-text-muted)] mt-1">
              Semua proyek dan eksperimen ada di GitHub saya.
            </p>
          </div>
          <NeubrutalButton
            href="https://github.com/zulfa45"
            variant="primary"
            size="md"
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            }
          >
            Lihat GitHub
          </NeubrutalButton>
        </motion.div>
      </div>
    </section>
  );
}
