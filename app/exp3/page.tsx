"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, Draggable } from "../../lib/gsap/register";

const CATEGORIES = ["All", "DeFi", "Infrastructure", "AI", "Gaming", "NFT & Marketplace", "Community"];

const PROJECTS = [
  { name: "Ref Finance",        cat: "DeFi",             desc: "The leading DEX and DeFi hub on NEAR" },
  { name: "Meta Pool",          cat: "DeFi",             desc: "Liquid staking protocol for NEAR" },
  { name: "LiNEAR Protocol",    cat: "DeFi",             desc: "Staking yields and liquid tokens for NEAR" },
  { name: "Rhea Finance",       cat: "DeFi",             desc: "Chain-abstracted liquidity solution" },
  { name: "Intear DEX",         cat: "DeFi",             desc: "Fast DEX, aggregator, and token launchpad" },
  { name: "Meme Cooking",       cat: "DeFi",             desc: "Token launchpad and bonding curve platform" },
  { name: "Delta Trade",        cat: "DeFi",             desc: "Multi-chain trading vault with grid and DCA strategies" },
  { name: "Templar Protocol",   cat: "DeFi",             desc: "Lending protocol via chain abstraction" },
  { name: "NEAR Intents",       cat: "Infrastructure",   desc: "Multichain settlement replacing centralized exchanges" },
  { name: "NEAR AI",            cat: "Infrastructure",   desc: "User-owned AI cloud and agent marketplace" },
  { name: "HOT Wallet",         cat: "Infrastructure",   desc: "Chain signature protocol and wallet" },
  { name: "Near Blocks",        cat: "Infrastructure",   desc: "Blockchain explorer and onchain analytics" },
  { name: "Near Mobile Wallet", cat: "Infrastructure",   desc: "Mobile crypto management with pre-staking" },
  { name: "Pikespeak",          cat: "Infrastructure",   desc: "Web3 data visualization and analytics" },
  { name: "Aurora Labs",        cat: "Infrastructure",   desc: "EVM-compatible blockchain built on NEAR" },
  { name: "Fast NEAR",          cat: "Infrastructure",   desc: "High-performance infrastructure for NEAR" },
  { name: "IronClaw",           cat: "AI",               desc: "Secure AI agent platform in encrypted enclaves" },
  { name: "Public AI",          cat: "AI",               desc: "Human data contribution for AI training with revenue sharing" },
  { name: "NEAR Legion",        cat: "AI",               desc: "AI-first community and city node infrastructure" },
  { name: "Degen Arena",        cat: "Gaming",           desc: "Competitive blockchain gaming experience" },
  { name: "Moon Shot",          cat: "Gaming",           desc: "Cross-chain crash game" },
  { name: "Wars Of Cards",      cat: "Gaming",           desc: "Card collection and strategy gameplay" },
  { name: "Pumpopoly",          cat: "Gaming",           desc: "Virtual real estate and crypto game" },
  { name: "Hot Craft",          cat: "NFT & Marketplace", desc: "Chain-abstracted NFT marketplace" },
  { name: "Namesky",            cat: "NFT & Marketplace", desc: "NEAR account names traded as NFTs" },
  { name: "DeFiShards",         cat: "NFT & Marketplace", desc: "Combined DeFi and NFT platform" },
  { name: "SWEAT",              cat: "Community",        desc: "Fitness app converting movement to digital currency" },
  { name: "POTLOCK",            cat: "Community",        desc: "Public goods funding on NEAR" },
  { name: "NEAR FM",            cat: "Community",        desc: "Decentralized AI music radio" },
  { name: "NEAR Treasury",      cat: "Community",        desc: "DAO treasury management dashboard" },
];

const FEATURED = [
  { name: "NEAR Intents",    tag: "Infrastructure", stat: "$19B+",  statLabel: "cross-chain volume",    img: "/img/image%2012.png" },
  { name: "Ref Finance",     tag: "DeFi",           stat: "#1",     statLabel: "DEX on NEAR",           img: "/img/image%2014.png" },
  { name: "NEAR AI",         tag: "AI",             stat: "100%",   statLabel: "private inference",     img: "/img/image%2019.png" },
  { name: "Meta Pool",       tag: "DeFi",           stat: "35+",    statLabel: "chains supported",      img: "/img/image%2020.png" },
  { name: "IronClaw",        tag: "AI",             stat: "TEE",    statLabel: "hardware security",     img: "/img/image%2021.png" },
  { name: "SWEAT",           tag: "Community",      stat: "10M+",   statLabel: "users onboarded",       img: "/img/image%2026.png" },
];

