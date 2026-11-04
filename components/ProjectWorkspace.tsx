"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  Globe,
  House,
  Inbox,
  LayoutDashboard,
  List,
  ListFilter,
  Menu,
  Search,
  Star,
  X,
} from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import type { WorkspaceProject } from "@/lib/data";
import { scrollToId } from "@/lib/scroll";

/** Fired by the Virtual Agent to open a record here. `detail` is the record number. */
export const OPEN_RECORD_EVENT = "workspace:open";

const engagementStyle = {
  Delivery: "bg-sky-50 text-sky-700 ring-sky-200",
  "Pre-Sales": "bg-amber-50 text-amber-700 ring-amber-200",
};

function Pill({ children, className }: { children: ReactNode; className: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${className}`}
    >
      {children}
    </span>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] font-medium text-muted">{label}</dt>
      <dd className="mt-1 flex min-h-[34px] items-center rounded-md border border-border bg-surface-alt/70 px-2.5 py-1.5 text-[13px] text-brand-navy">
        {children}
      </dd>
    </div>
  );
}

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section data-record-anim className="rounded-lg border border-border bg-surface">
      <h4 className="flex items-center gap-1.5 border-b border-border px-4 py-2.5 text-[13px] font-semibold text-brand-navy">
        <ChevronDown className="h-3.5 w-3.5 text-muted" />
        {title}
      </h4>
      <div className="p-4">{children}</div>
    </section>
  );
}

export default function ProjectWorkspace({ projects }: { projects: WorkspaceProject[] }) {
  const [selected, setSelected] = useState(projects[0].number);
  const [query, setQuery] = useState("");
  const [company, setCompany] = useState("All");
  const record = useRef<HTMLDivElement>(null);

  const companies = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.company)))],
    [projects]
  );

  const filtered = projects.filter((p) => {
    const matchesCompany = company === "All" || p.company === company;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      [p.number, p.title, p.client, ...p.tags].some((v) => v.toLowerCase().includes(q));
    return matchesCompany && matchesQuery;
  });

  const current = projects.find((p) => p.number === selected) ?? projects[0];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-record-anim]",
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
        );
      });
      return () => mm.revert();
    },
    { scope: record, dependencies: [selected] }
  );

  const open = (number: string) => {
    setSelected(number);
    record.current?.scrollTo({ top: 0 });
    // Stacked layout: the record sits below the list, so bring it into view.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      record.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // The Virtual Agent asks for a record by number: clear any filter hiding it,
  // select it and bring the workspace into view.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const number = (e as CustomEvent<string>).detail;
      if (!projects.some((p) => p.number === number)) return;
      setQuery("");
      setCompany("All");
      setSelected(number);
      record.current?.scrollTo({ top: 0 });
      // Stacked layout: jump straight to the record, which sits below the list.
      const stacked = window.matchMedia("(max-width: 1023px)").matches;
      scrollToId(stacked ? "project-record" : "project-workspace");
    };
    window.addEventListener(OPEN_RECORD_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_RECORD_EVENT, onOpen);
  }, [projects]);

  return (
    <div
      id="project-workspace"
      data-reveal
      className="overflow-hidden rounded-2xl border border-border bg-surface text-[13px] shadow-2xl shadow-brand-navy/15"
    >
      {/* Unified navigation */}
      <div className="flex h-12 items-center gap-3 bg-brand-navy-dark px-3 text-white/75">
        <Menu className="h-4 w-4 shrink-0" />
        <span className="flex shrink-0 items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-brand-teal text-[10px] font-bold text-white">
            SM
          </span>
          <span className="hidden font-semibold text-white sm:inline">Portfolio</span>
        </span>
        <nav aria-hidden className="hidden items-center gap-4 text-xs md:flex">
          <span>All</span>
          <span>Favorites</span>
          <span>History</span>
          <span className="flex items-center gap-1">
            Workspaces <ChevronDown className="h-3 w-3" />
          </span>
        </nav>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-white lg:flex">
          Project Workspace
          <Star className="h-3 w-3 fill-brand-teal-light text-brand-teal-light" />
        </span>

        <label className="relative ml-auto w-full max-w-xs">
          <span className="sr-only">Search projects</span>
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/50" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, clients, tech"
            className="h-8 w-full rounded-md border border-white/15 bg-white/10 pl-8 pr-3 text-xs text-white placeholder:text-white/45 focus:border-brand-teal-light focus:outline-none"
          />
        </label>

        <div aria-hidden className="hidden items-center gap-3 sm:flex">
          <Globe className="h-4 w-4" />
          <span className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-brand-teal-light" />
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-[10px] font-bold text-white">
            SM
          </span>
        </div>
      </div>

      <div className="flex lg:h-[660px]">
        {/* Sidebar rail */}
        <aside
          aria-hidden
          className="hidden w-14 shrink-0 flex-col items-center gap-1 border-r border-border bg-surface-alt/60 py-3 text-muted sm:flex"
        >
          {[House, List, LayoutDashboard, Inbox].map((Icon, i) => (
            <span
              key={i}
              className={`relative flex h-10 w-10 items-center justify-center rounded-lg ${
                i === 1 ? "bg-surface text-brand-teal shadow-sm" : ""
              }`}
            >
              {i === 1 && (
                <span className="absolute -left-2 top-2 h-6 w-[3px] rounded-r bg-brand-teal" />
              )}
              <Icon className="h-[18px] w-[18px]" />
            </span>
          ))}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Workspace tabs */}
          <div className="flex h-10 shrink-0 items-end gap-1 overflow-hidden border-b border-border bg-surface-alt/60 px-2">
            <span className="flex h-8 items-center gap-1.5 rounded-t-md px-3 text-xs font-medium text-muted">
              <List className="h-3.5 w-3.5" />
              Projects
            </span>
            <span className="flex h-8 min-w-0 items-center gap-2 rounded-t-md border border-b-0 border-border bg-surface px-3 text-xs font-semibold text-brand-navy">
              <span className="font-mono text-brand-teal">{current.number}</span>
              <span className="hidden truncate sm:inline">{current.title}</span>
              <X aria-hidden className="h-3 w-3 shrink-0 text-muted" />
            </span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            {/* List */}
            <div className="flex min-h-0 flex-col border-b border-border lg:w-[45%] lg:border-b-0 lg:border-r">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <ListFilter className="h-4 w-4 text-muted" />
                  <h3 className="font-semibold text-brand-navy">All projects</h3>
                  <span className="rounded bg-surface-alt px-1.5 py-0.5 text-[11px] font-medium text-muted">
                    {filtered.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {companies.map((c) => (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={company === c}
                      onClick={() => setCompany(c)}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                        company === c
                          ? "bg-brand-navy text-white"
                          : "bg-surface-alt text-muted hover:text-brand-navy"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div data-lenis-prevent className="max-h-[320px] min-h-0 flex-1 overflow-auto lg:max-h-none">
                <table className="w-full border-collapse">
                  <thead className="sticky top-0 z-10 bg-surface text-left text-[11px] font-semibold uppercase tracking-wide text-muted">
                    <tr className="border-b border-border">
                      <th className="py-2 pl-4 pr-2 font-semibold">Number</th>
                      <th className="py-2 pr-2 font-semibold">Short description</th>
                      <th className="hidden py-2 pr-4 font-semibold sm:table-cell">Engagement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p) => {
                      const active = p.number === current.number;
                      return (
                        <tr
                          key={p.number}
                          data-cursor="Open"
                          onClick={() => open(p.number)}
                          className={`cursor-pointer border-b border-border/70 transition-colors ${
                            active
                              ? "bg-brand-teal/[0.07] shadow-[inset_3px_0_0_var(--brand-teal)]"
                              : "hover:bg-surface-alt/60"
                          }`}
                        >
                          <td className="py-2.5 pl-4 pr-2 align-top">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                open(p.number);
                              }}
                              aria-current={active ? "true" : undefined}
                              className="font-mono text-[12px] text-brand-sky underline-offset-2 hover:underline"
                            >
                              {p.number}
                            </button>
                          </td>
                          <td className="py-2.5 pr-2">
                            <p className="line-clamp-1 font-medium text-brand-navy">{p.title}</p>
                            <p className="line-clamp-1 text-[11px] text-muted">{p.client}</p>
                          </td>
                          <td className="hidden py-2.5 pr-4 align-top sm:table-cell">
                            <Pill className={engagementStyle[p.engagement]}>{p.engagement}</Pill>
                          </td>
                        </tr>
                      );
                    })}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-4 py-10 text-center text-muted">
                          No records match this filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Record */}
            <div
              ref={record}
              id="project-record"
              data-lenis-prevent
              className="min-h-0 flex-1 scroll-mt-24 bg-background lg:overflow-auto"
            >
              <div data-record-anim className="border-b border-border bg-surface px-5 py-4">
                <p className="text-[11px] text-muted">
                  Project <span className="text-border">/</span>{" "}
                  <span className="font-mono">{current.number}</span>
                </p>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold leading-snug text-brand-navy">
                    {current.title}
                  </h3>
                  <div className="flex gap-2">
                    <Pill className={engagementStyle[current.engagement]}>{current.engagement}</Pill>
                    <Pill className="bg-emerald-50 text-emerald-700 ring-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Delivered
                    </Pill>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-4 sm:p-5">
                <div
                  data-record-anim
                  className="flex items-center gap-4 rounded-lg border border-brand-teal/25 bg-gradient-to-r from-brand-teal/[0.08] to-transparent px-4 py-3"
                >
                  <span className="text-gradient text-3xl font-semibold tracking-tight">
                    {current.metric.value}
                  </span>
                  <span className="text-[13px] leading-snug text-brand-navy">
                    {current.metric.label}
                  </span>
                </div>

                <FormSection title="Details">
                  <dl className="grid gap-3 sm:grid-cols-2">
                    <Field label="Number">
                      <span className="font-mono">{current.number}</span>
                    </Field>
                    <Field label="State">Delivered</Field>
                    <Field label="Client">{current.client}</Field>
                    <Field label="Company">{current.company}</Field>
                    <Field label="Assigned to">Suman Mondal</Field>
                    <Field label="My role">{current.role}</Field>
                  </dl>
                </FormSection>

                <FormSection title={`Key outcomes (${current.points.length})`}>
                  <ol className="space-y-3">
                    {current.points.map((point, i) => (
                      <li key={point} className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-navy text-[10px] font-bold text-white">
                          SM
                        </span>
                        <div className="flex-1 rounded-lg border border-border bg-background px-3 py-2">
                          <p className="text-[11px] text-muted">
                            <span className="font-semibold text-brand-navy">Suman Mondal</span>
                            {" · "}Outcome {i + 1}
                          </p>
                          <p className="mt-0.5 leading-relaxed text-brand-navy/85">{point}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </FormSection>

                <FormSection title="Tech stack">
                  <ul className="flex flex-wrap gap-1.5">
                    {current.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-border bg-background px-2 py-1 font-mono text-[11px] text-brand-navy/80"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </FormSection>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
