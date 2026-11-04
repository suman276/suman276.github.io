import { Briefcase, Layers, MapPin, User } from "lucide-react";
import { experience, profile } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

const facts = [
  { icon: MapPin, label: "Based in", value: profile.location },
  {
    icon: Briefcase,
    label: "Currently",
    value: `${experience[0].role}, ${experience[0].company.replace(" Pvt. Ltd.", "")}`,
  },
  { icon: Layers, label: "Focus", value: "ITSM · CMDB · App Engine · NOW Assist" },
];

export default function About() {
  return (
    <section id="about" className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-[1fr_1.9fr] lg:py-32">
        <div>
          <SectionHeading
            icon={User}
            eyebrow="About"
            title="Consultant mindset. Developer depth."
          />
          <dl className="mt-10 space-y-5">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} data-reveal className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted">
                    {label}
                  </dt>
                  <dd className="mt-0.5 font-medium text-brand-navy">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <p
          data-scrub-words
          className="self-center text-2xl font-medium leading-[1.45] tracking-tight text-brand-navy lg:text-[1.75rem]"
        >
          {profile.summary}
        </p>
      </div>
    </section>
  );
}
