"use client";

import { useRef } from "react";
import { gsap, useGSAP, FINE_POINTER, MOTION_OK } from "@/lib/gsap";

type State = "idle" | "link" | "label";

export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(`${FINE_POINTER} and ${MOTION_OK}`, () => {
      const el = ring.current!;
      const text = label.current!;
      gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

      const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
      let visible = false;
      let state: State = "idle";
      let currentLabel = "";

      const setState = (next: State, nextLabel: string) => {
        if (next === state && nextLabel === currentLabel) return;
        state = next;
        currentLabel = nextLabel;
        const size = next === "label" ? 84 : next === "link" ? 52 : 32;
        gsap.to(el, {
          width: size,
          height: size,
          backgroundColor:
            next === "label"
              ? "rgba(14, 147, 132, 0.95)"
              : next === "link"
                ? "rgba(14, 147, 132, 0.12)"
                : "rgba(14, 147, 132, 0)",
          borderColor:
            next === "idle" ? "rgba(15, 41, 66, 0.35)" : "rgba(14, 147, 132, 0.6)",
          duration: 0.35,
          ease: "power3.out",
        });
        text.textContent = nextLabel;
        gsap.to(text, { autoAlpha: next === "label" ? 1 : 0, duration: 0.2 });
      };

      const onMove = (e: PointerEvent) => {
        if (!visible) {
          gsap.set(el, { x: e.clientX, y: e.clientY });
          gsap.to(el, { autoAlpha: 1, duration: 0.3 });
          visible = true;
        }
        xTo(e.clientX);
        yTo(e.clientY);

        const target = (e.target as Element).closest<HTMLElement>(
          "a, button, [data-cursor]"
        );
        const cursorLabel = target?.dataset.cursor ?? "";
        setState(target ? (cursorLabel ? "label" : "link") : "idle", cursorLabel);
      };

      const onLeave = () => {
        gsap.to(el, { autoAlpha: 0, duration: 0.3 });
        visible = false;
      };

      window.addEventListener("pointermove", onMove);
      document.documentElement.addEventListener("pointerleave", onLeave);
      return () => {
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => mm.revert();
  });

  return (
    <div
      ref={ring}
      aria-hidden
      className="pointer-events-none invisible fixed left-0 top-0 z-[100] flex h-8 w-8 items-center justify-center rounded-full border border-brand-navy/35 opacity-0"
    >
      <span
        ref={label}
        className="invisible text-[11px] font-semibold uppercase tracking-wider text-white opacity-0"
      />
    </div>
  );
}
