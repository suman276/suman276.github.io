import type { ProjectGraphic as Kind } from "@/lib/data";

/*
 * Abstract line illustrations, one per kind of project. They are decorative
 * (aria-hidden) and drawn with theme tokens, so they work in light and dark.
 */
const S = "var(--accent)";
const M = "color-mix(in srgb, var(--ink) 28%, transparent)";
const F = "color-mix(in srgb, var(--surface-alt) 85%, transparent)";

function Logbook() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={112 + i * 14} y={22 + i * 10} width="96" height="96" rx="8" fill={F} stroke={i === 2 ? S : M} />
      ))}
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          <circle cx="156" cy={66 + r * 16} r="4.5" fill="none" stroke={S} />
          <path d={`M153.8 ${66 + r * 16} l1.6 1.8 l3.2 -3.6`} fill="none" stroke={S} strokeWidth="1.4" />
          <line x1="168" x2={222 - r * 8} y1={66 + r * 16} y2={66 + r * 16} stroke={M} />
        </g>
      ))}
    </>
  );
}

function Routing() {
  const levels = [[160], [110, 210], [80, 140, 180, 240]];
  return (
    <>
      {levels.slice(1).map((row, li) =>
        row.map((x, i) => {
          const parent = levels[li][Math.floor(i / 2)];
          return <path key={`${li}-${i}`} d={`M${parent} ${30 + li * 42} C${parent} ${50 + li * 42}, ${x} ${52 + li * 42}, ${x} ${72 + li * 42}`} fill="none" stroke={M} />;
        })
      )}
      {levels.map((row, li) =>
        row.map((x) => (
          <rect key={`${li}-${x}`} x={x - 16} y={18 + li * 42} width="32" height="20" rx="6" fill={F} stroke={li === 0 ? S : M} />
        ))
      )}
      <circle cx="240" cy="110" r="4" fill={S} />
    </>
  );
}

function Ticket() {
  return (
    <>
      <path d="M90 34 h110 a10 10 0 0 0 20 0 h10 v72 h-10 a10 10 0 0 0 -20 0 h-110 z" fill={F} stroke={M} />
      <line x1="206" y1="40" x2="206" y2="100" stroke={M} strokeDasharray="3 4" />
      <line x1="104" y1="56" x2="180" y2="56" stroke={S} />
      <line x1="104" y1="70" x2="160" y2="70" stroke={M} />
      <line x1="104" y1="84" x2="170" y2="84" stroke={M} />
      <circle cx="252" cy="70" r="20" fill="none" stroke={M} />
      <path d="M252 50 a20 20 0 0 1 17.3 30" fill="none" stroke={S} strokeWidth="2" />
      <line x1="252" y1="70" x2="252" y2="60" stroke={S} />
    </>
  );
}

function Governance() {
  return (
    <>
      <circle cx="160" cy="70" r="40" fill="none" stroke={M} />
      <path d="M160 30 a40 40 0 0 1 40 40" fill="none" stroke={S} strokeWidth="2" />
      {[0, 90, 180, 270].map((a) => {
        const r = (a * Math.PI) / 180;
        return <circle key={a} cx={160 + 40 * Math.sin(r)} cy={70 - 40 * Math.cos(r)} r="7" fill={F} stroke={a === 90 ? S : M} />;
      })}
      <circle cx="160" cy="70" r="12" fill={F} stroke={S} />
    </>
  );
}

function Cmdb() {
  const nodes = [
    [100, 40], [96, 100], [220, 36], [228, 98], [160, 120], [160, 22],
  ];
  return (
    <>
      {nodes.map(([x, y]) => (
        <line key={`${x}${y}`} x1="160" y1="70" x2={x} y2={y} stroke={M} />
      ))}
      <line x1="100" y1="40" x2="160" y2="22" stroke={M} />
      <line x1="220" y1="36" x2="228" y2="98" stroke={M} />
      {nodes.map(([x, y], i) => (
        <rect key={i} x={x - 9} y={y - 9} width="18" height="18" rx="4" fill={F} stroke={i < 2 ? S : M} />
      ))}
      <circle cx="160" cy="70" r="16" fill={F} stroke={S} strokeWidth="1.5" />
      <ellipse cx="160" cy="66" rx="7" ry="2.5" fill="none" stroke={S} />
      <path d="M153 66 v8 a7 2.5 0 0 0 14 0 v-8" fill="none" stroke={S} />
    </>
  );
}

