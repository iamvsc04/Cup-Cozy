import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Menu', href: '/menu' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 py-6`}
      style={{
        background: !isHome ? 'rgba(18, 13, 10, 0.4)' : (scrolled ? 'rgba(18, 13, 10, 0.9)' : 'transparent'),
        backdropFilter: !isHome || scrolled ? 'blur(10px)' : 'none',
        borderBottom: !isHome || scrolled ? '1px solid rgba(201, 169, 110, 0.06)' : 'none',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide flex items-center gap-4"
          style={{ fontFamily: "'Playfair Display', serif", color: '#C9A96E' }}
        >
          <motion.span whileHover={{ scale: 1.03 }} display="inline-block">
            Cup & Cozy
          </motion.span>
        </Link>

        {/* Desktop Content Array */}
        <div className="hidden md:flex items-center gap-10">
          {isHome ? (
            // standard navigation links on Home
            navLinks.map(({ label, href }) => {
              const isActive = location.pathname === href;
              return (
                <Link
                  key={href}
                  to={href}
                  className="relative text-[11px] font-medium tracking-[0.15em] uppercase transition-colors duration-300"
                  style={{
                    color: isActive ? 'rgba(201, 169, 110, 0.9)' : 'rgba(245, 230, 211, 0.4)',
                  }}
                  onMouseEnter={(e) => { e.target.style.color = 'rgba(201, 169, 110, 0.9)'; }}
                  onMouseLeave={(e) => {
                    e.target.style.color = isActive ? 'rgba(201, 169, 110, 0.9)' : 'rgba(245, 230, 211, 0.4)';
                  }}
                >
                  {label}
                </Link>
              );
            })
          ) : (
            // Inner pages top-right: Floating Breadcrumbs + Profiles
            <div className="flex items-center gap-6">
              {/* Floating Breadcrumbs Container */}
              <div 
                className="flex items-center gap-3 md:gap-4 py-2 px-6 rounded-full" 
                style={{ background: 'rgba(25, 18, 15, 0.4)', border: '1px solid rgba(201, 169, 110, 0.1)', backdropFilter: 'blur(8px)' }}
              >
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <div key={link.href} className="flex items-center gap-3 md:gap-4">
                      {index > 0 && <span className="text-[10px] text-[#8B5E3C] opacity-40">•</span>}
                      <Link 
                        to={link.href} 
                        className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase transition-all duration-300"
                        style={{
                          color: isActive ? '#C9A96E' : 'rgba(210, 180, 140, 0.5)',
                          fontWeight: isActive ? 500 : 400,
                        }}
                        onMouseEnter={(e) => { if(!isActive) e.target.style.color = '#C9A96E'; }}
                        onMouseLeave={(e) => { if(!isActive) e.target.style.color = 'rgba(210, 180, 140, 0.5)'; }}
                      >
                        {link.label}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            className="block w-5 h-px"
            style={{ background: 'rgba(201, 169, 110, 0.6)' }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="block w-5 h-px"
            style={{ background: 'rgba(201, 169, 110, 0.6)' }}
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            className="block w-5 h-px"
            style={{ background: 'rgba(201, 169, 110, 0.6)' }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: menuOpen ? 'auto' : 0,
          opacity: menuOpen ? 1 : 0,
        }}
        className="md:hidden overflow-hidden absolute top-full left-0 w-full"
        style={{ background: 'rgba(18, 13, 10, 0.98)', borderBottom: '1px solid rgba(201, 169, 110, 0.1)' }}
      >
        <div className="px-8 py-8 flex flex-col gap-6">
          {navLinks.map(({ label, href }) => {
            const isActive = location.pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className="text-lg font-light tracking-wide transition-colors"
                style={{
                  color: isActive ? '#C9A96E' : 'rgba(245, 230, 211, 0.5)',
                }}
              >
                {label}
              </Link>
            );
          })}
          
          {/* Socials on mobile menu */}
          <div className="flex gap-4 mt-4 pt-6" style={{ borderTop: '1px solid rgba(201, 169, 110, 0.1)' }}>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-[rgba(201,169,110,0.6)] hover:text-[#C9A96E] transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
