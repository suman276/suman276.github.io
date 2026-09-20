import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="bg-surface-alt">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="section-heading">Skills</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          Platform Expertise
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="font-semibold text-brand-navy">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full bg-surface-alt px-3 py-1 text-xs font-medium text-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
