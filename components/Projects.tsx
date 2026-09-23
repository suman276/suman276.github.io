import { FolderGit2 } from "lucide-react";
import { experience } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const projects = experience.flatMap((job) =>
  job.projects.map((project) => ({ ...project, company: job.company }))
);

export default function Projects() {
  return (
    <section id="projects">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <SectionHeading
            icon={FolderGit2}
            eyebrow="Projects"
            title="Featured Work"
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 4) * 80}>
              <article className="glass-card flex h-full flex-col rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-brand-navy">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-brand-teal">
                  {project.client}
                </p>

                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {project.points.map((point, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-auto pt-4 text-xs text-muted/80">
                  {project.company}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
