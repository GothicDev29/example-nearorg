"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap/register";

// ── Data ──────────────────────────────────────────────────────────────────────

const TOOLS = [
  { name: "NEAR SDK JS",      tag: "JavaScript",    desc: "Client-side interactions with NEAR Protocol" },
  { name: "Rust SDK",          tag: "Smart Contracts", desc: "Auditable on-chain logic in Rust" },
  { name: "NEAR CLI",          tag: "DevTools",      desc: "Deploy, call, and manage contracts" },
  { name: "FastNEAR RPC",      tag: "Infrastructure", desc: "High-performance RPC — 99.9% uptime" },
  { name: "NEAR AI API",       tag: "AI Agents",     desc: "Private inference inside hardware TEEs" },
  { name: "BOS Components",    tag: "Frontend",      desc: "Decentralized composable UI components" },
  { name: "IronClaw",          tag: "Security",      desc: "Sandboxed agent execution environment" },
  { name: "Chain Signatures",  tag: "Cross-Chain",   desc: "Sign any chain's tx from a NEAR account" },
];

const PANELS = [
  {
    num: "01",
    title: "No lock-in.",
    body: "MIT licensed, fully sharded, decentralized. Your contracts, your data, your users — always portable.",
    accent: "#00ec97",
  },
  {
    num: "02",
    title: "No gas headaches.",
    body: "Sub-cent fees, 600ms blocks, 1.2s finality. NEAR Intents handles cross-chain routing so you focus on product.",
    accent: "#17d9d4",
  },
  {
    num: "03",
    title: "AI-ready by default.",
    body: "Hardware TEEs, private inference, IronClaw sandboxing — protocol-level primitives, not afterthoughts.",
    accent: "#00ec97",
  },
];

