'use client';

import { useRef, useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';

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

export default function TestimonialsSection() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" className="py-16 sm:py-24 lg:py-32 bg-brand-charcoal relative overflow-hidden">
      <div className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(204,220,50,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-8 h-0.5 bg-brand-lime" />
            <span className="text-brand-lime text-xs sm:text-sm font-semibold uppercase tracking-widest">Reviews</span>
            <div className="w-8 h-0.5 bg-brand-lime" />
          </div>
          <h2 className={`font-display font-black text-4xl sm:text-6xl text-white leading-none mb-3 sm:mb-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.1s' }}>
            WHAT MEMBERS<br /><span className="text-brand-lime">SAY</span>
          </h2>

          {/* Rating summary */}
          <div className={`flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.2s' }}>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-white font-bold text-lg sm:text-xl">4.9</span>
            <span className="text-white/40 text-xs sm:text-sm">from 2,847 reviews</span>
          </div>
        </div>

        {/* Featured Quote */}
        <div className={`max-w-3xl mx-auto mb-8 sm:mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.3s' }}>
          <div className="relative glass rounded-2xl p-5 sm:p-8 border border-white/8 shadow-xl">
            <Quote size={40} className="text-brand-lime/15 absolute top-4 left-4 sm:top-6 sm:left-6" />
            <div className="relative z-10">
              <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed italic mb-5 sm:mb-6">
                &ldquo;{TESTIMONIALS[active].text}&rdquo;
              </p>
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <img
                    src={TESTIMONIALS[active].image}
                    alt={TESTIMONIALS[active].name}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-brand-lime shrink-0"
                  />
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">{TESTIMONIALS[active].name}</div>
                    <div className="text-white/40 text-xs sm:text-sm">{TESTIMONIALS[active].role}</div>
                  </div>
                </div>
                <div className="xs:text-right flex items-center justify-between xs:block pl-14 xs:pl-0">
                  <div className="text-brand-lime font-bold text-xs sm:text-sm">{TESTIMONIALS[active].transformation}</div>
                  <div className="text-white/40 text-[11px] sm:text-xs">{TESTIMONIALS[active].months} months</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Selector Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`text-left p-3 sm:p-4 rounded-xl border transition-all duration-300 active:scale-95 ${
                active === i
                  ? 'bg-brand-lime/10 border-brand-lime/40 shadow-lg shadow-brand-lime/10'
                  : 'bg-brand-black/50 border-white/5 hover:border-white/15'
              } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
                <img src={t.image} alt={t.name} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover shrink-0" />
                <div className="min-w-0">
                  <div className="text-white text-xs sm:text-sm font-semibold truncate leading-tight">{t.name}</div>
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={9} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/40 text-[11px] sm:text-xs line-clamp-2 leading-relaxed">{t.text}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
