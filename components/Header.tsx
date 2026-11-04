"use client";

import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { profile } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Credentials" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = links
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

  useGSAP(() => {
    gsap.fromTo(
      progress.current,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } }
    );
  });

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-surface/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <a href="#top" className="flex items-center gap-2.5 whitespace-nowrap font-semibold tracking-tight text-brand-navy">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-panel text-xs font-bold text-white">
            SM
          </span>
          {profile.name}
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-1.5 text-sm font-medium lg:px-3.5 transition-colors ${
                active === link.href
                  ? "bg-brand-navy/[0.06] text-brand-navy"
                  : "text-muted hover:text-brand-navy"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="/resume.pdf"
            download
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover lg:inline-flex"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border md:hidden"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-brand-navy transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-brand-navy transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-brand-navy transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-surface px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                    active === link.href ? "bg-brand-navy/[0.06] text-brand-navy" : "text-muted"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-on-primary"
              >
                <Download className="h-4 w-4" />
                Download resume
              </a>
            </li>
          </ul>
        </nav>
      )}

      <div
        ref={progress}
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-teal to-brand-sky"
      />
    </header>
  );
}
