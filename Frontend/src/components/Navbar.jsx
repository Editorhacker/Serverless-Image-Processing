import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: scrolled ? 'rgba(13,13,13,0.92)' : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    borderBottom: scrolled ? '1px solid #2a2725' : '1px solid transparent',
    transition: 'all 0.4s ease',
  };

  const linkBase = {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: 14,
    fontWeight: 500,
    textDecoration: 'none',
    padding: '6px 14px',
    borderRadius: 8,
    transition: 'color 0.2s ease, background 0.2s ease',
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
      style={navStyle}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, #d4a053, #b8873a)',
              borderRadius: 9,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 17, color: '#f0ece4', letterSpacing: '-0.02em' }}>
              Image<span style={{ color: '#d4a053' }}>Pro</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {[
              { to: '/', label: 'Home' },
              { to: '/dashboard', label: 'Dashboard' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  ...linkBase,
                  color: isActive(link.to) ? '#d4a053' : '#9a9590',
                  background: isActive(link.to) ? 'rgba(212,160,83,0.08)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
            <a href="#features" style={{ ...linkBase, color: '#9a9590' }}>Features</a>
          </div>

          {/* CTA */}
          <Link to="/dashboard" className="btn-amber" style={{ padding: '9px 20px', fontSize: 13 }}>
            Upload Now
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
