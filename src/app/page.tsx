import { HeroSection } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/About";
import { CareerSection } from "@/components/sections/Career";
import { SkillsSection } from "@/components/sections/Skills";
import { WorksSection } from "@/components/sections/Works";
import { ContactSection } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <HeroSection />
      <AboutSection />
      <CareerSection />
      <SkillsSection />
      <WorksSection />
      <ContactSection />

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/40">
        <p>&copy; {new Date().getFullYear()} Haruka. All rights reserved.</p>
      </footer>
    </main>
  );
}
