"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap/register";

const experiments = [
  {
    href: "/exp1",
    label: "exp1",
    title: "Hero text reveal",
    description: "Clip-path word stagger on load. Dark background, accent detail, secondary CTA.",
  },
  {
    href: "/exp2",
    label: "exp2",
    title: "Landing larga — The NEAR Stack",
    description: "Scroll pinning con 6 slides del stack real de NEAR, contadores animados ($19B, 1M TPS), grid de integraciones con stagger, quote + CTA accent.",
  },
  {
    href: "/exp3",
    label: "exp3",
    title: "Ecosystem — grid de proyectos reales",
    description: "30+ proyectos reales de nearcatalog.xyz. ScrollTrigger.batch por categoría, showcase horizontal atado al scroll vertical, marquee de nombres con pausa en hover.",
  },
  {
    href: "/exp4",
    label: "exp4",
    title: "Blog — Confidential Intents (Feb 2026)",
    description: "Artículo real de near.org. Barra de progreso de lectura fija, divisores SVG line-draw, 5 técnicas distintas de reveal por heading, pull quote con acento.",
  },
  {
    href: "/exp5",
    label: "exp5",
    title: "Developer Platform",
    description: "Variable font axis (Mona Sans 200↔750), text-as-SVG-mask video, canvas cursor trail, 3D CSS carousel, split-panel reveals, canvas particle attractor.",
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".home-eyebrow",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.1 }
      );
      gsap.fromTo(".home-title",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(".home-sub",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", delay: 0.48 }
      );
      gsap.fromTo(".exp-item",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.1, delay: 0.7 }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([".home-eyebrow", ".home-title", ".home-sub", ".exp-item"], { opacity: 1, y: 0 });
    });
  }, { scope: containerRef });

  const border = "1px solid var(--color-border-dark)";

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100dvh",
        backgroundColor: "var(--color-bg-dark)",
        color: "var(--color-text-on-dark)",
        padding: "80px var(--section-padding-h)",
      }}
    >
      <p
        className="home-eyebrow"
        style={{
          fontFamily: "var(--font-family-secondary)",
          fontSize: "var(--font-size-small)",
          color: "var(--color-accent)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: 24,
          fontWeight: 600,
          opacity: 0,
        }}
      >
        near.org — motion R&D
      </p>

      <h1
        className="home-title"
        style={{
          fontSize: "clamp(48px, 6vw, 80px)",
          lineHeight: 1.0,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          maxWidth: 600,
          marginBottom: 20,
          opacity: 0,
        }}
      >
        Animation experiments
      </h1>

      <p
        className="home-sub"
        style={{
          fontSize: "var(--font-size-body-lg)",
          lineHeight: "var(--line-height-body-lg)",
          color: "var(--color-text-secondary)",
          maxWidth: 480,
          marginBottom: 80,
          opacity: 0,
        }}
      >
        GSAP R&D for the near.org redesign — motion design proposals for each section of the site.
      </p>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          borderTop: border,
          maxWidth: "var(--content-max-width)",
        }}
      >
        {experiments.map((exp) => (
          <li
            key={exp.href}
            className="exp-item"
            style={{ borderBottom: border, opacity: 0 }}
          >
            <Link
              href={exp.href}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 40,
                padding: "28px 0",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-family-secondary)",
                  fontSize: "var(--font-size-small)",
                  color: "var(--color-text-secondary)",
                  minWidth: 48,
                  fontWeight: 500,
                }}
              >
                {exp.label}
              </span>
              <span>
                <span
                  style={{
                    display: "block",
                    fontSize: "var(--font-size-h2-article)",
                    fontWeight: 600,
                    marginBottom: 6,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {exp.title}
                </span>
                <span
                  style={{
                    fontSize: "var(--font-size-small)",
                    color: "var(--color-text-secondary)",
                    lineHeight: "1.5",
                  }}
                >
                  {exp.description}
                </span>
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  color: "var(--color-accent)",
                  fontSize: 18,
                  fontWeight: 300,
                  flexShrink: 0,
                }}
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
