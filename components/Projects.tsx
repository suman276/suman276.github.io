import { experience } from "@/lib/data";

const projects = experience.flatMap((job) =>
  job.projects.map((project) => ({ ...project, company: job.company }))
);

export default function Projects() {
  return (
    <section id="projects" className="bg-surface-alt">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="section-heading">Projects</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          Featured Work
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex flex-col rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="text-lg font-semibold text-brand-navy">
                {project.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-brand-teal">
                {project.client}
              </p>

              <ul className="mt-4 space-y-2 text-sm text-muted">
                {project.points.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-4 text-xs text-muted/80">
                {project.company}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
