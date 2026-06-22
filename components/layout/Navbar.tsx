'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Sun, Moon, Dumbbell } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Classes', href: '#classes' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Membership', href: '#membership' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('');

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollTo('#hero')}
              className="flex items-center gap-2 group"
              aria-label="DragFit Home"
            >
              <img src="/logo.svg" alt="DragFit Logo" className="h-10 w-auto group-hover:scale-105 transition-transform" />
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium tracking-wide uppercase transition-all duration-200 rounded-md animated-underline',
                    activeSection === link.href
                      ? 'text-brand-lime'
                      : 'text-brand-gray-light hover:text-white'
                  )}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Dark/Light Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-brand-gray-light hover:text-white transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <Moon size={16} /> : <Sun size={16} />}
              </button>

              {/* CTA */}
              <button
                onClick={() => scrollTo('#membership')}
                className="hidden sm:flex items-center gap-2 bg-brand-lime hover:bg-brand-lime-light text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-brand-lime/25 animate-pulse-lime"
              >
                Join Now
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
                aria-label="Toggle mobile menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-300',
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity',
            menuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMenuOpen(false)}
        />
        {/* Panel */}
        <div
          className={cn(
            'absolute right-0 top-0 h-full w-72 bg-brand-charcoal border-l border-white/10 transform transition-transform duration-300',
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex flex-col h-full pt-20 pb-8 px-6">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left py-3 px-4 text-white font-medium rounded-lg hover:bg-white/5 hover:text-brand-lime transition-all uppercase tracking-wider text-sm"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="mt-auto space-y-3">
              <button
                onClick={() => scrollTo('#membership')}
                className="w-full bg-brand-lime hover:bg-brand-lime-light text-white font-semibold py-3 rounded-lg transition-all"
              >
                Join Now
              </button>
              <button
                onClick={() => scrollTo('#membership')}
                className="w-full glass border border-white/10 text-white font-medium py-3 rounded-lg hover:border-brand-lime/40 transition-all"
              >
                Free 7-Day Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
