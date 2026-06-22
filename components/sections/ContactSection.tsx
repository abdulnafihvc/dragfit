'use client';

import { useRef, useEffect, useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle } from 'lucide-react';

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

interface FormState {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

export default function ContactSection() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', interest: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const updateField = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const inputClass = (hasError?: string) =>
    `w-full bg-brand-black/60 border ${hasError ? 'border-brand-lime/60' : 'border-white/10'} text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:border-brand-lime/60 focus:outline-none transition-colors`;

  return (
    <section id="contact" className="py-24 lg:py-32 bg-brand-charcoal relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-brand-lime/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-8 h-0.5 bg-brand-lime" />
            <span className="text-brand-lime text-sm font-semibold uppercase tracking-widest">Get In Touch</span>
            <div className="w-8 h-0.5 bg-brand-lime" />
          </div>
          <h2 className={`font-display font-black text-5xl sm:text-6xl text-white leading-none transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.1s' }}>
            START YOUR<br /><span className="text-brand-lime">JOURNEY TODAY</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left – Info */}
          <div className={`lg:col-span-2 space-y-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.2s' }}>
            {[
              { icon: MapPin, label: 'Location', value: '123 Fitness Boulevard\nLos Angeles, CA 90001', link: null },
              { icon: Phone, label: 'Phone', value: '+1 (800) DRAG-FIT', link: 'tel:+18003724348' },
              { icon: Mail, label: 'Email', value: 'hello@dragfit.com', link: 'mailto:hello@dragfit.com' },
              { icon: Clock, label: 'Hours', value: 'Mon–Fri: 5am–11pm\nSat–Sun: 6am–10pm\nPremium: 24/7', link: null },
            ].map(({ icon: Icon, label, value, link }) => (
              <div key={label} className="flex gap-4 p-5 rounded-xl bg-brand-black/40 border border-white/5 hover:border-brand-lime/20 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-brand-lime/10 group-hover:bg-brand-lime/20 flex items-center justify-center shrink-0 transition-colors">
                  <Icon size={18} className="text-brand-lime" />
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{label}</div>
                  {link ? (
                    <a href={link} className="text-white font-medium hover:text-brand-lime transition-colors text-sm whitespace-pre-line">{value}</a>
                  ) : (
                    <div className="text-white font-medium text-sm whitespace-pre-line">{value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp */}
            <a
              href="https://wa.me/18003724348?text=Hi! I'd like to learn more about DragFit membership."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-5 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <MessageCircle size={18} className="text-green-400" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Chat on WhatsApp</div>
                <div className="text-white/40 text-xs">Typically replies within minutes</div>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </a>

            {/* Map placeholder */}
            <div className="rounded-xl overflow-hidden border border-white/8 aspect-video bg-brand-black relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203584715!2d-118.2436849!3d34.052235299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fbe6f610d2f32!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ filter: 'grayscale(1) invert(0.9) contrast(0.8)', border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DragFit Location"
                className="absolute inset-0"
              />
            </div>
          </div>

          {/* Right – Contact Form */}
          <div className={`lg:col-span-3 glass rounded-2xl p-7 border border-white/8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.35s' }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="font-display text-2xl font-black text-white uppercase mb-2">Message Sent!</h3>
                <p className="text-white/50 max-w-xs">We'll get back to you within 2 hours. Check your inbox for a confirmation.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', interest: '', message: '' }); }}
                  className="mt-6 text-brand-lime text-sm font-semibold hover:text-brand-lime-light transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="font-display font-black text-2xl text-white uppercase mb-6">Book a Free Consultation</h3>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Full Name *</label>
                    <input type="text" value={form.name} onChange={updateField('name')} placeholder="John Doe" className={inputClass(errors.name)} />
                    {errors.name && <p className="text-brand-lime text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Email Address *</label>
                    <input type="email" value={form.email} onChange={updateField('email')} placeholder="john@example.com" className={inputClass(errors.email)} />
                    {errors.email && <p className="text-brand-lime text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Phone Number</label>
                    <input type="tel" value={form.phone} onChange={updateField('phone')} placeholder="+1 (555) 000-0000" className={inputClass()} />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">I'm Interested In</label>
                    <select value={form.interest} onChange={updateField('interest')} className={inputClass()}>
                      <option value="">Select an option</option>
                      <option value="membership">Gym Membership</option>
                      <option value="personal-training">Personal Training</option>
                      <option value="classes">Group Classes</option>
                      <option value="nutrition">Nutrition Coaching</option>
                      <option value="trial">Free Trial</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={updateField('message')}
                    placeholder="Tell us about your fitness goals..."
                    rows={4}
                    className={`${inputClass(errors.message)} resize-none`}
                  />
                  {errors.message && <p className="text-brand-lime text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-brand-lime hover:bg-brand-lime-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-lime/25"
                >
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                  ) : (
                    <><Send size={17} />Send Message — It's Free</>
                  )}
                </button>

                <p className="text-white/20 text-xs text-center mt-4">
                  By submitting, you agree to our Privacy Policy. We never spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
