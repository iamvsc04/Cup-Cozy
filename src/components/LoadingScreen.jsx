import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Keep loader for 2 seconds for effect, then fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onComplete(), 800);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#100b09]"
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Elegant rotating rings instead of the messy filling cup */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute w-24 h-24 rounded-full border-[1px]"
              style={{ borderColor: 'rgba(201, 169, 110, 0.1)', borderTopColor: 'rgba(201, 169, 110, 0.8)' }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute w-32 h-32 rounded-full border-[1px]"
              style={{ borderColor: 'rgba(201, 169, 110, 0.05)', borderBottomColor: 'rgba(201, 169, 110, 0.6)' }}
            />

            {/* Central glowing dot */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2 h-2 rounded-full mb-12"
              style={{ background: '#C9A96E', boxShadow: '0 0 20px #C9A96E' }}
            />

            {/* Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-2xl tracking-widest uppercase font-light"
              style={{ fontFamily: "'Playfair Display', serif", color: '#F5E6D3' }}
            >
              Cup & Cozy
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-[10px] tracking-[0.3em] uppercase mt-4"
              style={{ color: 'rgba(210, 180, 140, 0.4)' }}
            >
              Curating your experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
