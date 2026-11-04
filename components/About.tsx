import Image from "next/image";
import { CodeXml, Compass, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { certifications, education, experience, profile } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

const capabilities = [
  {
    icon: CodeXml,
    title: "Technical development & implementation",
    points: [
      "Builds on App Engine, Flow Designer, Integration Hub and platform scripting",
      "Integrates endpoint and network tools such as Microsoft Intune, Automox and Auvik",
      "Designs CMDB foundations: IRE rules, CI classes and normalization",
      "Designs AI-powered solutions with NOW Assist and AI/ML OCR",
    ],
  },
  {
    icon: Compass,
    title: "Consulting, solutioning & pre-sales",
    points: [
      "Runs stakeholder workshops and client discovery",
      "Shapes solution architecture, effort estimates and SOWs",
      "Delivers rapid POCs, including against incumbent tools",
      "Leads managed services governance and team training",
    ],
  },
];

const lifecycle = ["Discovery", "Architecture", "Development", "Testing & UAT", "Deployment"];

export default function About() {
  const current = experience[0];
  const facts = [
    { icon: MapPin, label: "Based in", value: profile.location },
    { icon: Briefcase, label: "Currently", value: `${current.role}, ${current.company.replace(" Pvt. Ltd.", "")}` },
    { icon: GraduationCap, label: "Education", value: `B.Tech ECE · ${education.detail}` },
  ];

  return (
    <section id="about" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-16">
          <div data-reveal className="mx-auto w-full max-w-[300px] lg:mx-0">
            {/* Light: circular portrait (the source is a circle crop). Dark: black-and-white cutout. */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-surface-alt">
              <div aria-hidden className="blueprint absolute inset-0 opacity-60" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-accent/15 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center p-7 dark:hidden">
                <div className="relative aspect-square w-full overflow-hidden rounded-full shadow-xl shadow-shade/20 ring-4 ring-surface">
                  <Image
                    src="/images/profile-light.jpg"
                    alt={profile.name}
                    fill
                    sizes="250px"
                    className="scale-[1.02] object-cover"
                  />
                </div>
              </div>
              <Image
                src="/images/profile.webp"
                alt={profile.name}
                width={315}
                height={438}
                className="photo-fade absolute inset-x-0 bottom-0 mx-auto hidden h-[96%] w-auto dark:block"
              />
            </div>
            <dl className="mt-5 space-y-3">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 text-sm">
                  <Icon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-ink/85">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <SectionHeading
              index="01"
              eyebrow="About"
              title="Consultant mindset. Developer depth."
            />
            <p data-reveal className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/85">
              {profile.summary}
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {capabilities.map(({ icon: Icon, title, points }) => (
                <div key={title} data-reveal className="card card-hover p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-ink">{title}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                    {points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div data-reveal className="card mt-4 p-6">
              <p className="text-sm font-semibold text-ink">Owns the full implementation lifecycle</p>
              <p className="mt-1 text-sm text-muted">
                From stakeholder workshops and solution architecture through development, UAT and
                post-go-live support, backed by {certifications.length} ServiceNow certifications.
              </p>
              <ol className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-5">
                {lifecycle.map((step, i) => (
                  <li key={step} className="flex items-center gap-2 sm:flex-col sm:items-start">
                    <span className="flex w-full items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/40 font-mono text-[10px] text-accent">
                        {i + 1}
                      </span>
                      <span aria-hidden className="hidden h-px flex-1 bg-border sm:block" />
                    </span>
                    <span className="text-[13px] font-medium text-ink/90 sm:mt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
