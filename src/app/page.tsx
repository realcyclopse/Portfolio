import Hero from "@/components/ui/Hero";
import ProjectsSection from "@/components/ui/ProjectsSection";
import ExperienceSection from "@/components/ui/ExperienceSection";
import SkillsBento from "@/components/ui/SkillsBento";
import AboutSection from "@/components/ui/AboutSection";
import ContactFooter from "@/components/ui/ContactFooter";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Hero />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsBento />
      <AboutSection />
      <ContactFooter />
    </div>
  );
}
