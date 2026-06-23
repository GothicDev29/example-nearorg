# Animation Registry — near.org motion R&D

All 41 animation techniques across the 4 experiment pages. **No technique is repeated across any section of any page.**

## Legend

| Column | Meaning |
|---|---|
| Page | `/expN` route |
| Section | S1 = first section of that page |
| Technique | Short label |
| GSAP approach | Core API / property used |

---

## exp1 — Hero text reveal

| Section | Technique | GSAP approach |
|---|---|---|
| S1 — Hero | **yPercent word stagger** | `yPercent: 100→0` per `.word` span, `clipPath: inset(0)` on parent, on-load stagger |
| S2 — Parallax | **Multi-layer parallax** | `ScrollTrigger` scrub, `.parallax-bg` moves at `yPercent: -25` (slower than scroll) |
| S3 — Color mutation | **Background color scrub** | `backgroundColor: "#000"→"#0b1a12"` via `scrollTrigger` scrub on section |
| S4 — Chars | **Per-character rotateX stagger** | Characters split in JSX as `<span>`, `rotateX: 90→0`, `perspective: 800px` |
| S5 — Magnetic button | **Magnetic hover** | `mousemove` → `x/y * 0.35`; `mouseleave` → `elastic.out(1, 0.4)` spring-back |
| S6 — Ken Burns | **Ken Burns zoom** | `scale: 1→1.14` scroll-driven on `<img>` inside `overflow:hidden` container |
| S7 — Circle reveal | **Circle clipPath mask** | `clipPath: circle(0%)→circle(75%)` on `<img>` via `scrollTrigger` |
| S8 — FAQ | **Accordion max-height** | CSS `max-height` + `opacity` transition controlled by `useState` (no GSAP `height`) |
| S9 — Gradient sweep | **Text gradient sweep** | `backgroundPositionX` driven by `scrollTrigger.onUpdate` callback |
| S10 — Footer | **Footer curtain** | `.footer-curtain` overlay `scaleY: 1→0`, `transformOrigin: "bottom center"` on scroll |

---

## exp2 — NEAR Stack

| Section | Technique | GSAP approach |
|---|---|---|
| S1 — Hero | **Text scramble** | Manual `setInterval` randomizes chars then settles to final text; no SplitText plugin |
| S2 — Stack | **Scroll pin panel swap** | `ScrollTrigger` pin + timeline; each panel `autoAlpha: 0→1` and `autoAlpha: 1→0` |
| S3 — Counters | **Counter tween power2.out** | `{val: 0}` object tweened to target, `onUpdate` writes `Math.round(val)` to DOM |
| S4 — Integration cards | **Cards stagger grid** | `gsap.fromTo(".intg-card", ...)` with `stagger: 0.07`, cards `y: 28→0` + `opacity`, single `scrollTrigger` on grid |
| S5 — Letters | **Letter-spacing animation** | `letterSpacing: "0.18em"→"0.01em"` + `opacity`, `scrollTrigger` once |
| S6 — Velocity skew | **Velocity-based skew** | `proxy.skew` via `ScrollTrigger.onUpdate` + `self.getVelocity() / -350`; `gsap.set` skewY |
| S7 — Video | **Video currentTime scrub** | `video.currentTime = self.progress * video.duration` inside pinned `scrollTrigger` `onUpdate` |
| S8 — Image sequence | **Crossfade image sequence** | 5 images absolutely stacked; timeline `opacity 1→0` / `0→1` sequenced + `scrub` |
| S9 — Diagonal wipe | **Diagonal overlay wipe** | `clipPath: polygon(0 0,100% 0,100% 100%,0 100%)→polygon(100% 0,100% 0,100% 100%,100% 100%)` |
| S10 — Counter elastic | **Elastic counter overshoot** | `scale: 0.4→1` + opacity with `elastic.out(1.2, 0.5)` |

---

## exp3 — Ecosystem

