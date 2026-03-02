import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

const About = lazy(() => import("@/components/About"));
const GrowthPillars = lazy(() => import("@/components/GrowthPillars"));
const Experience = lazy(() => import("@/components/Experience"));
const Portfolio = lazy(() => import("@/components/Portfolio"));
const Tools = lazy(() => import("@/components/Tools"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div />}>
          <About />
          <GrowthPillars />
          <Experience />
          <Portfolio />
          <Tools />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<div />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
