import { Sparkles } from "lucide-react";

/*
 * The hero's right-hand visual: an architecture view of the platform areas
 * Suman delivers on. Positions are percentages of a square canvas, so the SVG
 * lines (drawn in a 0–100 viewBox) and the HTML nodes always line up.
 */
const modules = [
  { label: "ITSM", x: 50, y: 13 },
  { label: "CMDB", x: 82, y: 31 },
  { label: "ITOM", x: 82, y: 69 },
  { label: "HAM · SAM", x: 50, y: 87 },
  { label: "App Engine", x: 18, y: 69 },
  { label: "NOW Assist", x: 18, y: 31, ai: true },
];

const integrations = ["Microsoft Intune", "Automox", "Auvik", "Workday"];

export default function PlatformVisual() {
  return (
    <figure
      data-hero="visual"
      aria-label="Illustration: the Now Platform at the centre of ITSM, CMDB, ITOM, asset management, App Engine and NOW Assist"
      className="relative mx-auto w-full max-w-[480px]"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/60 shadow-2xl shadow-shade/40 backdrop-blur">
        <div aria-hidden className="blueprint fade-mask absolute inset-0" />
        <div
          aria-hidden
          className="absolute left-1/2 top-[46%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
        />

        <div className="flex items-center justify-between border-b border-border/70 px-4 py-2.5 font-mono text-[11px] text-muted">
          <span>platform-architecture</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            illustrative
          </span>
        </div>

        <div className="relative aspect-square">
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <circle
              cx="50"
              cy="50"
              r="37"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            {modules.map((m) => (
              <g key={m.label}>
                <line
                  x1="50"
                  y1="50"
                  x2={m.x}
                  y2={m.y}
                  stroke="var(--border)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  x1="50"
                  y1="50"
                  x2={m.x}
                  y2={m.y}
                  className="flow-line"
                  stroke="var(--accent)"
                  strokeOpacity="0.7"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}
          </svg>

          {/* Core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="rounded-xl border border-accent/50 bg-surface px-4 py-3 text-center shadow-lg shadow-accent/20">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">Core</p>
              <p className="mt-0.5 whitespace-nowrap text-sm font-semibold text-ink">Now Platform</p>
            </div>
          </div>

          {modules.map((m) => (
            <div
              key={m.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
            >
              <span
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-[11px] font-medium shadow-sm sm:text-xs ${
                  m.ai
                    ? "border-accent/60 bg-accent/15 text-ink"
                    : "border-border bg-surface text-ink/90"
                }`}
              >
                {m.ai && <Sparkles aria-hidden className="h-3 w-3 text-accent" />}
                {m.label}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-border/70 px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Integrations</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {integrations.map((name) => (
              <li key={name} className="chip">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
