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
  { name: "NEAR Intents",    tag: "Infrastructure", stat: "$19B+", statLabel: "cross-chain volume" },
  { name: "Ref Finance",     tag: "DeFi",           stat: "#1",    statLabel: "DEX on NEAR" },
  { name: "NEAR AI",         tag: "AI",             stat: "100%",  statLabel: "private inference" },
  { name: "Meta Pool",       tag: "DeFi",           stat: "35+",   statLabel: "chains supported" },
  { name: "IronClaw",        tag: "AI",             stat: "TEE",   statLabel: "hardware security" },
  { name: "SWEAT",           tag: "Community",      stat: "10M+",  statLabel: "users onboarded" },
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
  { img: "/img/image%2020.png", label: "NEAR Intents" },
  { img: "/img/image%2021.png", label: "NEAR AI" },
  { img: "/img/image%2026.png", label: "IronClaw" },
];

const ORBIT_ITEMS = ["NEAR", "AI", "DeFi", "TEE", "Chain", "Agent", "Privacy", "Intents"];

const DRAGGABLE_CARDS = PROJECTS.slice(0, 8);
const MARQUEE_NAMES = PROJECTS.map((p) => p.name);

export default function Exp3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hSectionRef = useRef<HTMLDivElement>(null);
  const hTrackRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const motionDotRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const visible = activeCategory === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === activeCategory);

  const border = "1px solid var(--color-border-dark)";
  const pad = "var(--section-padding-h)";
  const padV = "var(--section-padding-v)";
  const sm = "var(--font-size-small)";
  const sec = "var(--color-text-secondary)";
  const acc = "var(--color-accent)";

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {

      // ── S1: rotateY per-line stagger hero ──
      gsap.fromTo(".e3-hero-line",
        { rotateY: 90, opacity: 0, transformOrigin: "left center", transformPerspective: 800 },
        { rotateY: 0, opacity: 1, duration: 0.75, ease: "power3.out", stagger: 0.12, delay: 0.1 }
      );
      gsap.fromTo(".e3-hero-sub",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.55 }
      );

      // ── S2: Marquee ──
      const mq = marqueeRef.current;
      if (mq) {
        const tween = gsap.to(mq, { x: "-50%", duration: 28, ease: "none", repeat: -1 });
        const parent = mq.parentElement;
        parent?.addEventListener("mouseenter", () => tween.pause());
        parent?.addEventListener("mouseleave", () => tween.play());
      }

      // ── S3: ScrollTrigger.batch stagger ──
      ScrollTrigger.batch(".proj-card", {
        onEnter: (els) => gsap.fromTo(els,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, stagger: 0.09, duration: 0.65, ease: "power3.out", overwrite: true }
        ),
        once: true, start: "top 87%", batchMax: 5,
      });

      // ── S4: Horizontal scroll pinned ──
      const track = hTrackRef.current;
      const section = hSectionRef.current;
      if (track && section) {
        const totalShift = track.scrollWidth - section.offsetWidth;
        gsap.to(track, {
          x: -totalShift, ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: () => `+=${totalShift}`, scrub: 1, pin: true, anticipatePin: 1 },
        });
      }

      // ── S5: Animated bar chart (scaleY from 0) ──
      gsap.fromTo(".bar-fill",
        { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 1, stagger: 0.1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".chart-section", start: "top 75%", once: true } }
      );

      // ── S6: Stacked cards peel on scroll ──
      const peelCards = gsap.utils.toArray<HTMLElement>(".peel-card");
      const peelTl = gsap.timeline({
        scrollTrigger: { trigger: ".peel-section", start: "top top", end: `+=${peelCards.length * 500}`, pin: true, scrub: 0.6, anticipatePin: 1 },
      });
      peelCards.forEach((card, i) => {
        if (i === peelCards.length - 1) return;
        peelTl.to(card, { y: -120, rotate: -4, opacity: 0, scale: 0.9, duration: 1, ease: "power2.inOut" });
      });

      // ── S7: 3D mouse-follow tilt ──
      gsap.utils.toArray<HTMLElement>(".tilt-card").forEach((card) => {
        const handleMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, { rotateY: x * 22, rotateX: -y * 22, duration: 0.3, ease: "power2.out", transformPerspective: 600, transformStyle: "preserve-3d" });
        };
        const handleLeave = () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power2.out" });
        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", handleLeave);
        return () => { card.removeEventListener("mousemove", handleMove); card.removeEventListener("mouseleave", handleLeave); };
      });

      // ── S8: MotionPath — dot follows SVG path ──
      gsap.to(motionDotRef.current, {
        motionPath: { path: "#motion-path-svg", align: "#motion-path-svg", autoRotate: false, alignOrigin: [0.5, 0.5] },
        duration: 6, ease: "none", repeat: -1,
      });

      // ── S9: Orbiting logos ──
      gsap.utils.toArray<HTMLElement>(".orbit-item").forEach((item, i) => {
        const angle = (i / ORBIT_ITEMS.length) * 360;
        const radius = 160;
        const rad = (angle * Math.PI) / 180;
        gsap.set(item, { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius });
        gsap.to(item, {
          rotation: `+=${360}`,
          duration: 12 + i * 0.8,
          ease: "none", repeat: -1,
          transformOrigin: `${-Math.cos(rad) * radius}px ${-Math.sin(rad) * radius}px`,
        });
      });

      // ── S10: Draggable carousel ──
      const dragTrack = carouselTrackRef.current;
      const container = carouselRef.current;
      if (dragTrack && container) {
        const maxX = -(dragTrack.scrollWidth - container.offsetWidth);
        Draggable.create(dragTrack, {
          type: "x",
          bounds: { minX: maxX, maxX: 0 },
          inertia: false,
          edgeResistance: 0.85,
          snap: {
            x: (value) => {
              const cardW = 300 + 16;
              return Math.round(value / cardW) * cardW;
            },
          },
        });
      }
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".e3-hero-line", { rotateY: 0, opacity: 1 });
      gsap.set([".e3-hero-sub", ".proj-card"], { opacity: 1, y: 0 });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ background: "#000", color: "#fff" }}>

      {/* ── S1: Hero — rotateY per line ── */}
      <section style={{ padding: `120px ${pad} 80px` }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 24 }}>Ecosystem</p>
        <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 400, lineHeight: 1.0, margin: "0 0 32px", maxWidth: 760, perspective: 800 }}>
          {["Connect with developers,", "founders, and AI-focused", "projects."].map((l, i) => (
            <span key={i} className="e3-hero-line" style={{ display: "block", opacity: 0 }}>{l}</span>
          ))}
        </h1>
        <p className="e3-hero-sub" style={{ fontSize: "var(--font-size-body-lg)", lineHeight: "var(--line-height-body-lg)", color: sec, maxWidth: 560, opacity: 0 }}>
          Unlock autonomous transactions, secure compute, and a new era of decentralized intelligence with NEAR.
        </p>
      </section>

      {/* ── S2: Marquee ── */}
      <div style={{ overflow: "hidden", borderTop: border, borderBottom: border, padding: "18px 0" }}>
        <div ref={marqueeRef} style={{ display: "flex", width: "max-content" }}>
          {[...MARQUEE_NAMES, ...MARQUEE_NAMES].map((name, i) => (
            <span key={i} style={{ fontSize: sm, color: sec, whiteSpace: "nowrap", padding: "0 28px", borderRight: border, fontFamily: "var(--font-family-secondary)" }}>{name}</span>
          ))}
        </div>
      </div>

      {/* ── S3: Project grid — batch stagger ── */}
      <section style={{ padding: `80px ${pad}` }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ padding: "6px 16px", border: "1px solid", borderColor: activeCategory === cat ? acc : "var(--color-border-dark)", background: activeCategory === cat ? acc : "transparent", color: activeCategory === cat ? "#000" : sec, borderRadius: "var(--border-radius)", fontSize: sm, fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-family-primary)", transition: "all var(--btn-primary-transition)" }}>
              {cat}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "var(--color-border-dark)", border, maxWidth: "var(--content-max-width)" }}>
          {visible.map((proj) => (
            <div key={proj.name} className="proj-card" style={{ padding: 32, background: "#000", opacity: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <p style={{ fontWeight: 600, fontSize: "var(--font-size-body)" }}>{proj.name}</p>
                <span style={{ fontSize: 11, padding: "2px 8px", border, borderRadius: 2, color: sec, fontFamily: "var(--font-family-secondary)", whiteSpace: "nowrap", marginLeft: 8 }}>{proj.cat}</span>
              </div>
              <p style={{ fontSize: sm, color: sec, lineHeight: "var(--line-height-small)" }}>{proj.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── S4: Horizontal scroll pinned ── */}
      <section ref={hSectionRef} style={{ height: "100vh", overflow: "hidden", borderTop: border }}>
        <div style={{ position: "absolute", top: 48, left: pad, zIndex: 10 }}>
          <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600 }}>Featured projects — scroll →</p>
        </div>
        <div ref={hTrackRef} style={{ display: "flex", height: "100%", alignItems: "center", paddingLeft: pad, gap: 24, width: "max-content" }}>
          {FEATURED.map((proj) => (
            <div key={proj.name} style={{ width: 420, height: 520, background: "#0a0a0a", border, borderRadius: "var(--border-radius)", padding: 40, display: "flex", flexDirection: "column", justifyContent: "space-between", flexShrink: 0 }}>
              <div>
                <span style={{ fontSize: 11, padding: "3px 10px", border, borderRadius: 2, color: sec }}>{proj.tag}</span>
                <h3 style={{ fontSize: "var(--font-size-h2)", fontWeight: 500, marginTop: 32, lineHeight: 1.1 }}>{proj.name}</h3>
              </div>
              <div>
                <div style={{ fontSize: "clamp(40px,4vw,64px)", fontWeight: 400, color: acc, lineHeight: 1, marginBottom: 8 }}>{proj.stat}</div>
                <p style={{ fontSize: sm, color: sec }}>{proj.statLabel}</p>
              </div>
            </div>
          ))}
          <div style={{ width: pad, flexShrink: 0 }} />
        </div>
      </section>

      {/* ── S5: Bar chart animation ── */}
      <section className="chart-section" style={{ padding: `${padV} ${pad}`, borderTop: border }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 48 }}>Ecosystem by category</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 24, height: 200, maxWidth: 700 }}>
          {BAR_DATA.map((b) => (
            <div key={b.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 11, color: acc, fontFamily: "var(--font-family-secondary)" }}>{b.count}</span>
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "flex-end" }}>
                <div className="bar-fill" style={{ width: "100%", height: `${b.pct}%`, background: `linear-gradient(to top, ${acc}, rgba(0,236,151,0.3))`, borderRadius: "2px 2px 0 0" }} />
              </div>
              <span style={{ fontSize: 11, color: sec, textAlign: "center" as const, fontFamily: "var(--font-family-secondary)" }}>{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── S6: Stacked cards peel on scroll ── */}
      <section className="peel-section" style={{ height: "100vh", overflow: "hidden", position: "relative", borderTop: border }}>
        <p style={{ position: "absolute", top: 48, left: pad, fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, zIndex: 10 }}>Community voices</p>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {[
            { text: "\"NEAR Intents changed how we think about cross-chain UX.\"", author: "— Brave team" },
            { text: "\"Private inference with hardware guarantees. Nothing else comes close.\"", author: "— Venice AI" },
            { text: "\"The governance model is the most mature in the industry.\"", author: "— Abound" },
          ].map((card, i) => (
            <div key={i} className="peel-card" style={{ position: "absolute", width: 560, padding: 48, background: i === 0 ? "#fff" : i === 1 ? "#0a0a0a" : "#111", color: i === 0 ? "#000" : "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, zIndex: 10 - i, top: "50%", left: "50%", transform: `translate(-50%, -50%) translateY(${i * 8}px) scale(${1 - i * 0.03})` }}>
              <p style={{ fontSize: "var(--font-size-h2-article)", fontWeight: 400, lineHeight: "var(--line-height-h2-article)", marginBottom: 24 }}>{card.text}</p>
              <p style={{ fontSize: sm, opacity: 0.6 }}>{card.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── S7: 3D mouse tilt gallery ── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 48 }}>Gallery — hover to tilt</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, maxWidth: "var(--content-max-width)" }}>
          {TILT_CARDS.map((card) => (
            <div key={card.label} className="tilt-card" style={{ aspectRatio: "4/5", overflow: "hidden", borderRadius: 4, position: "relative", cursor: "pointer", border }}>
              <img src={card.img} alt={card.label} style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24, background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}>
                <p style={{ fontWeight: 600 }}>{card.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── S8: MotionPath element follows SVG path ── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border, position: "relative", minHeight: "60vh", overflow: "hidden" }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 24 }}>NEAR in motion</p>
        <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 500, maxWidth: 480, marginBottom: 48 }}>
          Value flows across chains, continuously.
        </h2>
        <div style={{ position: "relative", width: "100%", height: 300 }}>
          <svg width="100%" height="300" viewBox="0 0 1200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="motion-path-svg" d="M 0 150 C 200 50, 400 250, 600 150 S 1000 50, 1200 150" stroke="rgba(0,236,151,0.25)" strokeWidth="1" fill="none" />
          </svg>
          <div ref={motionDotRef} style={{ position: "absolute", top: 0, left: 0, width: 12, height: 12, borderRadius: "50%", background: acc, marginLeft: -6, marginTop: -6, boxShadow: `0 0 16px ${acc}` }} />
        </div>
      </section>

      {/* ── S9: Orbiting logos ── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 24 }}>The NEAR community</p>
        <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 500, textAlign: "center" as const, maxWidth: 480, marginBottom: 80 }}>
          Built for a global ecosystem
        </h2>
        <div style={{ position: "relative", width: 360, height: 360, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: acc, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#000", fontSize: 14, zIndex: 2 }}>NEAR</div>
          {ORBIT_ITEMS.map((label, i) => (
            <div key={label} className="orbit-item" style={{ position: "absolute", width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(0,236,151,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: acc, fontFamily: "var(--font-family-secondary)", background: "#000" }}>
              {label}
            </div>
          ))}
          <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(0,236,151,0.1)" }} />
        </div>
      </section>

      {/* ── S10: Draggable carousel ── */}
      <section style={{ padding: `${padV} 0`, borderTop: border, overflow: "hidden" }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 24, paddingLeft: pad }}>Get building — drag to explore</p>
        <div ref={carouselRef} style={{ overflow: "hidden", paddingLeft: pad, cursor: "grab" }}>
          <div ref={carouselTrackRef} style={{ display: "flex", gap: 16, width: "max-content", paddingRight: pad, userSelect: "none" }}>
            {DRAGGABLE_CARDS.map((proj) => (
              <div key={proj.name} style={{ width: 300, padding: 32, border, background: "#0a0a0a", borderRadius: 4, flexShrink: 0 }}>
                <p style={{ fontWeight: 600, marginBottom: 8 }}>{proj.name}</p>
                <span style={{ fontSize: 11, color: acc, fontFamily: "var(--font-family-secondary)" }}>{proj.cat}</span>
                <p style={{ fontSize: sm, color: sec, marginTop: 12, lineHeight: "var(--line-height-small)" }}>{proj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
