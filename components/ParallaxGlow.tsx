"use client";

import { useEffect, useRef } from "react";

export default function ParallaxGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    function apply() {
      if (ref.current) {
        ref.current.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(apply);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute -left-16 -top-24 h-80 w-80 rounded-full bg-brand-teal/25 blur-3xl"
    />
  );
}
