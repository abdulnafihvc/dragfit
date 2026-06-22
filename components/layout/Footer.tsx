'use client';

import { useState } from 'react';
import { Dumbbell, Instagram, Twitter, Youtube, Facebook, ArrowRight, CheckCircle } from 'lucide-react';

const FOOTER_LINKS = {
  Training: ['CrossFit', 'Strength Training', 'Cardio & HIIT', 'Yoga & Mobility', 'Personal Training', 'Group Classes'],
  Company: ['About DragFit', 'Our Trainers', 'Facilities', 'Success Stories', 'Blog', 'Careers'],
  Support: ['FAQ', 'Contact Us', 'Membership Help', 'Class Cancellations', 'Privacy Policy', 'Terms of Service'],
};

const SOCIALS = [
  { icon: Instagram, href: 'https://instagram.com/dragfit', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/dragfit', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/dragfit', label: 'YouTube' },
  { icon: Facebook, href: 'https://facebook.com/dragfit', label: 'Facebook' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-brand-black border-t border-white/5" role="contentinfo">
      {/* Newsletter Band */}
      <div className="bg-brand-lime/10 border-b border-brand-lime/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-black text-2xl text-white uppercase tracking-wide mb-1">
                Get Fit Tips & Exclusive Offers
              </h3>
              <p className="text-white/50 text-sm">Join 12,000+ members who get our weekly newsletter.</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 text-green-400 font-semibold">
                <CheckCircle size={20} />
                You're subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 md:w-72 bg-brand-black/60 border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-2.5 text-sm focus:border-brand-lime/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-brand-lime hover:bg-brand-lime-light text-white font-semibold px-5 py-2.5 rounded-xl transition-all whitespace-nowrap"
                >
                  Subscribe <ArrowRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="DragFit Logo" className="h-10 w-auto" />
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Where champions are built. World-class fitness delivered with elite expertise and unmatched community.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-brand-lime/20 hover:border-brand-lime/30 border border-white/8 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/40 text-sm hover:text-white transition-colors animated-underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-sm">
            © {new Date().getFullYear()} DragFit. All rights reserved.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <a key={link} href="#" className="text-white/25 text-xs hover:text-white/50 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
