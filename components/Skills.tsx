import { CodeXml, Handshake, Layers, Network, Plug, type LucideIcon } from "lucide-react";
import { skillGroups } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

const icons: Record<string, LucideIcon> = {
  "ServiceNow Platform": Layers,
  Development: CodeXml,
  "CMDB & Discovery": Network,
  Integrations: Plug,
  Consulting: Handshake,
};

// Grid placement for the bento layout: the platform card leads.
const layout: Record<string, string> = {
  "ServiceNow Platform": "md:col-span-2",
  Development: "",
  "CMDB & Discovery": "",
  Integrations: "",
  Consulting: "",
};

export default function Skills() {
  const groups = skillGroups.filter((g) => icons[g.title]);
  const extra = skillGroups.find((g) => !icons[g.title]);

  return (
    <section id="expertise" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
        <SectionHeading
          index="02"
          eyebrow="Technical expertise"
          title="Platform depth, end to end."
          description="From core ITSM configuration and scripting to CMDB health, integrations and GenAI on the Now Platform."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const Icon = icons[group.title];
            return (
              <article key={group.title} data-reveal className={`card card-hover p-6 ${layout[group.title]}`}>
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[11px] text-muted">
                    {String(group.skills.length).padStart(2, "0")} capabilities
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">{group.title}</h3>
                <p className="mt-1 text-sm text-muted">{group.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <li key={skill} className="chip">
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {extra && (
          <p data-reveal className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted">
            <span className="mr-1">Also working with</span>
            {extra.skills.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}
