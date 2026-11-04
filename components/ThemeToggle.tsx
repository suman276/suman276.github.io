"use client";

import { MouseEvent, useEffect, useState, useSyncExternalStore } from "react";
import { Moon, Sun, X } from "lucide-react";

const HINT_KEY = "theme-hint-seen";

// The theme lives on <html data-theme>, set before paint by the script in
// layout.tsx. Reading it from there keeps every toggle instance in sync.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const isDark = () => document.documentElement.dataset.theme === "dark";

export default function ThemeToggle() {
  // The server can't know the visitor's theme, so it renders "light" and React
  // corrects it straight after hydration. The knob itself is positioned with
  // CSS (`dark:`), so it never visibly jumps.
  const dark = useSyncExternalStore(subscribe, isDark, () => false);
  const [hint, setHint] = useState(false);

  // A one-time message pointing at the switch for first-time visitors.
  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(HINT_KEY) === "1";
    } catch {}
    if (seen) return;
    const show = window.setTimeout(() => setHint(true), 1800);
    const hide = window.setTimeout(() => dismissHint(), 11000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  function dismissHint() {
    setHint(false);
    try {
      localStorage.setItem(HINT_KEY, "1");
    } catch {}
  }

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    dismissHint();
    const next = dark ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) {
      apply();
      return;
    }

    // Grow the new theme as a circle out of the switch.
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  const label = dark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <div className="relative">
      <button
        type="button"
        role="switch"
        aria-checked={dark}
        aria-label="Dark mode"
        title={label}
        onClick={toggle}
        className="relative flex h-7 w-[52px] shrink-0 items-center rounded-full border border-border bg-surface-alt p-0.5 transition-colors hover:border-accent/50 dark:bg-accent/20"
      >
        {/* Track icons hint at the other position. */}
        <Moon aria-hidden className="absolute right-1.5 h-3.5 w-3.5 text-muted transition-opacity dark:opacity-0" />
        <Sun aria-hidden className="absolute left-1.5 h-3.5 w-3.5 text-amber-300 opacity-0 transition-opacity dark:opacity-70" />
        <span className="relative flex h-[22px] w-[22px] items-center justify-center rounded-full bg-surface shadow-sm shadow-shade/25 transition-transform duration-300 ease-out dark:translate-x-6">
          <Sun aria-hidden className="h-3.5 w-3.5 text-amber-500 dark:hidden" />
          <Moon aria-hidden className="hidden h-3.5 w-3.5 text-accent-bright dark:block" />
        </span>
      </button>

      {hint && (
        <div
          role="status"
          className="va-in absolute right-0 top-full z-10 mt-3 flex w-max max-w-[240px] items-start gap-2 rounded-xl border border-border bg-surface py-2.5 pl-3 pr-2 text-[13px] text-ink shadow-xl shadow-shade/15"
        >
          {/* Arrow pointing up at the switch */}
          <span
            aria-hidden
            className="absolute -top-[7px] right-5 h-3 w-3 rotate-45 border-l border-t border-border bg-surface"
          />
          {dark ? (
            <Sun aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          ) : (
            <Moon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          )}
          <p className="leading-snug">
            <span className="font-semibold">{dark ? "Prefer a lighter look?" : "Easier on the eyes?"}</span>{" "}
            <span className="text-muted">Flip the switch for {dark ? "light" : "dark"} mode.</span>
          </p>
          <button
            type="button"
            onClick={dismissHint}
            aria-label="Dismiss"
            className="rounded p-0.5 text-muted hover:text-ink"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
