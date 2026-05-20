import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data/staticConstants';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sectionIds = ['hero', 'pipeline', 'engagement', 'products', 'rsi', 'modules', 'geography', 'about'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-brand" style={{ textDecoration: 'none' }}>BANK RETENTION ANALYTICS</a>
      <ul className="nav-links">
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.href.substring(1);
          return (
            <li key={link.href}>
              <a href={link.href} className={`nav-link ${isActive ? 'active' : ''}`}>
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
