'use client';

import { useRef, useEffect, useState } from 'react';
import { Clock, Flame, ChevronRight } from 'lucide-react';
import { GYM_CLASSES } from '@/lib/data';
import { cn } from '@/lib/utils';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const INTENSITY_COLORS: Record<string, string> = {
  Low: 'text-green-400 bg-green-400/10',
  Medium: 'text-yellow-400 bg-yellow-400/10',
  High: 'text-orange-400 bg-orange-400/10',
  Extreme: 'text-brand-lime bg-brand-lime/10',
};

const CATEGORIES = ['All', 'CrossFit', 'Strength', 'Cardio', 'Yoga', 'Personal'];

export default function ClassesSection() {
  const { ref, inView } = useInView();
  const [activeCategory, setActiveCategory] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = activeCategory === 'All'
    ? GYM_CLASSES
    : GYM_CLASSES.filter((c) => c.category === activeCategory);

  return (
    <section id="classes" className="py-24 lg:py-32 bg-brand-charcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className={`flex items-center gap-3 mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-8 h-0.5 bg-brand-lime" />
              <span className="text-brand-lime text-sm font-semibold uppercase tracking-widest">Classes</span>
            </div>
            <h2 className={`font-display font-black text-5xl sm:text-6xl text-white leading-none transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.1s' }}>
              FIND YOUR<br /><span className="text-brand-lime">DISCIPLINE</span>
            </h2>
          </div>

          {/* Category Filter */}
          <div className={`flex flex-wrap gap-2 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.2s' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-semibold transition-all',
                  activeCategory === cat
                    ? 'bg-brand-lime text-white shadow-lg shadow-brand-lime/25'
                    : 'glass border border-white/10 text-white/60 hover:text-white hover:border-white/20'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((cls, i) => (
            <div
              key={cls.id}
              className={cn(
                'group rounded-2xl bg-brand-black border border-white/5 overflow-hidden transition-all duration-500 card-hover cursor-pointer',
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${i * 0.08}s` }}
              onClick={() => setExpanded(expanded === cls.id ? null : cls.id)}
            >
              {/* Card Top – Color accent */}
              <div
                className="h-1.5"
                style={{ background: `linear-gradient(90deg, ${cls.color}, ${cls.color}88)` }}
              />

              <div className="p-6">
                {/* Icon + Title row */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-3xl mb-2">{cls.icon}</div>
                    <h3 className="font-display font-black text-xl text-white uppercase tracking-wide group-hover:text-brand-lime transition-colors">
                      {cls.name}
                    </h3>
                    <p className="text-white/40 text-sm">{cls.instructor}</p>
                  </div>
                  <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider', INTENSITY_COLORS[cls.intensity])}>
                    {cls.intensity}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 mb-4 text-sm text-white/40">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-brand-lime" />
                    {cls.duration} min
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Flame size={13} className="text-brand-lime" />
                    {cls.category}
                  </span>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{cls.description}</p>

                {/* Schedule – Expandable */}
                <div className={cn('overflow-hidden transition-all duration-300', expanded === cls.id ? 'max-h-40' : 'max-h-0')}>
                  <div className="border-t border-white/8 pt-4 mb-3">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-2 font-semibold">Schedule</p>
                    <div className="flex flex-wrap gap-2">
                      {cls.schedule.map((s, j) => (
                        <span key={j} className="text-xs glass px-2.5 py-1 rounded-full text-white/70 border border-white/8">
                          {s.day} · {s.time}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Toggle button */}
                <button className="flex items-center gap-1 text-brand-lime text-xs font-semibold hover:gap-2 transition-all">
                  {expanded === cls.id ? 'Less info' : 'View schedule'}
                  <ChevronRight size={12} className={cn('transition-transform', expanded === cls.id ? 'rotate-90' : '')} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-12 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.5s' }}>
          <button
            onClick={() => document.querySelector('#membership')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-brand-lime hover:bg-brand-lime-light text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-brand-lime/25"
          >
            Join to Access All Classes
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
