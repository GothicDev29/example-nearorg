import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { TransitionOverlay } from "./components/ui/TransitionOverlay";
import "./globals.css";

// TODO: Replace --font-family-primary with FKGrotesk (commercial, Fontwerk) once
// the design team delivers the licensed files. Currently using Space Grotesk as placeholder.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

// Mona Sans is loaded via @font-face in globals.css (avoids Turbopack issues with localFont).
// Source: github.com/github/mona-sans — SIL open source license.

export const metadata: Metadata = {
  title: "near.org motion R&D",
  description: "GSAP animation experiments for near.org redesign",
};

const experiments = [
  { href: "/exp1", label: "exp1 — Hero text reveal" },
  { href: "/exp2", label: "exp2 — NEAR Stack" },
  { href: "/exp3", label: "exp3 — Ecosystem" },
  { href: "/exp4", label: "exp4 — Blog article" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={spaceGrotesk.variable}
      style={
        {
          "--font-family-primary": "var(--font-space-grotesk), sans-serif",
          "--font-family-secondary": '"Mona Sans", sans-serif',
        } as React.CSSProperties
      }
    >
      <body>
        <nav className="site-nav">
          <Link href="/" className="nav-brand">
            near / motion
          </Link>
          <div className="nav-links">
            {experiments.map((exp) => (
              <Link key={exp.href} href={exp.href}>
                {exp.label}
              </Link>
            ))}
          </div>
        </nav>
        <main className="main-content">{children}</main>
        <TransitionOverlay />
      </body>
    </html>
  );
}
