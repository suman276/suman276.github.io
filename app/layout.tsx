import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Suman Mondal | ServiceNow Consultant, Developer & Solution Architect";
const description =
  "Suman Mondal builds enterprise solutions with ServiceNow and AI: implementations, platform architecture, workflow automation, CMDB, ITOM, asset management and NOW Assist. 5× ServiceNow certified.";

export const metadata: Metadata = {
  metadataBase: new URL("https://suman276.github.io"),
  title,
  description,
  keywords: [
    "ServiceNow Consultant",
    "ServiceNow Developer",
    "ServiceNow Solution Architect",
    "ITSM",
    "CMDB",
    "ITOM",
    "HAM",
    "SAM",
    "App Engine",
    "NOW Assist",
    "Suman Mondal",
  ],
  authors: [{ name: "Suman Mondal", url: "https://www.linkedin.com/in/mondalsuman/" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title,
    description,
    siteName: "Suman Mondal",
  },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#091321" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8fb" },
  ],
};

// Applies the saved theme before first paint (dark unless the visitor chose light).
const themeScript = `(function(){var t=null;try{t=localStorage.getItem('theme')}catch(e){}document.documentElement.dataset.theme=t==='light'?'light':'dark'})();`;

// Runs before first paint. If JS never finishes booting (e.g. a script fails
// to load), the timeout un-hides content so the page is never left blank.
const motionScript = `(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion')},4000)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript + motionScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only z-[200] rounded-md bg-primary px-4 py-2 font-semibold text-on-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
