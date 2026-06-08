// src/components/ui/NeubrutalButton.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface NeubrutalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

// --- Style Maps ---
const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-[var(--color-accent)] text-[#0D0D0D]",
  secondary: "bg-[var(--color-bg-alt)] text-[var(--color-text)]",
  outline: "bg-transparent text-[var(--color-text)]",
  ghost:
    "bg-transparent text-[var(--color-text)] shadow-none border-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm  gap-1.5",
  md: "px-5 py-2.5 text-base gap-2",
  lg: "px-7 py-3.5 text-lg  gap-2.5",
};

export function NeubrutalButton({
  children,
  onClick,
  href,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  icon,
  iconPosition = "left",
  fullWidth = false,
}: NeubrutalButtonProps) {
  const baseClass = `
    inline-flex items-center justify-center
    font-body font-bold tracking-wide
    neu-border-thick neu-shadow
    rounded-[4px] cursor-pointer
    select-none outline-none
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `.trim();

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        className={baseClass}
        // Hover: geser kanan-bawah, shadow mengecil → efek tombol ditekan
        whileHover={{
          x: 3,
          y: 3,
          boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color, 0,0,0))",
        }}
        whileTap={{
          x: 4,
          y: 4,
          boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color, 0,0,0))",
          scale: 0.98,
        }}
        // Spring bouncy agar terasa responsif dan playful
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25,
        }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={baseClass}
      whileHover={
        !disabled
          ? {
              x: 3,
              y: 3,
              boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color, 0,0,0))",
            }
          : {}
      }
      whileTap={
        !disabled
          ? {
              x: 4,
              y: 4,
              boxShadow: "0px 0px 0px 0px rgb(var(--shadow-color, 0,0,0))",
              scale: 0.98,
            }
          : {}
      }
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 25,
      }}
    >
      {content}
    </motion.button>
  );
}
