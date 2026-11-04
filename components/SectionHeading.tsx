import type { LucideIcon } from "lucide-react";

export default function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
  description,
  dark = false,
  center = false,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p
        data-reveal
        className={`section-heading flex items-center gap-2 ${
          center ? "justify-center" : ""
        } ${dark ? "text-brand-teal-light" : ""}`}
      >
        <Icon className="h-4 w-4" />
        {eyebrow}
      </p>
      <h2
        data-split
        className={`mt-3 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-white" : "text-brand-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          data-reveal
          className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
