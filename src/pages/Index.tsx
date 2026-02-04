import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import GrowthPillars from "@/components/GrowthPillars";
import Experience from "@/components/Experience";
import Portfolio from "@/components/Portfolio";
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
        <Experience />
        <Portfolio />
        <Tools />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
