import { FolderGit2 } from "lucide-react";
import { experience } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import ProjectWorkspace, { type WorkspaceProject } from "@/components/ProjectWorkspace";

const projects: WorkspaceProject[] = experience
  .flatMap((job) =>
    job.projects.map((project) => ({
      ...project,
      company: job.company.replace(" Pvt. Ltd.", ""),
      engagement: job.role.includes("Pre-Sales") ? ("Pre-Sales" as const) : ("Delivery" as const),
      role: project.role ?? job.role,
    }))
  )
  .map((project, i) => ({ ...project, number: `PRJ${String(10001 + i).padStart(7, "0")}` }));

export default function Projects() {
  return (
    <section id="projects" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          icon={FolderGit2}
          eyebrow="Projects"
          title="Selected enterprise work."
          description="Every project as a record in a workspace. Pick one from the list, or search by client or technology."
        />
      </div>
      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6">
        <ProjectWorkspace projects={projects} />
      </div>
    </section>
  );
}
