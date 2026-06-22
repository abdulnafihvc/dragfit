'use client';

import { useRef, useEffect, useState } from 'react';
import { FACILITIES } from '@/lib/data';

const FACILITY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80&fit=crop', label: 'Main Gym Floor' },
  { src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80&fit=crop', label: 'Olympic Lifting Area' },
  { src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80&fit=crop', label: 'Cardio Theatre' },
  { src: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=600&q=80&fit=crop', label: 'CrossFit Box' },
  { src: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&q=80&fit=crop', label: 'Free Weights Zone' },
  { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80&fit=crop', label: 'Yoga Studio' },
];

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

export default function FacilitiesSection() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState(0);

  return (
    <section id="facilities" className="py-24 lg:py-32 bg-brand-charcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-8 h-0.5 bg-brand-lime" />
            <span className="text-brand-lime text-sm font-semibold uppercase tracking-widest">World-Class Facilities</span>
            <div className="w-8 h-0.5 bg-brand-lime" />
          </div>
          <h2 className={`font-display font-black text-5xl sm:text-6xl text-white leading-none transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.1s' }}>
            BUILT FOR<br /><span className="text-brand-lime">CHAMPIONS</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image Gallery */}
          <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '0.2s' }}>
            <div className="relative rounded-2xl overflow-hidden aspect-video mb-3">
              <img
                src={FACILITY_IMAGES[active].src}
                alt={FACILITY_IMAGES[active].label}
                className="w-full h-full object-cover transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 glass px-3 py-1.5 rounded-full text-white text-sm font-medium border border-white/10">
                {FACILITY_IMAGES[active].label}
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {FACILITY_IMAGES.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-lg overflow-hidden aspect-square border-2 transition-all ${active === i ? 'border-brand-lime scale-105' : 'border-transparent opacity-50 hover:opacity-80'}`}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Equipment List */}
          <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '0.3s' }}>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Our 25,000 sq ft facility is stocked with the finest commercial-grade equipment, maintained to the highest standards daily. Every zone is designed to maximize your training potential.
            </p>

            <div className="space-y-3">
              {FACILITIES.map((facility, i) => (
                <div
                  key={facility.name}
                  className="flex items-center gap-4 p-4 rounded-xl bg-brand-black/50 border border-white/5 hover:border-brand-lime/25 transition-all group"
                  style={{ transitionDelay: `${0.3 + i * 0.04}s` }}
                >
                  <span className="text-2xl">{facility.icon}</span>
                  <div className="flex-1">
                    <div className="text-white font-medium group-hover:text-brand-lime transition-colors">{facility.name}</div>
                  </div>
                  {facility.count > 1 && (
                    <div className="glass-lime rounded-full w-8 h-8 flex items-center justify-center text-brand-lime text-xs font-bold border border-brand-lime/20">
                      {facility.count}
                    </div>
                  )}
                  <div className="w-0 group-hover:w-8 h-0.5 bg-brand-lime transition-all duration-300" />
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 glass-lime rounded-xl border border-brand-lime/20">
              <div className="text-brand-lime font-bold text-sm uppercase tracking-wider mb-1">25,000 sq ft</div>
              <div className="text-white/60 text-sm">of world-class training space · 200+ equipment pieces · Daily professional maintenance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
