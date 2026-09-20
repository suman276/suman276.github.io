import { certifications, education, achievements } from "@/lib/data";

export default function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <p className="section-heading">Certifications</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            ServiceNow Credentials
          </h2>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {certifications.map((cert) => (
              <li
                key={cert.code}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <p className="font-bold text-brand-navy">{cert.code}</p>
                <p className="mt-1 text-sm text-muted">{cert.name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-heading">Education</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Academic Background
          </h2>
          <div className="mt-8 rounded-xl border border-border bg-surface p-5">
            <p className="font-semibold text-brand-navy">
              {education.degree}
            </p>
            <p className="mt-1 text-sm text-muted">{education.school}</p>
            <p className="mt-1 text-sm text-muted">{education.detail}</p>
          </div>

          <ul className="mt-6 space-y-2">
            {achievements.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-muted">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-teal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
