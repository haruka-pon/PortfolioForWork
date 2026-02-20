import { HeroSection } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/About";
import { CareerSection } from "@/components/sections/Career";
import { SkillsSection } from "@/components/sections/Skills";
import { WorksSection } from "@/components/sections/Works";
import { ContactSection } from "@/components/sections/Contact";
import { BackgroundAnimation } from "@/components/ui/BackgroundAnimation";
import { FloatingNav } from "@/components/ui/FloatingNav";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent selection:bg-primary/20 selection:text-primary relative z-0">
      <BackgroundAnimation />
      <FloatingNav />
      <HeroSection />
      <AboutSection />
      <CareerSection />
      <SkillsSection />
      <WorksSection />
      <ContactSection />

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/40 bg-background/50 backdrop-blur-sm">
        <p>&copy; {new Date().getFullYear()} Haruka. All rights reserved.</p>
      </footer>
    </main>
  );
}
