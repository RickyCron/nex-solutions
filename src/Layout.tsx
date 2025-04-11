import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import Home from './pages/Home';
import AIFacts from './pages/AIFacts';
import ServicesProducts from './pages/ServicesProducts';
import Tools from './pages/Tools';
import Process from './pages/Process';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Consultation from './pages/Consultation';

function createElectricalLine() {
  const line = document.createElement('div');
  line.className = 'electrical-line';
  line.style.left = `${Math.random() * 100}%`;
  line.style.height = `${20 + Math.random() * 30}%`;
  line.style.opacity = `${0.1 + Math.random() * 0.3}`;
  return line;
}

export default function Layout() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (scrolled >= sectionTop && scrolled < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const background = document.querySelector('.electrical-background');
    if (!background) return;

    const addLine = () => {
      const line = createElectricalLine();
      background.appendChild(line);
      
      setTimeout(() => {
        line.remove();
      }, 8000);
    };

    for (let i = 0; i < 5; i++) {
      addLine();
    }

    const interval = setInterval(() => {
      if (background.children.length < 10) {
        addLine();
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Handle scrolling to section when navigating from other pages
  useEffect(() => {
    if (location.state && location.state.scrollToSection) {
      const sectionId = location.state.scrollToSection;
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.state]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <div className="min-h-screen">
      <div className="electrical-background fixed inset-0" />
      
      {/* Battery Progress Indicator */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <div className="relative w-14 h-7 bg-primary/40 backdrop-blur-sm rounded-md border-2 border-accent/30 overflow-hidden">
          {/* Battery Nub */}
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-3 bg-accent/30 rounded-r-sm" />
          
          {/* Fill */}
          <motion.div 
            className="absolute top-0.5 left-0.5 bottom-0.5 bg-accent"
            style={{
              width: `${Math.min(scrollProgress, 100)}%`,
              right: '2px'
            }}
            transition={{ type: "tween" }}
          />
        </div>
        <span className="text-xs font-medium text-accent min-w-[2.5rem]">
          {Math.round(scrollProgress)}%
        </span>
      </div>
      
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-primary/20 backdrop-blur-sm p-2 rounded-full shadow-lg mt-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`nav-link px-4 py-2 rounded-full text-sm font-rajdhani ${
              activeSection === item.id ? 'text-accent' : 'text-light'
            }`}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => scrollToSection('consultation')}
          className="px-4 py-2 bg-accent text-light rounded-full text-sm font-rajdhani font-medium hover:bg-accent/90 transition-colors"
        >
          Get Started
        </button>
      </nav>

      <main>
        <section id="home" className="bg-secondary min-h-screen">
          <Home />
        </section>
        
        <section id="ai-facts" className="bg-primary min-h-screen">
          <AIFacts />
        </section>
        
        <section id="services" className="bg-secondary min-h-screen">
          <ServicesProducts />
        </section>
        
        <section id="tools" className="bg-primary min-h-screen">
          <Tools />
        </section>
        
        <section id="process" className="bg-secondary min-h-screen">
          <Process />
        </section>

        <section id="about" className="bg-primary min-h-screen">
          <About />
        </section>
        
        <section id="faq" className="bg-secondary min-h-screen">
          <FAQ />
        </section>
        
        <section id="consultation" className="bg-primary min-h-screen">
          <Consultation />
        </section>
      </main>
    </div>
  );
}