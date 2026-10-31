'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const TRANSFORMATIONS = [
  {
    id: 1,
    name: 'Chris M.',
    duration: '6 months',
    result: '-38 lbs / +20 lbs muscle',
    category: 'Weight Loss',
    before: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=500&fit=crop&q=80',
    after: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=500&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Sarah K.',
    duration: '8 months',
    result: 'Full body recomposition',
    category: 'Recomposition',
    before: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop&q=80',
    after: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Derek R.',
    duration: '12 months',
    result: '+42 lbs lean mass',
    category: 'Muscle Gain',
    before: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop&q=80',
    after: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Amara T.',
    duration: '5 months',
    result: 'Post-partum comeback',
    category: 'Weight Loss',
    before: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&q=80',
    after: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop&q=80',
  },
  {
    id: 5,
    name: 'Marcus J.',
    duration: '9 months',
    result: '-50 lbs / Athletic build',
    category: 'Muscle Gain',
    before: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80',
    after: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&q=80',
  },
  {
    id: 6,
    name: 'Elena V.',
    duration: '4 months',
    result: 'Toned & competition ready',
    category: 'Recomposition',
    before: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&q=80',
    after: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop&q=80',
  },
];

const CATEGORIES = ['All', 'Weight Loss', 'Muscle Gain', 'Recomposition'];

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

function TransformCard({ item, visible, delay }: { item: typeof TRANSFORMATIONS[0]; visible: boolean; delay: number }) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div
      className={cn(
        'group relative rounded-2xl overflow-hidden bg-brand-charcoal border border-white/5 hover:border-brand-lime/30 transition-all duration-700 card-hover',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
      style={{ transitionDelay: `${delay}s` }}
    >
      {/* Image toggle */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={showAfter ? item.after : item.before}
          alt={`${item.name} transformation`}
          className="w-full h-full object-cover transition-all duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />

        {/* Before/After Toggle */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex gap-1">
          <button
            onClick={() => setShowAfter(false)}
            className={cn('px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-full transition-all active:scale-95', !showAfter ? 'bg-white text-black shadow-md' : 'glass text-white/60 border border-white/20')}
          >
            Before
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={cn('px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-full transition-all active:scale-95', showAfter ? 'bg-brand-lime text-white shadow-md' : 'glass text-white/60 border border-white/20')}
          >
            After
          </button>
        </div>

        {/* Category badge */}
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 badge-lime text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
          {item.category}
        </div>
      </div>

      <div className="p-3.5 sm:p-4">
        <div className="font-display font-black text-base sm:text-lg text-white uppercase tracking-wide">{item.name}</div>
        <div className="text-brand-lime text-xs sm:text-sm font-semibold">{item.result}</div>
        <div className="text-white/40 text-[11px] sm:text-xs mt-0.5 sm:mt-1">{item.duration} journey</div>
      </div>
    </div>
  );
}

export default function TransformationSection() {
  const { ref, inView } = useInView();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? TRANSFORMATIONS
    : TRANSFORMATIONS.filter((t) => t.category === activeCategory);

  return (
    <section id="transformations" className="py-16 sm:py-24 lg:py-32 bg-brand-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className={`flex items-center gap-3 mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-8 h-0.5 bg-brand-lime" />
              <span className="text-brand-lime text-xs sm:text-sm font-semibold uppercase tracking-widest">Results</span>
            </div>
            <h2 className={`font-display font-black text-4xl sm:text-6xl text-white leading-none transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.1s' }}>
              REAL PEOPLE<br /><span className="text-brand-lime">REAL RESULTS</span>
            </h2>
          </div>

          {/* Filter - Swipeable on mobile */}
          <div className={`flex items-center overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap gap-2 pb-2 sm:pb-0 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.2s' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 active:scale-95',
                  activeCategory === cat
                    ? 'bg-brand-lime text-white'
                    : 'glass border border-white/10 text-white/60 hover:text-white'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((item, i) => (
            <TransformCard key={item.id} item={item} visible={inView} delay={i * 0.08} />
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-white/20 text-xs text-center mt-6 sm:mt-8 px-2">
          Results may vary. All transformations achieved through dedicated training and proper nutrition guidance.
        </p>
      </div>
    </section>
  );
}
