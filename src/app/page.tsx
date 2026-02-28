import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";
import { Endorsements } from "@/components/Endorsements";
import { GithubActivity } from "@/components/GithubActivity";
import { TechGlobeWrapper } from "@/components/TechGlobeWrapper";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/lib/data";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <ScrollProgress />
      <CustomCursor />
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <Experience />
        <Approach />
        <Projects />
        <GithubActivity />
        <TechGlobeWrapper />
        <Services />
        <Endorsements />

        <Footer />
      </div>
    </main>
  );
}
