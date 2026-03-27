import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80&auto=format', caption: 'Warm Evenings', span: 'col-span-1 md:row-span-2' },
  { src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80&auto=format', caption: 'Latte Art', span: 'col-span-1' },
  { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80&auto=format', caption: 'Morning Brew', span: 'col-span-1' },
  { src: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&q=80&auto=format', caption: 'Cozy Corner', span: 'col-span-1 md:row-span-2' },
  { src: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&q=80&auto=format', caption: 'Sweet Delights', span: 'col-span-1 md:col-span-2' },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section 
      id="gallery" 
      ref={ref} 
      className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden" 
      style={{ background: '#151010' }}
    >
      <AnimatedBackground variant="gallery" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-8 flex flex-col items-center justify-center h-full">
        {/* Section Header (Compact) */}
        <motion.div
          className="text-center mb-6 md:mb-10 shrink-0"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] tracking-[0.35em] uppercase block mb-3" style={{ color: 'rgba(139, 94, 60, 0.7)' }}>
            Captured Moments
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: '#F5E6D3' }}
          >
            Our Gallery
          </h2>
          <motion.div
            className="mx-auto mt-4 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.4), transparent)' }}
            initial={{ width: 0 }}
            animate={isInView ? { width: 60 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </motion.div>

        {/* Masonry Grid (Scaled to fit 100vh) */}
        <div className="w-full flex-1 max-h-[65vh] grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className={`gallery-item ${img.span} min-h-[120px] md:min-h-0`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="gallery-overlay">
                <p
                  className="text-[11px] md:text-sm font-medium tracking-wide"
                  style={{ fontFamily: "'Playfair Display', serif", color: 'rgba(245, 230, 211, 0.9)' }}
                >
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
