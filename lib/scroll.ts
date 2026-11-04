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

/** Freeze page scrolling behind a modal (Lenis and native), and restore it. */
export function lockScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) lenis?.stop();
  else lenis?.start();
}

/** Ask the projects section to open a case study by slug. */
export const OPEN_CASE_EVENT = "case-study:open";

export function openCaseStudy(slug: string) {
  window.dispatchEvent(new CustomEvent(OPEN_CASE_EVENT, { detail: slug }));
}
