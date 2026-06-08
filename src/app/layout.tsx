// src/app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

// --- Font Configuration ---
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"], // Bold & ExtraBold untuk heading Neubrutalism
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Muhammad Zulfa Zaidan Nafi' | Full-Stack Developer",
  description:
    "Portfolio Muhammad Zulfa Zaidan Nafi' — Full-Stack Web Developer & IoT Enthusiast. Mahasiswa FIKOM Universitas Duta Bangsa Surakarta.",
  keywords: [
    "Muhammad Zulfa Zaidan",
    "Full-Stack Developer",
    "IoT Developer",
    "Laravel",
    "Next.js",
    "Portfolio",
    "Surakarta",
  ],
  authors: [{ name: "Muhammad Zulfa Zaidan Nafi'" }],
  openGraph: {
    title: "Muhammad Zulfa Zaidan Nafi' | Full-Stack Developer",
    description: "Full-Stack Web Developer & IoT Enthusiast",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning // Wajib untuk next-themes (mencegah hydration mismatch)
    >
      <body
        className={`
          ${syne.variable}
          ${spaceGrotesk.variable}
          ${jetbrainsMono.variable}
          font-body antialiased min-h-screen
        `}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