const ECOSYSTEM_NODES = [
  "Ref Finance", "Meta Pool", "NEAR AI", "HOT Wallet", "Infinex",
  "Aurora", "SWEAT", "IronClaw", "Brave", "NVIDIA", "Intel", "Abound",
  "Pikespeak", "LiNEAR", "Delta Trade", "Rhea Finance", "POTLOCK",
  "NEAR FM", "Degen Arena", "Moon Shot", "DeFiShards", "Namesky",
  "Fast NEAR", "Near Blocks", "Venice AI", "Public AI", "NEAR Legion",
  "Pumpopoly", "Meme Cooking", "Templar Protocol",
];

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Exp5() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const heroRef         = useRef<HTMLHeadingElement>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement>(null);
  const attractCanvasRef = useRef<HTMLCanvasElement>(null);
  const carouselRef     = useRef<HTMLDivElement>(null);
  const carouselWrapRef = useRef<HTMLDivElement>(null);

  // ── Canvas: cursor particle trail ─────────────────────────────────────────
  useEffect(() => {
    const canvas = cursorCanvasRef.current;
    if (!canvas) return;
    const section = canvas.parentElement!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
      canvas.style.width  = canvas.width  + "px";
      canvas.style.height = canvas.height + "px";
    };
    resize();

    type P = { x: number; y: number; vx: number; vy: number; life: number; r: number };
    const particles: P[] = [];

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (let i = 0; i < 4; i++) {
        particles.push({
          x: mx + (Math.random() - 0.5) * 10,
          y: my + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 2.2,
          vy: -(Math.random() * 2.8 + 0.4),
          life: 1,
          r: Math.random() * 3 + 1,
        });
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x    += p.vx;
        p.y    += p.vy;
        p.vy   += 0.065;
        p.vx   *= 0.98;
        p.life -= 0.018;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life * 0.75;
        ctx.fillStyle   = "#00ec97";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(tick);
    };

    section.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);
    tick();
    return () => {
      cancelAnimationFrame(animId);
      section.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── Canvas: particle attractor / constellation ─────────────────────────────
  useEffect(() => {
    const canvas = attractCanvasRef.current;
    if (!canvas) return;
    const section = canvas.parentElement!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let mx = -9999, my = -9999;
    let hovering = false;

    type Node = { x: number; y: number; ox: number; oy: number; vx: number; vy: number; label: string; r: number };
    let nodes: Node[] = [];

    const init = () => {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
      canvas.style.width  = canvas.width  + "px";
      canvas.style.height = canvas.height + "px";
      nodes = ECOSYSTEM_NODES.map((label) => {
        const x = 80 + Math.random() * (canvas.width  - 160);
        const y = 80 + Math.random() * (canvas.height - 160);
        return { x, y, ox: x, oy: y, vx: 0, vy: 0, label, r: Math.random() * 2 + 2 };
      });
    };

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      hovering = true;
    };
    const onLeave = () => { hovering = false; };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        if (hovering) {
          const dx = mx - a.x;
          const dy = my - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = Math.min(60 / dist, 3.5);
          a.vx += (dx / dist) * force * 0.07;
          a.vy += (dy / dist) * force * 0.07;
        }

        // spring back to origin
        a.vx += (a.ox - a.x) * 0.016;
        a.vy += (a.oy - a.y) * 0.016;
        a.vx *= 0.87;
        a.vy *= 0.87;
        a.x  += a.vx;
        a.y  += a.vy;

        // connections
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
          if (d < 130) {
            ctx.strokeStyle = `rgba(0,236,151,${(1 - d / 130) * 0.22})`;
            ctx.lineWidth   = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // node dot
        ctx.fillStyle = hovering
          ? `rgba(0,236,151,${0.5 + Math.min(0.4, 30 / (Math.sqrt((mx - a.x) ** 2 + (my - a.y) ** 2) + 1))})`
          : "rgba(0,236,151,0.55)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();

        // label
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.font      = "10px 'Space Grotesk', sans-serif";
        ctx.fillText(a.label, a.x + a.r + 5, a.y + 3.5);
      }

      animId = requestAnimationFrame(tick);
    };

    init();
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", init);
    tick();
    return () => {
      cancelAnimationFrame(animId);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", init);
    };
  }, []);

  // ── 3D carousel — continuous auto-rotation ────────────────────────────────
  useEffect(() => {
    const carousel = carouselRef.current;
    const wrap     = carouselWrapRef.current;
    if (!carousel || !wrap) return;

    let angle  = 0;
    let speed  = 0.16;
    let raf    = 0;

    const tick = () => {
      angle += speed;
      carousel.style.transform = `rotateY(${angle}deg)`;
      raf = requestAnimationFrame(tick);
    };

    const pause  = () => { speed = 0; };
    const resume = () => { speed = 0.16; };

    wrap.addEventListener("mouseenter", pause);
    wrap.addEventListener("mouseleave", resume);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mouseenter", pause);
      wrap.removeEventListener("mouseleave", resume);
    };
  }, []);

  // ── GSAP animations ───────────────────────────────────────────────────────
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {

      // ── S1: Hero — variable font weight (#3) ──
      const wObj = { w: 200 };
      const applyWeight = () => {
        if (heroRef.current) {
          heroRef.current.style.fontVariationSettings = `'wght' ${Math.round(wObj.w)}`;
        }
      };

      // Entrance: 200 → 750
      gsap.fromTo(wObj, { w: 200 }, {
        w: 750, duration: 1.8, ease: "power3.out", delay: 0.3, onUpdate: applyWeight,
      });
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.25 }
      );

      // Continuous breath after entrance
      gsap.delayedCall(2.4, () => {
        gsap.to(wObj, {
          w: 300,
          duration: 3.2, ease: "sine.inOut",
          repeat: -1, yoyo: true,
          onUpdate: applyWeight,
        });
      });

      // Grid pulse
      gsap.to(".hero-gl", {
        opacity: 0.08, duration: 2.5, ease: "sine.inOut",
        repeat: -1, yoyo: true,
        stagger: { each: 0.4, from: "random" },
      });

      // Hero text elements
      gsap.fromTo(".e5-eyebrow", { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.15 });
      gsap.fromTo([".e5-sub", ".e5-ctarow"],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.15, delay: 1.0 }
      );

      // ── S2: Text-mask video reveal (#4) ──
      gsap.fromTo(".s2-overlay",
        { scale: 1.15 },
        {
          scale: 1, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: ".s2-section", start: "top 68%", once: true },
        }
      );
      gsap.fromTo(".s2-caption",
        { opacity: 0, y: 10 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.5,
          scrollTrigger: { trigger: ".s2-section", start: "top 68%", once: true },
        }
      );

      // ── S3: Cursor trail heading (#5) ──
      gsap.fromTo([".s3-h", ".s3-p"],
        { opacity: 0, y: 22 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.14,
          scrollTrigger: { trigger: ".s3-section", start: "top 74%", once: true },
        }
      );
      gsap.fromTo(".s3-stat",
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1, delay: 0.2,
          scrollTrigger: { trigger: ".s3-section", start: "top 74%", once: true },
        }
      );

      // ── S4: 3D carousel (#9) ──
      gsap.fromTo(".s4-intro",
        { opacity: 0, y: 22 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".s4-section", start: "top 74%", once: true },
        }
      );
      gsap.fromTo(".s4-scene",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: ".s4-section", start: "top 70%", once: true },
        }
      );

      // ── S5: Split panels (#11) ──
      gsap.fromTo(".s5-intro",
        { opacity: 0, y: 22 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".s5-section", start: "top 75%", once: true },
        }
      );
      // Each panel slides in from a different edge
      [
        { cls: ".sp-0", from: "inset(0 100% 0 0)", delay: 0 },
        { cls: ".sp-1", from: "inset(100% 0 0 0)",  delay: 0.12 },
        { cls: ".sp-2", from: "inset(0 0 0 100%)",  delay: 0.24 },
      ].forEach(({ cls, from, delay }) => {
        gsap.fromTo(cls,
          { clipPath: from },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.95, ease: "power3.inOut", delay,
            scrollTrigger: { trigger: ".s5-panels", start: "top 74%", once: true },
          }
        );
      });

      // ── S6: Particle attractor heading (#14) ──
      gsap.fromTo([".s6-h", ".s6-p"],
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.14,
          scrollTrigger: { trigger: ".s6-section", start: "top 75%", once: true },
        }
      );

      // ── S7: CTA footer ──
      gsap.fromTo([".s7-h", ".s7-p", ".s7-ctas", ".s7-links"],
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: ".s7-section", start: "top 78%", once: true },
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (heroRef.current) heroRef.current.style.fontVariationSettings = "'wght' 700";
      gsap.set([heroRef.current, ".e5-eyebrow", ".e5-sub", ".e5-ctarow",
        ".s2-caption", ".s3-h", ".s3-p", ".s3-stat", ".s4-intro", ".s4-scene",
        ".s5-intro", ".sp-0", ".sp-1", ".sp-2",
        ".s6-h", ".s6-p", ".s7-h", ".s7-p", ".s7-ctas", ".s7-links"],
        { opacity: 1, y: 0, scale: 1, clipPath: "inset(0 0% 0 0)" }
      );
    });
  }, { scope: containerRef });

  const border = "1px solid var(--color-border-dark)";
  const pad    = "var(--section-padding-h)";
  const padV   = "var(--section-padding-v)";
  const sm     = "var(--font-size-small)";
  const sec    = "var(--color-text-secondary)";
  const acc    = "var(--color-accent)";
  const N      = TOOLS.length;
  const R      = 440; // cylinder radius

  return (
    <div ref={containerRef} style={{ background: "#000", color: "#fff", fontFamily: "var(--font-family-primary)" }}>

      {/* ── S1: Hero — variable font weight (anim #3) ── */}
      <section style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center", padding: `0 ${pad}`, position: "relative", overflow: "hidden" }}>

        {/* Subtle animated grid */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`v${i}`} className="hero-gl" style={{ position: "absolute", left: `${(i + 1) * 12.5}%`, top: 0, bottom: 0, width: 1, background: "rgba(0,236,151,1)", opacity: 0.03, pointerEvents: "none" }} />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`h${i}`} className="hero-gl" style={{ position: "absolute", top: `${(i + 1) * 16.6}%`, left: 0, right: 0, height: 1, background: "rgba(0,236,151,1)", opacity: 0.03, pointerEvents: "none" }} />
        ))}

        <div style={{ position: "relative", zIndex: 1, maxWidth: "var(--content-max-width)" }}>

          <p className="e5-eyebrow" style={{ fontSize: sm, color: acc, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 28, fontFamily: "var(--font-family-secondary)", opacity: 0 }}>
            near.org — developer platform
          </p>

          {/* Variable font heading — weight breathes via fontVariationSettings */}
          <h1
            ref={heroRef}
            style={{
              fontFamily: "var(--font-family-secondary)",
              fontVariationSettings: "'wght' 200",
              fontSize: "clamp(60px, 9vw, 128px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              margin: "0 0 32px",
              maxWidth: 860,
              opacity: 0,
            }}
          >
            Build what
            <br />
            <span style={{ color: acc }}>matters.</span>
          </h1>

          <p className="e5-sub" style={{ fontSize: "var(--font-size-body-lg)", lineHeight: "var(--line-height-body-lg)", color: sec, maxWidth: 520, marginBottom: 48, opacity: 0 }}>
            SDKs, private inference, cross-chain execution, hardware-secured TEEs.
            Everything you need to deploy in the agent economy — today.
          </p>

          <div className="e5-ctarow" style={{ display: "flex", gap: 16, flexWrap: "wrap", opacity: 0 }}>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: acc, color: "#000", fontWeight: 600, fontSize: sm, textDecoration: "none" }}>
              Start building →
            </a>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", border, color: "#fff", fontWeight: 500, fontSize: sm, textDecoration: "none" }}>
              Read the docs
            </a>
          </div>

          {/* Annotation for R&D context */}
          <p style={{ marginTop: 64, fontSize: 11, color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-family-secondary)", letterSpacing: "0.05em" }}>
            anim #3 — variable font axis · Mona Sans 200 ↔ 750 via fontVariationSettings
          </p>
        </div>
      </section>

      {/* ── S2: Text-as-SVG-clip-mask for video (anim #4) ── */}
      <section className="s2-section" style={{ position: "relative", height: "80vh", overflow: "hidden", borderTop: border, background: "#000" }}>

        {/* Background video */}
        <video
          autoPlay muted loop playsInline
          src="/img/near-intents-launch_compressed.mp4"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* SVG mask overlay: dark everywhere, transparent inside "NEAR" text */}
        <div className="s2-overlay" style={{ position: "absolute", inset: 0 }}>
          <svg
            style={{ width: "100%", height: "100%", display: "block" }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <mask id="near-mask">
                {/* White = show dark overlay · Black cutout = video shines through */}
                <rect width="100%" height="100%" fill="white" />
                <text
                  x="50%" y="52%"
                  textAnchor="middle" dominantBaseline="middle"
                  style={{ fontSize: "clamp(100px, 16vw, 210px)", fontWeight: 700, fontFamily: "Mona Sans, Space Grotesk, sans-serif", letterSpacing: "-0.03em" }}
                  fill="black"
                >
                  NEAR
                </text>
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="#000" mask="url(#near-mask)" opacity="0.95" />
          </svg>
        </div>

        {/* Caption */}
        <div className="s2-caption" style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", textAlign: "center", zIndex: 3, opacity: 0 }}>
          <p style={{ fontSize: sm, color: "rgba(255,255,255,0.4)", letterSpacing: "0.07em", fontFamily: "var(--font-family-secondary)" }}>
            NEAR Intents — live on mainnet — $19B+ volume routed
          </p>
        </div>

        <p style={{ position: "absolute", top: 24, left: pad, zIndex: 4, fontSize: 11, color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-family-secondary)", letterSpacing: "0.05em" }}>
          anim #4 — text-as-SVG-mask · video burns through the letters
        </p>
      </section>

      {/* ── S3: Canvas cursor trail (anim #5) ── */}
      <section className="s3-section" style={{ position: "relative", padding: `${padV} ${pad}`, borderTop: border, background: "#080808", minHeight: "65vh", display: "flex", alignItems: "center", overflow: "hidden" }}>

        <canvas ref={cursorCanvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, display: "block" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "var(--content-max-width)", width: "100%" }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-family-secondary)", letterSpacing: "0.05em", marginBottom: 24 }}>
            anim #5 — canvas cursor trail · move your cursor here
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <h2 className="s3-h" style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 24, opacity: 0 }}>
                Every interaction,
                <br />alive.
              </h2>
              <p className="s3-p" style={{ fontSize: "var(--font-size-body-lg)", color: sec, lineHeight: "var(--line-height-body-lg)", maxWidth: 420, opacity: 0 }}>
                Motion isn't decoration — it's signal. Move your cursor across this section to see how interfaces can respond to intent.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { stat: "0.7ms",  label: "avg interaction latency" },
                { stat: "60fps",  label: "native animation frame rate" },
                { stat: "∞",      label: "possible cursor paths" },
              ].map((item) => (
                <div key={item.label} className="s3-stat" style={{ padding: "22px 28px", border, borderRadius: "var(--border-radius)", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", opacity: 0 }}>
                  <div style={{ fontSize: "clamp(26px, 2.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", color: acc, lineHeight: 1, marginBottom: 4 }}>{item.stat}</div>
                  <div style={{ fontSize: sm, color: sec }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── S4: 3D rotating carousel (anim #9) ── */}
      <section className="s4-section" style={{ padding: `${padV} ${pad}`, borderTop: border, overflow: "hidden" }}>

        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-family-secondary)", letterSpacing: "0.05em", marginBottom: 24 }}>
          anim #9 — infinite 3D carousel · hover to pause
        </p>

        <div className="s4-intro" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 72, opacity: 0 }}>
          <div>
            <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12, fontFamily: "var(--font-family-secondary)" }}>
              SDK ecosystem
            </p>
            <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 600, letterSpacing: "-0.025em", maxWidth: 420 }}>
              Eight tools.
              <br />One network.
            </h2>
          </div>
          <p style={{ fontSize: "var(--font-size-body)", color: sec, maxWidth: 340, textAlign: "right" }}>
            The foundation of every NEAR application — rotating continuously so you can explore the full stack.
          </p>
        </div>

        {/* 3D scene */}
        <div
          ref={carouselWrapRef}
          className="s4-scene"
          style={{
            position: "relative",
            height: 340,
            perspective: "1100px",
            perspectiveOrigin: "50% 50%",
            opacity: 0,
          }}
        >
          <div
            ref={carouselRef}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 0,
              height: 0,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {TOOLS.map((tool, i) => {
              const angle = (360 / N) * i;
              return (
                <div
                  key={tool.name}
                  style={{
                    position: "absolute",
                    width: 250,
                    padding: "28px 24px 32px",
                    background: "linear-gradient(160deg, #131315 0%, #0C0C0D 100%)",
                    border: "1px solid rgba(0,236,151,0.18)",
                    borderTop: "2px solid rgba(0,236,151,0.35)",
                    borderRadius: 4,
                    transform: `rotateY(${angle}deg) translateZ(${R}px)`,
                    backfaceVisibility: "hidden",
                    left: -125,
                    top: -90,
                  }}
                >
                  <span style={{ fontSize: 11, padding: "3px 10px", background: "rgba(0,236,151,0.1)", color: acc, borderRadius: 2, fontFamily: "var(--font-family-secondary)", fontWeight: 600, display: "inline-block", marginBottom: 16 }}>
                    {tool.tag}
                  </span>
                  <h3 style={{ fontSize: "var(--font-size-body)", fontWeight: 600, color: "#fff", marginBottom: 8 }}>
                    {tool.name}
                  </h3>
                  <p style={{ fontSize: sm, color: sec, lineHeight: "1.55" }}>
                    {tool.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── S5: Split panels directional reveal (anim #11) ── */}
      <section className="s5-section" style={{ borderTop: border }}>

        <div style={{ padding: `64px ${pad} 48px` }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-family-secondary)", letterSpacing: "0.05em", marginBottom: 18 }}>
            anim #11 — split-panel directional reveal · each panel enters from a different edge
          </p>
          <div className="s5-intro" style={{ opacity: 0 }}>
            <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 14, fontFamily: "var(--font-family-secondary)" }}>
              Developer promises
            </p>
            <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 600, letterSpacing: "-0.025em", maxWidth: 480 }}>
              Three things NEAR does differently.
            </h2>
          </div>
        </div>

        <div className="s5-panels" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "var(--color-border-dark)" }}>
          {PANELS.map((panel, i) => (
            <div
              key={panel.num}
              className={`sp-${i}`}
              style={{
                padding: "56px 44px 64px",
                background: i === 1 ? "#0A0A0A" : "#000",
                clipPath: i === 0 ? "inset(0 100% 0 0)" : i === 1 ? "inset(100% 0 0 0)" : "inset(0 0 0 100%)",
                borderTop: `3px solid ${i === 1 ? panel.accent : "transparent"}`,
              }}
            >
              <p style={{ fontSize: sm, color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-family-secondary)", marginBottom: 36, fontWeight: 500 }}>
                {panel.num}
              </p>
              <h3 style={{ fontSize: "clamp(26px, 2.8vw, 40px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 22, color: "#fff" }}>
                {panel.title}
              </h3>
              <p style={{ fontSize: "var(--font-size-body)", color: sec, lineHeight: "var(--line-height-body)", maxWidth: 320 }}>
                {panel.body}
              </p>
              <div style={{ width: 28, height: 2, background: panel.accent, marginTop: 44 }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── S6: Canvas particle attractor (anim #14) ── */}
      <section className="s6-section" style={{ position: "relative", padding: `${padV} ${pad}`, borderTop: border, minHeight: "75vh", overflow: "hidden", background: "#050505" }}>

        <canvas
          ref={attractCanvasRef}
          style={{ position: "absolute", inset: 0, display: "block", zIndex: 1 }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-family-secondary)", letterSpacing: "0.05em", marginBottom: 22 }}>
            anim #14 — particle attractor · move cursor to attract the constellation
          </p>
          <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 14, fontFamily: "var(--font-family-secondary)" }}>
            The ecosystem
          </p>
          <h2 className="s6-h" style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 600, letterSpacing: "-0.025em", maxWidth: 440, marginBottom: 18, opacity: 0 }}>
            30 projects.
            <br />One network.
          </h2>
          <p className="s6-p" style={{ fontSize: "var(--font-size-body)", color: sec, maxWidth: 360, opacity: 0 }}>
            Each dot is a live NEAR project. Move your cursor — they're attracted to intent.
          </p>
        </div>
      </section>

      {/* ── S7: CTA footer ── */}
      <section className="s7-section" style={{ padding: `${padV} ${pad}`, borderTop: border }}>
        <div style={{ maxWidth: "var(--content-max-width)" }}>
          <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 32, fontFamily: "var(--font-family-secondary)" }}>
            Get started
          </p>
          <h2 className="s7-h" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, maxWidth: 600, marginBottom: 20, opacity: 0 }}>
            Deploy your first agent in under an hour.
          </h2>
          <p className="s7-p" style={{ fontSize: "var(--font-size-body-lg)", color: sec, maxWidth: 480, lineHeight: "var(--line-height-body-lg)", marginBottom: 48, opacity: 0 }}>
            NEAR's infrastructure is free to start, scales to enterprise, and doesn't require blockchain expertise.
          </p>
          <div className="s7-ctas" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 72, opacity: 0 }}>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: acc, color: "#000", fontWeight: 600, fontSize: sm, textDecoration: "none" }}>
              Start building →
            </a>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", border, color: "#fff", fontWeight: 500, fontSize: sm, textDecoration: "none" }}>
              Read the docs
            </a>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", border, color: "#fff", fontWeight: 500, fontSize: sm, textDecoration: "none" }}>
              Join Discord
            </a>
          </div>
          <div className="s7-links" style={{ display: "flex", gap: 40, paddingTop: 40, borderTop: border, opacity: 0 }}>
            {["GitHub", "Discord", "NEAR Forum", "Developers Hub", "near.org"].map((link) => (
              <a key={link} href="#" style={{ fontSize: sm, color: sec, textDecoration: "none", letterSpacing: "0.02em" }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
