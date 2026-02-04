import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import GrowthPillars from "@/components/GrowthPillars";
import Portfolio from "@/components/Portfolio";
import CaseStudies from "@/components/CaseStudies";
import Timeline from "@/components/Timeline";
import Tools from "@/components/Tools";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <GrowthPillars />
        <Portfolio />
        <CaseStudies />
        <Timeline />
        <Tools />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