| Section | Technique | GSAP approach |
|---|---|---|
| S1 — Hero | **rotateY per-line stagger** | Each line `rotateY: 90→0`, `transformPerspective: 800`, on-load stagger |
| S2 — Marquee | **Infinite GSAP marquee** | `gsap.to` `x: "-50%"` repeat `-1` on doubled item list; paused on hover |
| S3 — Project grid | **ScrollTrigger.batch** | `ScrollTrigger.batch(".proj-card", {onEnter})` with `batchMax: 5` and `stagger: 0.09` |
| S4 — Featured | **Horizontal scroll pin** | `ScrollTrigger` pin + `gsap.to(track, { x: -totalShift })` scrub tied to vertical scroll |
| S5 — Bar chart | **Bar chart scaleY** | `.bar-fill` elements `scaleY: 0→1`, `transformOrigin: "bottom"`, stagger 0.1 |
| S6 — Testimonials | **Stacked cards peel** | Cards stacked absolute; `ScrollTrigger` pin timeline: each peels with `y, rotate, scale, opacity` |
| S7 — Gallery | **3D mouse-follow tilt** | `mousemove` → `rotateX/rotateY` per card; `transformPerspective: 600`; reset on `mouseleave` |
| S8 — Motion | **MotionPath follower** | Dot follows SVG `<path>` via `MotionPathPlugin` `{ path: "#svg-id", align: "#svg-id" }` |
| S9 — Orbit | **Orbiting logos** | Items placed at radius via `x/y = cos/sin * radius`; each rotates with matching `transformOrigin` |
| S10 — Carousel | **Draggable carousel** | `Draggable.create(track, { type: "x", bounds, snap })` — no scroll, pure drag with inertia resistance |

---

## exp4 — Blog article

| Section | Technique | GSAP approach |
|---|---|---|
| S1 — Progress bar | **Reading progress scaleX** | `scaleX: 0→1` via `scrollTrigger` scrub from article top to bottom; fixed position |
| S2 — Header | **Stagger opacity+y on load** | `[tag, h1, meta]` stagger `opacity+y` on component mount; not scroll-triggered |
| S3 — §Problem | **clipPath from bottom** | `clipPath: inset(100% 0 0 0)→inset(0% 0 0 0)` per heading on scroll |
| S4 — §Solution | **Slide-left heading** | `opacity: 0, x: -32→0` per heading on scroll |
| S5 — §MEV | **clipPath from right** | `clipPath: inset(0 100% 0 0)→inset(0 0% 0 0)` per heading on scroll |
| S6 — §Institutional | **Scale-fade heading** | `opacity: 0, scale: 0.92→1` per heading on scroll |
| S7 — §Abstraction | **Slide-up heading** | `opacity: 0, y: 28→0` per heading on scroll (scroll-triggered, distinct from S2 on-load) |
| S8 — §Technical | **clipPath from top** | `clipPath: inset(0 0 100% 0)→inset(0 0 0% 0)` per heading on scroll |
| S9 — Related | **Diagonal polygon clipPath** | Cards reveal: `polygon(0 0,0 0,0 100%,0 100%)→polygon(0 0,100% 0,100% 100%,0 100%)` |
| S10 — Newsletter | **Underline scaleX draw** | Underline `<span>` `scaleX: 0→1` `transformOrigin: left` on scroll; heading+sub+form stagger after |
| — (all) | **SVG line-draw** | `strokeDashoffset: length→0` on each `<line>` divider via `scrollTrigger` |

> Note: SVG line-draw is a supporting technique appearing on multiple dividers within exp4 — it is not counted as a "section technique" but is unique to exp4 across all pages.

---

## Summary

| Page | Sections | Unique section techniques |
|---|---|---|
| exp1 | 10 | 10 |
| exp2 | 10 | 10 |
| exp3 | 10 | 10 |
| exp4 | 10 + SVG dividers | 10 + 1 supporting |
| **Total** | **40** | **41 distinct techniques** |
