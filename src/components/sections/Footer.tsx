// src/components/sections/Footer.tsx
"use client";

import { motion } from "framer-motion";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/zulfa45",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },

  {
    label: "Email",
    href: "mailto:zulfazaidan8@gmail.com",
    icon: (
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
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/jullpaaaaaaa",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { href: "#hero",     label: "Home"     },
  { href: "#about",    label: "About"    },
  { href: "#skills",   label: "Skills"   },
  { href: "#projects", label: "Projects" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative overflow-hidden">

      {/* ---- Contact CTA Banner ---- */}
      <div
        className="
          border-t-4 border-[var(--color-border)]
          bg-[var(--color-accent)]
        "
      >
        <div className="section-container py-16 md:py-20">
          <motion.div
            className="
              flex flex-col lg:flex-row
              items-start lg:items-center
              justify-between gap-8
            "
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
          >
            <div className="space-y-3 max-w-lg">
              {/* Label */}
              <div className="flex items-center gap-3">
                <div className="h-[3px] w-8 bg-[#0D0D0D]" />
                <span className="font-mono text-sm font-bold text-[#0D0D0D]">
                  04. contact
                </span>
              </div>

              <h2
                className="font-display font-black text-4xl md:text-5xl text-[#0D0D0D] leading-[1.05]"
              >
                Punya Ide{" "}
                <span className="
                  relative inline-block
                  border-b-[5px] border-[#0D0D0D]
                ">
                  Keren?
                </span>
                <br />
                Mari Ngobrol! 💬
              </h2>

              <p className="font-body text-base text-[#3D3D3D] leading-relaxed">
                Saya terbuka untuk peluang freelance, kolaborasi proyek, atau
                sekadar berdiskusi soal tech dan IoT. Jangan ragu untuk reach out!
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                href="mailto:zulfazaidan8@gmail.com"
                className="
                  flex items-center justify-center gap-2
                  font-body font-bold text-base
                  px-6 py-3.5 rounded-[4px]
                  border-4 border-[#0D0D0D]
                  bg-[#0D0D0D] text-[var(--color-accent)]
                  whitespace-nowrap
                "
                style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.4)" }}
                whileHover={{
                  x: 3, y: 3,
                  boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                zulfazaidan8@gmail.com
              </motion.a>

            </div>
          </motion.div>
        </div>
      </div>

      {/* ---- Footer Bottom Bar ---- */}
      <div
        className="
          border-t-4 border-[var(--color-border)]
          bg-[var(--color-bg-alt)]
        "
      >
        <div className="section-container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Logo + Nav */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Brand */}
              <motion.a
                href="#"
                className="
                  font-display font-black text-lg tracking-tight
                  text-[#0D0D0D]
                  px-3 py-1
                  border-2 border-[var(--color-border)]
                  bg-[var(--color-accent)]
                  rounded-[4px]
                "
                style={{ boxShadow: "var(--neu-shadow-sm)" }}
                whileHover={{
                  x: 2, y: 2,
                  boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color,0,0,0))",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                M.Zulfa
              </motion.a>

              {/* Nav links */}
              <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 justify-center">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="
                      font-body text-sm font-semibold
                      text-[var(--color-text-muted)]
                      hover:text-[var(--color-text)]
                      transition-colors duration-150
                      border-b-2 border-transparent
                      hover:border-[var(--color-accent)]
                    "
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={social.label}
                  className="
                    w-9 h-9 flex items-center justify-center
                    border-2 border-[var(--color-border)]
                    bg-[var(--color-bg)]
                    rounded-[4px]
                    text-[var(--color-text)]
                    hover:bg-[var(--color-accent)]
                    transition-colors duration-150
                  "
                  style={{ boxShadow: "var(--neu-shadow-sm)" }}
                  whileHover={{
                    x: 2, y: 2,
                    boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color,0,0,0))",
                  }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 h-[2px] bg-[var(--color-border)] opacity-20" />

          {/* Copyright + credit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <p className="font-mono text-xs text-[var(--color-text-muted)]">
              © {year}{" "}
              <span className="font-bold text-[var(--color-text)]">
                Muhammad Zulfa Zaidan Nafi&apos;
              </span>
              . All rights reserved.
            </p>
            <p className="font-mono text-xs text-[var(--color-text-muted)]">
              Built with{" "}
              <span className="text-[var(--color-text)] font-bold">Next.js</span>
              {" "}+{" "}
              <span className="text-[var(--color-text)] font-bold">Tailwind</span>
              {" "}+{" "}
              <span className="text-[var(--color-text)] font-bold">Framer Motion</span>
              {" "}⚡
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}