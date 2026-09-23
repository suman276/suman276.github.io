import { User } from "lucide-react";
import { profile } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <SectionHeading icon={User} eyebrow="About" title="Professional Summary" />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
          {profile.summary}
        </p>
      </Reveal>
    </section>
  );
}
