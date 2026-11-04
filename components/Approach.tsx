import { ArrowUpRight, ClipboardCheck, CodeXml, PencilRuler, Rocket, Search, type LucideIcon } from "lucide-react";
import { architectures, deliveryStages } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import { ArchitectureDiagram } from "@/components/Diagrams";
import CaseStudyButton from "@/components/CaseStudyButton";

const stageIcons: LucideIcon[] = [Search, PencilRuler, CodeXml, ClipboardCheck, Rocket];

export default function Approach() {
  return (
    <section id="approach" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
        <SectionHeading
          index="05"
          eyebrow="Approach"
          title="How I Build Enterprise Solutions"
          description="A five-stage delivery lifecycle that scales from a 12-day POC to a 25-plant rollout."
        />

        {/* Process: a vertical timeline on phones, a horizontal track from lg up. */}
        <div className="relative mt-14">
          <span
            aria-hidden
            className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-accent/60 via-border to-border lg:bottom-auto lg:left-6 lg:right-6 lg:top-[19px] lg:h-px lg:w-auto lg:bg-gradient-to-r"
          />
          <ol className="relative grid gap-6 lg:grid-cols-5 lg:gap-4">
          {deliveryStages.map((stage, i) => {
            const Icon = stageIcons[i];
            return (
              <li key={stage.title} data-reveal className="relative flex gap-4 lg:flex-col lg:gap-0">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-background text-accent shadow-[0_0_0_6px_var(--background)]">
                  <Icon aria-hidden className="h-[18px] w-[18px]" />
                </span>
                <div className="lg:mt-5">
                  <p className="font-mono text-[11px] text-accent">Stage {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 font-semibold leading-snug text-ink">{stage.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{stage.detail}</p>
                </div>
              </li>
            );
          })}
          </ol>
        </div>

        <div className="mt-20">
          <h3 data-reveal className="text-xl font-semibold text-ink">Architecture showcases</h3>
          <p data-reveal className="mt-1.5 max-w-2xl text-sm text-muted">
            Illustrative diagrams of delivered work. Each component reflects what the project
            delivered; client-confidential designs are not shown.
          </p>

          <div className="mt-8 grid gap-5">
            {architectures.map((a) => (
              <article key={a.title} data-reveal className="card p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-ink">{a.title}</h4>
                    <p className="mt-0.5 text-xs text-muted">{a.source}</p>
                  </div>
                  <CaseStudyButton
                    slug={a.slug}
                    className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-semibold text-accent transition-colors hover:border-accent/50"
                  >
                    Case study
                    <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                  </CaseStudyButton>
                </div>
                <div className="blueprint mt-5 rounded-xl border border-border bg-background/60 p-4">
                  <ArchitectureDiagram columns={a.columns} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
