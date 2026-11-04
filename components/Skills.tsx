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
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/motion/TiltCard";

const layout: Record<string, { icon: LucideIcon; span: string; featured?: boolean }> = {
  "ServiceNow Modules": { icon: Layers, span: "lg:col-span-2 lg:row-span-2", featured: true },
  Development: { icon: Code2, span: "lg:col-span-2" },
  "CMDB & Discovery": { icon: Database, span: "" },
  Integrations: { icon: Plug, span: "" },
  Consulting: { icon: Users, span: "lg:col-span-2" },
  Other: { icon: Puzzle, span: "lg:col-span-2" },
};

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
      <SectionHeading
        icon={Sparkles}
        eyebrow="Skills"
        title="Platform expertise, end to end."
        description="From core ITSM configuration and scripting to CMDB health, integrations and GenAI on the Now Platform."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => {
          const { icon: Icon, span, featured } = layout[group.title] ?? {
            icon: Sparkles,
            span: "",
          };
          return (
            <TiltCard key={group.title} className={`p-6 ${span} ${featured ? "sm:col-span-2 lg:p-8" : ""}`}>
              {featured && (
                <Icon
                  aria-hidden
                  className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 text-brand-teal/[0.07]"
                />
              )}
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs text-muted">
                  {String(group.skills.length).padStart(2, "0")} skills
                </span>
              </div>
              <h3
                className={`mt-5 font-semibold text-brand-navy ${featured ? "text-2xl" : "text-lg"}`}
              >
                {group.title}
              </h3>
              {featured && (
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                  Core Now Platform products I&apos;ve implemented, configured and extended
                  across enterprise rollouts, POCs and managed services.
                </p>
              )}
              <ul className={`mt-5 flex flex-wrap ${featured ? "gap-2.5" : "gap-2"}`}>
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className={`rounded-full border border-border bg-background font-medium text-brand-navy/80 ${
                      featured ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs"
                    }`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
