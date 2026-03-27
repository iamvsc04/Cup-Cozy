import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMenuData } from '../hooks/useMenuData';
import AnimatedBackground from './AnimatedBackground';
function MenuCard({ item, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      className="menu-card rounded-xl p-5 md:p-6 relative z-10 backdrop-blur-sm"
      style={{
        background: 'rgba(25, 18, 15, 0.65)',
        border: '1px solid rgba(201, 169, 110, 0.08)',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -2, background: 'rgba(35, 23, 19, 0.85)', borderColor: 'rgba(201, 169, 110, 0.2)' }}
      layout
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-base">{item.emoji}</span>
            <h3
              className="text-sm font-semibold"
              style={{ fontFamily: "'Playfair Display', serif", color: '#F5E6D3' }}
            >
              {item.name}
            </h3>
          </div>
          <p className="text-xs leading-relaxed font-light line-clamp-2" style={{ color: 'rgba(210, 180, 140, 0.5)' }}>
            {item.description}
          </p>
        </div>
        <span
          className="text-base font-semibold whitespace-nowrap mt-0.5"
          style={{ fontFamily: "'Playfair Display', serif", color: 'rgba(201, 169, 110, 0.8)' }}
        >
          {item.price}
        </span>
      </div>
    </motion.div>
  );
}

export default function Menu() {
  const { menuData, categories, loading } = useMenuData();
  const [activeCategory, setActiveCategory] = useState(null);

  if (!activeCategory && categories.length > 0 && activeCategory !== categories[0]) {
    setActiveCategory(categories[0]);
  }

  const currentItems = menuData[activeCategory] || [];

  return (
    <section id="menu" className="relative w-full h-full flex flex-col pt-24 pb-8" style={{ background: '#120D0A' }}>
      
      {/* Animated Background */}
      <AnimatedBackground variant="menu" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col h-full">
        
        {/* Fixed Header Section */}
        <div className="flex-shrink-0">
          
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-[10px] tracking-[0.35em] uppercase block mb-3" style={{ color: 'rgba(139, 94, 60, 0.7)' }}>
              Crafted With Love
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: '#F5E6D3' }}
            >
              Our Menu
            </h2>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            className="flex justify-center gap-2 md:gap-3 mb-8 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-6 py-2 rounded-full text-[10px] md:text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300"
                style={{
                  background: activeCategory === cat ? 'rgba(201, 169, 110, 0.15)' : 'rgba(25, 18, 15, 0.5)',
                  color: activeCategory === cat ? '#C9A96E' : 'rgba(210, 180, 140, 0.6)',
                  border: `1px solid ${activeCategory === cat ? 'rgba(201, 169, 110, 0.3)' : 'rgba(201, 169, 110, 0.08)'}`,
                  cursor: 'pointer',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Scrollable Menu Grid Area */}
        <div className="flex-1 overflow-y-auto pr-2 pb-12 w-full custom-scrollbar relative z-10">
          {loading ? (
            <div className="h-full w-full flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 rounded-full border border-t-transparent"
                style={{ borderColor: 'rgba(201, 169, 110, 0.3)' }}
              />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="grid gap-3 md:gap-4 lg:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {currentItems.map((item, i) => (
                  <MenuCard key={`${activeCategory}-${item.name}`} item={item} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

      </div>
    </section>
  );
}
