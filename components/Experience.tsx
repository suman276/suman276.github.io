import { Briefcase } from "lucide-react";
import { experience } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <SectionHeading
          icon={Briefcase}
          eyebrow="Experience"
          title="Where I've delivered."
        />

        <div className="relative mt-16">
          <div aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
          <div
            aria-hidden
            data-draw
            className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-brand-teal to-brand-sky"
          />

          <div className="space-y-16">
            {experience.map((job) => (
              <article key={job.company} className="relative pl-12">
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-[3px] border-surface bg-brand-teal ring-4 ring-brand-teal/15"
                />
                <div data-reveal className="grid gap-8 lg:grid-cols-[260px_1fr]">
                  <div>
                    <p className="font-mono text-xs font-medium uppercase tracking-wider text-brand-teal">
                      {job.period}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-brand-navy">{job.role}</h3>
                    <p className="mt-1 text-sm font-medium text-muted">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <div>
                    <p className="leading-relaxed text-muted">{job.summary}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {job.projects.map((project) => (
                        <li
                          key={project.title}
                          className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-brand-navy"
                        >
                          {project.title}
                          <span className="text-muted"> · {project.client}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
