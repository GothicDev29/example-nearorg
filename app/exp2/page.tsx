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

const IMG_SEQ = [
  "/img/image%2012.png",
  "/img/image%2014.png",
  "/img/image%2019.png",
  "/img/image%2020.png",
  "/img/image%2021.png",
];

const ELASTIC_STATS = [
  { final: "600ms", label: "block time" },
  { final: "1.2s",  label: "finality" },
  { final: "0.01¢", label: "avg tx fee" },
  { final: "99.9%", label: "validator uptime" },
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
  const diagonalRef = useRef<HTMLDivElement>(null);

  // Refs for scramble text elements
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

      // ── S1: Text scramble hero ──
      gsap.fromTo(".e2-eyebrow", { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.1 });
      const lines = ["The currency", "of agents."];
      scrambleRefs.forEach((ref, i) => {
        if (!ref.current || scrambleDone.current) return;
        setTimeout(() => scrambleText(ref.current!, lines[i], i === lines.length - 1 ? () => { scrambleDone.current = true; } : undefined), 200 + i * 220);
      });
      gsap.fromTo([".e2-sub", ".e2-cta"],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.15, delay: 0.8 }
      );

      // ── S2: Scroll pin panel swap (keep) ──
      const items = gsap.utils.toArray<HTMLElement>(".stack-slide");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stackSectionRef.current,
          start: "top top", end: `+=${items.length * 700}`,
          pin: true, scrub: 0.8, anticipatePin: 1,
        },
      });
      items.forEach((item, i) => {
        if (i === 0) return;
        tl.fromTo(item, { yPercent: 55, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: "power2.inOut" })
          .to(items[i - 1], { yPercent: -55, opacity: 0, duration: 1, ease: "power2.inOut" }, "<0.3");
      });

      // ── S3: Counters linear (keep) ──
      gsap.utils.toArray<HTMLElement>(".stat-val").forEach((el, i) => {
        const stat = STATS[i]; if (!stat) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.rawValue, duration: 2, ease: "power2.out",
          onUpdate() { el.textContent = stat.format(obj.val); },
          onComplete() { el.textContent = stat.display; },
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });

      // ── S4: Cards stagger y+opacity (keep) ──
      gsap.fromTo(".intg-card",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".intg-grid", start: "top 78%" } }
      );

      // ── S5: Letter-spacing expansion on quote ──
      gsap.fromTo(".expand-quote",
        { letterSpacing: "0.18em", opacity: 0 },
        { letterSpacing: "0.01em", opacity: 1, duration: 1.1, ease: "power2.out",
          scrollTrigger: { trigger: ".expand-quote", start: "top 78%", once: true } }
      );
      gsap.fromTo(".e2-final",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".e2-final", start: "top 85%" } }
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
      gsap.fromTo(".s6-reveal",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".s6-section", start: "top 75%", once: true } }
      );

      // ── S7: Video scrub — scroll drives currentTime ──
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
          },
        });
      }

      // ── S8: Crossfade image sequence on scroll ──
      const seqSection = imgSeqSectionRef.current;
      if (seqSection) {
        const imgs = gsap.utils.toArray<HTMLElement>(".seq-img");
        const seqTl = gsap.timeline({
          scrollTrigger: {
            trigger: seqSection,
            start: "top top", end: `+=${imgs.length * 600}`,
            pin: true, scrub: 0.5, anticipatePin: 1,
          },
        });
        imgs.forEach((img, i) => {
          if (i === 0) return;
          seqTl.fromTo(img, { opacity: 0 }, { opacity: 1, duration: 1 })
               .to(imgs[i - 1], { opacity: 0, duration: 0.5 }, "<0.3");
        });
      }

      // ── S9: Diagonal overlay wipe ──
      gsap.fromTo(".diag-overlay",
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
        { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", duration: 1, ease: "power3.inOut",
          scrollTrigger: { trigger: ".s9-diag", start: "top 65%", once: true } }
      );
      gsap.fromTo(".s9-content",
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".s9-diag", start: "top 60%", once: true } }
      );

      // ── S10: Counter with elastic overshoot ──
      gsap.utils.toArray<HTMLElement>(".elastic-num").forEach((el, i) => {
        const stat = ELASTIC_STATS[i]; if (!stat) return;
        gsap.fromTo(el,
          { opacity: 0, scale: 0.4 },
          { opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1.2, 0.5)",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
            onComplete() { el.textContent = stat.final; },
          }
        );
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const lines = ["The currency", "of agents."];
      scrambleRefs.forEach((ref, i) => { if (ref.current) ref.current.textContent = lines[i]; });
      gsap.set([".e2-eyebrow", ".e2-sub", ".e2-cta", ".stack-slide", ".stat-val",
        ".intg-card", ".expand-quote", ".e2-final", ".s6-reveal", ".s9-content", ".elastic-num"],
        { opacity: 1, y: 0, x: 0, scale: 1, letterSpacing: "0.01em" }
      );
      gsap.utils.toArray<HTMLElement>(".stat-val").forEach((el, i) => { if (STATS[i]) el.textContent = STATS[i].display; });
      gsap.utils.toArray<HTMLElement>(".elastic-num").forEach((el, i) => { if (ELASTIC_STATS[i]) el.textContent = ELASTIC_STATS[i].final; });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ background: "#000", color: "#fff" }}>

      {/* ── S1: Hero — text scramble ── */}
      <section style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: `0 ${pad}`, paddingBottom: 80 }}>
        <p className="e2-eyebrow" style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 24, opacity: 0, fontFamily: "var(--font-family-secondary)" }}>
          near.org — open infrastructure
        </p>
        <h1 style={{ fontSize: "clamp(48px, 7vw, 80px)", lineHeight: 1.0, fontWeight: 400, margin: "0 0 32px", fontFamily: "monospace" }}>
          <span ref={scrambleRefs[0]} style={{ display: "block" }}>&nbsp;</span>
          <span ref={scrambleRefs[1]} style={{ display: "block" }}>&nbsp;</span>
        </h1>
        <p className="e2-sub" style={{ maxWidth: 560, fontSize: "var(--font-size-body-lg)", lineHeight: "var(--line-height-body-lg)", color: sec, marginBottom: 40, opacity: 0 }}>
          NEAR is the open infrastructure powering the agent economy — unifying liquidity across 35+ chains, keeping execution confidential, scaling to over 1 million TPS.
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="#" className="btn-secondary e2-cta" style={{ opacity: 0 }}>Build on NEAR →</a>
        </div>
      </section>

      {/* ── S2: NEAR Stack (pinned scroll) ── */}
      <section ref={stackSectionRef} style={{ height: "100vh", overflow: "hidden", position: "relative", borderTop: border }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, position: "absolute", top: 48, left: pad, zIndex: 10, marginBottom: 0 }}>The NEAR Stack</p>
        {STACK.map((item, i) => (
          <div key={item.label} className="stack-slide" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: `0 ${pad}`, opacity: i === 0 ? 1 : 0 }}>
            <div style={{ display: "flex", gap: 64, maxWidth: "var(--content-max-width)", width: "100%" }}>
              <div style={{ flex: "0 0 200px" }}>
                <p style={{ fontSize: sm, color: sec, fontFamily: "var(--font-family-secondary)", marginBottom: 12 }}>{item.num} / 06</p>
                <p style={{ fontSize: "var(--font-size-body)", fontWeight: 600, color: acc }}>{item.label}</p>
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 500, marginBottom: 24 }}>{item.title}</h2>
                <p style={{ fontSize: "var(--font-size-body-lg)", lineHeight: "var(--line-height-body-lg)", color: sec, maxWidth: 560, marginBottom: 32 }}>{item.body}</p>
                <span style={{ display: "inline-block", padding: "4px 12px", border, borderRadius: 2, fontSize: sm, color: sec }}>{item.tag}</span>
              </div>
            </div>
          </div>
        ))}
        <div style={{ position: "absolute", bottom: 48, left: pad, display: "flex", gap: 6 }}>
          {STACK.map((_, i) => <div key={i} style={{ width: 28, height: 2, background: "var(--color-border-dark)" }} />)}
        </div>
      </section>

      {/* ── S3: Stats — counters linear ── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 48 }}>By the numbers</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 48, maxWidth: "var(--content-max-width)" }}>
          {STATS.map((stat, i) => (
            <div key={i}>
              <div className="stat-val" style={{ fontSize: "clamp(40px,5vw,72px)", fontWeight: 400, lineHeight: 1, marginBottom: 12, fontVariantNumeric: "tabular-nums" }}>0</div>
              <p style={{ fontSize: "var(--font-size-body)", color: sec }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── S4: Integrations — cards stagger ── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 16 }}>Built with the best</p>
        <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 500, marginBottom: 64, maxWidth: 480 }}>Trusted by industry leaders</h2>
        <div className="intg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "var(--color-border-dark)", border, maxWidth: "var(--content-max-width)" }}>
          {INTEGRATIONS.map((item) => (
            <div key={item.name} className="intg-card" style={{ padding: 32, background: "#000", opacity: 0 }}>
              <p style={{ fontWeight: 600, fontSize: "var(--font-size-body)", marginBottom: 8 }}>{item.name}</p>
              <p style={{ fontSize: sm, color: sec, lineHeight: "var(--line-height-small)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── S5: Quote — letter-spacing animation ── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border }}>
        <p className="expand-quote" style={{ fontSize: "clamp(28px,3.5vw,52px)", fontWeight: 400, lineHeight: 1.15, maxWidth: 720, marginBottom: 24, opacity: 0, letterSpacing: "0.18em" }}>
          "The infrastructure choices we make now will determine what is possible later."
        </p>
        <p style={{ fontSize: sm, color: sec, marginBottom: 56 }}>— Illia Polosukhin, Co-Founder of NEAR</p>
        <a href="#" className="e2-final" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: acc, color: "#000", fontWeight: 600, fontSize: "var(--btn-primary-font-size)", textDecoration: "none", opacity: 0 }}>
          Start building on NEAR →
        </a>
      </section>

      {/* ── S6: Skew on scroll velocity ── */}
      <section className="s6-section" style={{ padding: `${padV} ${pad}`, borderTop: border, background: "#080808" }}>
        <p className="s6-reveal" style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 32, opacity: 0 }}>Live in production</p>
        <h2 className="skew-target s6-reveal" style={{ fontSize: "clamp(36px,5vw,72px)", fontWeight: 400, lineHeight: 1.05, maxWidth: 800, display: "inline-block", opacity: 0 }}>
          Powering real products for real users — scroll to feel the motion.
        </h2>
        <p className="s6-reveal" style={{ fontSize: "var(--font-size-body-lg)", color: sec, maxWidth: 480, marginTop: 32, lineHeight: "var(--line-height-body-lg)", opacity: 0 }}>
          Ledger, Brave, Venice AI, NVIDIA, and more are already building on NEAR's infrastructure.
        </p>
      </section>

      {/* ── S7: Video scrub ── */}
      <section ref={videoSectionRef} style={{ height: "100vh", overflow: "hidden", position: "relative", borderTop: border }}>
        <p style={{ position: "absolute", top: 48, left: pad, fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, zIndex: 5 }}>
          NEAR Intents in action — scroll to scrub
        </p>
        <video ref={videoRef} src="/img/near-intents-launch_compressed.mp4" muted playsInline preload="auto"
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </section>

      {/* ── S8: Crossfade image sequence ── */}
      <section ref={imgSeqSectionRef} style={{ height: "100vh", overflow: "hidden", position: "relative", borderTop: border }}>
        <p style={{ position: "absolute", top: 48, left: pad, fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, zIndex: 5 }}>
          The stack, visualized
        </p>
        {IMG_SEQ.map((src, i) => (
          <img key={src} className="seq-img" src={src} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === 0 ? 1 : 0 }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)", zIndex: 2 }} />
      </section>

      {/* ── S9: Diagonal overlay wipe ── */}
      <section className="s9-diag" style={{ padding: `${padV} ${pad}`, borderTop: border, position: "relative", overflow: "hidden", minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div className="diag-overlay" style={{ position: "absolute", inset: 0, background: acc, zIndex: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} />
        <div className="s9-content" style={{ position: "relative", zIndex: 2, opacity: 0 }}>
          <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 24 }}>A different approach</p>
          <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 500, maxWidth: 640, marginBottom: 24 }}>
            Chain abstraction isn't a feature — it's the foundation.
          </h2>
          <p style={{ fontSize: "var(--font-size-body-lg)", color: sec, maxWidth: 520, lineHeight: "var(--line-height-body-lg)" }}>
            Where other protocols add chain support as an afterthought, NEAR was designed from day one to be infrastructure for every chain, every agent, every user.
          </p>
        </div>
      </section>

      {/* ── S10: Elastic counter overshoot ── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 48 }}>Performance metrics</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 48, maxWidth: "var(--content-max-width)" }}>
          {ELASTIC_STATS.map((stat, i) => (
            <div key={i}>
              <div className="elastic-num" style={{ fontSize: "clamp(40px,5vw,72px)", fontWeight: 400, lineHeight: 1, marginBottom: 12, color: acc, fontVariantNumeric: "tabular-nums", opacity: 0 }}>—</div>
              <p style={{ fontSize: "var(--font-size-body)", color: sec }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
