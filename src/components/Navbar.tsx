// src/components/Navbar.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NeubrutalButton } from "./ui/NeubrutalButton";

// --- Icons sebagai komponen kecil ---
const SunIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// --- Nav Links ---
const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hindari hydration mismatch — tampilkan toggle setelah mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Deteksi scroll untuk efek border bawah navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu mobile saat layar diperbesar
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <>
      {/* ====== NAVBAR ====== */}
      <motion.nav
        className={`
          fixed top-0 left-0 right-0 z-50
          bg-[var(--color-bg)]
          transition-all duration-300
          ${
            scrolled
              ? "border-b-4 border-[var(--color-border)] shadow-[0_4px_0_0_var(--color-border)]"
              : "border-b-0"
          }
        `}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* --- Logo / Brand --- */}
            <motion.a
              href="#"
              className="
                font-display font-black text-xl tracking-tight
                text-[#0D0D0D]
                px-3 py-1
                border-2 border-[var(--color-border)]
                bg-[var(--color-accent)]
                rounded-[4px]
                select-none
              "
              whileHover={{
                x: 2,
                y: 2,
                boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color, 0,0,0))",
              }}
              style={{ boxShadow: "var(--neu-shadow-sm)" }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              M.Zulfa
            </motion.a>

            {/* --- Desktop Nav Links --- */}
            <ul className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.07,
                    type: "spring",
                    stiffness: 400,
                  }}
                >
                  <motion.a
                    href={link.href}
                    className="
                      font-body font-semibold text-sm
                      px-4 py-2 rounded-[4px]
                      text-[var(--color-text)]
                      hover:bg-[var(--color-accent)]
                      transition-colors duration-150
                      border-2 border-transparent
                      hover:border-[var(--color-border)]
                    "
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>

            {/* --- Right: Theme Toggle + CTA --- */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle Button */}
              {mounted ? (
                <motion.button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="
                    w-10 h-10 flex items-center justify-center
                    border-2 border-[var(--color-border)]
                    bg-[var(--color-bg-alt)]
                    rounded-[4px]
                    text-[var(--color-text)]
                    cursor-pointer
                    relative overflow-hidden
                  "
                  style={{ boxShadow: "var(--neu-shadow-sm)" }}
                  whileHover={{
                    x: 2,
                    y: 2,
                    boxShadow:
                      "0px 0px 0px 0px rgb(var(--shadow-color, 0,0,0))",
                  }}
                  whileTap={{ scale: 0.92, x: 2, y: 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <AnimatePresence mode="wait">
                    {isDark ? (
                      <motion.span
                        key="sun"
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <SunIcon />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="moon"
                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MoonIcon />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ) : (
                // Skeleton placeholder agar tidak layout shift
                <div className="w-10 h-10 border-2 border-[var(--color-border)] rounded-[4px] bg-[var(--color-bg-alt)]" />
              )}

              {/* CTA Button — Desktop only */}
              <div className="hidden md:block">
                <NeubrutalButton href="#contact" variant="primary" size="sm">
                  Hire Me →
                </NeubrutalButton>
              </div>

              {/* Hamburger — Mobile only */}
              <motion.button
                className="
                  md:hidden w-10 h-10
                  flex items-center justify-center
                  border-2 border-[var(--color-border)]
                  bg-[var(--color-bg-alt)]
                  rounded-[4px] cursor-pointer
                  text-[var(--color-text)]
                "
                style={{ boxShadow: "var(--neu-shadow-sm)" }}
                onClick={() => setMenuOpen((v) => !v)}
                whileTap={{ scale: 0.92, x: 2, y: 2 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 45, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <CloseIcon />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -45, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <MenuIcon />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ====== MOBILE MENU DRAWER ====== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="
              fixed top-16 left-0 right-0 z-40
              bg-[var(--color-bg)]
              border-b-4 border-[var(--color-border)]
              shadow-[0_8px_0_0_var(--color-border)]
              md:hidden
            "
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="
                    font-body font-semibold text-base
                    px-4 py-3 rounded-[4px]
                    text-[var(--color-text)]
                    border-2 border-transparent
                    hover:bg-[var(--color-accent)]
                    hover:border-[var(--color-border)]
                    transition-colors duration-150
                  "
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.06,
                    type: "spring",
                    stiffness: 400,
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}

              {/* CTA di mobile */}
              <div className="mt-2 pt-3 border-t-2 border-[var(--color-border)]">
                <NeubrutalButton
                  href="#contact"
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => setMenuOpen(false)}
                >
                  Hire Me →
                </NeubrutalButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer agar konten tidak tertutup navbar */}
      <div className="h-16" />
    </>
  );
}
