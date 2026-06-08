// src/components/ui/NeubrutalCard.tsx
"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

type CardAccent = "yellow" | "green" | "pink" | "blue" | "none";

interface NeubrutalCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  accent?: CardAccent; // Warna strip aksen di atas card
  hoverable?: boolean; // Aktifkan animasi hover spring
  className?: string;
  padding?: "sm" | "md" | "lg" | "none";
  initialAnimation?: boolean; // Animasi masuk dari bawah saat mount
}

const accentColors: Record<CardAccent, string> = {
  yellow: "#FFD60A",
  green: "#06D6A0",
  pink: "#FF6B9D",
  blue: "#4361EE",
  none: "transparent",
};

const paddingStyles = {
  none: "p-0",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

export function NeubrutalCard({
  children,
  accent = "none",
  hoverable = true,
  className = "",
  padding = "md",
  initialAnimation = false,
  ...motionProps
}: NeubrutalCardProps) {
  const hoverProps = hoverable
    ? {
        whileHover: {
          x: 4,
          y: 4,
          boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color, 0,0,0))",
          transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 20,
          },
        },
        whileTap: {
          x: 5,
          y: 5,
          boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color, 0,0,0))",
          scale: 0.995,
        },
      }
    : {};

  const initProps = initialAnimation
    ? {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: {
          type: "spring" as const,
          stiffness: 300,
          damping: 28,
        },
      }
    : {};

  return (
    <motion.div
      className={`
        relative overflow-hidden
        neu-border-thick neu-shadow
        bg-[var(--color-bg-alt)]
        rounded-[4px]
        ${paddingStyles[padding]}
        ${hoverable ? "cursor-pointer" : ""}
        ${className}
      `}
      {...hoverProps}
      {...initProps}
      {...motionProps}
    >
      {/* Strip aksen warna di bagian atas card */}
      {accent !== "none" && (
        <div
          className="absolute top-0 left-0 right-0 h-[5px]"
          style={{ backgroundColor: accentColors[accent] }}
        />
      )}

      {/* Konten card dengan padding top tambahan jika ada accent strip */}
      <div className={accent !== "none" ? "pt-2" : ""}>{children}</div>
    </motion.div>
  );
}
