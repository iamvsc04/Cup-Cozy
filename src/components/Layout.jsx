import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let rafId;

    const moveCursor = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .menu-card, .gallery-item')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div 
        className={`custom-cursor hidden md:block ${hovering ? 'hovering' : ''}`} 
        style={{ left: position.x - 10, top: position.y - 10 }} 
      />
      <div 
        className="cursor-dot hidden md:block" 
        style={{ left: position.x - 3, top: position.y - 3 }} 
      />
    </>
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="scroll-progress fixed top-0 left-0 w-full h-[3px] origin-left z-[99998]"
      style={{ scaleX, background: 'linear-gradient(90deg, #8B5E3C, #C9A96E, #8B5E3C)' }}
    />
  );
}

export default function Layout({ children }) {
  const location = useLocation();

  // Scroll to top on route change (in case any inner scroll containers exist)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen lg:h-screen w-full overflow-y-auto lg:overflow-hidden no-scrollbar flex flex-col relative">
      <CustomCursor />
      {/* Scrollbar only makes sense if there's global scrolling, but we keep it for effect on inner scrolls later if attached */}
      <ScrollProgressBar />
      
      <Navbar />
      
      {/* Main takes available height minus Footer (if displayed) */}
      <main className="flex-1 w-full relative overflow-y-auto lg:overflow-hidden no-scrollbar break-words">
        {children}
      </main>
      
      {/* Only show Footer on Home page since other pages are strict 100vh lock */}
      {isHome && (
        <div className="absolute bottom-0 w-full z-10 pointer-events-none opacity-0">
          <Footer />
        </div>
      )}
    </div>
  );
}
