"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap/register";

const META = {
  title: "Confidential Intents: Confidential Execution for Cross-Chain Transactions",
  date: "February 24, 2026",
  reading: "8 min read",
  tag: "Protocol",
};

const SECTIONS = [
  {
    id: "problem",
    heading: "The problem with public ledgers",
    anim: "clip-bottom",
    body: [
      "The evolution of decentralized finance has often been hindered by the inherent transparency of public ledgers. While transparency is a core tenet of blockchain technology, it often acts as a double-edged sword for professional traders and institutions.",
      "Every move made on-chain is visible to competitors and malicious bots, leading to issues like sandwich attacks and predatory front-running. Every order size, token pair, direction, and timing is visible before your transaction settles.",
    ],
  },
  {
    id: "solution",
    heading: "Confidential Intents: execution on a need-to-know basis",
    anim: "slide-left",
    body: [
      "NEAR Confidential Intents addresses these structural weaknesses by introducing a need-to-know basis for transaction data. By leveraging a dedicated private shard — a secure execution environment operated by a decentralized set of validators — NEAR can process complex cross-chain instructions without broadcasting sensitive parameters to the public mainnet until the transaction is finalized.",
      "When a user opts into confidential mode, their transaction executes within the private shard, keeping details like token pairs, order sizes, and timing out of the public mempool, effectively preventing frontrunning and strategy copying.",
    ],
  },
  {
    id: "mev",
    heading: "Eliminating front-running and MEV",
    anim: "clip-left",
    pullQuote: "MEV bots cannot see the transaction in the mempool to jump ahead of it — ensuring you receive the best possible execution price.",
    body: [
      "When a user expresses an intent — a desired outcome rather than a specific set of technical steps — the system finds the best way to fulfill it. With the privacy layer active, the specific details of these confidential transactions are shielded.",
      "The outcome is no MEV extraction, no frontrunning, no strategy copying, and no forced liquidations from visible positions.",
    ],
  },
  {
    id: "institutional",
    heading: "Discretion for institutional capital",
    anim: "scale-fade",
    body: [
      "Institutional players often hesitate to move significant volume on-chain because their strategies can be easily copied or used against them to force liquidations. The privacy execution layer allows these entities to manage cross-chain positions with the same level of confidentiality they expect from traditional finance, but with the efficiency and settlement speed of a blockchain.",
      "Unlike fully opaque privacy protocols, Confidential Intents supports selective disclosure — allowing enterprises to keep sensitive data confidential from the public while providing auditable execution for regulators or compliance teams.",
    ],
  },
  {
    id: "abstraction",
    heading: "Chain abstraction in 2026",
    anim: "slide-up",
    body: [
      "The launch of Confidential Intents is not an isolated update but a pivotal part of NEAR's broader chain abstraction strategy. Users no longer need to worry about which network they are on or which bridge to use.",
      "Through the near.com interface and integrated wallets, one can execute a private DeFi execution across 35+ supported blockchains from a single account. The Confidential toggle allows a seamless transition between a public profile and a secure, private account — much like switching to an incognito tab in a browser.",
    ],
  },
  {
    id: "technical",
    heading: "Technical foundations: private shards and TEEs",
    anim: "clip-top",
    body: [
      "The mechanism behind this privacy involves a sophisticated blend of cryptographic techniques and hardware-level security. Private shards are execution environments that maintain their own state and are not visible to the public. They connect to the NEAR mainnet via a bridge secured by Trusted Execution Environments (TEEs).",
      "Beyond human traders, this infrastructure is built for the agentic economy. AI agents — autonomous programs that trade and manage assets — require secure environments to execute their logic. By combining Confidential Intents with NEAR's AI Cloud and encrypted enclaves, the protocol provides a sandbox where AI can operate without exposing its proprietary algorithms or the data it handles.",
    ],
  },
];

