import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mt-auto bg-brand-navy-dark py-8 text-center text-sm text-white/60">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with Next.js and
        Tailwind CSS, hosted on GitHub Pages.
      </p>
    </footer>
  );
}
