"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap/register";

// ── Data ────────────────────────────────────────────────────────────────────

const HEADLINE = ["Motion", "is the", "language."];

const TECHNIQUES = [
  { title: "Word reveal", desc: "Clip-path masking with yPercent stagger" },
  { title: "Parallax layers", desc: "Multi-speed scroll depth" },
  { title: "Character rotateX", desc: "3D flip per character" },
  { title: "Magnetic UI", desc: "Spring physics on hover" },
  { title: "Ken Burns", desc: "Scroll-driven scale on image" },
];

const FAQS = [
  {
    q: "What is chain abstraction?",
    a: "Chain abstraction lets you interact with any blockchain from a single NEAR account — no bridging, no managing multiple wallets or gas tokens. NEAR Intents handles the routing.",
  },
  {
    q: "Is NEAR open source?",
    a: "Yes. NEAR Protocol, NEAR AI, and the majority of ecosystem tooling are open-source under Apache and MIT licenses. Contributions are welcome on GitHub.",
  },
  {
    q: "How does NEAR achieve 1M TPS?",
    a: "Through dynamic sharding — the network automatically splits into parallel shards as load increases. Each shard processes transactions independently, and cross-shard communication is handled by the protocol.",
  },
  {
    q: "What is a TEE?",
    a: "A Trusted Execution Environment is a hardware-secured enclave where code runs in total isolation — not even the host machine operator can read what's inside. NEAR AI uses TEEs for private inference.",
  },
  {
    q: "What makes NEAR AI different?",
    a: "NEAR AI combines private inference in hardware TEEs with a user-owned agent marketplace. Unlike centralized AI clouds, your data and your agent's logic never leave the secure enclave — not even the host machine operator can read them.",
  },
];

const STATS = [
  { value: "35+", label: "chains connected" },
  { value: "$19B", label: "volume routed" },
  { value: "1M TPS", label: "at peak" },
];

const FEATURES = [
  {
    icon: "⛓",
    title: "Chain Abstraction",
    desc: "One account, any chain. NEAR Intents routes across 35+ networks with sub-cent fees.",
  },
  {
    icon: "🔒",
    title: "Private Execution",
    desc: "TEE-secured enclaves ensure not even the host can read your agent's logic or data.",
  },
  {
    icon: "🤖",
    title: "AI Native",
    desc: "Agents with hardware guarantees — built for a world where AI runs critical infrastructure.",
  },
];

const UPTIME_STATS = [
  "600ms block time",
  "1.2s finality",
  "0.01¢ avg tx fee",
  "99.9% validator uptime",
];

const INTEGRATIONS = ["Ledger", "Brave", "HOT Wallet", "Infinex"];

