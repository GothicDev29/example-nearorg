"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../../lib/gsap/register";

export function TransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // useLayoutEffect runs synchronously before paint — prevents flash of new page
  useLayoutEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    // Cover instantly, then wipe up to reveal the new page
    gsap.set(el, { scaleY: 1, transformOrigin: "bottom center" });
    gsap.to(el, {
      scaleY: 0,
      duration: 0.65,
      ease: "power3.inOut",
      transformOrigin: "top center",
      delay: 0.05,
    });
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--color-accent)",
        zIndex: 1000,
        transformOrigin: "top center",
        transform: "scaleY(0)",
        pointerEvents: "none",
      }}
    />
  );
}
