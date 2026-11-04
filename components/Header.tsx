"use client";

import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { profile } from "@/lib/data";
import { navLinks } from "@/lib/nav";
import { gsap, useGSAP } from "@/lib/gsap";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const progress = useRef<HTMLDivElement>(null);

  // Highlight the nav link for whichever section sits in the middle of the screen.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useGSAP(() => {
    gsap.fromTo(
      progress.current,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } }
    );
  });

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <a href="#top" className="flex items-center gap-2.5 whitespace-nowrap">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 font-mono text-[11px] font-bold text-accent">
            SM
          </span>
          <span className="font-semibold tracking-tight text-ink">{profile.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                active === link.href ? "bg-accent/10 text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="/resume.pdf" download className="btn btn-primary hidden px-4 py-2 lg:inline-flex">
            <Download className="h-4 w-4" />
            Resume
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border lg:hidden"
          >
            <span className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-border bg-background px-6 py-4 lg:hidden">
          <ul className="grid gap-1 sm:grid-cols-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                    active === link.href ? "bg-accent/10 text-ink" : "text-muted"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="/resume.pdf" download className="btn btn-primary mt-3">
            <Download className="h-4 w-4" />
            Download resume
          </a>
        </nav>
      )}

      <div
        ref={progress}
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2"
      />
    </header>
  );
}
