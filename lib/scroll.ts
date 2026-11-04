import type Lenis from "lenis";
import { gsap } from "@/lib/gsap";

// SmoothScroll registers its Lenis instance here so other components can scroll
// through it (a native scroll would fight Lenis' smoothing).
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!lenis) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  // A section that hasn't revealed yet is still shifted down by its entrance
  // animation; aim for where it will settle, not where it is right now.
  const revealing = el.closest<HTMLElement>("[data-reveal]");
  const shift = revealing ? Number(gsap.getProperty(revealing, "y")) || 0 : 0;
  // Lenis applies the header gap from `scroll-padding-top` on <html> itself.
  lenis.scrollTo(el, { offset: -shift });
}
