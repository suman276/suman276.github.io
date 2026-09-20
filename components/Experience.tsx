import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20">
      <p className="section-heading">Experience</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        Where I&apos;ve Worked
      </h2>

      <div className="mt-10 space-y-12 border-l border-border pl-8">
        {experience.map((job) => (
          <div key={job.company} className="relative">
            <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-teal" />

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-semibold text-brand-navy">
                {job.role}
              </h3>
              <span className="text-sm font-medium text-muted">
                {job.period}
              </span>
            </div>
            <p className="text-sm font-medium text-brand-teal">
              {job.company} · {job.location}
            </p>

            <p className="mt-4 max-w-3xl text-muted">{job.summary}</p>

            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {job.projects.map((project) => (
                <li
                  key={project.title}
                  className="flex items-start gap-2 text-sm text-muted"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-teal" />
                  <span>
                    <span className="font-medium text-foreground">
                      {project.title}
                    </span>{" "}
                    — {project.client}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
