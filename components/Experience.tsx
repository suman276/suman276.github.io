import { ArrowUpRight, MapPin } from "lucide-react";
import { experience } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import CaseStudyButton from "@/components/CaseStudyButton";

export default function Experience() {
  // Oldest first, for the progression strip.
  const progression = [...experience].reverse();

  return (
    <section id="experience" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="03"
            eyebrow="Experience"
            title="Where I've delivered."
            description="From pre-sales solutioning to leading delivery end to end."
          />

          <ol
            data-reveal
            aria-label="Career progression"
            className="flex items-center gap-3 text-xs text-muted lg:mb-2"
          >
            {progression.map((job, i) => (
              <li key={job.company} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="h-px w-8 bg-gradient-to-r from-border to-accent" />}
                <span
                  className={`rounded-md border px-2.5 py-1.5 ${
                    i === progression.length - 1
                      ? "border-accent/50 bg-accent/10 text-ink"
                      : "border-border"
                  }`}
                >
                  <span className="block font-mono text-[10px] opacity-70">{job.period.split("—")[0].trim()}</span>
                  {job.role}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative mt-14">
          {/* Timeline rail; data-draw grows it as you scroll. */}
          <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-border md:left-[207px]" />
          <span
            aria-hidden
            data-draw
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-transparent md:left-[207px]"
          />
          <ol className="relative space-y-10">

          {experience.map((job, index) => (
            <li key={job.company} className="relative grid gap-4 pl-8 md:grid-cols-[180px_1fr] md:gap-14 md:pl-0">
              <span
                aria-hidden
                className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-background md:left-[200px] ${
                  index === 0 ? "bg-accent shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_25%,transparent)]" : "bg-muted"
                }`}
              />

              <div data-reveal className="md:text-right">
                <p className="font-mono text-xs text-accent">{job.period}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted md:justify-end">
                  <MapPin aria-hidden className="h-3 w-3" />
                  {job.location}
                </p>
                <span
                  className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${
                    index === 0
                      ? "bg-emerald-400/10 text-emerald-500 ring-emerald-400/30"
                      : "bg-surface-alt text-muted ring-border"
                  }`}
                >
                  {index === 0 ? "Current" : job.type}
                </span>
              </div>

              <article data-reveal className="card p-6 sm:p-7">
                <h3 className="text-xl font-semibold text-ink">{job.role}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{job.company}</p>

                <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-ink/80">
                  {job.responsibilities.map((r) => (
                    <li key={r} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {r}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-border pt-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    Key engagements
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {job.projects.map((project) => (
                      <li key={project.slug}>
                        <CaseStudyButton
                          slug={project.slug}
                          label={`${project.title}, ${project.client}: view case study`}
                          className="group inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-alt/60 px-3 py-1.5 text-left text-xs transition-colors hover:border-accent/50"
                        >
                          <span className="font-medium text-ink">{project.title}</span>
                          <span className="text-muted">· {project.client}</span>
                          <ArrowUpRight aria-hidden className="h-3 w-3 text-muted transition-colors group-hover:text-accent" />
                        </CaseStudyButton>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
