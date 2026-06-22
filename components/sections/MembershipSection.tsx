'use client';

import { useState, useRef, useEffect } from 'react';
import { Check, Star, Zap } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '@/lib/data';
import { cn } from '@/lib/utils';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function MembershipSection() {
  const [yearly, setYearly] = useState(false);
  const { ref, inView } = useInView();

  return (
    <section id="membership" className="py-24 lg:py-32 bg-brand-charcoal relative overflow-hidden">
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(204,220,50,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(204,220,50,0.08) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-8 h-0.5 bg-brand-lime" />
            <span className="text-brand-lime text-sm font-semibold uppercase tracking-widest">Membership</span>
            <div className="w-8 h-0.5 bg-brand-lime" />
          </div>
          <h2 className={`font-display font-black text-5xl sm:text-6xl text-white leading-none mb-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.1s' }}>
            CHOOSE YOUR<br /><span className="text-brand-lime">PLAN</span>
          </h2>
          <p className={`text-white/50 text-lg max-w-xl mx-auto mb-8 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.2s' }}>
            No hidden fees. No long-term lock-in. Just the plan that fits your goals.
          </p>

          {/* Billing Toggle */}
          <div className={`inline-flex items-center gap-4 glass rounded-full p-1.5 border border-white/10 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.3s' }}>
            <button
              onClick={() => setYearly(false)}
              className={cn('px-5 py-2 rounded-full text-sm font-semibold transition-all', !yearly ? 'bg-brand-lime text-white shadow-lg' : 'text-white/50 hover:text-white')}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn('px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2', yearly ? 'bg-brand-lime text-white shadow-lg' : 'text-white/50 hover:text-white')}
            >
              Yearly
              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">-20%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {MEMBERSHIP_PLANS.map((plan, i) => (
            <div
              key={plan.id}
              className={cn(
                'relative rounded-2xl p-7 transition-all duration-500 card-hover',
                plan.featured
                  ? 'bg-gradient-to-b from-brand-lime/20 to-brand-charcoal border-2 border-brand-lime scale-105 shadow-2xl shadow-brand-lime/20'
                  : 'bg-brand-black/60 border border-white/8 hover:border-brand-lime/30',
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              )}
              style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
            >
              {/* Featured Badge */}
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-brand-lime px-4 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-lime/40">
                  <Star size={12} fill="white" />
                  Most Popular
                </div>
              )}

              {/* Plan Name */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  {plan.featured && <Zap size={16} className="text-brand-lime" />}
                  <span className="font-display font-black text-2xl uppercase tracking-wider text-white">{plan.name}</span>
                </div>
                <p className="text-white/40 text-sm">{plan.tagline}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="font-display text-5xl font-black text-white">
                    ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-white/40 mb-2 text-sm">/mo</span>
                </div>
                {yearly && (
                  <div className="text-green-400 text-sm font-medium mt-1">
                    Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className={cn('h-px mb-6', plan.featured ? 'bg-brand-lime/30' : 'bg-white/8')} />

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <div className={cn('w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5', plan.featured ? 'bg-brand-lime/20' : 'bg-white/8')}>
                      <Check size={11} className={plan.featured ? 'text-brand-lime' : 'text-white/60'} />
                    </div>
                    <span className="text-white/70 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={cn(
                  'w-full py-3.5 rounded-xl font-semibold transition-all duration-200',
                  plan.featured
                    ? 'bg-brand-lime hover:bg-brand-lime-light text-white shadow-lg shadow-brand-lime/25 hover:shadow-brand-lime/40 hover:scale-[1.02]'
                    : 'glass border border-white/15 text-white hover:border-brand-lime/40 hover:bg-brand-lime/5'
                )}
              >
                {plan.featured ? 'Get Started — Best Value' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className={`text-center text-white/30 text-sm mt-10 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.6s' }}>
          All plans include a free 7-day trial · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}
