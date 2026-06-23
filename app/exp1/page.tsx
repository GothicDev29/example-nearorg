"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap/register";

const HEADLINE = ["Motion", "is the", "language."];

const FAQS = [
  { q: "What is chain abstraction?", a: "Chain abstraction lets you interact with any blockchain from a single NEAR account — no bridging, no managing multiple wallets or gas tokens. NEAR Intents handles the routing." },
  { q: "Is NEAR open source?", a: "Yes. NEAR Protocol, NEAR AI, and the majority of ecosystem tooling are open-source under Apache and MIT licenses. Contributions are welcome on GitHub." },
  { q: "How does NEAR achieve 1M TPS?", a: "Through dynamic sharding — the network automatically splits into parallel shards as load increases. Each shard processes transactions independently, and cross-shard communication is handled by the protocol." },
  { q: "What is a TEE?", a: "A Trusted Execution Environment is a hardware-secured enclave where code runs in total isolation — not even the host machine operator can read what's inside. NEAR AI uses TEEs for private inference." },
];

const d = (v: string) => v as React.CSSProperties["fontWeight"];

export default function Exp1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  const kbImgRef = useRef<HTMLDivElement>(null);
  const magnetRef = useRef<HTMLAnchorElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {

      // ── S1: Word clip-path reveal via overflow:hidden + yPercent ──
      gsap.fromTo(".word-mask",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.1 }
      );
      gsap.fromTo(".accent-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8, ease: "power3.out", delay: 0.55 }
      );
      gsap.fromTo([".hero-sub", ".hero-cta"],
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.2, delay: 0.85 }
      );

      // ── S2: Multi-layer parallax — bg slower, fg faster ──
      gsap.to(".parallax-bg", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: { trigger: ".s2-parallax", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.fromTo(".parallax-text",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".parallax-text", start: "top 80%", once: true } }
      );

      // ── S3: Background color mutation on scroll ──
      gsap.to(".s3-bg", {
        backgroundColor: "#0b1a12",
        ease: "none",
        scrollTrigger: { trigger: ".s3-bg", start: "top 60%", end: "bottom 40%", scrub: 1 },
      });

      // ── S4: Per-character rotateX stagger ──
      gsap.fromTo(".char-rX",
        { rotateX: 90, opacity: 0, transformOrigin: "bottom center" },
        { rotateX: 0, opacity: 1, stagger: 0.028, duration: 0.55, ease: "power3.out",
          scrollTrigger: { trigger: ".s4-chars", start: "top 80%", once: true } }
      );
      gsap.fromTo(".s4-sub",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".s4-sub", start: "top 85%", once: true } }
      );

      // ── S5: Magnetic button ──
      const btn = magnetRef.current;
      if (btn) {
        const handleMove = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power2.out" });
        };
        const handleLeave = () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
        };
        btn.addEventListener("mousemove", handleMove);
        btn.addEventListener("mouseleave", handleLeave);
        return () => {
          btn.removeEventListener("mousemove", handleMove);
          btn.removeEventListener("mouseleave", handleLeave);
        };
      }

      // ── S6: Ken Burns zoom (scroll-driven scale) ──
      gsap.fromTo(".kb-inner",
        { scale: 1 },
        { scale: 1.14, ease: "none",
          scrollTrigger: { trigger: ".s6-kb", start: "top bottom", end: "bottom top", scrub: true } }
      );
      gsap.fromTo(".s6-copy",
        { opacity: 0, x: -32 },
        { opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ".s6-copy", start: "top 80%", once: true } }
      );

      // ── S7: Circle clipPath mask reveal ──
      gsap.fromTo(".circle-img",
        { clipPath: "circle(0% at 50% 50%)" },
        { clipPath: "circle(75% at 50% 50%)", duration: 1.1, ease: "power2.out",
          scrollTrigger: { trigger: ".s7-circle", start: "top 70%", once: true } }
      );
      gsap.fromTo(".s7-text",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power2.out",
          scrollTrigger: { trigger: ".s7-text", start: "top 82%", once: true } }
      );

      // ── S8: Accordion height (FAQ) — handled by click, no ScrollTrigger ──
      // Initial state set below in openFaq handler

      // ── S9: Text gradient sweep via backgroundPosition scrub ──
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

      // ── S10: Footer curtain — overlay scaleY shrinks from bottom ──
      gsap.fromTo(".footer-curtain",
        { scaleY: 1 },
        { scaleY: 0, transformOrigin: "bottom center", ease: "power2.inOut",
          scrollTrigger: { trigger: ".s10-footer", start: "top 85%", end: "top 30%", scrub: 0.5 } }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".word-mask", { yPercent: 0 });
      gsap.set([".accent-line", ".hero-sub", ".hero-cta", ".parallax-text", ".s4-sub",
        ".s6-copy", ".s7-text", ".char-rX"], { opacity: 1, y: 0, x: 0, rotateX: 0 });
    });
  }, { scope: containerRef });

  const toggleFaq = (i: number) => {
    setOpenFaq(openFaq === i ? null : i);
  };

  const border = "1px solid var(--color-border-dark)";
  const pad = "var(--section-padding-h)";
  const padV = "var(--section-padding-v)";
  const sm = "var(--font-size-small)";
  const sec = "var(--color-text-secondary)";
  const acc = "var(--color-accent)";

  return (
    <div ref={containerRef} style={{ background: "#000", color: "#fff" }}>

      {/* ── S1: Hero — yPercent word reveal ── */}
      <section style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center", padding: `0 ${pad}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 48, right: pad, width: 8, height: 8, borderRadius: "50%", background: acc }} />
        <div style={{ maxWidth: "var(--content-max-width)" }}>
          <h1 style={{ fontSize: "var(--font-size-h1-display)", lineHeight: "var(--line-height-h1-display)", fontWeight: d("var(--font-weight-h1-display)"), margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {HEADLINE.map((line, i) => (
              <span key={i} style={{ display: "block", overflow: "hidden", lineHeight: "1.1", paddingBottom: "0.05em" }}>
                <span className="word-mask" style={{ display: "block" }}>
                  {i === HEADLINE.length - 1
                    ? <>{line.slice(0, -1)}<span style={{ color: acc }}>.</span></>
                    : line}
                </span>
              </span>
            ))}
          </h1>
          <div className="accent-line" style={{ width: 64, height: 2, background: acc, marginBottom: 32 }} />
          <p className="hero-sub" style={{ fontSize: "var(--font-size-body-lg)", lineHeight: "var(--line-height-body-lg)", color: sec, maxWidth: 480, marginBottom: 48, opacity: 0 }}>
            GSAP motion experiments for the near.org redesign. Each route explores a different animation pattern.
          </p>
          <a href="/exp1#" className="hero-cta btn-secondary" style={{ opacity: 0 }}>
            Explore experiments <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      {/* ── S2: Multi-layer parallax ── */}
      <section className="s2-parallax" style={{ minHeight: "80vh", position: "relative", overflow: "hidden", borderTop: border, display: "flex", alignItems: "center" }}>
        <div className="parallax-bg" style={{ position: "absolute", inset: "-20% 0", backgroundImage: "url('/img/image%2012.png')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.25 }} />
        <div className="parallax-text" style={{ position: "relative", zIndex: 2, padding: `80px ${pad}`, maxWidth: "var(--content-max-width)", opacity: 0 }}>
          <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 24 }}>What is NEAR?</p>
          <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 500, maxWidth: 640, marginBottom: 24 }}>
            Open infrastructure for the agent economy
          </h2>
          <p style={{ fontSize: "var(--font-size-body-lg)", lineHeight: "var(--line-height-body-lg)", color: sec, maxWidth: 560 }}>
            NEAR combines cross-chain execution, confidential settlement, private inference, and a secure agent harness — co-founded by Illia Polosukhin, co-author of "Attention Is All You Need".
          </p>
        </div>
      </section>

      {/* ── S3: Background color mutation ── */}
      <section className="s3-bg" style={{ minHeight: "60vh", padding: `${padV} ${pad}`, borderTop: border, display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: "var(--content-max-width)" }}>
          <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 24 }}>The agent economy</p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 400, lineHeight: 1.1, maxWidth: 720 }}>
            AI agents need secure infrastructure. NEAR is built for exactly that.
          </h2>
        </div>
      </section>

      {/* ── S4: Per-character rotateX stagger ── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 32 }}>Built for AI</p>
        <div className="s4-chars" style={{ perspective: "800px", marginBottom: 40 }}>
          <h2 style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 400, lineHeight: 1, whiteSpace: "nowrap", display: "flex", flexWrap: "wrap", gap: "0.05em" }}>
            {"Private. Scalable. Yours.".split("").map((char, i) => (
              <span key={i} className={char !== " " ? "char-rX" : undefined}
                style={{ display: "inline-block", opacity: char !== " " ? 0 : undefined }}>
                {char === " " ? " " : char}
              </span>
            ))}
          </h2>
        </div>
        <p className="s4-sub" style={{ fontSize: "var(--font-size-body-lg)", color: sec, maxWidth: 560, lineHeight: "var(--line-height-body-lg)", opacity: 0 }}>
          IronClaw sandboxes tools and isolates credentials inside hardware-enforced TEEs. Your secrets never reach the model — not even the host can read them.
        </p>
      </section>

      {/* ── S5: Magnetic button ── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 40 }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Interactive</p>
        <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 500, maxWidth: 560 }}>
          Pull toward what matters
        </h2>
        <p style={{ fontSize: "var(--font-size-body-lg)", color: sec, maxWidth: 520, lineHeight: "var(--line-height-body-lg)" }}>
          Hover over the button — it attracts to your cursor with spring physics. A detail that makes interfaces feel alive.
        </p>
        <div style={{ height: 160, display: "flex", alignItems: "center" }}>
          <a ref={magnetRef} href="#" className="btn-secondary"
            style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 36px", fontSize: 18, cursor: "none" }}>
            Start building on NEAR
            <span style={{ color: acc }} aria-hidden>→</span>
          </a>
        </div>
      </section>

      {/* ── S6: Ken Burns zoom ── */}
      <section style={{ borderTop: border, display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "70vh" }}>
        <div className="s6-kb" style={{ position: "relative", overflow: "hidden" }}>
          <div className="kb-inner" style={{ position: "absolute", inset: 0, backgroundImage: "url('/img/image%2014.png')", backgroundSize: "cover", backgroundPosition: "center", transformOrigin: "center" }} />
        </div>
        <div className="s6-copy" style={{ padding: `80px 64px`, display: "flex", flexDirection: "column", justifyContent: "center", opacity: 0 }}>
          <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 24 }}>5 years, 100% uptime</p>
          <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 500, marginBottom: 24 }}>
            The settlement layer that never sleeps
          </h2>
          <p style={{ fontSize: "var(--font-size-body)", lineHeight: "var(--line-height-body)", color: sec }}>
            NEAR Protocol has maintained 100% uptime on mainnet since launch. Fully sharded with quantum-adaptive cryptography, supporting 1M TPS with 600ms blocks.
          </p>
        </div>
      </section>

      {/* ── S7: Circle mask reveal ── */}
      <section className="s7-circle" style={{ borderTop: border, padding: `${padV} ${pad}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div className="s7-text" style={{ opacity: 0 }}>
          <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 24 }}>Cross-chain execution</p>
          <h2 style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--line-height-h2)", fontWeight: 500, marginBottom: 24 }}>
            One account.<br />Every chain.
          </h2>
          <p style={{ fontSize: "var(--font-size-body)", lineHeight: "var(--line-height-body)", color: sec, marginBottom: 32 }}>
            NEAR Intents routes cross-chain swaps across 35+ networks with sub-cent fees and sub-second settlement. $19B in volume to date.
          </p>
          <a href="#" className="btn-secondary">Explore Intents →</a>
        </div>
        <div style={{ aspectRatio: "1", overflow: "hidden", borderRadius: 2 }}>
          <img className="circle-img" src="/img/image%2019.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", clipPath: "circle(0% at 50% 50%)" }} />
        </div>
      </section>

      {/* ── S8: FAQ accordion with GSAP height animation ── */}
      <section style={{ padding: `${padV} ${pad}`, borderTop: border }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 48 }}>Common questions</p>
        <div style={{ maxWidth: 760 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderTop: border }}>
              <button
                onClick={() => toggleFaq(i)}
                style={{ width: "100%", textAlign: "left", background: "none", border: "none", color: "#fff", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "var(--font-family-primary)", fontSize: "var(--font-size-body)", fontWeight: 500 }}
              >
                {faq.q}
                <span style={{ fontSize: 20, color: acc, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.3s ease", flexShrink: 0, marginLeft: 16 }}>+</span>
              </button>
              <div style={{
                overflow: "hidden",
                maxHeight: openFaq === i ? 200 : 0,
                transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                opacity: openFaq === i ? 1 : 0,
              }}>
                <p style={{ fontSize: "var(--font-size-body)", lineHeight: "var(--line-height-body)", color: sec, paddingBottom: 24 }}>{faq.a}</p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: border }} />
        </div>
      </section>

      {/* ── S9: Text gradient progressive sweep ── */}
      <section className="s9-gradient" style={{ padding: `${padV} ${pad}`, borderTop: border }}>
        <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 40 }}>NEAR 2026 and beyond</p>
        <div ref={gradientRef} style={{
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
        }}>
          The infrastructure choices we make now will determine what is possible later.
        </div>
      </section>

      {/* ── S10: Footer curtain reveal ── */}
      <section className="s10-footer" style={{ borderTop: border, position: "relative", overflow: "hidden" }}>
        <div className="footer-curtain" style={{ position: "absolute", inset: 0, background: "#000", zIndex: 2, transformOrigin: "bottom center" }} />
        <div style={{ position: "relative", zIndex: 1, padding: `${padV} ${pad}`, display: "flex", flexDirection: "column", gap: 40, alignItems: "flex-start" }}>
          <p style={{ fontSize: sm, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Start building</p>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 400, maxWidth: 640, lineHeight: 1.1 }}>
            Ready to build in the agent economy?
          </h2>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: acc, color: "#000", fontWeight: 600, fontSize: "var(--btn-primary-font-size)", textDecoration: "none" }}>
            Developers Hub →
          </a>
        </div>
      </section>

    </div>
  );
}
