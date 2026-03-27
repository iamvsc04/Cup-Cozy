import { useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80&auto=format';

const storyParagraphs = [
  "It started with a simple dream — a quiet corner where the world slows down, where the aroma of freshly ground beans wraps around you like a warm blanket.",
  "Cup & Cozy was born from late-night conversations, dog-eared books, and the belief that the best moments happen over good coffee.",
];



export default function About() {
  return (
    <section 
      id="about" 
      className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden" 
      style={{ background: '#151010' }}
    >
      <AnimatedBackground variant="about" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-12 flex flex-col h-full justify-center">
        
        {/* Section Header (Compact) */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-[10px] tracking-[0.35em] uppercase block mb-3"
            style={{ color: 'rgba(139, 94, 60, 0.7)' }}
          >
            Our Story
          </span>
          <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5E6D3' }}>
            More Than Just Coffee
          </h2>
          <motion.div
            className="mx-auto mt-4 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.4), transparent)' }}
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </motion.div>

        {/* Content Grid (Compact to fit 100vh) */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center flex-1 max-h-[60vh]">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-full max-h-[40vh] md:max-h-[50vh]"
          >
            <div className="relative overflow-hidden rounded-xl h-full shadow-2xl">
              <img
                src={ABOUT_IMAGE}
                alt="Barista crafting coffee"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(21, 16, 16, 0.6), transparent 50%)' }} />
            </div>
          </motion.div>

          {/* Story Column */}
          <div className="flex flex-col justify-center h-full gap-6">
            <div className="space-y-4">
              {storyParagraphs.map((para, i) => (
                <motion.p
                  key={i}
                  className="text-sm md:text-base leading-[1.8] font-light"
                  style={{
                    color: 'rgba(245, 230, 211, 0.75)',
                    fontFamily: i === 0 ? "'Playfair Display', serif" : "'Inter', sans-serif",
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Meet the Founders */}
            <motion.div
              className="flex items-center gap-4 md:gap-5 mt-4 pt-6"
              style={{ borderTop: '1px solid rgba(201, 169, 110, 0.1)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
               <div className="flex -space-x-3">
                 <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80&auto=format&fit=crop" alt="Founder 1" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#151010] object-cover shadow-lg" loading="lazy" />
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80&auto=format&fit=crop" alt="Founder 2" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#151010] object-cover shadow-lg" loading="lazy" />
               </div>
               <div className="flex flex-col justify-center">
                 <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: '#C9A96E' }}>Meet the Founders</p>
                 <p className="text-[12px] md:text-sm font-light mt-0.5" style={{ color: 'rgba(245,230,211,0.6)' }}>Alex & Sam</p>
               </div>
               
               <div className="ml-auto hidden md:block">
                 <div className="w-10 h-10 rounded-full border border-[rgba(201,169,110,0.2)] flex items-center justify-center bg-[rgba(201,169,110,0.05)]">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(201,169,110,0.4)" stroke="none">
                     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                   </svg>
                 </div>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
