import { FolderGit2 } from "lucide-react";
import { workspaceProjects } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import ProjectWorkspace from "@/components/ProjectWorkspace";

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
        <ProjectWorkspace projects={workspaceProjects} />
      </div>
    </section>
  );
}