const RELATED = [
  { tag: "Protocol",    title: "NEAR Intents: The End of Bridges", date: "Jan 2026",  img: "/img/image%2012.png" },
  { tag: "AI",          title: "Private Inference and the Agent Economy", date: "Mar 2026", img: "/img/image%2014.png" },
  { tag: "Chain Abstraction", title: "One Account. 35 Chains.", date: "Feb 2026", img: "/img/image%2019.png" },
];

export default function Exp4() {
  const containerRef = useRef<HTMLDivElement>(null);
  const articleRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {

      // ── S1: Reading progress bar (scrub) ──
      gsap.to(".read-progress", {
        scaleX: 1, ease: "none", transformOrigin: "left center",
        scrollTrigger: { trigger: articleRef.current, start: "top top", end: "bottom bottom", scrub: 0 },
      });

      // ── S2: Hero parallax ──
      gsap.to(".hero-img", {
        yPercent: 20, ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true },
      });

      // ── S2: Hero badge fade in on load ──
      gsap.fromTo(".hero-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power2.out" }
      );

      // ── S3: Article header stagger ──
      gsap.fromTo([".art-tag", ".art-title", ".art-meta"],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power2.out", delay: 0.2 }
      );

      // ── SVG line dividers — strokeDashoffset draw ──
      gsap.utils.toArray<SVGLineElement>(".divider-line").forEach((line) => {
        const length = 800;
        gsap.fromTo(line,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut",
            scrollTrigger: { trigger: line, start: "top 88%", once: true } }
        );
      });

      // ── Heading animations by class ──

      // clip-bottom: inset(100% 0 0 0) → inset(0% 0 0 0)
      gsap.utils.toArray<HTMLElement>(".heading-clip-bottom").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });

      // slide-left: opacity:0, x:-32 → opacity:1, x:0
      gsap.utils.toArray<HTMLElement>(".heading-slide-left").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: -32 },
          { opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });

      // clip-left: inset(0 100% 0 0) → inset(0 0% 0 0)
      gsap.utils.toArray<HTMLElement>(".heading-clip-left").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });

      // scale-fade: opacity:0, scale:0.92 → opacity:1, scale:1
      gsap.utils.toArray<HTMLElement>(".heading-scale-fade").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });

      // slide-up: opacity:0, y:28 → opacity:1, y:0
      gsap.utils.toArray<HTMLElement>(".heading-slide-up").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });

      // clip-top: inset(0 0 100% 0) → inset(0 0 0% 0)
      gsap.utils.toArray<HTMLElement>(".heading-clip-top").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });

      // Pull quote — scale+opacity
      gsap.utils.toArray<HTMLElement>(".pull-quote").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 80%", once: true } }
        );
      });

      // Body paragraphs opacity+y
      gsap.utils.toArray<HTMLElement>(".art-para").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true } }
        );
      });

      // Mid-article images — opacity 0→1, scale 1.02→1
      gsap.utils.toArray<HTMLElement>(".article-img").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 1.02 },
          { opacity: 1, scale: 1, duration: 0.75, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });

      // Image captions
      gsap.utils.toArray<HTMLElement>(".article-caption").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true } }
        );
      });

      // Stat callout — clipPath wipe left→right
      gsap.fromTo(".stat-callout",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".stat-callout", start: "top 82%", once: true } }
      );

      // Key takeaways box — border scaleY then content fade
      gsap.fromTo(".takeaways-border",
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".takeaways-box", start: "top 82%", once: true } }
      );
      gsap.fromTo(".takeaways-content",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", delay: 0.3,
          scrollTrigger: { trigger: ".takeaways-box", start: "top 82%", once: true } }
      );

      // ── S9: Related articles — diagonal polygon clipPath reveal ──
      gsap.utils.toArray<HTMLElement>(".related-card").forEach((card, i) => {
        gsap.fromTo(card,
          { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
            delay: i * 0.12,
          }
        );
      });

      // Ken Burns on related card images
      gsap.utils.toArray<HTMLElement>(".related-img").forEach((el) => {
        gsap.fromTo(el,
          { scale: 1.1 },
          { scale: 1, duration: 0.9, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });

      // ── Author bio ──
      gsap.fromTo(".author-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".author-card", start: "top 85%", once: true } }
      );

      // ── S10: Newsletter ──
      gsap.fromTo(".nl-underline",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.9, ease: "power3.inOut",
          scrollTrigger: { trigger: ".nl-section", start: "top 75%", once: true } }
      );
      gsap.fromTo([".nl-heading", ".nl-sub", ".nl-form", ".nl-badges"],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.65, ease: "power2.out",
          scrollTrigger: { trigger: ".nl-section", start: "top 75%", once: true }, delay: 0.2 }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        [".art-tag", ".art-title", ".art-meta", ".art-para", ".pull-quote",
         ".related-card", ".nl-heading", ".nl-sub", ".nl-form", ".nl-badges",
         ".hero-badge", ".article-img", ".article-caption", ".stat-callout",
         ".takeaways-border", ".takeaways-content", ".author-card", ".related-img"],
        { opacity: 1, y: 0, x: 0, scale: 1, clipPath: "none", scaleX: 1, scaleY: 1 }
      );
      gsap.set(".read-progress", { scaleX: 0 });
      gsap.set(".nl-underline", { scaleX: 1 });
    });
  }, { scope: containerRef });

  const headingClass = (anim: string): string => {
    const map: Record<string, string> = {
      "clip-bottom": "heading-clip-bottom",
      "slide-left":  "heading-slide-left",
      "clip-left":   "heading-clip-left",
      "scale-fade":  "heading-scale-fade",
      "slide-up":    "heading-slide-up",
      "clip-top":    "heading-clip-top",
    };
    return map[anim] ?? "heading-slide-up";
  };

  const border = "1px solid rgba(255,255,255,0.35)";
  const borderFaint = "1px solid rgba(255,255,255,0.12)";
  const pad  = "var(--section-padding-h)";
  const padV = "var(--section-padding-v)";
  const sm   = "var(--font-size-small)";
  const sec  = "var(--color-text-secondary)";
  const acc  = "var(--color-accent)";

  return (
    <div ref={containerRef} style={{ background: "var(--color-bg-dark)", color: "var(--color-text-on-dark)" }}>

      {/* ── S1: Fixed reading progress bar ── */}
      <div style={{ position: "fixed", top: "var(--nav-height)", left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.08)", zIndex: 99, pointerEvents: "none" }}>
        <div className="read-progress" style={{ height: "100%", background: acc, transform: "scaleX(0)", transformOrigin: "left center" }} />
      </div>

      {/* ── S2: Full-width hero image ── */}
      <section className="hero-section" style={{ height: "70vh", position: "relative", overflow: "hidden" }}>
        <img
          className="hero-img"
          src="/img/Frame%2053.png"
          alt="Confidential Intents hero"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)" }} />

        {/* Watermark text */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <span style={{ fontSize: "clamp(64px, 10vw, 120px)", fontWeight: 700, color: "#fff", opacity: 0.06, letterSpacing: "-0.03em", fontFamily: "var(--font-family-primary)", userSelect: "none", whiteSpace: "nowrap" }}>
            NEAR × Privacy
          </span>
        </div>

        {/* Animated badge at bottom-left */}
        <div className="hero-badge" style={{ position: "absolute", bottom: 48, left: pad, display: "flex", alignItems: "center", gap: 16, opacity: 0 }}>
          <span style={{ fontSize: 11, padding: "4px 10px", background: acc, color: "#000", borderRadius: 2, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-family-secondary)" }}>
            {META.tag}
          </span>
          <span style={{ fontSize: sm, color: "rgba(255,255,255,0.75)" }}>{META.date}</span>
          <span style={{ fontSize: sm, color: "rgba(255,255,255,0.45)" }}>·</span>
          <span style={{ fontSize: sm, color: "rgba(255,255,255,0.75)" }}>{META.reading}</span>
        </div>
      </section>

      {/* Wrap everything from header onward for progress bar tracking */}
      <div ref={articleRef}>

        {/* ── S3: Article header — stagger reveal ── */}
        <header style={{ padding: `64px ${pad} 48px`, maxWidth: `calc(var(--article-max-width) + 2 * ${pad})`, marginTop: -24, position: "relative" }}>
          <p className="art-tag" style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 24, opacity: 0 }}>
            {META.tag}
          </p>
          <h1 className="art-title" style={{ fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.15, fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 32, opacity: 0, fontFamily: "var(--font-family-primary)" }}>
            {META.title}
          </h1>
          <div className="art-meta" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", opacity: 0 }}>
            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: acc, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#000" }}>NP</span>
              </div>
              <span style={{ fontSize: sm, color: "#fff", fontWeight: 500 }}>NEAR Protocol Team</span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <span style={{ fontSize: sm, color: sec }}>{META.date}</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <span style={{ fontSize: sm, color: sec }}>{META.reading}</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            {/* Share button */}
            <button style={{ fontSize: sm, color: sec, background: "transparent", border: borderFaint, borderRadius: 2, padding: "4px 12px", cursor: "pointer", fontFamily: "var(--font-family-primary)" }}>
              Share
            </button>
          </div>
        </header>

        {/* ── S4–S9: Article body sections ── */}
        <article style={{ padding: `0 ${pad} ${padV}`, maxWidth: `calc(var(--article-max-width) + 2 * ${pad})` }}>
          {SECTIONS.map((section, si) => (
            <div key={section.id}>
              {/* Section block */}
              <div style={{ marginBottom: 64 }}>
                <svg width="100%" height="1" style={{ display: "block", marginBottom: 48, overflow: "visible" }}>
                  <line className="divider-line" x1="0" y1="0.5" x2="100%" y2="0.5" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                </svg>
                <p style={{ fontSize: sm, color: sec, fontFamily: "var(--font-family-secondary)", marginBottom: 16 }}>
                  0{si + 1}
                </p>
                <h2
                  className={headingClass(section.anim)}
                  style={{ fontSize: "var(--font-size-h2-article)", lineHeight: "var(--line-height-h2-article)", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 32, fontFamily: "var(--font-family-primary)" }}
                >
                  {section.heading}
                </h2>
                {section.pullQuote && (
                  <blockquote className="pull-quote" style={{ fontSize: "var(--font-size-body-lg)", lineHeight: "var(--line-height-body-lg)", color: acc, borderLeft: `2px solid ${acc}`, paddingLeft: 24, margin: "0 0 40px", fontWeight: 400, opacity: 0 }}>
                    {section.pullQuote}
                  </blockquote>
                )}
                {section.body.map((para, pi) => (
                  <p key={pi} className="art-para" style={{ fontSize: "var(--font-size-body)", lineHeight: "var(--line-height-body)", color: sec, marginBottom: pi < section.body.length - 1 ? 20 : 0, opacity: 0 }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Mid-article insert after "solution" (index 1) */}
              {si === 1 && (
                <figure style={{ margin: "0 0 64px" }}>
                  <div style={{ overflow: "hidden", borderRadius: 4 }}>
                    <img
                      className="article-img"
                      src="/img/image%2020.png"
                      alt="NEAR Intents confidential mode interface"
                      style={{ width: "100%", height: 320, objectFit: "cover", display: "block", borderRadius: 4 }}
                    />
                  </div>
                  <figcaption className="article-caption" style={{ fontSize: sm, color: "rgba(255,255,255,0.35)", marginTop: 12, fontStyle: "italic" }}>
                    The NEAR Intents interface — confidential mode toggle
                  </figcaption>
                </figure>
              )}

              {/* Stat callout after "mev" (index 2) */}
              {si === 2 && (
                <div
                  className="stat-callout"
                  style={{ margin: "0 0 64px", border, borderRadius: 4, padding: "40px 48px", display: "flex", gap: 0, clipPath: "inset(0 100% 0 0)" }}
                >
                  {[
                    { label: "MEV attacks", value: "0" },
                    { label: "front-running loss", value: "$0" },
                    { label: "settlement", value: "<1s" },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      style={{ flex: 1, textAlign: "center", borderLeft: i > 0 ? borderFaint : "none", paddingLeft: i > 0 ? 32 : 0, paddingRight: i < 2 ? 32 : 0 }}
                    >
                      <div style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 600, color: acc, lineHeight: 1.1, marginBottom: 8, fontFamily: "var(--font-family-primary)" }}>
                        {stat.value}
                      </div>
                      <div style={{ fontSize: sm, color: sec, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Image after "institutional" (index 3) */}
              {si === 3 && (
                <figure style={{ margin: "0 0 64px" }}>
                  <div style={{ overflow: "hidden", borderRadius: 4 }}>
                    <img
                      className="article-img"
                      src="/img/image%2026.png"
                      alt="Enterprise selective disclosure"
                      style={{ width: "100%", height: 320, objectFit: "cover", display: "block", borderRadius: 4 }}
                    />
                  </div>
                  <figcaption className="article-caption" style={{ fontSize: sm, color: "rgba(255,255,255,0.35)", marginTop: 12, fontStyle: "italic" }}>
                    Enterprise-grade selective disclosure for institutional DeFi
                  </figcaption>
                </figure>
              )}

              {/* Key takeaways box before last section (before index 5 = "technical") */}
              {si === 4 && (
                <div className="takeaways-box" style={{ margin: "0 0 64px", position: "relative", display: "flex" }}>
                  {/* Left accent border drawn via scaleY */}
                  <div className="takeaways-border" style={{ width: 3, background: acc, flexShrink: 0, borderRadius: 2, transform: "scaleY(0)", transformOrigin: "top center" }} />
                  <div className="takeaways-content" style={{ padding: "32px 40px", background: "rgba(0,236,151,0.05)", flex: 1, opacity: 0 }}>
                    <h3 style={{ fontSize: "var(--font-size-body-lg)", fontWeight: 600, color: "#fff", marginBottom: 20, fontFamily: "var(--font-family-primary)" }}>
                      Key takeaways
                    </h3>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                      {[
                        "Private execution — no MEV, no front-running",
                        "Cross-chain by default — 35+ networks, one account",
                        "Institutional-grade — selective disclosure for compliance",
                        "Agent-ready — hardware TEEs for autonomous AI trading",
                      ].map((item) => (
                        <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: "var(--font-size-body)", color: sec, lineHeight: "var(--line-height-body)" }}>
                          <span style={{ color: acc, fontWeight: 700, flexShrink: 0 }}>✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Image after last section "technical" (index 5) */}
              {si === 5 && (
                <figure style={{ margin: "0 0 64px" }}>
                  <div style={{ overflow: "hidden", borderRadius: 4 }}>
                    <img
                      className="article-img"
                      src="/img/image%2012.png"
                      alt="TEE architecture"
                      style={{ width: "100%", height: 320, objectFit: "cover", display: "block", borderRadius: 4 }}
                    />
                  </div>
                  <figcaption className="article-caption" style={{ fontSize: sm, color: "rgba(255,255,255,0.35)", marginTop: 12, fontStyle: "italic" }}>
                    TEE architecture: hardware-enforced isolation for AI agents and transactions
                  </figcaption>
                </figure>
              )}
            </div>
          ))}
        </article>

        {/* ── Author bio ── */}
        <section style={{ padding: `0 ${pad} 64px`, maxWidth: `calc(var(--article-max-width) + 2 * ${pad})` }}>
          <div style={{ borderTop: borderFaint, paddingTop: 48 }}>
            <div
              className="author-card"
              style={{ display: "flex", alignItems: "center", gap: 24, opacity: 0 }}
            >
              {/* Avatar */}
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: acc, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: "#000", fontFamily: "var(--font-family-primary)" }}>NP</span>
              </div>
              {/* Info */}
              <div>
                <div style={{ fontSize: "var(--font-size-body)", fontWeight: 600, color: "#fff", marginBottom: 4, fontFamily: "var(--font-family-primary)" }}>
                  NEAR Protocol Team
                </div>
                <div style={{ fontSize: sm, color: sec, marginBottom: 4 }}>
                  near.org · nearprotocol.com
                </div>
                <div style={{ fontSize: sm, color: "rgba(255,255,255,0.35)" }}>
                  Protocol updates and ecosystem research
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── S9: Related articles ── */}
        <section style={{ padding: `${padV} ${pad}`, borderTop: border }}>
          <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 48 }}>
            Related reading
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(255,255,255,0.12)", border, maxWidth: "var(--content-max-width)" }}>
            {RELATED.map((art) => (
              <div
                key={art.title}
                className="related-card"
                style={{ background: "var(--color-bg-dark)", clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", overflow: "hidden" }}
              >
                {/* Image with Ken Burns */}
                <div style={{ overflow: "hidden", height: 160 }}>
                  <img
                    className="related-img"
                    src={art.img}
                    alt={art.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transformOrigin: "center center" }}
                  />
                </div>
                {/* Card content */}
                <div style={{ padding: 32 }}>
                  <span style={{ fontSize: 11, padding: "3px 8px", border: borderFaint, borderRadius: 2, color: sec, fontFamily: "var(--font-family-secondary)", display: "inline-block", marginBottom: 16 }}>
                    {art.tag}
                  </span>
                  <h3 style={{ fontSize: "var(--font-size-body-lg)", lineHeight: "var(--line-height-body-lg)", fontWeight: 600, margin: "0 0 16px", fontFamily: "var(--font-family-primary)" }}>
                    {art.title}
                  </h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: sm, color: sec }}>{art.date}</p>
                    <span style={{ fontSize: sm, color: acc }}>Read article →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── S10: Newsletter ── */}
        <section className="nl-section" style={{ padding: `${padV} ${pad}`, borderTop: border }}>
          <div style={{ maxWidth: 560 }}>
            <h2
              className="nl-heading"
              style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 16, opacity: 0, position: "relative", display: "inline-block", fontFamily: "var(--font-family-primary)" }}
            >
              Stay ahead of the protocol
              <span
                className="nl-underline"
                style={{ position: "absolute", bottom: -6, left: 0, right: 0, height: 2, background: acc, display: "block", transform: "scaleX(0)", transformOrigin: "left center" }}
              />
            </h2>
            <p className="nl-sub" style={{ fontSize: "var(--font-size-body)", lineHeight: "var(--line-height-body)", color: sec, margin: "32px 0 24px", opacity: 0 }}>
              Get protocol updates, ecosystem highlights, and NEAR AI research delivered to your inbox.
            </p>
            <div className="nl-form" style={{ display: "flex", gap: 12, opacity: 0 }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{ flex: 1, padding: "12px 16px", background: "transparent", border, borderRadius: "var(--border-radius)", color: "#fff", fontSize: sm, fontFamily: "var(--font-family-primary)", outline: "none" }}
              />
              <button
                style={{ whiteSpace: "nowrap", padding: "12px 24px", background: acc, border: "none", borderRadius: 0, color: "#000", fontSize: sm, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-family-primary)" }}
              >
                Subscribe
              </button>
            </div>
            {/* Feature badges */}
            <div className="nl-badges" style={{ display: "flex", gap: 24, marginTop: 20, opacity: 0 }}>
              {["Weekly updates", "No spam", "Unsubscribe anytime"].map((badge, i) => (
                <div key={badge} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {i > 0 && <span style={{ color: "rgba(255,255,255,0.2)", fontSize: sm }}>·</span>}
                  <span style={{ fontSize: sm, color: "rgba(255,255,255,0.45)" }}>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>{/* end articleRef wrapper */}

    </div>
  );
}
