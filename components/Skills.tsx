import {
  Code2,
  Database,
  Layers,
  Plug,
  Puzzle,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { skillGroups } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const categoryIcons: Record<string, LucideIcon> = {
  "ServiceNow Modules": Layers,
  Development: Code2,
  "CMDB & Discovery": Database,
  Integrations: Plug,
  Consulting: Users,
  Other: Puzzle,
};

export default function Skills() {
  return (
    <section id="skills">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <SectionHeading
            icon={Sparkles}
            eyebrow="Skills"
            title="Platform Expertise"
          />
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = categoryIcons[group.title] ?? Sparkles;
            return (
              <Reveal key={group.title} delay={i * 80}>
                <div className="glass-card h-full rounded-2xl p-6">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-brand-teal" />
                    <h3 className="font-semibold text-brand-navy">
                      {group.title}
                    </h3>
                  </div>
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
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
