// src/components/providers/ThemeProvider.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class" // Gunakan class strategy (menambahkan class "dark" ke <html>)
      defaultTheme="system" // Default ikuti setting OS user
      enableSystem={true} // Izinkan deteksi system preference
      disableTransitionOnChange={false} // Biarkan CSS transition berjalan saat ganti tema
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
