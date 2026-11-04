import { Mail } from "lucide-react";
import { profile } from "@/lib/data";
import LinkedInIcon from "@/components/LinkedInIcon";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind CSS &amp; GSAP.
        </p>
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-brand-teal/50 hover:text-brand-navy"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-brand-teal/50 hover:text-brand-navy"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
