import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=80&auto=format';

const tagline = "Where Every Sip Tells a Story";

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [showCaret, setShowCaret] = useState(true);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= tagline.length) {
        setDisplayText(tagline.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowCaret(false), 2000);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const handleEnterSite = () => {
    navigate('/about');
  };

  return (
    <section 
      id="hero" 
      ref={ref} 
      className="relative h-screen overflow-hidden cursor-pointer"
      onClick={handleEnterSite}
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={HERO_IMAGE}
          alt="Cup & Cozy café interior"
          className="w-full h-[130%] object-cover blur-sm scale-105"
          loading="eager"
        />
      </motion.div>

      {/* Cinematic Overlay — slightly stronger for moodiness */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(10,6,4,0.6) 0%, rgba(10,6,4,0.35) 40%, rgba(10,6,4,0.75) 100%)',
        }}
      />

      {/* Subtle floating particles — reduced to 6, smaller, slower */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            background: `rgba(201, 169, 110, ${0.1 + Math.random() * 0.15})`,
            left: `${10 + Math.random() * 80}%`,
            bottom: `-5%`,
          }}
          animate={{
            y: [0, -(window.innerHeight + 100)],
            x: [0, (Math.random() - 0.5) * 40],
          }}
          transition={{
            duration: 12 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: 'linear',
          }}
        />
      ))}

      {/* Content — generous vertical spacing */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8"
      >
        {/* Subtitle — more breathing room */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-sm md:text-base tracking-[0.4em] uppercase mb-8 font-light"
          style={{ color: 'rgba(210, 180, 140, 0.6)' }}
        >
          Est. 2023 • Premium Café
        </motion.p>

        {/* Main Title — larger gap below */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-7xl md:text-8xl lg:text-[10rem] font-bold mb-8"
          style={{ fontFamily: "'Playfair Display', serif", color: '#F5E6D3', lineHeight: 1.05 }}
        >
          Cup & Cozy
        </motion.h1>

        {/* Decorative line between title and tagline */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="h-px mb-8"
          style={{ background: 'rgba(201, 169, 110, 0.4)' }}
        />

        {/* Typewriter Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-2xl md:text-3xl font-light mb-16 min-h-[32px]"
          style={{ color: 'rgba(201, 169, 110, 0.8)', fontFamily: "'Playfair Display', serif", letterSpacing: '0.03em' }}
        >
          <span className="italic">{displayText}</span>
          {showCaret && (
            <span
              className="inline-block w-px h-6 md:h-8 ml-1 align-middle"
              style={{
                background: '#C9A96E',
                animation: 'blink-caret 0.8s step-end infinite',
              }}
            />
          )}
        </motion.div>

        {/* CTA Buttons — larger text and padding */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="flex gap-6 flex-wrap justify-center mt-4"
        >
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(201, 169, 110, 0.25)' }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.stopPropagation();
              navigate('/about');
            }}
            className="px-12 py-5 rounded-full text-sm md:text-base font-medium tracking-[0.2em] uppercase"
            style={{
              background: 'linear-gradient(135deg, #C9A96E, #8B5E3C)',
              color: '#FDF8F3',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Explore Menu
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: 'rgba(201, 169, 110, 0.08)' }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.stopPropagation();
              navigate('/about');
            }}
            className="px-12 py-5 rounded-full text-sm md:text-base font-medium tracking-[0.2em] uppercase"
            style={{
              background: 'transparent',
              color: 'rgba(201, 169, 110, 0.9)',
              border: '1.5px solid rgba(201, 169, 110, 0.4)',
              cursor: 'pointer',
            }}
          >
            Our Story
          </motion.button>
        </motion.div>

        {/* Scroll indicator - replaced with a pulsing text to indicate anywhere click */}
        <motion.div
          className="absolute bottom-16"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(201, 169, 110, 0.7)' }}>
            Click anywhere to enter
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
