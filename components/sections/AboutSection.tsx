'use client';

import { useEffect, useRef, useState } from 'react';
import { Target, Eye, Award, TrendingUp } from 'lucide-react';
import { STATS } from '@/lib/data';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const step = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <span>{display.toLocaleString()}{suffix}</span>;
}

export default function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-24 lg:py-32 bg-brand-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-lime/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-brand-lime/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section label */}
        <div className={`flex items-center gap-3 mb-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-8 h-0.5 bg-brand-lime" />
          <span className="text-brand-lime text-sm font-semibold uppercase tracking-widest">Our Story</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left – Text */}
          <div>
            <h2
              className={`font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-none mb-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.1s' }}
            >
              MORE THAN<br />
              <span className="text-brand-lime">A GYM.</span>
            </h2>

            <p
              className={`text-white/60 text-lg leading-relaxed mb-6 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '0.25s' }}
            >
              Founded in 2012, DragFit was born from a simple belief: every person deserves access to world-class fitness without compromise. We built the facility we always wished existed — one where elite equipment, expert coaches, and genuine community converge under one roof.
            </p>

            <p
              className={`text-white/60 text-lg leading-relaxed mb-10 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '0.35s' }}
            >
              Over 12 years, 5,200+ documented transformations, and a community of thousands, our mission has never changed: to help every member build the strongest version of themselves — physically, mentally, and permanently.
            </p>

            {/* Mission & Vision */}
            <div className={`space-y-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.45s' }}>
              {[
                { icon: Target, label: 'Mission', text: 'To deliver elite fitness experiences that create lasting, measurable transformation for every member.' },
                { icon: Eye, label: 'Vision', text: 'A world where premium coaching and world-class facilities are accessible to anyone committed to change.' },
              ].map(({ icon: Icon, label, text }) => (
                <div key={label} className="flex gap-4 p-5 rounded-xl glass border border-white/5 hover:border-brand-lime/20 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-brand-lime/10 flex items-center justify-center shrink-0 group-hover:bg-brand-lime/20 transition-colors">
                    <Icon size={20} className="text-brand-lime" />
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">{label}</div>
                    <div className="text-white/50 text-sm leading-relaxed">{text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Image + Stats */}
          <div>
            {/* Image Stack */}
            <div
              className={`relative mb-10 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
              style={{ transitionDelay: '0.2s' }}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80&fit=crop"
                  alt="DragFit premium gym facility"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 glass-lime rounded-xl px-5 py-4 border border-brand-lime/30">
                <div className="font-display text-3xl font-black text-white">12+</div>
                <div className="text-sm text-white/60 uppercase tracking-wider">Years of Excellence</div>
              </div>

              {/* Second floating element */}
              <div className="absolute -top-4 -right-4 glass rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-brand-lime" />
                  <span className="text-white text-sm font-semibold">#1 Rated Gym</span>
                </div>
                <div className="text-white/50 text-xs mt-1">3 years running</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div
              className={`grid grid-cols-2 gap-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.4s' }}
            >
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="p-5 rounded-xl bg-brand-charcoal border border-white/5 hover:border-brand-lime/20 transition-all group"
                  style={{ transitionDelay: `${0.4 + i * 0.1}s` }}
                >
                  <div className="font-display text-3xl font-black text-white group-hover:text-brand-lime transition-colors">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
                  </div>
                  <div className="text-white/50 text-sm mt-1 uppercase tracking-wider">{stat.label}</div>
                  <div className="w-8 h-0.5 bg-brand-lime mt-3 group-hover:w-full transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