const BAR_DATA = [
  { label: "DeFi",           count: 8,  pct: 80 },
  { label: "Infrastructure", count: 8,  pct: 80 },
  { label: "AI",             count: 3,  pct: 30 },
  { label: "Gaming",         count: 4,  pct: 40 },
  { label: "NFT",            count: 3,  pct: 30 },
  { label: "Community",      count: 4,  pct: 40 },
];

const TILT_CARDS = [
  { img: "/img/image%2020.png", label: "NEAR Intents",   desc: "$19B in cross-chain volume" },
  { img: "/img/image%2021.png", label: "NEAR AI",        desc: "Private inference in TEEs" },
  { img: "/img/image%2026.png", label: "IronClaw",       desc: "Hardware-secured agent enclaves" },
];

const ORBIT_ITEMS = ["NEAR", "AI", "DeFi", "TEE", "Chain", "Agent", "Privacy", "Intents"];

const DRAGGABLE_CARDS = PROJECTS.slice(0, 8);
const MARQUEE_NAMES = PROJECTS.map((p) => p.name);

export default function Exp3() {
  const containerRef      = useRef<HTMLDivElement>(null);
  const hSectionRef       = useRef<HTMLDivElement>(null);
  const hTrackRef         = useRef<HTMLDivElement>(null);
  const marqueeRef        = useRef<HTMLDivElement>(null);
  const marqueeRef2       = useRef<HTMLDivElement>(null);
  const motionDotRef      = useRef<HTMLDivElement>(null);
  const motionDotTrailRef = useRef<HTMLDivElement>(null);
  const carouselRef       = useRef<HTMLDivElement>(null);
  const carouselTrackRef  = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState("All");

  const visible = activeCategory === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === activeCategory);

  const border  = "1px solid var(--color-border-dark)";
  const pad     = "var(--section-padding-h)";
  const padV    = "var(--section-padding-v)";
  const sm      = "var(--font-size-small)";
  const sec     = "var(--color-text-secondary)";
  const acc     = "var(--color-accent)";
  const teal    = "var(--color-accent-teal)";

  const CATEGORY_MARQUEE = "DeFi · Infrastructure · AI · Gaming · NFT & Marketplace · Community · DeFi · Infrastructure · AI · Gaming · NFT & Marketplace · Community";

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ── NO-PREFERENCE BRANCH ────────────────────────────────────────────────
    mm.add("(prefers-reduced-motion: no-preference)", () => {

      // ── S1: Hero — rotateY stagger + animated geo shapes ──────────────────
      gsap.fromTo(
        ".e3-hero-line",
        { rotateY: 90, opacity: 0, transformOrigin: "left center", transformPerspective: 800 },
        { rotateY: 0, opacity: 1, duration: 0.75, ease: "power3.out", stagger: 0.12, delay: 0.1 }
      );
      gsap.fromTo(
        ".e3-hero-sub",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.55 }
      );
      gsap.fromTo(
        ".e3-stat-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.15, delay: 0.7 }
      );
      gsap.fromTo(
        ".e3-hero-cta",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1, delay: 0.9 }
      );

      // Geometric shape continuous rotations
      gsap.to(".geo-shape-1", { rotation: 360,  duration: 20, ease: "none", repeat: -1 });
      gsap.to(".geo-shape-2", { rotation: -360, duration: 15, ease: "none", repeat: -1 });
      gsap.to(".geo-shape-3", { rotation: 360,  duration: 40, ease: "none", repeat: -1 });
      gsap.to(".geo-shape-4", { rotation: -360, duration: 8,  ease: "none", repeat: -1 });

      // ── S2: Dual-direction marquee ─────────────────────────────────────────
      const mq1 = marqueeRef.current;
      const mq2 = marqueeRef2.current;
      if (mq1 && mq2) {
        const tween1 = gsap.to(mq1, { x: "-50%", duration: 28, ease: "none", repeat: -1 });
        const tween2 = gsap.to(mq2, { x: "50%",  duration: 18, ease: "none", repeat: -1 });
        const wrap = mq1.closest(".marquee-wrap") as HTMLElement | null;
        wrap?.addEventListener("mouseenter", () => { tween1.pause(); tween2.pause(); });
        wrap?.addEventListener("mouseleave", () => { tween1.play();  tween2.play();  });
      }

      // ── S3: ScrollTrigger.batch stagger ────────────────────────────────────
      ScrollTrigger.batch(".proj-card", {
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, stagger: 0.09, duration: 0.65, ease: "power3.out", overwrite: true }
          ),
        once: true,
        start: "top 87%",
        batchMax: 5,
      });

      // ── S4: Horizontal scroll pinned ───────────────────────────────────────
      const track   = hTrackRef.current;
      const section = hSectionRef.current;
      if (track && section) {
        const totalShift = track.scrollWidth - section.offsetWidth;
        gsap.to(track, {
          x: -totalShift,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalShift}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
      }

      // ── S5: Bar chart scaleY ───────────────────────────────────────────────
      gsap.fromTo(
        ".bar-fill",
        { scaleY: 0, transformOrigin: "bottom" },
        {
          scaleY: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".chart-section", start: "top 75%", once: true },
        }
      );

      // ── S6: Stacked cards peel on scroll ──────────────────────────────────
      const peelCards = gsap.utils.toArray<HTMLElement>(".peel-card");
      const peelTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".peel-section",
          start: "top top",
          end: `+=${peelCards.length * 500}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });
      peelCards.forEach((card, i) => {
        if (i === peelCards.length - 1) return;
        peelTl.to(card, { y: -130, rotate: -4, opacity: 0, scale: 0.88, duration: 1, ease: "power2.inOut" });
      });

      // ── S7: 3D mouse-follow tilt + glare ──────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".tilt-card").forEach((card) => {
        const glare = card.querySelector<HTMLElement>(".tilt-glare");
        const handleMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left)  / r.width  - 0.5;
          const y = (e.clientY - r.top)   / r.height - 0.5;
          gsap.to(card, {
            rotateY: x * 22,
            rotateX: -y * 22,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 600,
            transformStyle: "preserve-3d",
          });
          if (glare) {
            gsap.to(glare, {
              left: (x + 0.5) * 100 + "%",
              top:  (y + 0.5) * 100 + "%",
              duration: 0.3,
            });
          }
        };
        const handleLeave = () => {
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power2.out" });
          if (glare) gsap.to(glare, { left: "50%", top: "50%", duration: 0.6 });
        };
        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", handleLeave);
        return () => {
          card.removeEventListener("mousemove", handleMove);
          card.removeEventListener("mouseleave", handleLeave);
        };
      });

      // ── S8: MotionPath — dot + trail follow SVG path ───────────────────────
      gsap.to(motionDotRef.current, {
        motionPath: {
          path: "#motion-path-svg",
          align: "#motion-path-svg",
          autoRotate: false,
          alignOrigin: [0.5, 0.5],
        },
        duration: 6,
        ease: "none",
        repeat: -1,
      });
      gsap.to(motionDotTrailRef.current, {
        motionPath: {
          path: "#motion-path-svg",
          align: "#motion-path-svg",
          autoRotate: false,
          alignOrigin: [0.5, 0.5],
        },
        duration: 6,
        ease: "none",
        repeat: -1,
        delay: 0.35,
      });

      // ── S9: Dual-ring orbiting elements ───────────────────────────────────
      // Inner ring (8 items, radius 140, clockwise)
      gsap.utils.toArray<HTMLElement>(".orbit-item").forEach((item, i) => {
        const angle  = (i / ORBIT_ITEMS.length) * 360;
        const radius = 140;
        const rad    = (angle * Math.PI) / 180;
        gsap.set(item, { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius });
        gsap.to(item, {
          rotation: `+=${360}`,
          duration: 14 + i * 0.6,
          ease: "none",
          repeat: -1,
          transformOrigin: `${-Math.cos(rad) * radius}px ${-Math.sin(rad) * radius}px`,
        });
      });

      // Outer ring (5 items, radius 220, counter-clockwise)
      const outerItems = ["SDK", "Rust", "TypeScript", "React", "Python"];
      gsap.utils.toArray<HTMLElement>(".orbit-outer-item").forEach((item, i) => {
        const angle  = (i / outerItems.length) * 360;
        const radius = 220;
        const rad    = (angle * Math.PI) / 180;
        gsap.set(item, { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius });
        gsap.to(item, {
          rotation: `-=${360}`,
          duration: 22 + i * 1.2,
          ease: "none",
          repeat: -1,
          transformOrigin: `${-Math.cos(rad) * radius}px ${-Math.sin(rad) * radius}px`,
        });
      });

      // ── S10: Draggable carousel ───────────────────────────────────────────
      const dragTrack = carouselTrackRef.current;
      const dragCont  = carouselRef.current;
      if (dragTrack && dragCont) {
        const maxX = -(dragTrack.scrollWidth - dragCont.offsetWidth);
        Draggable.create(dragTrack, {
          type: "x",
          bounds: { minX: maxX, maxX: 0 },
          inertia: false,
          edgeResistance: 0.85,
          snap: {
            x: (value: number) => {
              const cardW = 320 + 16;
              return Math.round(value / cardW) * cardW;
            },
          },
        });
      }
    });

    // ── REDUCED-MOTION BRANCH ────────────────────────────────────────────────
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".e3-hero-line",  { rotateY: 0, opacity: 1 });
      gsap.set(".e3-hero-sub",   { opacity: 1, y: 0 });
      gsap.set(".e3-stat-badge", { opacity: 1, y: 0 });
      gsap.set(".e3-hero-cta",   { opacity: 1, y: 0 });
      gsap.set(".proj-card",     { opacity: 1, y: 0 });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ background: "#000", color: "#fff", fontFamily: "var(--font-family-primary)" }}>

      {/* ── S1: Hero ─────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "90vh", display: "flex", alignItems: "center", padding: `120px ${pad} 80px` }}>

        {/* Background image */}
        <img
          src="/img/Frame%2053.png"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.15, pointerEvents: "none" }}
        />

        {/* Dark gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 100%)", pointerEvents: "none" }} />

        {/* Geometric animated shapes */}
        <div
          className="geo-shape-1"
          style={{ position: "absolute", top: "10%", right: "15%", width: 300, height: 300, border: "1px solid rgba(0,236,151,0.15)", borderRadius: 4, pointerEvents: "none" }}
        />
        <div
          className="geo-shape-2"
          style={{ position: "absolute", top: "20%", right: "20%", width: 200, height: 200, border: "1px solid rgba(23,217,212,0.1)", borderRadius: 4, pointerEvents: "none" }}
        />
        <div
          className="geo-shape-3"
          style={{ position: "absolute", top: "-5%", right: "-5%", width: 500, height: 500, border: "1px solid rgba(0,236,151,0.05)", borderRadius: 4, pointerEvents: "none" }}
        />
        <div
          className="geo-shape-4"
          style={{ position: "absolute", bottom: "20%", right: "30%", width: 150, height: 150, border: "1px solid rgba(23,217,212,0.12)", borderRadius: 4, pointerEvents: "none" }}
        />

        {/* Content row */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "flex-start", justifyContent: "space-between", width: "100%", maxWidth: "var(--content-max-width)", gap: 80 }}>

          {/* Left: headline + sub + CTAs */}
          <div style={{ flex: "1 1 0" }}>
            <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 24 }}>Ecosystem</p>
            <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 400, lineHeight: 1.0, margin: "0 0 32px", maxWidth: 760, perspective: 800 }}>
              {["Connect with developers,", "founders, and AI-focused", "projects."].map((line, i) => (
                <span key={i} className="e3-hero-line" style={{ display: "block", opacity: 0 }}>{line}</span>
              ))}
            </h1>
            <p
              className="e3-hero-sub"
              style={{ fontSize: "var(--font-size-body-lg)", lineHeight: "var(--line-height-body-lg)", color: sec, maxWidth: 520, opacity: 0, marginBottom: 40 }}
            >
              Unlock autonomous transactions, secure compute, and a new era of decentralized intelligence with NEAR.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                className="e3-hero-cta"
                style={{ opacity: 0, padding: "12px 28px", background: acc, color: "#000", border: "none", borderRadius: 0, fontSize: "var(--font-size-body)", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-family-primary)", letterSpacing: "0.01em" }}
              >
                Explore projects →
              </button>
              <button
                className="e3-hero-cta"
                style={{ opacity: 0, padding: "12px 28px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 0, fontSize: "var(--font-size-body)", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-family-primary)", letterSpacing: "0.01em" }}
              >
                Submit your project
              </button>
            </div>
          </div>

          {/* Right: stat badges */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 220, flexShrink: 0, paddingTop: 8 }}>
            {[
              { value: "30+",       label: "projects",      sub: "across 6 categories" },
              { value: "6",         label: "categories",    sub: "DeFi · AI · Gaming +" },
              { value: "Growing",   label: "daily",         sub: "Submit yours today" },
            ].map((badge, i) => (
              <div
                key={i}
                className="e3-stat-badge"
                style={{ opacity: 0, padding: "16px 24px", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 4, backdropFilter: "blur(4px)", background: "rgba(255,255,255,0.04)" }}
              >
                <div style={{ fontSize: "clamp(28px,3vw,40px)", fontWeight: 400, color: "#fff", lineHeight: 1.0, marginBottom: 4 }}>
                  <span style={{ color: acc }}>{badge.value}</span> {badge.label}
                </div>
                <div style={{ fontSize: sm, color: sec, fontFamily: "var(--font-family-secondary)" }}>{badge.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S2: Dual-direction marquee ───────────────────────────────────── */}
      <div className="marquee-wrap" style={{ borderTop: border, borderBottom: border }}>
        {/* Row 1 — left to right, slower */}
        <div style={{ overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "16px 0" }}>
          <div ref={marqueeRef} style={{ display: "flex", width: "max-content" }}>
            {[...MARQUEE_NAMES, ...MARQUEE_NAMES].map((name, i) => (
              <span
                key={i}
                style={{ fontSize: sm, color: sec, whiteSpace: "nowrap", padding: "0 28px", borderRight: "1px solid rgba(255,255,255,0.12)", fontFamily: "var(--font-family-secondary)" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
        {/* Row 2 — right to left, faster, dimmer, smaller */}
        <div style={{ overflow: "hidden", padding: "12px 0" }}>
          <div ref={marqueeRef2} style={{ display: "flex", width: "max-content" }}>
            {[CATEGORY_MARQUEE, CATEGORY_MARQUEE].map((chunk, ci) =>
              chunk.split(" · ").map((cat, i) => (
                <span
                  key={`${ci}-${i}`}
                  style={{ fontSize: 12, color: "rgba(117,117,117,0.5)", whiteSpace: "nowrap", padding: "0 20px", borderRight: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-family-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}
                >
                  {cat}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── S3: Project grid — batch stagger with filter ─────────────────── */}
      <section style={{ padding: `80px ${pad}` }}>
        {/* Filter pills */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "6px 18px",
                  border: "1px solid",
                  borderColor: isActive ? acc : "var(--color-border-dark)",
                  background: isActive ? acc : "transparent",
                  color: isActive ? "#000" : sec,
                  borderRadius: "var(--border-radius)",
                  fontSize: sm,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "var(--font-family-primary)",
                  transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: isActive ? "scale(1.04)" : "scale(1)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project count */}
        <p style={{ fontSize: sm, color: sec, marginBottom: 32, fontFamily: "var(--font-family-secondary)" }}>
          Showing {visible.length} of {PROJECTS.length} projects
        </p>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "var(--color-border-dark)",
            border,
            maxWidth: "var(--content-max-width)",
          }}
        >
          {visible.map((proj) => (
            <div
              key={proj.name}
              className="proj-card"
              style={{ padding: 32, background: "#000", opacity: 0, cursor: "pointer", position: "relative", transition: "background 0.2s ease, border-color 0.2s ease" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "#0a0a0a";
                const arrow = e.currentTarget.querySelector<HTMLElement>(".proj-arrow");
                if (arrow) arrow.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "#000";
                const arrow = e.currentTarget.querySelector<HTMLElement>(".proj-arrow");
                if (arrow) arrow.style.opacity = "0";
              }}
            >
              {/* Category badge top-right */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <p style={{ fontWeight: 600, fontSize: "var(--font-size-body)", marginRight: 8 }}>{proj.name}</p>
                <span
                  style={{ fontSize: 11, padding: "2px 8px", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 2, color: sec, fontFamily: "var(--font-family-secondary)", whiteSpace: "nowrap", flexShrink: 0 }}
                >
                  {proj.cat}
                </span>
              </div>
              <p style={{ fontSize: sm, color: sec, lineHeight: "var(--line-height-small)", marginBottom: 20 }}>{proj.desc}</p>
              <div
                className="proj-arrow"
                style={{ fontSize: sm, color: acc, opacity: 0, transition: "opacity 0.2s ease", fontFamily: "var(--font-family-secondary)" }}
              >
                View project →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── S4: Horizontal scroll pinned ────────────────────────────────── */}
      <section ref={hSectionRef} style={{ height: "100vh", overflow: "hidden", borderTop: border, position: "relative" }}>
        <div style={{ position: "absolute", top: 48, left: pad, zIndex: 10 }}>
          <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Featured projects — scroll →</p>
        </div>
        <div
          ref={hTrackRef}
          style={{ display: "flex", height: "100%", alignItems: "center", paddingLeft: pad, gap: 24, width: "max-content" }}
        >
          {FEATURED.map((proj) => (
            <div
              key={proj.name}
              style={{
                width: 380,
                height: 560,
                background: "#0a0a0a",
                border,
                borderRadius: "var(--border-radius)",
                display: "flex",
                flexDirection: "column",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              {/* Image top half */}
              <img
                src={proj.img}
                alt={proj.name}
                style={{ width: "100%", height: 220, objectFit: "cover", borderBottom: "1px solid rgba(255,255,255,0.12)", display: "block" }}
              />
              {/* Content bottom half */}
              <div style={{ padding: "28px 32px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                <div>
                  <span style={{ fontSize: 11, padding: "3px 10px", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 2, color: sec, fontFamily: "var(--font-family-secondary)" }}>{proj.tag}</span>
                  <h3 style={{ fontSize: "var(--font-size-h2)", fontWeight: 500, marginTop: 20, lineHeight: 1.1 }}>{proj.name}</h3>
                </div>
                <div>
                  <div style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 400, color: acc, lineHeight: 1, marginBottom: 8 }}>{proj.stat}</div>
                  <p style={{ fontSize: sm, color: sec }}>{proj.statLabel}</p>
                </div>
              </div>
            </div>
          ))}
          <div style={{ width: pad, flexShrink: 0 }} />
        </div>
      </section>

      {/* ── S5: Bar chart — Ecosystem by category ───────────────────────── */}
      <section className="chart-section" style={{ padding: `${padV} ${pad}`, borderTop: border }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Ecosystem by category</p>
        <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 500, marginBottom: 56, maxWidth: 480 }}>
          30 projects across 6 categories
        </h2>

        {/* Bar chart */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 24, height: 220, maxWidth: 680, marginBottom: 48 }}>
          {BAR_DATA.map((b) => (
            <div key={b.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
              <span style={{ fontSize: 12, color: acc, fontFamily: "var(--font-family-secondary)", marginBottom: 8, fontWeight: 600 }}>{b.count}</span>
              <div style={{ width: "100%", flex: 1, display: "flex", alignItems: "flex-end" }}>
                <div
                  className="bar-fill"
                  style={{
                    width: "100%",
                    height: `${b.pct}%`,
                    background: `linear-gradient(to top, ${acc}, rgba(0,236,151,0.25))`,
                    borderRadius: "2px 2px 0 0",
                  }}
                />
              </div>
              <span style={{ fontSize: 11, color: sec, textAlign: "center", fontFamily: "var(--font-family-secondary)", marginTop: 10 }}>{b.label}</span>
            </div>
          ))}
        </div>

        {/* Category pills */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {BAR_DATA.map((b) => (
            <span
              key={b.label}
              style={{ padding: "6px 16px", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 2, fontSize: sm, color: sec, fontFamily: "var(--font-family-secondary)" }}
            >
              {b.label} <span style={{ color: acc, marginLeft: 6, fontWeight: 600 }}>{b.count}</span>
            </span>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "rgba(117,117,117,0.5)", fontFamily: "var(--font-family-secondary)" }}>
          Data from NEAR Catalog — June 2026
        </p>
      </section>

      {/* ── S6: Stacked cards peel — Community voices ───────────────────── */}
      <section className="peel-section" style={{ height: "100vh", overflow: "hidden", position: "relative", borderTop: border }}>
        <p style={{ position: "absolute", top: 48, left: pad, fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, zIndex: 10 }}>Community voices</p>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {[
            {
              text: "NEAR Intents changed how we think about cross-chain UX. Nothing else comes close.",
              author: "— Brave team",
              bg: "#fff",
              color: "#000",
              accent: "#000",
            },
            {
              text: "Private inference with hardware guarantees. IronClaw sets the new standard for secure AI.",
              author: "— Venice AI",
              bg: "#0a0a0a",
              color: "#fff",
              accent: acc,
            },
            {
              text: "The governance model on NEAR is the most mature in the industry. We are proud to build here.",
              author: "— Abound",
              bg: "#111",
              color: "#fff",
              accent: teal,
            },
          ].map((card, i) => (
            <div
              key={i}
              className="peel-card"
              style={{
                position: "absolute",
                width: 580,
                padding: "52px 48px",
                background: card.bg,
                color: card.color,
                border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.1)",
                borderTop: i > 0 ? `3px solid ${card.accent}` : "none",
                borderRadius: 4,
                zIndex: 10 - i,
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) translateY(${i * 10}px) scale(${1 - i * 0.03})`,
                boxShadow: i === 0 ? "0 32px 80px rgba(0,0,0,0.6)" : "none",
              }}
            >
              {/* Large opening quote mark */}
              <div style={{ fontSize: 96, lineHeight: 0.6, color: i === 0 ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.08)", fontFamily: "Georgia, serif", marginBottom: 24, marginLeft: -4, userSelect: "none" }}>
                &ldquo;
              </div>
              <p style={{ fontSize: "var(--font-size-h2-article)", fontWeight: 400, lineHeight: "var(--line-height-h2-article)", marginBottom: 28 }}>
                {card.text}
              </p>
              <p style={{ fontSize: sm, opacity: 0.55, fontFamily: "var(--font-family-secondary)" }}>{card.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── S7: 3D mouse tilt gallery ───────────────────────────────────── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Gallery — hover to tilt</p>
        <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 500, marginBottom: 56, maxWidth: 480 }}>
          Three pillars of the NEAR ecosystem
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: "var(--content-max-width)" }}>
          {TILT_CARDS.map((card) => (
            <div
              key={card.label}
              className="tilt-card"
              style={{ aspectRatio: "4/5", overflow: "hidden", borderRadius: 4, position: "relative", cursor: "pointer", border }}
            >
              <img
                src={card.img}
                alt={card.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none", display: "block" }}
              />
              {/* Shine/glare overlay */}
              <div
                className="tilt-glare"
                style={{
                  position: "absolute",
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
                  transform: "translate(-50%, -50%)",
                  left: "50%",
                  top: "50%",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              />
              {/* Label + description overlay */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 24px", background: "linear-gradient(transparent, rgba(0,0,0,0.88))", zIndex: 3 }}>
                <p style={{ fontWeight: 600, fontSize: "var(--font-size-body)", marginBottom: 6 }}>{card.label}</p>
                <p style={{ fontSize: sm, color: sec, fontFamily: "var(--font-family-secondary)" }}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── S8: MotionPath — value flows across chains ───────────────────── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border, position: "relative", minHeight: "60vh", overflow: "hidden" }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 24 }}>NEAR in motion</p>
        <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 500, maxWidth: 480, marginBottom: 56 }}>
          Value flows across chains, continuously.
        </h2>

        <div style={{ position: "relative", width: "100%", height: 320 }}>
          <svg
            width="100%"
            height="320"
            viewBox="0 0 1200 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: "visible" }}
          >
            {/* Main path */}
            <path
              id="motion-path-svg"
              d="M 0 160 C 200 60, 400 260, 600 160 S 1000 60, 1200 160"
              stroke="rgba(0,236,151,0.4)"
              strokeWidth="2"
              fill="none"
            />
            {/* Node: Ethereum at 25% */}
            <circle cx="290" cy="110" r="6" fill="rgba(0,236,151,0.6)" />
            <text x="300" y="106" fontSize="13" fill="rgba(255,255,255,0.55)" fontFamily="var(--font-family-secondary)">Ethereum</text>
            <line x1="290" y1="116" x2="290" y2="126" stroke="rgba(0,236,151,0.3)" strokeWidth="1" />
            {/* Node: NEAR at 50% */}
            <circle cx="600" cy="160" r="8" fill={acc} />
            <text x="614" y="156" fontSize="13" fill="rgba(255,255,255,0.75)" fontFamily="var(--font-family-secondary)" fontWeight="600">NEAR</text>
            {/* Node: Solana at 75% */}
            <circle cx="910" cy="110" r="6" fill="rgba(23,217,212,0.6)" />
            <text x="920" y="106" fontSize="13" fill="rgba(255,255,255,0.55)" fontFamily="var(--font-family-secondary)">Solana</text>
            <line x1="910" y1="116" x2="910" y2="126" stroke="rgba(23,217,212,0.3)" strokeWidth="1" />
          </svg>

          {/* Trail dot (slightly larger, lower opacity, delayed) */}
          <div
            ref={motionDotTrailRef}
            style={{ position: "absolute", top: 0, left: 0, width: 18, height: 18, borderRadius: "50%", background: `rgba(0,236,151,0.25)`, marginLeft: -9, marginTop: -9, pointerEvents: "none" }}
          />
          {/* Main dot */}
          <div
            ref={motionDotRef}
            style={{ position: "absolute", top: 0, left: 0, width: 12, height: 12, borderRadius: "50%", background: acc, marginLeft: -6, marginTop: -6, boxShadow: `0 0 20px ${acc}, 0 0 40px rgba(0,236,151,0.4)`, pointerEvents: "none" }}
          />
        </div>

        <p style={{ fontSize: "var(--font-size-body)", color: sec, marginTop: 32 }}>
          35+ chains connected through NEAR Intents
        </p>
      </section>

      {/* ── S9: Orbiting elements — The NEAR community ──────────────────── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>The NEAR community</p>
        <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 500, textAlign: "center", maxWidth: 480, marginBottom: 80 }}>
          Built for a global developer community
        </h2>

        {/* Orbit diagram — 500px container to fit outer ring */}
        <div style={{ position: "relative", width: 500, height: 500, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 64 }}>
          {/* Outer concentric ring outline */}
          <div style={{ position: "absolute", width: 440, height: 440, borderRadius: "50%", border: "1px solid rgba(0,236,151,0.07)" }} />
          {/* Inner concentric ring outline */}
          <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", border: "1px solid rgba(0,236,151,0.12)" }} />

          {/* Center NEAR circle */}
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: acc, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#000", fontSize: 13, zIndex: 4 }}>
            NEAR
          </div>

          {/* Inner orbit ring items */}
          {ORBIT_ITEMS.map((label) => (
            <div
              key={label}
              className="orbit-item"
              style={{ position: "absolute", width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(0,236,151,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: acc, fontFamily: "var(--font-family-secondary)", background: "#000", zIndex: 3, letterSpacing: "0.02em" }}
            >
              {label}
            </div>
          ))}

          {/* Outer orbit ring items */}
          {["SDK", "Rust", "TypeScript", "React", "Python"].map((label) => (
            <div
              key={label}
              className="orbit-outer-item"
              style={{ position: "absolute", width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(23,217,212,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: teal, fontFamily: "var(--font-family-secondary)", background: "#000", zIndex: 3, letterSpacing: "0.02em", textAlign: "center" }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Developer stats row */}
        <div style={{ display: "flex", gap: 0, border, borderRadius: 4, overflow: "hidden", maxWidth: 640 }}>
          {[
            { label: "Rust/TypeScript SDK", sub: "First-class SDKs" },
            { label: "GraphQL indexer",     sub: "Chain data queries" },
            { label: "1-click deploy",      sub: "Instant dev setup" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{ flex: 1, padding: "24px 28px", borderRight: i < 2 ? border : "none", background: "#050505" }}
            >
              <p style={{ fontWeight: 600, fontSize: "var(--font-size-body)", marginBottom: 6 }}>{stat.label}</p>
              <p style={{ fontSize: sm, color: sec, fontFamily: "var(--font-family-secondary)" }}>{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── S10: Draggable carousel — Explore the ecosystem ─────────────── */}
      <section style={{ padding: `${padV} 0`, borderTop: border, overflow: "hidden" }}>
        <div style={{ paddingLeft: pad, marginBottom: 36 }}>
          <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Get building</p>
          <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 500 }}>
            Explore the ecosystem — <span style={{ color: sec, fontWeight: 400 }}>drag to explore</span>
          </h2>
        </div>

        <div ref={carouselRef} style={{ overflow: "hidden", paddingLeft: pad, cursor: "grab" }}>
          <div ref={carouselTrackRef} style={{ display: "flex", gap: 16, width: "max-content", paddingRight: pad, userSelect: "none" }}>
            {DRAGGABLE_CARDS.map((proj) => (
              <div
                key={proj.name}
                style={{ width: 320, padding: 32, border, background: "#0a0a0a", borderRadius: 4, flexShrink: 0 }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <p style={{ fontWeight: 600, fontSize: "var(--font-size-body)" }}>{proj.name}</p>
                  <span
                    style={{ fontSize: 11, padding: "2px 8px", background: "rgba(0,236,151,0.12)", color: acc, borderRadius: 2, fontFamily: "var(--font-family-secondary)", whiteSpace: "nowrap", marginLeft: 8, fontWeight: 600 }}
                  >
                    {proj.cat}
                  </span>
                </div>
                <p style={{ fontSize: sm, color: sec, lineHeight: "var(--line-height-small)" }}>{proj.desc}</p>
              </div>
            ))}

            {/* "+" submit card at the end */}
            <div
              style={{ width: 320, padding: 32, border: "1px dashed rgba(0,236,151,0.35)", background: "rgba(0,236,151,0.04)", borderRadius: 4, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 16 }}
            >
              <div style={{ fontSize: 40, color: acc, fontWeight: 300, lineHeight: 1 }}>+</div>
              <p style={{ fontWeight: 600, fontSize: "var(--font-size-body)" }}>Submit your project</p>
              <p style={{ fontSize: sm, color: sec, fontFamily: "var(--font-family-secondary)" }}>Join 30+ projects already building on NEAR</p>
              <button
                style={{ marginTop: 8, padding: "10px 24px", background: acc, color: "#000", border: "none", borderRadius: 0, fontSize: sm, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-family-primary)" }}
              >
                Submit →
              </button>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div
          style={{ margin: `64px ${pad} 0`, padding: "64px 56px", border, borderRadius: 4, background: "#050505", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}
        >
          <div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 12 }}>Ready to join?</h2>
            <p style={{ fontSize: "var(--font-size-body)", color: sec, maxWidth: 400 }}>
              Connect with the NEAR ecosystem and start building the next generation of decentralized applications.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
            <button
              style={{ padding: "14px 32px", background: acc, color: "#000", border: "none", borderRadius: 0, fontSize: "var(--font-size-body)", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-family-primary)" }}
            >
              Get started →
            </button>
            <button
              style={{ padding: "14px 32px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 0, fontSize: "var(--font-size-body)", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-family-primary)" }}
            >
              Browse all projects
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
