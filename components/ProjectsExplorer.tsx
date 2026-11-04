"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, LayoutGrid, Rows3 } from "lucide-react";
import { featuredSlugs, workspaceProjects, type WorkspaceProject } from "@/lib/data";
import { OPEN_CASE_EVENT } from "@/lib/scroll";
import { ScrollTrigger } from "@/lib/gsap";
import ProjectGraphic from "@/components/ProjectGraphic";
import ProjectWorkspace from "@/components/ProjectWorkspace";
import CaseStudyModal from "@/components/CaseStudyModal";

const featured = featuredSlugs
  .map((slug) => workspaceProjects.find((p) => p.slug === slug))
  .filter((p): p is WorkspaceProject => !!p);

function CaseCard({ project: p, onOpen }: { project: WorkspaceProject; onOpen: () => void }) {
  return (
    <article data-reveal className="card card-hover card-lift group flex flex-col">
      <div className="relative border-b border-border">
        <ProjectGraphic kind={p.graphic} className="h-32" />
        <span className="absolute left-4 top-3 rounded-md border border-border bg-background/80 px-2 py-0.5 text-[11px] font-medium text-ink/90 backdrop-blur">
          {p.category}
        </span>
        <span className="absolute right-4 top-3 font-mono text-[10px] text-muted">{p.number}</span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-muted">
          {p.client}
          {p.industry && <> · {p.industry}</>}
        </p>
        <h3 className="mt-1 text-[17px] font-semibold leading-snug text-ink">
          {/* The whole card is clickable through this button's ::after overlay. */}
          <button
            type="button"
            onClick={onOpen}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {p.title}
          </button>
        </h3>

        <dl className="mt-4 space-y-3 text-[13px] leading-relaxed">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Problem</dt>
            <dd className="mt-0.5 text-ink/80">{p.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Solution</dt>
            <dd className="mt-0.5 line-clamp-3 text-ink/80">{p.solution}</dd>
          </div>
        </dl>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technology stack">
          {p.tags.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-3 border-t border-border pt-4">
            <p className="min-w-0">
              <span className="text-gradient block text-xl font-semibold leading-none">{p.metric.value}</span>
              <span className="mt-1 block text-xs leading-snug text-muted">{p.metric.label}</span>
            </p>
            <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-accent">
              View case study
              <ArrowUpRight aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsExplorer() {
  const [view, setView] = useState<"cards" | "workspace">("cards");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  // Anything on the page (experience chips, the Virtual Agent) can open a case study.
  useEffect(() => {
    const onOpen = (e: Event) => setOpenSlug((e as CustomEvent<string>).detail);
    window.addEventListener(OPEN_CASE_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CASE_EVENT, onOpen);
  }, []);

  // The section's height changes with the view, so re-measure later scroll triggers.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [view]);

  // Prev/next walks the featured order; other projects (e.g. Managed Services) open on their own.
  const index = featured.findIndex((p) => p.slug === openSlug);
  const current = workspaceProjects.find((p) => p.slug === openSlug);
  const close = useCallback(() => setOpenSlug(null), []);
  const prev = index > 0 ? () => setOpenSlug(featured[index - 1].slug) : undefined;
  const next = index >= 0 && index < featured.length - 1 ? () => setOpenSlug(featured[index + 1].slug) : undefined;

  const tab = (value: typeof view, label: string, Icon: typeof LayoutGrid) => (
    <button
      type="button"
      role="tab"
      aria-selected={view === value}
      aria-controls={`projects-${value}`}
      onClick={() => setView(value)}
      className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
        view === value ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink"
      }`}
    >
      <Icon aria-hidden className="h-3.5 w-3.5" />
      {label}
    </button>
  );

  return (
    <>
      <div className="mx-auto flex max-w-6xl justify-end px-6">
        <div role="tablist" aria-label="Project view" className="flex gap-1 rounded-lg border border-border bg-surface-alt/60 p-1">
          {tab("cards", "Case studies", LayoutGrid)}
          {tab("workspace", "Workspace view", Rows3)}
        </div>
      </div>

      {/* Both views stay mounted, so scroll reveals that already ran aren't lost on toggle. */}
      <div
        id="projects-cards"
        role="tabpanel"
        hidden={view !== "cards"}
        className="mx-auto mt-6 grid max-w-6xl gap-5 px-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {featured.map((p) => (
          <CaseCard key={p.slug} project={p} onOpen={() => setOpenSlug(p.slug)} />
        ))}
      </div>
      <div
        id="projects-workspace"
        role="tabpanel"
        hidden={view !== "workspace"}
        className="mx-auto mt-6 max-w-7xl px-4 sm:px-6"
      >
        <ProjectWorkspace projects={workspaceProjects} onOpenCase={setOpenSlug} />
      </div>

      {current && <CaseStudyModal project={current} onClose={close} onPrev={prev} onNext={next} />}
    </>
  );
}
