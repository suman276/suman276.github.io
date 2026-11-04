"use client";

import { ReactNode, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { WorkspaceProject } from "@/lib/data";
import { lockScroll } from "@/lib/scroll";
import ProjectGraphic from "@/components/ProjectGraphic";
import { FlowDiagram } from "@/components/Diagrams";

function Block({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={className}>
      <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{title}</h3>
      <div className="mt-2.5">{children}</div>
    </section>
  );
}

export default function CaseStudyModal({
  project,
  onClose,
  onPrev,
  onNext,
}: {
  project: WorkspaceProject;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  // Lock the page, focus the dialog, and give focus back to the trigger on close.
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    lockScroll(true);
    closeBtn.current?.focus({ preventScroll: true });
    return () => {
      lockScroll(false);
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  // New project: start at the top.
  useEffect(() => {
    body.current?.scrollTo({ top: 0 });
  }, [project.slug]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      // Keep Tab inside the dialog.
      if (e.key === "Tab" && dialog.current) {
        const focusable = dialog.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  const p = project;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <div aria-hidden onClick={onClose} className="va-in absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        className="va-in relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-border bg-background shadow-2xl shadow-black/50 sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-5 py-3 sm:px-7">
          <p className="truncate font-mono text-[11px] text-muted">
            Case study · <span className="text-accent">{p.number}</span>
          </p>
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-alt hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div ref={body} data-lenis-prevent className="overflow-y-auto overscroll-contain">
          <div className="relative border-b border-border">
            <ProjectGraphic kind={p.graphic} className="h-36 sm:h-44" />
            <span className="absolute left-5 top-4 rounded-md border border-border bg-background/80 px-2 py-1 text-[11px] font-medium text-ink backdrop-blur sm:left-7">
              {p.category}
            </span>
          </div>

          <div className="px-5 py-7 sm:px-7">
            <p className="text-sm text-muted">
              {p.client}
              {p.industry && <> · {p.industry}</>}
            </p>
            <h2 id="case-title" className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {p.title}
            </h2>

            <dl className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3">
                <dt className="sr-only">Headline result</dt>
                <dd>
                  <span className="text-gradient text-2xl font-semibold">{p.metric.value}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-ink/80">{p.metric.label}</span>
                </dd>
              </div>
              <div className="rounded-xl border border-border px-4 py-3">
                <dt className="text-xs text-muted">Engagement</dt>
                <dd className="mt-1 text-sm font-medium text-ink">
                  {p.engagement === "Pre-Sales" ? "Pre-sales POC" : "Delivery"} · {p.company}
                </dd>
              </div>
              <div className="rounded-xl border border-border px-4 py-3">
                <dt className="text-xs text-muted">My role</dt>
                <dd className="mt-1 text-sm font-medium text-ink">{p.role}</dd>
              </div>
            </dl>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <Block title="Business challenge">
                <p className="leading-relaxed text-ink/85">{p.challenge}</p>
              </Block>
              <Block title="Proposed solution">
                <p className="leading-relaxed text-ink/85">{p.solution}</p>
              </Block>
            </div>

            <Block title="Architecture / technical implementation" className="mt-8">
              <div className="rounded-xl border border-border bg-surface/60 p-4">
                <FlowDiagram steps={p.flow} />
                <p className="mt-3 text-[11px] text-muted">
                  Illustrative flow based on the delivered scope, not a confidential client design.
                </p>
              </div>
            </Block>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <Block title="ServiceNow modules used">
                <ul className="flex flex-wrap gap-1.5">
                  {p.modules.map((m) => (
                    <li key={m} className="chip">
                      {m}
                    </li>
                  ))}
                </ul>
              </Block>
              {p.integrations.length > 0 && (
                <Block title="Integrations">
                  <ul className="flex flex-wrap gap-1.5">
                    {p.integrations.map((m) => (
                      <li key={m} className="chip border-accent/40">
                        {m}
                      </li>
                    ))}
                  </ul>
                </Block>
              )}
            </div>

            <Block title="My role and responsibilities" className="mt-8">
              <p className="text-sm font-medium text-ink">{p.role}</p>
              <ul className="mt-3 space-y-2.5">
                {p.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
                    <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Business outcome" className="mt-8">
              <p className="rounded-xl border-l-2 border-accent bg-surface-alt/50 px-4 py-3 leading-relaxed text-ink">
                {p.impact}
              </p>
            </Block>
          </div>
        </div>

        {(onPrev || onNext) && (
          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border px-5 py-3 sm:px-7">
            <button
              type="button"
              onClick={onPrev}
              disabled={!onPrev}
              className="btn btn-secondary px-3 py-2 text-xs disabled:opacity-40"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Previous
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!onNext}
              className="btn btn-secondary px-3 py-2 text-xs disabled:opacity-40"
            >
              Next
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
