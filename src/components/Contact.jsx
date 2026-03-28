import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CAFE_LOCATION } from '../config/mapConfig';
import AnimatedBackground from './AnimatedBackground';

function LeafletMap() {
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    let mapInstance = null;

    const initMap = async () => {
      // Synchronous check to see if Leaflet already initialized this container
      if (!mapRef.current || mapRef.current._leaflet_id) return;

      const L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');

      // Double check after async imports
      if (!mapRef.current || mapRef.current._leaflet_id) return;

      mapInstance = L.map(mapRef.current, {
        scrollWheelZoom: false,
        zoomControl: false,
      }).setView([CAFE_LOCATION.lat, CAFE_LOCATION.lng], CAFE_LOCATION.zoom);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        maxZoom: 19,
      }).addTo(mapInstance);

      const goldIcon = L.divIcon({
        className: '',
        html: `<div style="
          width: 16px; height: 16px;
          background: #C9A96E;
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(201,169,110,0.4);
          border: 2px solid rgba(245,230,211,0.6);
        "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      L.marker([CAFE_LOCATION.lat, CAFE_LOCATION.lng], { icon: goldIcon })
        .addTo(mapInstance)
        .bindPopup(`<b>${CAFE_LOCATION.name}</b><br>${CAFE_LOCATION.address}`);

      L.control.zoom({ position: 'bottomright' }).addTo(mapInstance);
      setMapReady(true);
    };

    initMap();

    return () => {
      if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[250px] md:min-h-0 rounded-xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(201, 169, 110, 0.1)' }}>
      <div ref={mapRef} className="w-full h-full relative" />
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#151010' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-6 h-6 border rounded-full"
            style={{ borderColor: 'rgba(201, 169, 110, 0.3)', borderTopColor: 'transparent' }}
          />
        </div>
      )}
    </div>
  );
}

const contactInfo = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Address',
    value: CAFE_LOCATION.address,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: CAFE_LOCATION.phone,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
      </svg>
    ),
    label: 'Hours',
    value: `Mon–Fri: ${CAFE_LOCATION.hours.weekdays}`,
    subValue: `Sat–Sun: ${CAFE_LOCATION.hours.weekends}`,
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section 
      id="contact" 
      ref={ref} 
      className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden" 
      style={{ background: '#120D0A' }}
    >
      <AnimatedBackground variant="contact" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-12 flex flex-col h-full justify-center">
        {/* Section Header (Compact) */}
        <motion.div
          className="text-center mb-10 shrink-0"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] tracking-[0.35em] uppercase block mb-3" style={{ color: 'rgba(139, 94, 60, 0.7)' }}>
            Find Us
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: '#F5E6D3' }}
          >
            Visit Us
          </h2>
          <motion.div
            className="mx-auto mt-4 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.4), transparent)' }}
            initial={{ width: 0 }}
            animate={isInView ? { width: 60 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center flex-1 lg:max-h-[60vh] h-auto lg:overflow-hidden no-scrollbar">
          {/* Contact Info — narrower column */}
          <div className="lg:col-span-2 space-y-3 h-full flex flex-col justify-center">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 py-4"
                style={{
                  borderBottom: i < contactInfo.length - 1 ? '1px solid rgba(201, 169, 110, 0.06)' : 'none',
                  color: 'rgba(201, 169, 110, 0.6)',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                <div className="mt-0.5 flex-shrink-0">{info.icon}</div>
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase mb-1.5" style={{ color: 'rgba(139, 94, 60, 0.6)' }}>
                    {info.label}
                  </p>
                  <p className="text-[13px] md:text-sm font-light" style={{ color: 'rgba(245, 230, 211, 0.75)' }}>
                    {info.value}
                  </p>
                  {info.subValue && (
                    <p className="text-xs font-light mt-1" style={{ color: 'rgba(210, 180, 140, 0.4)' }}>
                      {info.subValue}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map — wider column */}
          <motion.div
            className="lg:col-span-3 h-full min-h-[300px] lg:max-h-full w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <LeafletMap />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
