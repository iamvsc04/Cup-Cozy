import { motion } from 'framer-motion';

export default function AnimatedBackground({ variant = 'default' }) {
  if (variant === 'menu') {
    const icons = [
      // Coffee/Latte
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z" transform="rotate(-45 12 12)" /><path d="M8 12s2-2 4-2 4 2 4 2" transform="rotate(-45 12 12)" /></svg>,
      // Muffin/Cupcake
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8v3a6 6 0 0 0 12 0V8"/><path d="M8 11h8"/><path d="M4 8c0-2.2 2-4 4-4h8c2 0 4 1.8 4 4"/><path d="M12 4v-2"/></svg>,
      // Ice Cream
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-8"/><path d="M6 8a6 6 0 0 1 12 0c0 1.6-1.4 3-3 3H9c-1.6 0-3-1.4-3-3z"/><path d="M12 2v2"/></svg>,
      // Shake/Drink
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8l2 12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l2-12"/><path d="M4 8h16"/><path d="M10 2l-2 6"/><path d="M14 2l2 6"/></svg>,
    ];

    // Dynamically generate 10 concentric rings to ensure even 4K monitors are completely filled
    const orbits = [...Array(10)].map((_, i) => ({
      radius: 180 + (i * 140),
      count: 8 + (i * 4), // 8, 12, 16, 20...
      duration: 60 + (i * 10), // slightly normalized rotation speeds
      direction: i % 2 === 0 ? 1 : -1,
      rippleDelay: i * 0.4, // Traveling wave delay syncing the ripple sequentially outwards
    }));

    return (
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center opacity-80"
        style={{ filter: 'blur(2px)' }} // Explicit inline filter to ensure rendering across all browsers
      >
        {/* The visual rings holding the icons, rotating around center with a synced ripple */}
        {orbits.map((orbit, orbitIndex) => (
          <motion.div
            key={`orbit-ring-${orbitIndex}`}
            className="absolute rounded-full border border-[rgba(201,169,110,0.15)] flex items-center justify-center transform-gpu"
            style={{ width: `${orbit.radius * 2}px`, height: `${orbit.radius * 2}px` }}
            animate={{ 
              rotate: orbit.direction === 1 ? [0, 360] : [360, 0],
              scale: [1, 1.04, 1] 
            }}
            transition={{ 
              rotate: { duration: orbit.duration, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: orbit.rippleDelay }
            }}
          >
            {[...Array(orbit.count)].map((_, itemIndex) => {
              // Calculate stagger angle to position elements evenly along the circle
              const angle = (itemIndex / orbit.count) * 360;
              
              // We pick icons sequentially but shift the starting index per ring
              const iconIndex = (orbitIndex + itemIndex) % icons.length;

              return (
                <div
                  key={`item-${orbitIndex}-${itemIndex}`}
                  className="absolute flex items-center justify-center"
                  style={{
                    // Rotate the container to the correct angle, then translate it OUT by the radius
                    transform: `rotate(${angle}deg) translateY(-${orbit.radius}px)`,
                    width: '36px', height: '36px',
                  }}
                >
                  <motion.div
                    className="text-[rgba(201,169,110,0.35)] filter blur-[0.5px]"
                    // Counter-rotate the icon itself so it stays upright while orbiting
                    animate={{ rotate: orbit.direction === 1 ? [-angle, -angle - 360] : [-angle, -angle + 360] }}
                    transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear" }}
                    style={{ width: '100%', height: '100%' }}
                  >
                    {icons[iconIndex]}
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        ))}
        
      </div>
    );
  }

  if (variant === 'about') {
    const elements = [...Array(8)].map((_, i) => ({
      id: i, size: Math.random() * 100 + 100, x: Math.random() * 100, y: Math.random() * 100,
      duration: Math.random() * 15 + 20, delay: Math.random() * 10,
    }));
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
        {elements.map((el) => (
          <motion.div
            key={el.id} className="absolute rounded-full"
            style={{ left: `${el.x}%`, top: `${el.y}%`, width: el.size, height: el.size, background: 'radial-gradient(circle, rgba(201,169,110,0.15) 0%, rgba(201,169,110,0) 70%)', filter: 'blur(20px)' }}
            animate={{ y: [0, -150, 0], x: [0, (Math.random() - 0.5) * 100, 0], scale: [1, 1.5, 1], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: el.duration, repeat: Infinity, delay: el.delay, ease: "easeInOut" }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'gallery') {
    const elements = [...Array(15)].map((_, i) => ({
      id: i, size: Math.random() * 4 + 2, x: Math.random() * 100, y: Math.random() * 100,
      duration: Math.random() * 3 + 2, delay: Math.random() * 5,
    }));
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        {elements.map((el) => (
          <motion.div
            key={el.id} className="absolute rounded-full"
            style={{ left: `${el.x}%`, top: `${el.y}%`, width: el.size, height: el.size, background: '#C9A96E', filter: 'blur(1px)' }}
            animate={{ y: [0, -20, 0], opacity: [0, 0.8, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: el.duration, repeat: Infinity, delay: el.delay, ease: "easeInOut" }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'contact') {
    const elements = [...Array(5)].map((_, i) => ({
      id: i, size: Math.random() * 300 + 200, x: Math.random() * 100, y: Math.random() * 100,
      duration: Math.random() * 25 + 30, delay: Math.random() * 5,
    }));
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-10">
        {elements.map((el) => (
          <motion.div
            key={el.id} className="absolute rounded-full border border-[rgba(201,169,110,0.4)]"
            style={{ left: `${el.x}%`, top: `${el.y}%`, width: el.size, height: el.size, transform: 'translate(-50%, -50%)' }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: el.duration, repeat: Infinity, delay: el.delay, ease: "linear" }}
          />
        ))}
      </div>
    );
  }

  return null;
}