const FOOTER_COLS = [
  {
    title: "Developers Hub",
    desc: "Start building on NEAR with docs, SDKs, and live examples.",
    href: "#",
  },
  {
    title: "Ecosystem",
    desc: "Explore 300+ projects across DeFi, AI, gaming, and more.",
    href: "#",
  },
  {
    title: "NEAR AI",
    desc: "Private inference, agent harnesses, and hardware-secured TEEs.",
    href: "#",
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

const fw = (v: string) => v as React.CSSProperties["fontWeight"];

export default function Exp1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  const kbImgRef = useRef<HTMLDivElement>(null);
  const magnetRef = useRef<HTMLAnchorElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ── Full-motion branch ───────────────────────────────────────────────
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // S1: Animated orbs — continuous float
        gsap.to(".hero-orb", {
          x: "random(-120, 120)",
          y: "random(-90, 90)",
          scale: "random(0.8, 1.35)",
          duration: "random(7, 13)",
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          stagger: { each: 2.5 },
        });

        // S1: Mouse-following glow
        const hero = containerRef.current?.querySelector(".hero-section") as HTMLElement | null;
        const glow = cursorGlowRef.current;
        if (hero && glow) {
          const handleMouseMove = (e: MouseEvent) => {
            const rect = hero.getBoundingClientRect();
            gsap.to(glow, {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
              duration: 0.7,
              ease: "power2.out",
            });
          };
          const handleMouseLeave = () => {
            gsap.to(glow, { opacity: 0, duration: 0.5 });
          };
          const handleMouseEnter = () => {
            gsap.to(glow, { opacity: 1, duration: 0.4 });
          };
          hero.addEventListener("mousemove", handleMouseMove);
          hero.addEventListener("mouseleave", handleMouseLeave);
          hero.addEventListener("mouseenter", handleMouseEnter);
          return () => {
            hero.removeEventListener("mousemove", handleMouseMove);
            hero.removeEventListener("mouseleave", handleMouseLeave);
            hero.removeEventListener("mouseenter", handleMouseEnter);
          };
        }
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // S1: Word clip-path reveal via overflow:hidden + yPercent
        gsap.fromTo(
          ".word-mask",
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.1,
          }
        );
        gsap.fromTo(
          ".accent-line",
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.8, ease: "power3.out", delay: 0.55 }
        );
        gsap.fromTo(
          [".hero-sub", ".hero-cta"],
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.2,
            delay: 0.85,
          }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // S2: Technique cards slide-up on scroll
        gsap.fromTo(
          ".technique-card",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".techniques-grid",
              start: "top 78%",
              once: true,
            },
          }
        );
        gsap.fromTo(
          ".s2-headline",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: ".s2-headline", start: "top 82%", once: true },
          }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // S3: Multi-layer parallax — bg slower, fg faster
        gsap.to(".parallax-bg", {
          yPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: ".s3-parallax",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.fromTo(
          ".parallax-text",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".parallax-text",
              start: "top 80%",
              once: true,
            },
          }
        );
        // S3: Stats stagger in
        gsap.fromTo(
          ".parallax-stat",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".parallax-stats",
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // S4: Background color mutation on scroll
        gsap.to(".s4-bg", {
          backgroundColor: "#0b1a12",
          ease: "none",
          scrollTrigger: {
            trigger: ".s4-bg",
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        });
        // S4: Feature columns stagger in
        gsap.fromTo(
          ".feature-col",
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".features-grid",
              start: "top 78%",
              once: true,
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // S5: Per-character rotateX stagger
        gsap.fromTo(
          ".char-rX",
          { rotateX: 90, opacity: 0, transformOrigin: "bottom center" },
          {
            rotateX: 0,
            opacity: 1,
            stagger: 0.028,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".s5-chars",
              start: "top 80%",
              once: true,
            },
          }
        );
        gsap.fromTo(
          ".s5-sub",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".s5-sub",
              start: "top 85%",
              once: true,
            },
          }
        );
        // S5: Image wipe reveal (clipPath inset)
        gsap.fromTo(
          ".s5-img-wipe",
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".s5-img-wipe",
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // S6: Magnetic button
        const btn = magnetRef.current;
        if (btn) {
          const handleMove = (e: MouseEvent) => {
            const r = btn.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            gsap.to(btn, {
              x: x * 0.35,
              y: y * 0.35,
              duration: 0.4,
              ease: "power2.out",
            });
          };
          const handleLeave = () => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.7,
              ease: "elastic.out(1, 0.4)",
            });
          };
          btn.addEventListener("mousemove", handleMove);
          btn.addEventListener("mouseleave", handleLeave);
          return () => {
            btn.removeEventListener("mousemove", handleMove);
            btn.removeEventListener("mouseleave", handleLeave);
          };
        }
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // S6: Secondary CTAs fade-in stagger
        gsap.fromTo(
          ".s6-secondary-cta",
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".s6-secondary-ctarow",
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // S7: Ken Burns zoom (scroll-driven scale)
        gsap.fromTo(
          ".kb-inner",
          { scale: 1 },
          {
            scale: 1.14,
            ease: "none",
            scrollTrigger: {
              trigger: ".s7-kb",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
        gsap.fromTo(
          ".s7-copy",
          { opacity: 0, x: -32 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".s7-copy",
              start: "top 80%",
              once: true,
            },
          }
        );
        // S7: Stat lines scaleX underline
        gsap.fromTo(
          ".stat-underline",
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".uptime-stats",
              start: "top 82%",
              once: true,
            },
          }
        );
        gsap.fromTo(
          ".uptime-stat-item",
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.09,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".uptime-stats",
              start: "top 82%",
              once: true,
            },
          }
        );
        // S7: Second image fade in
        gsap.fromTo(
          ".s7-img2",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".s7-img2",
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // S8: Circle clipPath mask reveal
        gsap.fromTo(
          ".circle-img",
          { clipPath: "circle(0% at 50% 50%)" },
          {
            clipPath: "circle(75% at 50% 50%)",
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".s8-circle",
              start: "top 70%",
              once: true,
            },
          }
        );
        gsap.fromTo(
          ".s8-text",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".s8-text",
              start: "top 82%",
              once: true,
            },
          }
        );
        // S8: Integration badges stagger
        gsap.fromTo(
          ".integration-badge",
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.07,
            duration: 0.5,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: ".integration-badges",
              start: "top 84%",
              once: true,
            },
          }
        );
        // S8: Big stat
        gsap.fromTo(
          ".s8-bigstat",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".s8-bigstat",
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // S9: Text gradient sweep via backgroundPosition scrub
        const grad = gradientRef.current;
        if (grad) {
          ScrollTrigger.create({
            trigger: ".s9-gradient",
            start: "top 65%",
            end: "center 35%",
            scrub: 1.5,
            onUpdate: (self) => {
              const pct = 100 - self.progress * 100;
              grad.style.backgroundPositionX = `${pct}%`;
            },
          });
        }
        // S9: Footer columns stagger
        gsap.fromTo(
          ".footer-col",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".footer-cols",
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // S10: Footer curtain — overlay scaleY shrinks from bottom
        gsap.fromTo(
          ".footer-curtain",
          { scaleY: 1 },
          {
            scaleY: 0,
            transformOrigin: "bottom center",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: ".s10-footer",
              start: "top 85%",
              end: "top 30%",
              scrub: 0.5,
            },
          }
        );
      });

      // ── Reduced-motion branch ────────────────────────────────────────────
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".word-mask", { yPercent: 0 });
        gsap.set(
          [
            ".accent-line",
            ".hero-sub",
            ".hero-cta",
            ".parallax-text",
            ".parallax-stat",
            ".s2-headline",
            ".technique-card",
            ".s5-sub",
            ".s7-copy",
            ".s8-text",
            ".s6-secondary-cta",
            ".feature-col",
            ".footer-col",
            ".s7-img2",
            ".s8-bigstat",
            ".integration-badge",
          ],
          { opacity: 1, y: 0, x: 0 }
        );
        gsap.set(".char-rX", { opacity: 1, rotateX: 0 });
        gsap.set(".circle-img", {
          clipPath: "circle(75% at 50% 50%)",
        });
        gsap.set(".s5-img-wipe", { clipPath: "inset(0 0% 0 0)" });
        gsap.set(".stat-underline", { scaleX: 1 });
        gsap.set(".uptime-stat-item", { opacity: 1 });
      });
    },
    { scope: containerRef }
  );

  const toggleFaq = (i: number) => {
    setOpenFaq(openFaq === i ? null : i);
  };

  // Style shorthand vars
  const border = "1px solid var(--color-border-dark)";
  const pad = "var(--section-padding-h)";
  const padV = "var(--section-padding-v)";
  const sm = "var(--font-size-small)";
  const sec = "var(--color-text-secondary)";
  const acc = "var(--color-accent)";
  const teal = "var(--color-accent-teal)";

  return (
    <div ref={containerRef} style={{ background: "#000", color: "#fff", fontFamily: "var(--font-family-primary)" }}>

      {/* ── S1: Hero — animated orb background + word reveal ── */}
      <section
        className="hero-section"
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: `0 ${pad}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Orbs layer */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <div
            className="hero-orb"
            style={{
              position: "absolute",
              top: "10%",
              left: "60%",
              width: 520,
              height: 520,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,236,151,0.12) 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
          />
          <div
            className="hero-orb"
            style={{
              position: "absolute",
              top: "55%",
              left: "20%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(23,217,212,0.1) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
          <div
            className="hero-orb"
            style={{
              position: "absolute",
              top: "30%",
              left: "80%",
              width: 340,
              height: 340,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,236,151,0.08) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        {/* Mouse-following glow */}
        <div
          ref={cursorGlowRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,236,151,0.15) 0%, transparent 65%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            zIndex: 0,
            opacity: 0,
          }}
        />

        {/* Accent dot */}
        <div
          style={{
            position: "absolute",
            top: 48,
            right: pad,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: acc,
            zIndex: 2,
          }}
        />

        {/* Content */}
        <div style={{ maxWidth: "var(--content-max-width)", position: "relative", zIndex: 1 }}>
          <h1
            style={{
              fontSize: "var(--font-size-h1-display)",
              lineHeight: "var(--line-height-h1-display)",
              fontWeight: fw("var(--font-weight-h1-display)"),
              margin: "0 0 24px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {HEADLINE.map((line, i) => (
              <span
                key={i}
                style={{ display: "block", overflow: "hidden", lineHeight: "1.1", paddingBottom: "0.05em" }}
              >
                <span className="word-mask" style={{ display: "block" }}>
                  {i === HEADLINE.length - 1 ? (
                    <>
                      {line.slice(0, -1)}
                      <span style={{ color: acc }}>.</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>
          <div
            className="accent-line"
            style={{ width: 64, height: 2, background: acc, marginBottom: 32, transformOrigin: "left center" }}
          />
          <p
            className="hero-sub"
            style={{
              fontSize: "var(--font-size-body-lg)",
              lineHeight: "var(--line-height-body-lg)",
              color: sec,
              maxWidth: 480,
              marginBottom: 48,
              opacity: 0,
            }}
          >
            GSAP motion experiments for the near.org redesign. Each section explores a different animation pattern.
          </p>
          <a href="#s2" className="hero-cta" style={{ opacity: 0, display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", border, color: "#fff", textDecoration: "none", fontSize: "var(--font-size-body)", fontWeight: 500, transition: `background var(--btn-primary-transition), color var(--btn-primary-transition)` }}>
            Explore experiments
            <span style={{ color: acc }} aria-hidden>
              →
            </span>
          </a>
        </div>
      </section>

      {/* ── S2: Techniques demonstrated — card grid ── */}
      <section
        id="s2"
        style={{ padding: `${padV} ${pad}`, borderTop: border }}
      >
        <div style={{ maxWidth: "var(--content-max-width)" }}>
          <p
            style={{
              fontSize: sm,
              color: acc,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Techniques demonstrated
          </p>
          <h2
            className="s2-headline"
            style={{
              fontSize: "var(--font-size-h2)",
              lineHeight: "var(--line-height-h2)",
              fontWeight: 400,
              marginBottom: 56,
              maxWidth: 680,
              opacity: 0,
            }}
          >
            10 ways to make interfaces feel alive
          </h2>
          <div
            className="techniques-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 16,
            }}
          >
            {TECHNIQUES.map((t, i) => (
              <div
                key={i}
                className="technique-card"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border,
                  borderRadius: "var(--border-radius)",
                  padding: 32,
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: acc,
                    marginBottom: 16,
                    fontFamily: "var(--font-family-secondary)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontSize: "var(--font-size-body)",
                    fontWeight: 600,
                    marginBottom: 8,
                    lineHeight: 1.3,
                  }}
                >
                  {t.title}
                </div>
                <div style={{ fontSize: sm, color: sec, lineHeight: "var(--line-height-small)" }}>
                  {t.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S3: Multi-layer parallax — "What is NEAR?" ── */}
      <section
        className="s3-parallax"
        style={{
          minHeight: "80vh",
          position: "relative",
          overflow: "hidden",
          borderTop: border,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="parallax-bg"
          style={{
            position: "absolute",
            inset: "-20% 0",
            backgroundImage: "url('/img/image%2012.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.5,
          }}
        />
        {/* Gradient overlay bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60%",
            background: "linear-gradient(to top, #000 0%, transparent 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: `80px ${pad}`,
            maxWidth: "var(--content-max-width)",
            width: "100%",
          }}
        >
          <div className="parallax-text" style={{ opacity: 0 }}>
            <p
              style={{
                fontSize: sm,
                color: acc,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: 24,
              }}
            >
              What is NEAR?
            </p>
            <h2
              style={{
                fontSize: "var(--font-size-h2)",
                lineHeight: "var(--line-height-h2)",
                fontWeight: 500,
                maxWidth: 640,
                marginBottom: 24,
              }}
            >
              Open infrastructure for the agent economy
            </h2>
            <p
              style={{
                fontSize: "var(--font-size-body-lg)",
                lineHeight: "var(--line-height-body-lg)",
                color: sec,
                maxWidth: 560,
                marginBottom: 48,
              }}
            >
              NEAR combines cross-chain execution, confidential settlement, private inference, and a secure agent harness — co-founded by Illia Polosukhin, co-author of "Attention Is All You Need".
            </p>
          </div>
          {/* Stats */}
          <div
            className="parallax-stats"
            style={{ display: "flex", gap: 48 }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                className="parallax-stat"
                style={{ opacity: 0 }}
              >
                <div
                  style={{
                    fontSize: "clamp(28px, 4vw, 48px)",
                    fontWeight: 700,
                    color: acc,
                    lineHeight: 1,
                    marginBottom: 6,
                    fontFamily: "var(--font-family-secondary)",
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: sm, color: sec }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S4: Background color mutation — "The agent economy" ── */}
      <section
        className="s4-bg"
        style={{
          minHeight: "70vh",
          padding: `${padV} ${pad}`,
          borderTop: border,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: "var(--content-max-width)" }}>
          {/* Accent line decoration */}
          <div
            style={{
              width: 48,
              height: 3,
              background: `linear-gradient(90deg, ${acc}, ${teal})`,
              marginBottom: 32,
            }}
          />
          <p
            style={{
              fontSize: sm,
              color: acc,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            The agent economy
          </p>
          <h2
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.1,
              maxWidth: 720,
              marginBottom: 64,
            }}
          >
            AI agents need secure infrastructure. NEAR is built for exactly that.
          </h2>

          {/* Feature columns */}
          <div
            className="features-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
            }}
          >
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="feature-col"
                style={{
                  paddingTop: 32,
                  borderTop: border,
                  opacity: 0,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
                <div
                  style={{
                    fontSize: "var(--font-size-body)",
                    fontWeight: 600,
                    marginBottom: 10,
                    color: acc,
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    fontSize: sm,
                    color: sec,
                    lineHeight: "var(--line-height-small)",
                  }}
                >
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S5: Per-character rotateX — "Private. Scalable. Yours." ── */}
      <section
        style={{ padding: `${padV} ${pad}`, borderTop: border }}
      >
        <p
          style={{
            fontSize: sm,
            color: acc,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 32,
          }}
        >
          Built for AI
        </p>
        <div
          className="s5-chars"
          style={{ perspective: "800px", marginBottom: 40 }}
        >
          <h2
            style={{
              fontSize: "clamp(40px, 6vw, 80px)",
              fontWeight: 400,
              lineHeight: 1,
              display: "flex",
              flexWrap: "wrap",
              gap: "0.05em",
            }}
          >
            {"Private. Scalable. Yours.".split("").map((char, i) => (
              <span
                key={i}
                className={char !== " " ? "char-rX" : undefined}
                style={{
                  display: "inline-block",
                  opacity: char !== " " ? 0 : undefined,
                }}
              >
                {char === " " ? " " : char}
              </span>
            ))}
          </h2>
        </div>
        <p
          className="s5-sub"
          style={{
            fontSize: "var(--font-size-body-lg)",
            color: sec,
            maxWidth: 560,
            lineHeight: "var(--line-height-body-lg)",
            opacity: 0,
            marginBottom: 56,
          }}
        >
          IronClaw sandboxes tools and isolates credentials inside hardware-enforced TEEs. Your secrets never reach the model — not even the host can read them.
        </p>

        {/* Full-width image wipe */}
        <div
          style={{
            width: "100%",
            height: 400,
            overflow: "hidden",
            borderRadius: "var(--border-radius)",
          }}
        >
          <img
            className="s5-img-wipe"
            src="/img/image%2012.png"
            alt="NEAR infrastructure visual"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              clipPath: "inset(0 100% 0 0)",
              display: "block",
            }}
          />
        </div>
      </section>

      {/* ── S6: Magnetic button — "Pull toward what matters" ── */}
      <section
        style={{
          padding: `${padV} ${pad}`,
          borderTop: border,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 40,
        }}
      >
        {/* Background "NEAR" watermark */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "18vw",
            fontWeight: 700,
            color: "#fff",
            opacity: 0.03,
            letterSpacing: "-0.04em",
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
            zIndex: 0,
            fontFamily: "var(--font-family-secondary)",
          }}
          aria-hidden
        >
          NEAR
        </div>

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <p
            style={{
              fontSize: sm,
              color: acc,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Interactive
          </p>
          <h2
            style={{
              fontSize: "var(--font-size-h2)",
              lineHeight: "var(--line-height-h2)",
              fontWeight: 500,
              maxWidth: 560,
              marginBottom: 24,
            }}
          >
            Pull toward what matters
          </h2>
          <p
            style={{
              fontSize: "var(--font-size-body-lg)",
              color: sec,
              maxWidth: 520,
              lineHeight: "var(--line-height-body-lg)",
              marginBottom: 48,
            }}
          >
            Hover over the button — it attracts to your cursor with spring physics. A detail that makes interfaces feel alive.
          </p>

          <div
            style={{
              height: 160,
              display: "flex",
              alignItems: "center",
              marginBottom: 40,
            }}
          >
            <a
              ref={magnetRef}
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 36px",
                fontSize: 18,
                cursor: "none",
                border,
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontFamily: "var(--font-family-primary)",
              }}
            >
              Start building on NEAR
              <span style={{ color: acc }} aria-hidden>
                →
              </span>
            </a>
          </div>

          {/* Secondary CTAs */}
          <div
            className="s6-secondary-ctarow"
            style={{ display: "flex", gap: 40 }}
          >
            <a
              href="#"
              className="s6-secondary-cta"
              style={{
                fontSize: "var(--font-size-body)",
                color: sec,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                opacity: 0,
                transition: `color var(--btn-primary-transition)`,
              }}
            >
              Read the docs <span style={{ color: acc }}>→</span>
            </a>
            <a
              href="#"
              className="s6-secondary-cta"
              style={{
                fontSize: "var(--font-size-body)",
                color: sec,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                opacity: 0,
                transition: `color var(--btn-primary-transition)`,
              }}
            >
              Explore ecosystem <span style={{ color: acc }}>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── S7: Ken Burns + split panel — "5 years, 100% uptime" ── */}
      <section
        style={{
          borderTop: border,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "70vh",
        }}
      >
        <div className="s7-kb" style={{ position: "relative", overflow: "hidden" }}>
          <div
            className="kb-inner"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/img/image%2014.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transformOrigin: "center",
            }}
          />
        </div>
        <div
          className="s7-copy"
          style={{
            padding: "80px 64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: 0,
          }}
        >
          <p
            style={{
              fontSize: sm,
              color: acc,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            5 years, 100% uptime
          </p>
          <h2
            style={{
              fontSize: "var(--font-size-h2)",
              lineHeight: "var(--line-height-h2)",
              fontWeight: 500,
              marginBottom: 24,
            }}
          >
            The settlement layer that never sleeps
          </h2>
          <p
            style={{
              fontSize: "var(--font-size-body)",
              lineHeight: "var(--line-height-body)",
              color: sec,
              marginBottom: 40,
            }}
          >
            NEAR Protocol has maintained 100% uptime on mainnet since launch. Fully sharded with quantum-adaptive cryptography, supporting 1M TPS with 600ms blocks.
          </p>

          {/* Uptime stats with underline animation */}
          <div className="uptime-stats" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {UPTIME_STATS.map((stat, i) => (
              <div
                key={i}
                className="uptime-stat-item"
                style={{
                  padding: "16px 0",
                  borderBottom: border,
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    fontSize: "var(--font-size-body)",
                    fontWeight: 500,
                    marginBottom: 6,
                  }}
                >
                  {stat}
                </div>
                <div
                  className="stat-underline"
                  style={{
                    height: 2,
                    background: acc,
                    transformOrigin: "left center",
                    transform: "scaleX(0)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S7: Second image panel */}
      <div
        className="s7-img2"
        style={{
          width: "100%",
          height: 320,
          overflow: "hidden",
          opacity: 0,
          borderTop: border,
        }}
      >
        <img
          src="/img/image%2026.png"
          alt="NEAR ecosystem"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* ── S8: Circle mask reveal — "One account. Every chain." ── */}
      <section
        className="s8-circle"
        style={{
          borderTop: border,
          padding: `${padV} ${pad}`,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div className="s8-text" style={{ opacity: 0 }}>
          <p
            style={{
              fontSize: sm,
              color: acc,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            Cross-chain execution
          </p>
          <h2
            style={{
              fontSize: "var(--font-size-h2)",
              lineHeight: "var(--line-height-h2)",
              fontWeight: 500,
              marginBottom: 24,
            }}
          >
            One account.
            <br />
            Every chain.
          </h2>
          <p
            style={{
              fontSize: "var(--font-size-body)",
              lineHeight: "var(--line-height-body)",
              color: sec,
              marginBottom: 32,
            }}
          >
            NEAR Intents routes cross-chain swaps across 35+ networks with sub-cent fees and sub-second settlement. $19B in volume to date.
          </p>

          {/* Integration badges */}
          <div
            className="integration-badges"
            style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}
          >
            {INTEGRATIONS.map((name, i) => (
              <span
                key={i}
                className="integration-badge"
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  border,
                  borderRadius: 100,
                  fontSize: sm,
                  color: "#fff",
                  opacity: 0,
                  fontWeight: 500,
                }}
              >
                {name}
              </span>
            ))}
          </div>

          {/* Big stat */}
          <div className="s8-bigstat" style={{ opacity: 0 }}>
            <span
              style={{
                fontSize: "clamp(40px, 5vw, 72px)",
                fontWeight: 700,
                color: acc,
                lineHeight: 1,
                fontFamily: "var(--font-family-secondary)",
              }}
            >
              $19B+
            </span>
            <div style={{ fontSize: sm, color: sec, marginTop: 4 }}>
              total volume routed through NEAR Intents
            </div>
          </div>
        </div>

        <div style={{ aspectRatio: "1", overflow: "hidden", borderRadius: 2 }}>
          <img
            className="circle-img"
            src="/img/image%2019.png"
            alt="Cross-chain visualization"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              clipPath: "circle(0% at 50% 50%)",
              display: "block",
            }}
          />
        </div>
      </section>

      {/* ── S9: FAQ accordion ── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border }}>
        <p
          style={{
            fontSize: sm,
            color: acc,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 48,
          }}
        >
          Common questions
        </p>
        <div style={{ maxWidth: 760 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderTop: border }}>
              <button
                onClick={() => toggleFaq(i)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  color: "#fff",
                  padding: "24px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  fontFamily: "var(--font-family-primary)",
                  fontSize: "var(--font-size-body)",
                  fontWeight: 500,
                }}
              >
                {faq.q}
                <span
                  style={{
                    fontSize: 20,
                    color: acc,
                    transform: openFaq === i ? "rotate(45deg)" : "none",
                    transition: "transform 0.3s ease",
                    flexShrink: 0,
                    marginLeft: 16,
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: openFaq === i ? 260 : 0,
                  transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                  opacity: openFaq === i ? 1 : 0,
                }}
              >
                <p
                  style={{
                    fontSize: "var(--font-size-body)",
                    lineHeight: "var(--line-height-body)",
                    color: sec,
                    paddingBottom: 24,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: border }} />
        </div>
      </section>

      {/* ── S10: Text gradient sweep + footer columns ── */}
      <section
        className="s9-gradient"
        style={{ padding: `${padV} ${pad}`, borderTop: border }}
      >
        <p
          style={{
            fontSize: sm,
            color: acc,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 40,
          }}
        >
          NEAR 2026 and beyond
        </p>
        <div
          ref={gradientRef}
          style={{
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 400,
            lineHeight: 1.15,
            maxWidth: 880,
            background: "linear-gradient(90deg, var(--color-accent) 0%, #fff 40%, rgba(255,255,255,0.3) 100%)",
            backgroundSize: "200% 100%",
            backgroundPositionX: "100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            marginBottom: 80,
          }}
        >
          The infrastructure choices we make now will determine what is possible later.
        </div>

        {/* Footer columns */}
        <div
          className="footer-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 40,
            paddingTop: 48,
            borderTop: border,
            marginBottom: 64,
          }}
        >
          {FOOTER_COLS.map((col, i) => (
            <div key={i} className="footer-col" style={{ opacity: 0 }}>
              <div
                style={{
                  fontSize: "var(--font-size-body)",
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                {col.title}
              </div>
              <div
                style={{
                  fontSize: sm,
                  color: sec,
                  lineHeight: "var(--line-height-small)",
                  marginBottom: 16,
                }}
              >
                {col.desc}
              </div>
              <a
                href={col.href}
                style={{
                  fontSize: sm,
                  color: "#fff",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                Learn more <span style={{ color: acc }}>→</span>
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 32px",
            background: acc,
            color: "#000",
            fontWeight: 600,
            fontSize: "var(--font-size-body)",
            textDecoration: "none",
            borderRadius: 0,
          }}
        >
          Start building →
        </a>
      </section>

      {/* ── Footer curtain reveal ── */}
      <section
        className="s10-footer"
        style={{ borderTop: border, position: "relative", overflow: "hidden" }}
      >
        <div
          className="footer-curtain"
          style={{
            position: "absolute",
            inset: 0,
            background: "#000",
            zIndex: 2,
            transformOrigin: "bottom center",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: `${padV} ${pad}`,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 40,
            alignItems: "end",
          }}
        >
          <div style={{ gridColumn: "1 / 3" }}>
            <div
              style={{
                fontSize: sm,
                color: acc,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: 24,
              }}
            >
              near.org motion R&amp;D
            </div>
            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 400,
                maxWidth: 640,
                lineHeight: 1.1,
                marginBottom: 0,
              }}
            >
              Ready to build in the agent economy?
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 16,
            }}
          >
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                background: acc,
                color: "#000",
                fontWeight: 600,
                fontSize: "var(--font-size-body)",
                textDecoration: "none",
              }}
            >
              Developers Hub →
            </a>
            <a
              href="#"
              style={{
                fontSize: sm,
                color: sec,
                textDecoration: "none",
              }}
            >
              View all experiments →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
