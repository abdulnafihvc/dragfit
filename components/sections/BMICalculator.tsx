'use client';

import { useRef, useEffect, useState } from 'react';
import { Calculator, ChevronRight } from 'lucide-react';
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

type Unit = 'metric' | 'imperial';

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  recommendation: string;
  idealRange: string;
}

function calculateBMI(height: number, weight: number, unit: Unit): BMIResult | null {
  if (!height || !weight) return null;
  let bmi: number;
  if (unit === 'metric') {
    const hm = height / 100;
    bmi = weight / (hm * hm);
  } else {
    bmi = (703 * weight) / (height * height);
  }
  bmi = Math.round(bmi * 10) / 10;

  if (bmi < 18.5) return { bmi, category: 'Underweight', color: '#3B82F6', recommendation: 'Focus on muscle-building and caloric surplus. Our strength training programs are perfect for healthy weight gain.', idealRange: '18.5 – 24.9' };
  if (bmi < 25) return { bmi, category: 'Healthy Weight', color: '#22C55E', recommendation: 'Great foundation! Maintain your weight with our balanced fitness programs and optimize body composition.', idealRange: '18.5 – 24.9' };
  if (bmi < 30) return { bmi, category: 'Overweight', color: '#F59E0B', recommendation: 'Our HIIT and cardio programs combined with nutrition coaching deliver proven fat-loss results. Hundreds of members in your position have transformed.', idealRange: '18.5 – 24.9' };
  return { bmi, category: 'Obese', color: '#ccdc32', recommendation: 'You\'ve taken the first step. Our trainers specialize in sustainable, medically-informed transformation. Start with a free consultation.', idealRange: '18.5 – 24.9' };
}

export default function BMICalculator() {
  const { ref, inView } = useInView();
  const [unit, setUnit] = useState<Unit>('metric');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);

  const handleCalc = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (h > 0 && w > 0) setResult(calculateBMI(h, w, unit));
  };

  const bmiPercent = result ? Math.min(((result.bmi - 10) / 30) * 100, 100) : 0;

  return (
    <section id="bmi" className="py-24 lg:py-32 bg-brand-black relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-lime/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left – Info */}
          <div>
            <div className={`flex items-center gap-3 mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-8 h-0.5 bg-brand-lime" />
              <span className="text-brand-lime text-sm font-semibold uppercase tracking-widest">Know Your Numbers</span>
            </div>
            <h2 className={`font-display font-black text-5xl sm:text-6xl text-white leading-none mb-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.1s' }}>
              BMI<br /><span className="text-brand-lime">CALCULATOR</span>
            </h2>
            <p className={`text-white/50 text-lg leading-relaxed mb-8 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.2s' }}>
              Understanding your Body Mass Index is the first step to setting realistic goals. Use our calculator to get your score and receive personalized fitness recommendations.
            </p>

            {/* Ranges reference */}
            <div className={`space-y-2 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.3s' }}>
              {[
                { label: 'Underweight', range: '< 18.5', color: '#3B82F6' },
                { label: 'Healthy Weight', range: '18.5 – 24.9', color: '#22C55E' },
                { label: 'Overweight', range: '25 – 29.9', color: '#F59E0B' },
                { label: 'Obese', range: '≥ 30', color: '#ccdc32' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                  <span className="text-white/60">{item.label}</span>
                  <span className="text-white/30 ml-auto font-mono text-xs">{item.range}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Calculator */}
          <div className={`glass rounded-2xl p-7 border border-white/8 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '0.2s' }}>
            {/* Unit Toggle */}
            <div className="flex gap-1 glass rounded-full p-1 mb-6 w-fit border border-white/10">
              {(['metric', 'imperial'] as Unit[]).map((u) => (
                <button
                  key={u}
                  onClick={() => { setUnit(u); setResult(null); setHeight(''); setWeight(''); }}
                  className={cn('px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all', unit === u ? 'bg-brand-lime text-white' : 'text-white/50 hover:text-white')}
                >
                  {u}
                </button>
              ))}
            </div>

            {/* Inputs */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                  Height ({unit === 'metric' ? 'cm' : 'inches'})
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === 'metric' ? 'e.g. 175' : 'e.g. 69'}
                  className="w-full bg-brand-black/60 border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:border-brand-lime/60 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                  Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === 'metric' ? 'e.g. 75' : 'e.g. 165'}
                  className="w-full bg-brand-black/60 border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:border-brand-lime/60 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Age (optional)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 28"
                  className="w-full bg-brand-black/60 border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:border-brand-lime/60 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleCalc}
              className="w-full flex items-center justify-center gap-2 bg-brand-lime hover:bg-brand-lime-light text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-lime/25 mb-6"
            >
              <Calculator size={18} />
              Calculate My BMI
            </button>

            {/* Result */}
            {result && (
              <div className="rounded-xl border border-white/8 p-5 bg-brand-black/40 animate-fade-up">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/50 text-sm">Your BMI</span>
                  <span className="font-display text-3xl font-black" style={{ color: result.color }}>
                    {result.bmi}
                  </span>
                </div>

                {/* BMI Gauge */}
                <div className="relative h-3 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-brand-lime rounded-full mb-2 overflow-hidden">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-500"
                    style={{ left: `calc(${bmiPercent}% - 8px)`, backgroundColor: result.color }}
                  />
                </div>
                <div className="flex justify-between text-xs text-white/30 mb-4">
                  <span>10</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
                </div>

                <div className="font-semibold text-white mb-1" style={{ color: result.color }}>
                  {result.category}
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{result.recommendation}</p>

                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-1 text-brand-lime text-sm font-semibold hover:gap-2 transition-all"
                >
                  Get a free consultation <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
