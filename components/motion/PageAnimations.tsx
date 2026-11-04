"use client";

import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

/*
 * Sections opt into motion with data attributes, so they can stay Server Components:
 *   data-hero / data-hero-name   on-load intro timeline
 *   data-reveal                  fade up when scrolled into view (batched)
 *   data-split                   heading words rise out of a mask
 *   data-scrub-words             words brighten as you scroll through the paragraph
 *   data-count="25+"             number counts up from 0
 *   data-draw                    line grows with scroll (timeline)
 *   data-float                   gentle idle bobbing
 *   data-parallax="-20"          moves by that yPercent while the hero scrolls away
 */

function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1 } });

  const name = document.querySelector<HTMLElement>("[data-hero-name]");
  if (name) {
    const split = SplitText.create(name, { type: "chars,words", mask: "chars" });
    tl.set(name, { autoAlpha: 1 }).from(
      split.chars,
      { yPercent: 115, stagger: 0.035, duration: 1.1 },
      0.15
    );
  }

  tl.from("[data-hero='blob']", { autoAlpha: 0, scale: 0.6, duration: 1.6, ease: "expo.out" }, 0)
    .fromTo(
      "[data-hero='photo']",
      { autoAlpha: 0, clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 },
      {
        autoAlpha: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        duration: 1.4,
        ease: "expo.out",
        // Drop the finished clip so the portrait's ring and shadow aren't cut off.
        clearProps: "clipPath",
      },
      0.2
    )
    .from("[data-hero='fade']", { autoAlpha: 0, y: 24, stagger: 0.1, duration: 0.9 }, 0.45)
    .from(
      "[data-hero='badge']",
      { autoAlpha: 0, scale: 0.6, y: 20, stagger: 0.12, duration: 0.7, ease: "back.out(2)" },
      0.9
    );
}

function reveals() {
  const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
  gsap.set(items, { autoAlpha: 0, y: 40 });
  ScrollTrigger.batch(items, {
    start: "top 88%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
      }),
  });
}

function splitHeadings() {
  gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
    const split = SplitText.create(el, { type: "words", mask: "words" });
    gsap.set(el, { autoAlpha: 1 });
    gsap.from(split.words, {
      yPercent: 110,
      duration: 1,
      ease: "power4.out",
      stagger: 0.06,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
}

function scrubWords() {
  gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((el) => {
    const split = SplitText.create(el, { type: "words" });
    gsap.fromTo(
      split.words,
      { opacity: 0.18 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: true },
      }
    );
  });
}

function counters() {
  gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
    // Read the target from the attribute, not the text, so re-running is idempotent.
    const match = el.dataset.count?.match(/^(\d+)(.*)$/);
    if (!match) return;
    const target = Number(match[1]);
    const suffix = match[2];
    const counter = { value: 0 };
    // Above-the-fold counters belong to the intro; the rest wait to be scrolled to.
    const inHero = !!el.closest("#top");
    el.textContent = `0${suffix}`;
    gsap.to(counter, {
      value: target,
      duration: 1.8,
      ease: "power2.out",
      delay: inHero ? 0.9 : 0,
      scrollTrigger: inHero ? undefined : { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = `${Math.round(counter.value)}${suffix}`;
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
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
        },
      }
    );
  });
}

function floaters() {
  gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
    gsap.to(el, {
      y: -10,
      duration: 2.4 + i * 0.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: i * 0.3,
    });
  });
}

function parallax() {
  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    gsap.to(el, {
      yPercent: Number(el.dataset.parallax),
      ease: "none",
      scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true },
    });
  });
}

export default function PageAnimations() {
  useGSAP(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      heroIntro();
      reveals();
      splitHeadings();
      scrubWords();
      counters();
      drawLines();
      floaters();
      parallax();
    });

    root.classList.add("motion-ready");
    // Web fonts change text metrics; re-measure every trigger once they load.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => mm.revert();
  });

  return null;
}
