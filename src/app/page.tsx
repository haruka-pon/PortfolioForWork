import { HeroSection } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/About";
import { CareerSection } from "@/components/sections/Career";
import { SkillsSection } from "@/components/sections/Skills";
import { WorksSection } from "@/components/sections/Works";
import { ContactSection } from "@/components/sections/Contact";
import { BackgroundAnimation } from "@/components/ui/BackgroundAnimation";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { Footer } from "@/components/layout/Footer";
import { MouseTracker3D } from "@/components/ui/MouseTracker3D";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent selection:bg-primary/20 selection:text-primary relative z-0">
      <MouseTracker3D />
      <BackgroundAnimation />
      <FloatingNav />
      <HeroSection />
      <AboutSection />
      <CareerSection />
      <SkillsSection />
      <WorksSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
