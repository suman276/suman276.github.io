import { ChevronDown, ChevronRight } from "lucide-react";
import type { ArchitectureNode } from "@/lib/data";

/** A step-by-step workflow: horizontal on wide screens, vertical on phones. */
export function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-1.5 md:flex-row md:items-stretch md:gap-0">
      {steps.map((step, i) => (
        <li key={step} className="flex flex-col items-stretch md:flex-1 md:flex-row md:items-center">
          <div
            className={`flex flex-1 items-start gap-2.5 rounded-lg border px-3 py-2.5 md:h-full md:flex-col md:gap-1.5 ${
              i === steps.length - 1 ? "border-accent/50 bg-accent/10" : "border-border bg-surface-alt/50"
            }`}
          >
            <span className="font-mono text-[10px] text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[13px] leading-snug text-ink/90">{step}</span>
          </div>
          {i < steps.length - 1 && (
            <span aria-hidden className="flex justify-center py-0.5 text-accent/70 md:px-1 md:py-0">
              <ChevronDown className="h-4 w-4 md:hidden" />
              <ChevronRight className="hidden h-4 w-4 md:block" />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/** Columns of components joined left to right, e.g. sources → processing → platform. */
export function ArchitectureDiagram({
  columns,
}: {
  columns: { label: string; nodes: ArchitectureNode[] }[];
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0">
      {columns.map((col, i) => (
        <div key={col.label} className="flex flex-col sm:flex-1 sm:flex-row">
          <div className="flex-1">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{col.label}</p>
            <ul className="space-y-2">
              {col.nodes.map((node) => (
                <li
                  key={node.title}
                  className={`rounded-lg border px-3 py-2.5 ${
                    i === columns.length - 1 ? "border-accent/50 bg-accent/10" : "border-border bg-surface"
                  }`}
                >
                  <p className="text-[13px] font-semibold text-ink">{node.title}</p>
                  {node.detail && <p className="mt-0.5 text-xs leading-snug text-muted">{node.detail}</p>}
                </li>
              ))}
            </ul>
          </div>
          {i < columns.length - 1 && (
            <span aria-hidden className="flex items-center justify-center py-1 text-accent/70 sm:px-1.5 sm:pt-6">
              <ChevronDown className="h-4 w-4 sm:hidden" />
              <ChevronRight className="hidden h-4 w-4 sm:block" />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
