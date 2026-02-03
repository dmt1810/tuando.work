import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Competencies from "@/components/Competencies";
import Tools from "@/components/Tools";
import Experience from "@/components/Experience";
import CaseStudies from "@/components/CaseStudies";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Competencies />
        <Tools />
        <Experience />
        <CaseStudies />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
