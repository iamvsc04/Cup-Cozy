import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    href: 'https://instagram.com/cupandcozy',
  },
  {
    name: 'YouTube',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
      </svg>
    ),
    href: 'https://youtube.com/@cupandcozy',
  }
];

export default function SocialSidebar() {
  return (
    <motion.div 
      className="fixed left-4 md:left-8 bottom-0 z-[9990] hidden md:flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {socialLinks.map((social) => (
        <motion.a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md"
          style={{
            background: 'rgba(201, 169, 110, 0.05)',
            border: '1px solid rgba(201, 169, 110, 0.1)',
            color: 'rgba(210, 180, 140, 0.6)',
          }}
          whileHover={{
            y: -5,
            background: 'rgba(201, 169, 110, 0.15)',
            borderColor: 'rgba(201, 169, 110, 0.4)',
            color: '#C9A96E',
          }}
          whileTap={{ scale: 0.95 }}
          aria-label={social.name}
          title={social.name}
        >
          {social.icon}
        </motion.a>
      ))}
      
      {/* Decorative vertical line connecting to bottom */}
      <div className="w-[1px] h-20 bg-gradient-to-t from-transparent via-[rgba(201,169,110,0.3)] to-transparent mt-2 opacity-50" />
    </motion.div>
  );
}
