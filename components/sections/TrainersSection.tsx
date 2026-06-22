'use client';

import { useRef, useEffect, useState } from 'react';
import { Instagram, Users, Clock, Award } from 'lucide-react';
import { TRAINERS } from '@/lib/data';

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

export default function TrainersSection() {
  const { ref, inView } = useInView();

  return (
    <section id="trainers" className="py-24 lg:py-32 bg-brand-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-lime/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-8 h-0.5 bg-brand-lime" />
            <span className="text-brand-lime text-sm font-semibold uppercase tracking-widest">Our Coaches</span>
            <div className="w-8 h-0.5 bg-brand-lime" />
          </div>
          <h2 className={`font-display font-black text-5xl sm:text-6xl text-white leading-none transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.1s' }}>
            TRAINED BY THE<br /><span className="text-brand-lime">BEST</span>
          </h2>
        </div>

        {/* Trainers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAINERS.map((trainer, i) => (
            <div
              key={trainer.id}
              className={`group relative rounded-2xl overflow-hidden bg-brand-charcoal border border-white/5 hover:border-brand-lime/30 card-hover transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent" />
                {/* Instagram overlay */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={`https://instagram.com/${trainer.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 glass rounded-full flex items-center justify-center hover:bg-brand-lime/20 transition-colors"
                    aria-label={`${trainer.name} Instagram`}
                  >
                    <Instagram size={16} className="text-white" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display font-black text-xl text-white uppercase tracking-wide">{trainer.name}</h3>
                <p className="text-brand-lime text-sm font-semibold mb-3">{trainer.role}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <Clock size={11} className="text-brand-lime" />
                    {trainer.experience}yr exp
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <Users size={11} className="text-brand-lime" />
                    {trainer.clients}+ clients
                  </div>
                </div>

                {/* Bio */}
                <p className="text-white/50 text-xs leading-relaxed line-clamp-2 mb-4">{trainer.bio}</p>

                {/* Certs */}
                <div className="flex flex-wrap gap-1.5">
                  {trainer.certifications.slice(0, 2).map((cert) => (
                    <span key={cert} className="flex items-center gap-1 badge-lime text-xs px-2 py-0.5 rounded-full">
                      <Award size={9} />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Specializations Ticker */}
        <div className="mt-16 overflow-hidden">
          <div className="ticker-animate flex gap-8 whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-8 shrink-0">
                {['Powerlifting', 'CrossFit', 'Yoga', 'HIIT', 'Body Recomposition', 'Athletic Performance', 'Nutrition Coaching', 'Mobility', 'Contest Prep', 'Injury Recovery'].map((s) => (
                  <span key={s} className="text-white/20 text-sm font-semibold uppercase tracking-widest flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
                    {s}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
