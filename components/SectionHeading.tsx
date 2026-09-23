import type { LucideIcon } from "lucide-react";

export default function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
  dark = false,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon
          className={`h-4 w-4 ${dark ? "text-brand-teal-light" : "text-brand-teal"}`}
        />
        <p className={`section-heading ${dark ? "text-brand-teal-light" : ""}`}>
          {eyebrow}
        </p>
      </div>
      <h2
        className={`mt-2 text-3xl font-bold tracking-tight ${
          dark ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
