import { ArrowRight, FolderGit2 } from "lucide-react";
import { experience } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import HorizontalPin from "@/components/motion/HorizontalPin";

const projects = experience.flatMap((job) =>
  job.projects.map((project) => ({
    ...project,
    company: job.company.replace(" Pvt. Ltd.", ""),
  }))
);

export default function Projects() {
  return (
    <HorizontalPin
      id="projects"
      header={
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            icon={FolderGit2}
            eyebrow="Projects"
            title="Selected enterprise work."
          />
          <p data-reveal className="hidden font-mono text-xs uppercase tracking-wider text-muted lg:block">
            {String(projects.length).padStart(2, "0")} projects · scroll to explore →
          </p>
        </div>
      }
    >
      {projects.map((project, i) => (
        <article
          key={project.title}
          className="group flex w-[85vw] max-w-[440px] shrink-0 snap-start flex-col rounded-3xl border border-border bg-surface p-7 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-brand-teal/40 hover:shadow-xl hover:shadow-brand-navy/10 sm:w-[420px] lg:w-[520px] lg:max-w-none lg:p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-sm text-muted">
              {String(i + 1).padStart(2, "0")}
              <span className="text-border"> / {String(projects.length).padStart(2, "0")}</span>
            </span>
            <span className="rounded-full bg-surface-alt px-3 py-1 text-[11px] font-medium text-muted">
              {project.company}
            </span>
          </div>

          <h3 className="mt-5 text-xl font-semibold leading-snug text-brand-navy lg:mt-4">
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-brand-teal">{project.client}</p>

          <div className="mt-5 flex items-baseline gap-3 border-y border-border py-4 lg:mt-4 lg:py-3">
            <span className="text-gradient text-4xl font-semibold tracking-tight lg:text-3xl">
              {project.metric.value}
            </span>
            <span className="text-sm leading-snug text-muted">{project.metric.label}</span>
          </div>

          <ul className="mt-5 space-y-2.5 lg:mt-4 lg:space-y-2">
            {project.points.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-muted lg:text-[13px]">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-teal" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-auto flex flex-wrap gap-1.5 pt-6 lg:pt-4">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-brand-navy/[0.05] px-2 py-1 font-mono text-[11px] text-brand-navy/80"
              >
                {tag}
              </li>
            ))}
          </ul>
        </article>
      ))}

      <article className="flex w-[85vw] max-w-[360px] shrink-0 snap-start flex-col justify-between rounded-3xl bg-brand-navy p-8 text-white sm:w-[360px]">
        <p className="section-heading text-brand-teal-light">What&apos;s next</p>
        <div>
          <h3 className="text-2xl font-semibold leading-snug">
            Have a ServiceNow challenge in mind?
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Implementation, CMDB health, integrations or a fast POC. Let&apos;s talk about it.
          </p>
        </div>
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 self-start rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-light"
        >
          Get in touch
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </article>
    </HorizontalPin>
  );
}
