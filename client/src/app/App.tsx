import { MotionConfig } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Expertise } from "./components/Expertise";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { TechStack } from "./components/TechStack";
import { Credibility } from "./components/Credibility";
import { Education } from "./components/Education";
import { About } from "./components/About";
import { Contact, Footer } from "./components/Contact";
import { ChatWidget } from "./components/ChatWidget";

export default function App() {
  return (
    // reducedMotion="user" skips transform animations for visitors who ask their OS for less motion.
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
        <a href="#main" className="skip-link">Skip to content</a>
        <Navbar />

        <main id="main">
          <Hero />
          <Expertise />
          <Experience />
          <Projects />
          <TechStack />
          <Credibility />
          <Education />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
      <ChatWidget />
    </MotionConfig>
  );
}
