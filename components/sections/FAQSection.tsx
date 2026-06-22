'use client';

import { useRef, useEffect, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/data';
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

const FAQ_CATEGORIES = ['All', 'Membership', 'Facilities', 'Training', 'Nutrition', 'Getting Started'];

export default function FAQSection() {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState<string | null>('f1');
  const [category, setCategory] = useState('All');

  const filtered = category === 'All' ? FAQ_ITEMS : FAQ_ITEMS.filter((f) => f.category === category);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-brand-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-8 h-0.5 bg-brand-lime" />
            <span className="text-brand-lime text-sm font-semibold uppercase tracking-widest">FAQ</span>
            <div className="w-8 h-0.5 bg-brand-lime" />
          </div>
          <h2 className={`font-display font-black text-5xl sm:text-6xl text-white leading-none mb-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.1s' }}>
            GOT<br /><span className="text-brand-lime">QUESTIONS?</span>
          </h2>
          <p className={`text-white/50 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.2s' }}>
            Everything you need to know before joining.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.25s' }}>
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
                category === cat ? 'bg-brand-lime text-white' : 'glass border border-white/10 text-white/50 hover:text-white'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filtered.map((faq, i) => (
            <div
              key={faq.id}
              className={cn(
                'rounded-xl border overflow-hidden transition-all duration-700',
                open === faq.id ? 'border-brand-lime/30 bg-brand-lime/5' : 'border-white/8 bg-brand-charcoal',
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: `${i * 0.06}s` }}
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between px-6 py-4 text-left group"
                aria-expanded={open === faq.id}
              >
                <span
                  className="text-white font-medium group-hover:text-brand-lime transition-colors pr-4 leading-snug"
                  itemProp="name"
                >
                  {faq.question}
                </span>
                <div className={cn('w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all', open === faq.id ? 'bg-brand-lime' : 'bg-white/8 group-hover:bg-brand-lime/20')}>
                  {open === faq.id ? <Minus size={14} className="text-white" /> : <Plus size={14} className="text-white/60 group-hover:text-brand-lime" />}
                </div>
              </button>

              <div
                className={cn('overflow-hidden transition-all duration-300', open === faq.id ? 'max-h-96' : 'max-h-0')}
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div className="px-6 pb-5" itemProp="text">
                  <div className="w-full h-px bg-white/8 mb-4" />
                  <p className="text-white/60 leading-relaxed text-sm">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className={`mt-12 text-center glass rounded-2xl p-8 border border-white/8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.5s' }}>
          <p className="text-white font-semibold text-lg mb-2">Still have questions?</p>
          <p className="text-white/50 mb-5 text-sm">Our team typically responds within 2 hours</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-brand-lime hover:bg-brand-lime-light text-white font-semibold px-6 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-lime/25"
            >
              Contact Us
            </button>
            <a
              href="https://wa.me/18005724348"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 glass border border-white/10 hover:border-green-500/40 text-white font-medium px-6 py-2.5 rounded-xl transition-all"
            >
              <span className="text-lg">💬</span>
              WhatsApp Chat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
