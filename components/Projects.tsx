import SectionHeading from "@/components/SectionHeading";
import ProjectsExplorer from "@/components/ProjectsExplorer";

export default function Projects() {
  return (
    <section id="projects" className="border-t border-border bg-surface/40 py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="04"
          eyebrow="Featured projects"
          title="Selected enterprise case studies."
          description="Nine engagements across delivery and pre-sales. Open any card for the challenge, the solution, how it was built, and the outcome."
        />
      </div>
      <div className="mt-10">
        <ProjectsExplorer />
      </div>
    </section>
  );
}
