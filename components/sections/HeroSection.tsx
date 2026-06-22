'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Play, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMembership = () => {
    document.querySelector('#membership')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=85&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Layered Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/30" />
        {/* Red tint accent on right */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-brand-lime/10 to-transparent" />
      </div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(204,220,50,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(204,220,50,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 badge-lime rounded-full px-4 py-1.5 mb-6 text-sm font-semibold uppercase tracking-widest transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
            Elite Fitness Experience
          </div>

          {/* Main Headline */}
          <h1
            className={`font-display font-black text-white leading-none mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <span className="block text-6xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight">
              FORGE YOUR
            </span>
            <span className="block text-6xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-brand-lime lime-text-glow">
              LEGACY.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed mb-10 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '0.35s' }}
          >
            Where champions are built. World-class equipment, elite trainers, and a community that refuses to quit. Your transformation starts here.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 mb-16 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '0.5s' }}
          >
            <button
              onClick={scrollToMembership}
              className="group flex items-center gap-3 bg-brand-lime hover:bg-brand-lime-light text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-brand-lime/30 hover:scale-105 animate-pulse-lime"
            >
              Start Your Journey
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToMembership}
              className="group flex items-center gap-3 glass border border-white/20 hover:border-brand-lime/50 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white/5"
            >
              <Play size={18} className="text-brand-lime" />
              Free 7-Day Trial
            </button>
          </div>

          {/* Stats Row */}
          <div
            className={`flex flex-wrap gap-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '0.65s' }}
          >
            {[
              { num: '3,800+', label: 'Members' },
              { num: '24', label: 'Elite Trainers' },
              { num: '5,200+', label: 'Transformations' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display text-3xl sm:text-4xl font-black text-white">{stat.num}</span>
                <span className="text-sm text-white/50 uppercase tracking-wider font-medium mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors group"
        aria-label="Scroll to about section"
      >
        <span className="text-xs uppercase tracking-widest font-medium">Discover</span>
        <ChevronDown size={20} className="animate-bounce" />
      </button>

      {/* Diagonal bottom cut */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-brand-black"
        style={{ clipPath: 'polygon(0 100%, 100% 0%, 100% 100%)' }}
      />

      {/* Red accent line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-brand-lime to-transparent opacity-60" />
    </section>
  );
}
