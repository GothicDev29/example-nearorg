"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap/register";

const STACK = [
  { num: "01", label: "near.com", title: "Your onchain world in one interface", body: "Trade across 35+ chains and 150+ assets from one account. Toggle on Confidential Mode to execute inside a private shard. No manual gas juggling or bridging required.", tag: "35+ chains · 150+ assets" },
  { num: "02", label: "NEAR Intents", title: "Universal cross-chain execution", body: "Integrated by Ledger, Brave Wallet, Infinex, ThorSwap, HOT Wallet, and leading DeFi protocols for cross-chain execution with sub-cent fees and sub-second settlement.", tag: "$19B in volume to date" },
  { num: "03", label: "NEAR AI", title: "Private inference and a secure agent harness", body: "Deploy agents using the private inference infrastructure serving Abound, Brave, and Venice AI. IronClaw sandboxes tools and isolates credentials inside hardware-enforced TEEs.", tag: "Inference inside TEEs" },
  { num: "04", label: "NEAR Protocol", title: "The settlement layer for the agent economy", body: "Fully sharded, quantum-adaptive blockchain infrastructure with 100% uptime on mainnet for over 5 years. Supports 1 million TPS, with 600ms blocks and 1.2s finality.", tag: "1M TPS · 600ms blocks" },
  { num: "05", label: "NEAR Tokenomics", title: "Real revenue, real value capture", body: "One of the most mature and transparent cryptoeconomic systems in the industry. Fully unlocked token supply, protocol revenue flowing to NEAR buybacks, and a deflationary trajectory.", tag: "Deflationary trajectory" },
  { num: "06", label: "House of Stake", title: "Decentralized, AI-augmented governance", body: "Stake-based governance coordinating protocol upgrades, economic parameters, and treasury decisions through onchain ratification. Live on mainnet.", tag: "Live on mainnet" },
];

const STATS = [
  { display: "$19B+", rawValue: 19, format: (v: number) => `$${v.toFixed(1)}B+`, label: "in cross-chain volume" },
  { display: "35+",   rawValue: 35, format: (v: number) => `${Math.round(v)}+`,  label: "chains supported" },
  { display: "1M",    rawValue: 1,  format: (v: number) => `${v.toFixed(1)}M`,   label: "transactions per second" },
  { display: "5 yrs", rawValue: 5,  format: (v: number) => `${Math.round(v)} yrs`, label: "100% mainnet uptime" },
];

const INTEGRATIONS = [
  { name: "Ledger",       desc: "Cross-chain execution via SwapKit" },
  { name: "Brave",        desc: "Private inference + Wallet cross-chain swaps" },
  { name: "Venice AI",    desc: "Verifiably private text & image generation" },
  { name: "NVIDIA",       desc: "Enterprise-grade verifiable AI acceleration" },
  { name: "Intel",        desc: "CPU-level confidential compute via TDX" },
  { name: "Abound",       desc: "AI-powered cross-border financial services" },
  { name: "Gov. Bermuda", desc: "Confidential AI for public services" },
  { name: "Infinex",      desc: "Cross-chain DeFi protocol integration" },
];

const ELASTIC_STATS = [
  { final: "600ms", label: "block time" },
  { final: "1.2s",  label: "finality" },
  { final: "0.01¢", label: "avg tx fee" },
  { final: "99.9%", label: "validator uptime" },
];

const IMG_SEQ = [
  "/img/image%2012.png",
  "/img/image%2014.png",
  "/img/image%2019.png",
  "/img/image%2020.png",
  "/img/image%2021.png",
];

const IMG_SEQ_LABELS = [
  "near.com Interface",
  "Cross-Chain Execution",
  "Private Inference",
  "Agent Economy",
  "Global Ecosystem",
];

const STACK_IMAGES = [
  "/img/image%2012.png",
  "/img/image%2012.png",
  "/img/image%2020.png",
  "/img/image%2020.png",
  "/img/image%2021.png",
  "/img/image%2021.png",
];

