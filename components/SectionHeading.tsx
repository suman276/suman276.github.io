export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  center = false,
  onPanel = false,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  /** On a navy panel, where text is always white. */
  onPanel?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p
        data-reveal
        className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""} ${
          onPanel ? "text-accent-bright" : ""
        }`}
      >
        {index && <span className="font-mono text-[11px] tracking-normal opacity-70">{index}</span>}
        <span aria-hidden className="h-px w-8 bg-current opacity-40" />
        {eyebrow}
      </p>
      <h2
        data-split
        className={`mt-4 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.6rem] ${
          onPanel ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          data-reveal
          className={`mt-4 text-base leading-relaxed sm:text-lg ${onPanel ? "text-white/70" : "text-muted"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
