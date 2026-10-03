import { useEffect } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { scrollReveals, useGsap } from './animations/animations.js';
import { education, experience } from './data/timeline.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Certifications from './components/Certifications.jsx';
import TimelineSection from './components/Timeline.jsx';
import Interests from './components/Interests.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

/** Feeds pointer position to `.spot` cards for their hover glow (one listener for the page). */
function useSpotlight() {
  useEffect(() => {
    const onMove = (e) => {
      const el = e.target.closest?.('.spot');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);
}

export default function App() {
  useGsap(scrollReveals);
  useSpotlight();

  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <div className="section border-y border-line bg-bg-2">
          <div className="container-x grid gap-20 lg:grid-cols-2 lg:gap-16">
            <TimelineSection
              id="education"
              index="05"
              eyebrow="Learning"
              title="Education"
              items={education}
              Icon={GraduationCap}
            />
            <TimelineSection
              id="experience"
              index="06"
              eyebrow="Work"
              title="Experience"
              items={experience}
              Icon={Briefcase}
            />
          </div>
        </div>
        
        <Interests />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
