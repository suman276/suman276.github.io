"use client";

import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

/*
 * Sections opt into motion with data attributes, so they can stay Server Components:
 *   data-hero / data-hero="title"   on-load intro (the title rises word by word)
 *   data-reveal                     fade up when scrolled into view (batched)
 *   data-split                      section heading words rise out of a mask
 *   data-count="25"                 number counts up when it comes into view
 *   data-draw                       timeline rail grows with scroll
 * Motion is deliberately restrained: no parallax, floating or scroll-scrubbed text.
 */

function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });

  const title = document.querySelector<HTMLElement>("[data-hero='title']");
  if (title) {
    const split = SplitText.create(title, { type: "words", mask: "words" });
    // Gradient text is clipped to its own box, so each split word needs the gradient itself.
    split.words.forEach((word) => {
      if (word.closest(".text-gradient")) word.classList.add("text-gradient");
    });
    tl.set(title, { autoAlpha: 1 }).from(split.words, { yPercent: 110, stagger: 0.05, duration: 1 }, 0.1);
  }

  tl.from("[data-hero]:not([data-hero='title']):not([data-hero='visual'])", { autoAlpha: 0, y: 18, stagger: 0.08 }, 0.3)
    .from("[data-hero='visual']", { autoAlpha: 0, y: 24, scale: 0.98, duration: 1.2 }, 0.35);
}

function reveals() {
  const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
  gsap.set(items, { autoAlpha: 0, y: 24 });
  ScrollTrigger.batch(items, {
    start: "top 90%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.06 }),
  });
}

function splitHeadings() {
  gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
    const split = SplitText.create(el, { type: "words", mask: "words" });
    gsap.set(el, { autoAlpha: 1 });
    gsap.from(split.words, {
      yPercent: 110,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.04,
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });
}

/*
 * Counters. The real value is always in the HTML, so anything that never runs
 * the animation (background tabs, crawlers, link previews, full-page
 * screenshots) still sees "25", never "0". The count-up only starts once the
 * number is actually on screen in a visible tab, and if the tab is hidden
 * mid-count it jumps straight to the final value.
 */
function counters() {
  gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
    const match = el.dataset.count?.match(/^(\d+)(.*)$/);
    if (!match) return;
    const target = Number(match[1]);
    const suffix = match[2];
    const final = `${target}${suffix}`;

    ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => {
        if (document.visibilityState !== "visible") return;
        const counter = { value: 0 };
        const tween = gsap.to(counter, {
          value: target,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}${suffix}`;
          },
          onComplete: () => {
            el.textContent = final;
          },
        });
        const finish = () => {
          if (document.visibilityState !== "visible") tween.progress(1);
        };
        document.addEventListener("visibilitychange", finish, { once: true });
      },
    });
  });
}

function drawLines() {
  gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
    gsap.fromTo(
      el,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top 75%", end: "bottom 60%", scrub: true },
      }
    );
  });
}

/** One delegated listener feeds the cards' pointer spotlight (pure CSS otherwise). */
function spotlight() {
  const onMove = (e: PointerEvent) => {
    const card = (e.target as Element).closest<HTMLElement>(".card-hover");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  return () => window.removeEventListener("pointermove", onMove);
}

export default function PageAnimations() {
  useGSAP(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      heroIntro();
      reveals();
      splitHeadings();
      counters();
      drawLines();
    });

    const stopSpotlight = spotlight();
    root.classList.add("motion-ready");
    // Web fonts change text metrics; re-measure every trigger once they load.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      mm.revert();
      stopSpotlight();
    };
  });

  return null;
}
