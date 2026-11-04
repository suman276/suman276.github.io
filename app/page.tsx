import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Approach from "@/components/Approach";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import PageAnimations from "@/components/motion/PageAnimations";
import VirtualAgent from "@/components/VirtualAgent";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Approach />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <VirtualAgent />
      <PageAnimations />
    </>
  );
}
