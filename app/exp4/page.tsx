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
  { tag: "Protocol",    title: "NEAR Intents: The End of Bridges", date: "Jan 2026" },
  { tag: "AI",          title: "Private Inference and the Agent Economy", date: "Mar 2026" },
  { tag: "Chain Abstraction", title: "One Account. 35 Chains.", date: "Feb 2026" },
];

export default function Exp4() {
  const containerRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {

      // ── S1: Reading progress bar (scrub) ──
      gsap.to(".read-progress", {
        scaleX: 1, ease: "none", transformOrigin: "left center",
        scrollTrigger: { trigger: articleRef.current, start: "top top", end: "bottom bottom", scrub: 0 },
      });

      // ── S2: Article header — opacity+y stagger on load ──
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

      // ── S3: clip-bottom headings — inset(100% 0 0 0) → inset(0% 0 0 0) ──
      gsap.utils.toArray<HTMLElement>(".heading-clip-bottom").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });

      // ── S4: slide-left headings — x:-32 ──
      gsap.utils.toArray<HTMLElement>(".heading-slide-left").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: -32 },
          { opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });

      // ── S5: clip-left headings — inset(0 100% 0 0) → inset(0 0% 0 0) ──
      gsap.utils.toArray<HTMLElement>(".heading-clip-left").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });

      // ── S6: scale-fade headings ──
      gsap.utils.toArray<HTMLElement>(".heading-scale-fade").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });

      // ── S7: slide-up headings ──
      gsap.utils.toArray<HTMLElement>(".heading-slide-up").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });

      // ── S8: clip-top headings — inset(0 0 100% 0) → inset(0 0 0% 0) ──
      gsap.utils.toArray<HTMLElement>(".heading-clip-top").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });

      // Pull quote — scale+opacity
      gsap.fromTo(".pull-quote",
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".pull-quote", start: "top 80%", once: true } }
      );

      // Body paragraphs
      gsap.utils.toArray<HTMLElement>(".art-para").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true } }
        );
      });

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

      // ── S10: Newsletter — underline draw (scaleX from 0) ──
      gsap.fromTo(".nl-underline",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.9, ease: "power3.inOut",
          scrollTrigger: { trigger: ".nl-section", start: "top 75%", once: true } }
      );
      gsap.fromTo([".nl-heading", ".nl-sub", ".nl-form"],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.65, ease: "power2.out",
          scrollTrigger: { trigger: ".nl-section", start: "top 75%", once: true }, delay: 0.2 }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([".art-tag", ".art-title", ".art-meta", ".art-para", ".pull-quote",
                 ".related-card", ".nl-heading", ".nl-sub", ".nl-form"],
        { opacity: 1, y: 0, x: 0, scale: 1, clipPath: "none" }
      );
      gsap.set(".read-progress", { scaleX: 0 });
      gsap.set(".nl-underline", { scaleX: 1 });
    });
  }, { scope: containerRef });

  const headingClass = (anim: string) => {
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

  const border = "1px solid var(--color-border-dark)";
  const pad = "var(--section-padding-h)";
  const padV = "var(--section-padding-v)";
  const sm = "var(--font-size-small)";
  const sec = "var(--color-text-secondary)";
  const acc = "var(--color-accent)";

  return (
    <div ref={containerRef} style={{ background: "var(--color-bg-dark)", color: "var(--color-text-on-dark)" }}>

      {/* ── S1: Fixed reading progress bar ── */}
      <div style={{ position: "fixed", top: "var(--nav-height)", left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.08)", zIndex: 99, pointerEvents: "none" }}>
        <div className="read-progress" style={{ height: "100%", background: acc, transform: "scaleX(0)", transformOrigin: "left center" }} />
      </div>

      {/* ── S2: Article header — stagger reveal ── */}
      <header ref={articleRef} style={{ padding: `80px ${pad} 64px`, maxWidth: `calc(var(--article-max-width) + 2 * ${pad})` }}>
        <p className="art-tag" style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 24, opacity: 0 }}>
          {META.tag}
        </p>
        <h1 className="art-title" style={{ fontSize: "var(--font-size-h1-page)", lineHeight: "var(--line-height-h1-page)", fontWeight: 500, marginBottom: 32, opacity: 0 }}>
          {META.title}
        </h1>
        <div className="art-meta" style={{ display: "flex", gap: 24, fontSize: sm, color: sec, opacity: 0 }}>
          <span>{META.date}</span>
          <span>·</span>
          <span>{META.reading}</span>
        </div>
      </header>

      {/* ── S3–S8: Article sections with varied heading animations ── */}
      <article style={{ padding: `0 ${pad} ${padV}`, maxWidth: `calc(var(--article-max-width) + 2 * ${pad})` }}>
        {SECTIONS.map((section, si) => (
          <div key={section.id} style={{ marginBottom: 80 }}>
            <svg width="100%" height="1" style={{ display: "block", marginBottom: 48, overflow: "visible" }}>
              <line className="divider-line" x1="0" y1="0.5" x2="100%" y2="0.5" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            </svg>
            <p style={{ fontSize: sm, color: sec, fontFamily: "var(--font-family-secondary)", marginBottom: 16 }}>0{si + 1}</p>
            <h2 className={headingClass(section.anim)} style={{ fontSize: "var(--font-size-h2-article)", lineHeight: "var(--line-height-h2-article)", fontWeight: 500, marginBottom: 32 }}>
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
        ))}
      </article>

      {/* ── S9: Related articles — diagonal polygon clipPath reveal ── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 48 }}>Related reading</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "var(--color-border-dark)", border, maxWidth: "var(--content-max-width)" }}>
          {RELATED.map((art) => (
            <div key={art.title} className="related-card" style={{ padding: 40, background: "var(--color-bg-dark)", clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}>
              <span style={{ fontSize: 11, padding: "3px 8px", border, borderRadius: 2, color: sec, fontFamily: "var(--font-family-secondary)" }}>{art.tag}</span>
              <h3 style={{ fontSize: "var(--font-size-body-lg)", lineHeight: "var(--line-height-body-lg)", fontWeight: 500, margin: "24px 0 16px" }}>{art.title}</h3>
              <p style={{ fontSize: sm, color: sec }}>{art.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── S10: Newsletter — underline draw animation ── */}
      <section className="nl-section" style={{ padding: `${padV} ${pad}`, borderTop: border }}>
        <div style={{ maxWidth: 560 }}>
          <h2 className="nl-heading" style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 500, marginBottom: 16, opacity: 0, position: "relative" as const, display: "inline-block" }}>
            Stay ahead of the protocol
            <span className="nl-underline" style={{ position: "absolute" as const, bottom: -6, left: 0, right: 0, height: 2, background: acc, display: "block", transform: "scaleX(0)", transformOrigin: "left center" }} />
          </h2>
          <p className="nl-sub" style={{ fontSize: "var(--font-size-body)", lineHeight: "var(--line-height-body)", color: sec, margin: "32px 0 24px", opacity: 0 }}>
            Get protocol updates, ecosystem highlights, and NEAR AI research delivered to your inbox.
          </p>
          <div className="nl-form" style={{ display: "flex", gap: 12, opacity: 0 }}>
            <input type="email" placeholder="your@email.com" style={{ flex: 1, padding: "12px 16px", background: "transparent", border, borderRadius: "var(--border-radius)", color: "#fff", fontSize: sm, fontFamily: "var(--font-family-primary)", outline: "none" }} />
            <button className="btn-secondary" style={{ whiteSpace: "nowrap" as const }}>Subscribe</button>
          </div>
        </div>
      </section>

    </div>
  );
}
