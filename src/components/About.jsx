import { useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80&auto=format';

const storyParagraphs = [
  "It started with a simple dream — a quiet corner where the world slows down, where the aroma of freshly ground beans wraps around you like a warm blanket.",
  "Cup & Cozy was born from late-night conversations, dog-eared books, and the belief that the best moments happen over good coffee.",
];



const FounderCard = ({ founder }) => {
  return (
    <motion.div
      className="group relative w-full aspect-square rounded-3xl overflow-hidden"
      style={{ background: 'rgba(210, 180, 140, 0.03)', border: '1px solid rgba(201, 169, 110, 0.1)' }}
      whileHover="hover"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#151010] via-transparent to-transparent opacity-60 z-10" />
      
      {/* Profile Image (Placeholder until user adds to public folder) */}
      <img
        src={founder.image}
        alt={founder.name}
        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${founder.name}&background=8B5E3C&color=F5E6D3&size=200`;
        }}
      />

      {/* Info Overlay (Sliding up from bottom) */}
      <motion.div 
        className="absolute inset-x-0 bottom-0 p-4 z-20 flex flex-col justify-end"
        variants={{
          initial: { y: 20, opacity: 0 },
          hover: { y: 0, opacity: 1 }
        }}
        initial="initial"
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Name & Role */}
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-[#F5E6D3] tracking-tight">{founder.name}</h4>
          <p className="text-[10px] text-[#C9A96E] uppercase tracking-widest mt-0.5">{founder.role}</p>
        </div>

        {/* Social Bar (Horizontal reveal) */}
        <div className="flex items-center justify-between bg-[rgba(245,230,211,0.05)] backdrop-blur-md rounded-2xl p-2 border border-[rgba(201,169,110,0.2)]">
          <a 
            href={founder.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-xl bg-[#C9A96E] flex items-center justify-center text-[#151010] hover:scale-110 transition-transform shadow-[0_0_15px_rgba(201,169,110,0.3)] cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <span className="text-[10px] text-[rgba(245,230,211,0.6)] font-medium pr-2">Visit Instagram</span>
        </div>
      </motion.div>

      {/* Top Right "Action" Icon (Uiverse style) */}
      <a 
        href={founder.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[rgba(21,16,16,0.4)] backdrop-blur-md flex items-center justify-center border border-[rgba(245,230,211,0.1)] z-20 group-hover:bg-[#C9A96E] group-hover:text-[#151010] transition-colors duration-300 cursor-pointer"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      </a>
    </motion.div>
  );
};

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
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center flex-1 lg:max-h-[60vh] h-auto lg:overflow-hidden no-scrollbar">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-full max-h-[35vh] md:max-h-[50vh] lg:max-h-full"
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
          <div className="flex flex-col justify-center h-full gap-2">
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

            {/* Meet the Founders Section */}
            <div className="mt-4 pt-2" style={{ borderTop: '1px solid rgba(201, 169, 110, 0.1)' }}>
               <div className="mb-6">
                 <span>
                  <p className="text-[10px] md:text-[14px] uppercase tracking-[0.2em] font-medium" style={{ color: '#C9A96E' }}>Meet the Founders <span className="text-[12px] md:text-[10px] font-light mt-1" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>The heart's behind the coffee</span></p>
                 </span>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 lg:overflow-y-auto lg:max-h-36vh] h-auto pr-2 no-scrollbar">
                 {[
                   { name: 'Akshay Paul', role: 'Visionary', image: '/akshay paul.jpg', link: 'https://www.instagram.com/akshaypaulasap/' },
                   { name: 'Heaven Hananiah', role: 'Creator', image: '/heaven.png', link: 'https://www.instagram.com/heaven_hananiah/' },
                   { name: 'Akhil Reddy', role: 'Architect', image: '/akhil.jpg', link: 'https://www.instagram.com/akhilreddy.in/' }
                 ].map((founder, i) => (
                   <FounderCard key={i} founder={founder} />
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
