import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { profile } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import LinkedInIcon from "@/components/LinkedInIcon";

const subject = encodeURIComponent("Let's talk: ServiceNow");

export default function Contact() {
  return (
    <section id="contact" className="border-t border-border px-4 py-24 sm:px-6 lg:py-28">
      <div data-reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-panel px-6 py-16 text-white sm:px-14 lg:py-20">
        <div aria-hidden className="blueprint absolute inset-0 opacity-40 [--ink:#ffffff]" />
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#16a6d8]/25 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-[#4f8cff]/15 blur-3xl" />

        <div className="relative grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <SectionHeading
              index="07"
              eyebrow="Contact"
              title="Let's Build Something Impactful."
              description="Open to ServiceNow consulting, development and solution architecture opportunities. Tell me about your platform, your roadmap or your next implementation."
              onPanel
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}?subject=${subject}`}
                data-cursor="Email"
                className="btn bg-[#16a6d8] text-[#061120] hover:bg-[#4cc3ec]"
              >
                <Mail className="h-4 w-4" />
                Get in touch
              </a>
              <a href="/resume.pdf" download className="btn border border-white/20 text-white hover:border-white/50">
                <Download className="h-4 w-4" />
                Download resume
              </a>
            </div>
          </div>

          <ul className="space-y-3">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-colors hover:border-[#16a6d8]/60"
              >
                <Mail aria-hidden className="h-5 w-5 text-[#4cc3ec]" />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-white/60">Email</span>
                  <span className="block truncate font-medium">{profile.email}</span>
                </span>
                <ArrowUpRight aria-hidden className="h-4 w-4 text-white/50 group-hover:text-white" />
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-colors hover:border-[#16a6d8]/60"
              >
                <span className="text-[#4cc3ec]">
                  <LinkedInIcon />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-white/60">LinkedIn</span>
                  <span className="block truncate font-medium">in/mondalsuman</span>
                </span>
                <ArrowUpRight aria-hidden className="h-4 w-4 text-white/50 group-hover:text-white" />
              </a>
            </li>
            <li className="flex items-center gap-4 px-4 py-2 text-sm text-white/60">
              <MapPin aria-hidden className="h-5 w-5 text-[#4cc3ec]" />
              {profile.location}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
