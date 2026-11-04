"use client";

import { ReactNode, useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export default function HorizontalPin({
  id,
  header,
  children,
}: {
  id: string;
  header: ReactNode;
  children: ReactNode;
}) {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop only: pin the section and convert vertical scroll into horizontal travel.
      // Smaller screens (and reduced-motion) keep a native swipeable carousel.
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const distance = () =>
          track.current!.scrollWidth - viewport.current!.clientWidth;

        gsap.set(viewport.current, { overflow: "hidden" });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(track.current, { x: () => -distance(), ease: "none" }, 0)
          .fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      });

      return () => mm.revert();
    },
    { scope: section }
  );

  return (
    <section
      id={id}
      ref={section}
      className="relative overflow-hidden py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0 lg:pt-16"
    >
      <div className="mx-auto w-full max-w-6xl px-6">{header}</div>

      <div
        ref={viewport}
        data-cursor="Scroll"
        className="no-scrollbar mt-10 snap-x snap-mandatory scroll-px-6 overflow-x-auto lg:mt-8 lg:snap-none"
      >
        <div
          ref={track}
          data-reveal
          className="flex w-max items-stretch gap-6 px-6 lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
        >
          {children}
        </div>
      </div>

      <div className="mx-auto mt-8 hidden w-full max-w-6xl px-6 lg:block motion-reduce:hidden">
        <div className="h-px bg-border">
          <div ref={bar} className="h-px origin-left scale-x-0 bg-brand-teal" />
        </div>
      </div>
    </section>
  );
}