function scrambleText(el: HTMLElement, finalText: string, onDone?: () => void) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&";
  let frame = 0;
  const totalFrames = 24;
  const id = setInterval(() => {
    el.textContent = finalText.split("").map((ch, i) => {
      if (ch === " ") return " ";
      if (frame / totalFrames > i / finalText.length) return ch;
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
    if (++frame > totalFrames) { clearInterval(id); el.textContent = finalText; onDone?.(); }
  }, 45);
  return () => clearInterval(id);
}

export default function Exp2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stackSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const imgSeqSectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const scrambleRefs = [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)];
  const scrambleDone = useRef(false);

  const border = "1px solid var(--color-border-dark)";
  const pad = "var(--section-padding-h)";
  const padV = "var(--section-padding-v)";
  const sm = "var(--font-size-small)";
  const sec = "var(--color-text-secondary)";
  const acc = "var(--color-accent)";

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {

      // ── S1: Animated hero background ──
      gsap.to(".dot-grid", {
        backgroundPositionX: "48px",
        backgroundPositionY: "48px",
        duration: 20,
        ease: "none",
        repeat: -1,
      });
      gsap.fromTo(".dot-grid", { opacity: 0 }, { opacity: 0.6, duration: 2, delay: 0.5 });

      // ── S1: Text scramble ──
      gsap.fromTo(".e2-eyebrow", { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.1 });
      const lines = ["The currency", "of agents."];
      scrambleRefs.forEach((ref, i) => {
        if (!ref.current || scrambleDone.current) return;
        setTimeout(
          () => scrambleText(
            ref.current!,
            lines[i],
            i === lines.length - 1 ? () => { scrambleDone.current = true; } : undefined
          ),
          200 + i * 220
        );
      });
      gsap.fromTo(
        [".e2-sub", ".e2-cta"],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.15, delay: 0.8 }
      );

      // ── S1: Scroll indicator pulse ──
      gsap.to(".scroll-indicator", {
        opacity: 0.3,
        duration: 1.2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });

      // ── S2: Stack slide images cross-fade on timeline ──
      const items = gsap.utils.toArray<HTMLElement>(".stack-slide");
      const slideImgs = gsap.utils.toArray<HTMLElement>(".stack-slide-img");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stackSectionRef.current,
          start: "top top",
          end: `+=${items.length * 700}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });
      items.forEach((item, i) => {
        if (i === 0) return;
        tl.fromTo(item, { yPercent: 55, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: "power2.inOut" })
          .to(items[i - 1], { yPercent: -55, opacity: 0, duration: 1, ease: "power2.inOut" }, "<0.3")
          .fromTo(slideImgs[i], { opacity: 0 }, { opacity: 1, duration: 0.8 }, "<0.2")
          .to(slideImgs[i - 1], { opacity: 0, duration: 0.5 }, "<0.1");
      });

      // ── S3: Counters ──
      gsap.utils.toArray<HTMLElement>(".stat-val").forEach((el, i) => {
        const stat = STATS[i];
        if (!stat) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.rawValue,
          duration: 2,
          ease: "power2.out",
          onUpdate() { el.textContent = stat.format(obj.val); },
          onComplete() { el.textContent = stat.display; },
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });

      // ── S3: Stats section parallax background ──
      gsap.to(".s3-bg-img", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".s3-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // ── S4: Cards stagger ──
      gsap.fromTo(
        ".intg-card",
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, stagger: 0.07, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".intg-grid", start: "top 78%" },
        }
      );

      // ── S4: Marquee ──
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: "-50%",
          duration: 20,
          ease: "none",
          repeat: -1,
        });
      }

      // ── S5: Letter-spacing expansion ──
      gsap.fromTo(
        ".expand-quote",
        { letterSpacing: "0.18em", opacity: 0 },
        {
          letterSpacing: "0.01em", opacity: 1, duration: 1.1, ease: "power2.out",
          scrollTrigger: { trigger: ".expand-quote", start: "top 78%", once: true },
        }
      );
      gsap.fromTo(
        ".e2-final",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".e2-final", start: "top 85%" },
        }
      );

      // ── S6: Skew on scroll velocity ──
      const proxy = { skew: 0 };
      const clampV = gsap.utils.clamp(-8, 8);
      ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = clampV(self.getVelocity() / -350);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0, duration: 0.9, ease: "power3", overwrite: true,
              onUpdate: () => gsap.set(".skew-target", { skewY: proxy.skew, ease: "none" }),
            });
          }
        },
      });
      gsap.fromTo(
        ".s6-reveal",
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".s6-section", start: "top 75%", once: true },
        }
      );

      // ── S7: Video scrub ──
      const video = videoRef.current;
      const vidSection = videoSectionRef.current;
      if (video && vidSection) {
        video.pause();
        ScrollTrigger.create({
          trigger: vidSection,
          start: "top top",
          end: "bottom top",
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            if (video.duration) video.currentTime = self.progress * video.duration;
            // Fade overlay text in after 50% progress
            const overlayEl = vidSection.querySelector<HTMLElement>(".vid-overlay-text");
            if (overlayEl) gsap.set(overlayEl, { opacity: self.progress > 0.5 ? (self.progress - 0.5) * 2 : 0 });
          },
        });
      }

      // ── S8: Image sequence crossfade ──
      const seqSection = imgSeqSectionRef.current;
      if (seqSection) {
        const imgs = gsap.utils.toArray<HTMLElement>(".seq-img");
        const lbls = gsap.utils.toArray<HTMLElement>(".seq-label");
        const seqTl = gsap.timeline({
          scrollTrigger: {
            trigger: seqSection,
            start: "top top",
            end: `+=${imgs.length * 600}`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
          },
        });
        imgs.forEach((img, i) => {
          if (i === 0) return;
          seqTl
            .fromTo(img, { opacity: 0 }, { opacity: 1, duration: 1 })
            .to(imgs[i - 1], { opacity: 0, duration: 0.5 }, "<0.3")
            .fromTo(lbls[i], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, "<0.2")
            .to(lbls[i - 1], { opacity: 0, y: -10, duration: 0.3 }, "<0");
        });
      }

      // ── S9: Diagonal overlay wipe + image reveal ──
      gsap.fromTo(
        ".diag-overlay",
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
        {
          clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          duration: 1, ease: "power3.inOut",
          scrollTrigger: { trigger: ".s9-diag", start: "top 65%", once: true },
        }
      );
      gsap.fromTo(
        ".s9-content",
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".s9-diag", start: "top 60%", once: true },
        }
      );
      gsap.fromTo(
        ".s9-img-reveal",
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.1, ease: "power3.inOut",
          scrollTrigger: { trigger: ".s9-diag", start: "top 55%", once: true },
        }
      );

      // ── S10: Elastic counters ──
      gsap.utils.toArray<HTMLElement>(".elastic-num").forEach((el, i) => {
        const stat = ELASTIC_STATS[i];
        if (!stat) return;
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.4 },
          {
            opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1.2, 0.5)",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
            onComplete() { el.textContent = stat.final; },
          }
        );
      });

      // ── S10: CTA reveal ──
      gsap.fromTo(
        ".cta-section-content",
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".cta-section-content", start: "top 80%", once: true },
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const lines = ["The currency", "of agents."];
      scrambleRefs.forEach((ref, i) => { if (ref.current) ref.current.textContent = lines[i]; });
      gsap.set(
        [".e2-eyebrow", ".e2-sub", ".e2-cta", ".stack-slide", ".stat-val",
          ".intg-card", ".expand-quote", ".e2-final", ".s6-reveal", ".s9-content",
          ".elastic-num", ".cta-section-content", ".dot-grid", ".scroll-indicator"],
        { opacity: 1, y: 0, x: 0, scale: 1, letterSpacing: "0.01em" }
      );
      gsap.utils.toArray<HTMLElement>(".stat-val").forEach((el, i) => { if (STATS[i]) el.textContent = STATS[i].display; });
      gsap.utils.toArray<HTMLElement>(".elastic-num").forEach((el, i) => { if (ELASTIC_STATS[i]) el.textContent = ELASTIC_STATS[i].final; });
      // Show first seq label
      gsap.set(".seq-label", { opacity: 0 });
      gsap.set(".seq-label:first-child", { opacity: 1 });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ background: "#000", color: "#fff" }}>

      {/* ── S1: Hero — animated background + text scramble ── */}
      <section style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: `0 ${pad}`, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        {/* Background image */}
        <img
          src="/img/Frame%2053.png"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.2, zIndex: 0 }}
        />
        {/* Dark gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, #000 100%)", zIndex: 1 }} />
        {/* Animated dot grid */}
        <div
          className="dot-grid"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(0,236,151,0.18) 1.5px, transparent 1.5px)",
            backgroundSize: "48px 48px",
            zIndex: 1,
            opacity: 0,
          }}
        />
        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <p className="e2-eyebrow" style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 24, opacity: 0, fontFamily: "var(--font-family-secondary)" }}>
            near.org — open infrastructure
          </p>
          <h1 style={{ fontSize: "clamp(48px, 7vw, 80px)", lineHeight: 1.0, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 32px", fontFamily: "var(--font-family-primary)" }}>
            <span ref={scrambleRefs[0]} style={{ display: "block" }}>&nbsp;</span>
            <span ref={scrambleRefs[1]} style={{ display: "block" }}>&nbsp;</span>
          </h1>
          <p className="e2-sub" style={{ maxWidth: 560, fontSize: "var(--font-size-body-lg)", lineHeight: "var(--line-height-body-lg)", color: sec, marginBottom: 40, opacity: 0 }}>
            NEAR is the open infrastructure powering the agent economy — unifying liquidity across 35+ chains, keeping execution confidential, scaling to over 1 million TPS.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="#" className="e2-cta" style={{ opacity: 0, display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: acc, color: "#000", fontWeight: 600, fontSize: sm, textDecoration: "none" }}>
              Build on NEAR →
            </a>
            <a href="#" className="e2-cta" style={{ opacity: 0, display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", border, color: "#fff", fontWeight: 500, fontSize: sm, textDecoration: "none" }}>
              Explore the Stack →
            </a>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="scroll-indicator" style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 2, fontSize: sm, color: sec, letterSpacing: "0.08em", textAlign: "center" }}>
          scroll to explore ↓
        </div>
      </section>

      {/* ── S2: NEAR Stack — pinned scroll panel swap with images ── */}
      <section ref={stackSectionRef} style={{ height: "100vh", overflow: "hidden", position: "relative", borderTop: border }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, position: "absolute", top: 48, left: pad, zIndex: 10, marginBottom: 0 }}>
          The NEAR Stack
        </p>
        {/* Progress dots */}
        <div style={{ position: "absolute", bottom: 48, left: pad, display: "flex", gap: 6, zIndex: 10 }}>
          {STACK.map((_, i) => (
            <div key={i} style={{ width: 28, height: 2, background: "var(--color-border-dark)" }} />
          ))}
        </div>
        {/* Slide images (right half, absolute) */}
        {STACK_IMAGES.map((src, i) => (
          <img
            key={`slide-img-${i}`}
            className="stack-slide-img"
            src={src}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "45%",
              height: "100%",
              objectFit: "cover",
              opacity: i === 0 ? 1 : 0,
              zIndex: 1,
            }}
          />
        ))}
        {/* Dark overlay on right image */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "45%", height: "100%", background: "linear-gradient(to right, #000 0%, transparent 30%)", zIndex: 2 }} />
        {/* Slides */}
        {STACK.map((item, i) => (
          <div
            key={item.label}
            className="stack-slide"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              padding: `0 ${pad}`,
              opacity: i === 0 ? 1 : 0,
              zIndex: 3,
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, maxWidth: "var(--content-max-width)", width: "100%" }}>
              <div>
                <div style={{ display: "flex", gap: 48, marginBottom: 32 }}>
                  <div>
                    <p style={{ fontSize: sm, color: sec, fontFamily: "var(--font-family-secondary)", marginBottom: 12 }}>{item.num} / 06</p>
                    <p style={{ fontSize: "var(--font-size-body)", fontWeight: 600, color: acc }}>{item.label}</p>
                  </div>
                </div>
                <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 24 }}>{item.title}</h2>
                <p style={{ fontSize: "var(--font-size-body-lg)", lineHeight: "var(--line-height-body-lg)", color: sec, maxWidth: 480, marginBottom: 32 }}>{item.body}</p>
                <span style={{ display: "inline-block", padding: "4px 12px", border, borderRadius: 2, fontSize: sm, color: sec }}>{item.tag}</span>
              </div>
              {/* Right column intentionally empty — image is positioned absolute behind */}
              <div />
            </div>
          </div>
        ))}
      </section>

      {/* ── S3: Stats — animated counters with visual background ── */}
      <section className="s3-section" style={{ padding: `${padV} ${pad}`, borderTop: border, position: "relative", overflow: "hidden" }}>
        {/* Background image with parallax */}
        <img
          className="s3-bg-img"
          src="/img/image%2014.png"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", inset: "-20% 0", width: "100%", height: "140%", objectFit: "cover", opacity: 0.15, zIndex: 0 }}
        />
        {/* Giant "NEAR" watermark */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 0, pointerEvents: "none", userSelect: "none" }}>
          <span style={{ fontSize: "clamp(120px, 20vw, 280px)", fontWeight: 700, color: "#fff", opacity: 0.03, lineHeight: 1, fontFamily: "var(--font-family-primary)", letterSpacing: "-0.04em" }}>
            NEAR
          </span>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 48 }}>By the numbers</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 48, maxWidth: "var(--content-max-width)" }}>
            {STATS.map((stat, i) => (
              <div key={i}>
                <div className="stat-val" style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 12, color: "#fff", fontVariantNumeric: "tabular-nums" }}>0</div>
                <p style={{ fontSize: "var(--font-size-body)", color: sec }}>{stat.label}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 64, paddingTop: 40, borderTop: border }}>
            <p style={{ fontSize: "var(--font-size-body-lg)", color: sec, letterSpacing: "0.02em" }}>
              Since 2018 — <span style={{ color: "#fff" }}>Open infrastructure</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── S4: Integrations — cards stagger + marquee ── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border, overflow: "hidden" }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Built with the best</p>
        <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 64, maxWidth: 480 }}>Trusted by 8+ industry leaders</h2>
        <div className="intg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "var(--color-border-dark)", border, maxWidth: "var(--content-max-width)" }}>
          {INTEGRATIONS.map((item, idx) => (
            <div key={item.name} className="intg-card" style={{ padding: 32, background: "#000", opacity: 0 }}>
              <p style={{ fontSize: sm, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-family-secondary)", marginBottom: 12, fontWeight: 500 }}>
                {String(idx + 1).padStart(2, "0")}
              </p>
              <p style={{ fontWeight: 600, fontSize: "var(--font-size-body)", marginBottom: 8 }}>{item.name}</p>
              <p style={{ fontSize: sm, color: sec, lineHeight: "1.5" }}>{item.desc}</p>
            </div>
          ))}
        </div>
        {/* Marquee */}
        <div style={{ marginTop: 56, overflow: "hidden", borderTop: border, borderBottom: border, padding: "20px 0", position: "relative" }}>
          <div style={{ display: "flex", width: "200%" }} ref={marqueeRef}>
            {[0, 1].map((copy) => (
              <div key={copy} style={{ display: "flex", gap: 48, whiteSpace: "nowrap", flex: "0 0 50%", alignItems: "center" }}>
                {["Ref Finance", "Meta Pool", "Aurora", "HOT Wallet", "SWEAT", "Pikespeak", "Delta Trade", "LiNEAR", "Rhea Finance", "Intear DEX"].map((name) => (
                  <span key={`${copy}-${name}`} style={{ fontSize: "var(--font-size-body)", color: sec, paddingRight: 48 }}>
                    {name}
                    <span style={{ marginLeft: 48, color: "var(--color-border-dark)" }}>·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S5: Quote — letter-spacing expansion ── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border, position: "relative", overflow: "hidden" }}>
        {/* Giant quotation mark background */}
        <div style={{ position: "absolute", top: "-0.1em", left: "0.05em", fontSize: "30vw", color: "#fff", opacity: 0.04, lineHeight: 1, fontFamily: "var(--font-family-primary)", pointerEvents: "none", userSelect: "none", zIndex: 0 }}>
          &ldquo;
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <p className="expand-quote" style={{ fontSize: "clamp(28px, 3.5vw, 52px)", fontWeight: 500, lineHeight: 1.15, maxWidth: 720, marginBottom: 24, opacity: 0, letterSpacing: "0.18em" }}>
            &ldquo;The infrastructure choices we make now will determine what is possible later.&rdquo;
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 56 }}>
            <span style={{ fontSize: sm, color: sec }}>— Illia Polosukhin, Co-Founder</span>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: "50%", background: acc, color: "#000", fontSize: "10px", fontWeight: 700 }}>✓</span>
          </div>
          <a href="#" className="e2-final" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: acc, color: "#000", fontWeight: 600, fontSize: sm, textDecoration: "none", opacity: 0 }}>
            Start building on NEAR →
          </a>
        </div>
      </section>

      {/* ── S6: Skew on scroll velocity ── */}
      <section className="s6-section" style={{ padding: `${padV} ${pad}`, borderTop: border, background: "#080808" }}>
        <p className="s6-reveal skew-target" style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 32, opacity: 0, display: "inline-block" }}>Live in production</p>
        {/* Three product name display row */}
        <div className="s6-reveal" style={{ display: "flex", gap: "clamp(24px, 4vw, 80px)", flexWrap: "wrap", marginBottom: 48, opacity: 0 }}>
          {["near.com", "NEAR Intents", "NEAR AI"].map((name) => (
            <span key={name} className="skew-target" style={{ fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.0, display: "inline-block", color: "#fff" }}>
              {name}
            </span>
          ))}
        </div>
        <p className="s6-reveal skew-target" style={{ fontSize: "var(--font-size-body-lg)", color: sec, maxWidth: 480, lineHeight: "var(--line-height-body-lg)", marginBottom: 48, opacity: 0, display: "inline-block" }}>
          Ledger, Brave, Venice AI, NVIDIA, and more are already building on NEAR&apos;s infrastructure.
        </p>
        {/* Stat boxes */}
        <div className="s6-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 720, opacity: 0 }}>
          {[{ v: "$19B+", l: "cross-chain volume" }, { v: "300+", l: "teams building" }, { v: "100%", l: "mainnet uptime" }].map((s) => (
            <div key={s.l} style={{ border: `1px solid ${acc}`, padding: "24px 28px", borderRadius: "var(--border-radius)" }}>
              <div style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 500, color: acc, lineHeight: 1, marginBottom: 8 }}>{s.v}</div>
              <div style={{ fontSize: sm, color: sec }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── S7: Video scrub ── */}
      <section ref={videoSectionRef} style={{ height: "100vh", overflow: "hidden", position: "relative", borderTop: border }}>
        <p style={{ position: "absolute", top: 48, left: pad, fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, zIndex: 5 }}>
          NEAR Intents in action — scroll to scrub
        </p>
        <video
          ref={videoRef}
          src="/img/near-intents-launch_compressed.mp4"
          muted
          playsInline
          preload="auto"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Overlay text that fades in at 50% progress */}
        <div className="vid-overlay-text" style={{ position: "absolute", bottom: 60, left: 0, right: 0, textAlign: "center", zIndex: 5, opacity: 0, pointerEvents: "none" }}>
          <p style={{ fontSize: "var(--font-size-body-lg)", color: "#fff", letterSpacing: "0.04em" }}>
            Scroll to explore the transaction
          </p>
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%)", zIndex: 4, pointerEvents: "none" }} />
      </section>

      {/* ── S8: Crossfade image sequence ── */}
      <section ref={imgSeqSectionRef} style={{ height: "100vh", overflow: "hidden", position: "relative", borderTop: border }}>
        <p style={{ position: "absolute", top: 48, left: pad, fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, zIndex: 5 }}>
          The stack, visualized
        </p>
        {IMG_SEQ.map((src, i) => (
          <img
            key={src}
            className="seq-img"
            src={src}
            alt={IMG_SEQ_LABELS[i]}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === 0 ? 1 : 0 }}
          />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)", zIndex: 2 }} />
        {/* Labels */}
        <div style={{ position: "absolute", bottom: 72, left: pad, zIndex: 5 }}>
          {IMG_SEQ_LABELS.map((label, i) => (
            <p
              key={label}
              className="seq-label"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                fontSize: "clamp(20px, 2.5vw, 32px)",
                fontWeight: 500,
                color: "#fff",
                opacity: i === 0 ? 1 : 0,
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </p>
          ))}
        </div>
      </section>

      {/* ── S9: Diagonal overlay wipe ── */}
      <section className="s9-diag" style={{ padding: `${padV} ${pad}`, borderTop: border, position: "relative", overflow: "hidden", minHeight: "60vh", display: "flex", alignItems: "center", background: "#000" }}>
        {/* Accent wipe overlay */}
        <div className="diag-overlay" style={{ position: "absolute", inset: 0, background: acc, zIndex: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, width: "100%", maxWidth: "var(--content-max-width)", alignItems: "center" }}>
          {/* Left: text content */}
          <div className="s9-content" style={{ opacity: 0 }}>
            <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 24 }}>A different approach</p>
            <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 600, letterSpacing: "-0.02em", maxWidth: 640, marginBottom: 24 }}>
              Chain abstraction isn&apos;t a feature — it&apos;s the foundation.
            </h2>
            <p style={{ fontSize: "var(--font-size-body-lg)", color: sec, maxWidth: 520, lineHeight: "var(--line-height-body-lg)" }}>
              Where other protocols add chain support as an afterthought, NEAR was designed from day one to be infrastructure for every chain, every agent, every user.
            </p>
          </div>
          {/* Right: image with clip-path reveal */}
          <div style={{ overflow: "hidden", borderRadius: "var(--border-radius)", aspectRatio: "4/3" }}>
            <img
              className="s9-img-reveal"
              src="/img/image%2026.png"
              alt="Chain abstraction visualization"
              style={{ width: "100%", height: "100%", objectFit: "cover", clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
            />
          </div>
        </div>
      </section>

      {/* ── S10: Elastic counters + CTA footer ── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 48 }}>Performance metrics</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 48, maxWidth: "var(--content-max-width)", marginBottom: 80 }}>
          {ELASTIC_STATS.map((stat, i) => (
            <div key={i}>
              <div className="elastic-num" style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 12, color: "#fff", fontVariantNumeric: "tabular-nums", opacity: 0 }}>
                —
              </div>
              <p style={{ fontSize: "var(--font-size-body)", color: sec }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="cta-section-content" style={{ borderTop: border, paddingTop: 80, opacity: 0 }}>
          <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 600, letterSpacing: "-0.02em", maxWidth: 640, marginBottom: 20 }}>
            Ready to build in the agent economy?
          </h2>
          <p style={{ fontSize: "var(--font-size-body-lg)", color: sec, lineHeight: "var(--line-height-body-lg)", maxWidth: 520, marginBottom: 48 }}>
            Join 300+ teams building with NEAR&apos;s open infrastructure. Deploy in minutes.
          </p>
          <div style={{ display: "flex", gap: 16, marginBottom: 64 }}>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: acc, color: "#000", fontWeight: 600, fontSize: sm, textDecoration: "none" }}>
              Get started free →
            </a>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", border, color: "#fff", fontWeight: 500, fontSize: sm, textDecoration: "none" }}>
              Read the docs
            </a>
          </div>
          <div style={{ display: "flex", gap: 40, borderTop: border, paddingTop: 32 }}>
            {["Developers", "Ecosystem", "NEAR AI"].map((link) => (
              <a key={link} href="#" style={{ fontSize: sm, color: sec, textDecoration: "none", letterSpacing: "0.04em" }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