function Document() {
  return (
    <>
      <path d="M96 18 h60 l20 20 v84 h-80 z" fill={F} stroke={M} />
      <path d="M156 18 v20 h20" fill="none" stroke={M} />
      {[50, 62, 74, 86, 98].map((y, i) => (
        <line key={y} x1="106" x2={i % 2 ? 150 : 164} y1={y} y2={y} stroke={M} />
      ))}
      <line x1="88" x2="184" y1="66" y2="66" stroke={S} strokeWidth="1.5" />
      {["PO", "GST", "OK"].map((t, i) => (
        <g key={t}>
          <path d={`M184 66 C200 66, 200 ${36 + i * 34}, 214 ${36 + i * 34}`} fill="none" stroke={M} />
          <rect x="214" y={26 + i * 34} width="44" height="20" rx="5" fill={F} stroke={S} />
          <text x="236" y={40 + i * 34} textAnchor="middle" fontSize="9" fontFamily="var(--font-geist-mono)" fill={S}>
            {t}
          </text>
        </g>
      ))}
    </>
  );
}

function Ai() {
  const cols = [[45, 95], [30, 70, 110], [55, 85]];
  const xs = [110, 160, 210];
  return (
    <>
      {cols.slice(0, -1).map((col, ci) =>
        col.flatMap((y1) =>
          cols[ci + 1].map((y2) => (
            <line key={`${ci}-${y1}-${y2}`} x1={xs[ci]} y1={y1} x2={xs[ci + 1]} y2={y2} stroke={M} />
          ))
        )
      )}
      {cols.map((col, ci) => col.map((y) => <circle key={`${ci}-${y}`} cx={xs[ci]} cy={y} r="7" fill={F} stroke={ci === 1 ? S : M} />))}
      <path d="M252 52 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 z" fill="none" stroke={S} strokeWidth="1.5" />
    </>
  );
}

function Discovery() {
  return (
    <>
      {[16, 32, 48].map((r) => (
        <circle key={r} cx="160" cy="74" r={r} fill="none" stroke={M} />
      ))}
      <path d="M160 74 L195 40" stroke={S} strokeWidth="1.5" />
      <path d="M160 26 a48 48 0 0 1 34 14" fill="none" stroke={S} strokeWidth="2" />
      {[[186, 56], [132, 92], [178, 104], [124, 54]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill={i === 0 ? S : M} />
      ))}
      <rect x="226" y="40" width="42" height="14" rx="4" fill={F} stroke={M} />
      <rect x="226" y="62" width="42" height="14" rx="4" fill={F} stroke={S} />
      <rect x="226" y="84" width="42" height="14" rx="4" fill={F} stroke={M} />
    </>
  );
}

function Software() {
  return (
    <>
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}${c}`}
            x={104 + c * 30}
            y={24 + r * 32}
            width="22"
            height="22"
            rx="5"
            fill={F}
            stroke={r === 1 && c === 2 ? S : M}
          />
        ))
      )}
      <path d="M166 79 l3 3 l6 -6" fill="none" stroke={S} strokeWidth="1.5" />
      <line x1="234" y1="70" x2="262" y2="70" stroke={S} />
      <path d="M256 64 l6 6 l-6 6" fill="none" stroke={S} />
    </>
  );
}

function People() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx="104" cy={34 + i * 36} r="7" fill={F} stroke={i === 0 ? S : M} />
          <path d={`M93 ${52 + i * 36} a11 9 0 0 1 22 0`} fill="none" stroke={i === 0 ? S : M} />
          <path d={`M122 ${42 + i * 36} C150 ${42 + i * 36}, 150 70, 176 70`} fill="none" stroke={M} />
        </g>
      ))}
      <rect x="176" y="40" width="80" height="60" rx="8" fill={F} stroke={S} />
      {[56, 70, 84].map((y, i) => (
        <g key={y}>
          <rect x="186" y={y - 4} width="8" height="8" rx="2" fill="none" stroke={i === 0 ? S : M} />
          <line x1="200" x2="244" y1={y} y2={y} stroke={M} />
        </g>
      ))}
    </>
  );
}

const graphics: Record<Kind, () => React.JSX.Element> = {
  logbook: Logbook,
  routing: Routing,
  ticket: Ticket,
  governance: Governance,
  cmdb: Cmdb,
  document: Document,
  ai: Ai,
  discovery: Discovery,
  software: Software,
  people: People,
};

export default function ProjectGraphic({ kind, className = "" }: { kind: Kind; className?: string }) {
  const Graphic = graphics[kind];
  return (
    <div aria-hidden className={`relative overflow-hidden ${className}`}>
      <div className="blueprint absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-2/10" />
      <svg viewBox="0 0 320 140" className="relative h-full w-full" fill="none" strokeWidth="1.2">
        <Graphic />
      </svg>
    </div>
  );
}
