import { profile } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <p className="section-heading">About</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        Professional Summary
      </h2>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
        {profile.summary}
      </p>
    </section>
  );
}
