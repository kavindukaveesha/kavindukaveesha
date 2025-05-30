import AboutMe from "@/components/main/aboutme";
import Cube from "@/components/main/cube";
import Encryption from "@/components/main/Encryption";
import Hero from "@/components/main/Hero";
import Projects from "@/components/main/Projects";
import ProjectsSection from "@/components/main/Projectssection";
import Skills from "@/components/main/Skills";
import TechStackSection from "@/components/main/techstack";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
         <Hero />
        <AboutMe/>
        <ProjectsSection/>
        <TechStackSection/>
        <Skills />
        <Encryption />
        <Projects />
      </div>
    </main>
  );
}
