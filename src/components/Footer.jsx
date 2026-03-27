import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'Instagram',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    href: '#',
  },
  {
    name: 'Facebook',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
    href: '#',
  },
  {
    name: 'Twitter',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
    href: '#',
  },
];

export default function Footer() {
  return (
    <footer className="relative py-12 overflow-hidden" style={{ background: '#0d0806' }}>
      {/* Top border gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.3), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif", color: '#C9A96E' }}
            >
              Cup & Cozy
            </h3>
            <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(210, 180, 140, 0.5)' }}>
              Where every sip tells a story
            </p>
          </motion.div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.href}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'rgba(62, 39, 35, 0.4)',
                  border: '1px solid rgba(201, 169, 110, 0.15)',
                  color: '#C9A96E',
                }}
                whileHover={{
                  scale: 1.15,
                  background: 'rgba(201, 169, 110, 0.2)',
                  borderColor: 'rgba(201, 169, 110, 0.4)',
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.p
            className="text-xs"
            style={{ color: 'rgba(210, 180, 140, 0.4)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            © 2025 Cup & Cozy. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
