import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { AmbientBackground } from "@/components/sections/ambient-background";
import { LoadingScreen } from "@/components/sections/loading-screen";
import { CustomCursor } from "@/components/sections/custom-cursor";
import { ScrollProgress } from "@/components/sections/scroll-progress";
import { PageFadeIn } from "@/components/motion/page-fade-in";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <PageFadeIn>
        <main className="relative">
          <AmbientBackground />
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Achievements />
          <Contact />
          <Footer />
        </main>
      </PageFadeIn>
    </>
  );
}
