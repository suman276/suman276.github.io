import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Suman Mondal | ServiceNow Consultant & Developer",
  description:
    "Portfolio of Suman Mondal, a ServiceNow Consultant and Developer specializing in ITSM, CMDB, HAM/SAM, App Engine, and AI-powered workflows.",
};

// Applies the saved theme before first paint, so dark mode never flashes light.
const themeScript = `(function(){var t=null;try{t=localStorage.getItem('theme')}catch(e){}document.documentElement.dataset.theme=t==='dark'?'dark':'light'})();`;

// Runs before first paint. If JS never finishes booting (e.g. a script fails
// to load), the timeout un-hides content so the page is never left blank.
const motionScript = `(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion')},4000)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript + motionScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
