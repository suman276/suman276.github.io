"use client";

import { ReactNode, useRef } from "react";
import { gsap, useGSAP, FINE_POINTER, MOTION_OK } from "@/lib/gsap";

export default function TiltCard({
  children,
  className = "",
  max = 6,
  reveal = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  reveal?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();

    // Spotlight follows the pointer on any fine-pointer device.
    mm.add(FINE_POINTER, () => {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      el.addEventListener("pointermove", onMove);
      return () => el.removeEventListener("pointermove", onMove);
    });

    // The 3D tilt is motion, so it also respects reduced-motion.
    mm.add(`${FINE_POINTER} and ${MOTION_OK}`, () => {
      gsap.set(el, { transformPerspective: 900 });
      const rxTo = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
      const ryTo = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ryTo(px * max);
        rxTo(-py * max);
      };
      const onLeave = () => {
        rxTo(0);
        ryTo(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => mm.revert();
  });

  return (
    <div
      ref={ref}
      data-reveal={reveal ? "" : undefined}
      className={`bento-card ${className}`}
    >
      <div className="relative h-full">{children}</div>
    </div>
  );
}
