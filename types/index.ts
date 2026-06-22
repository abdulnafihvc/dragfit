export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  featured: boolean;
  features: string[];
  color: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  image: string;
  certifications: string[];
  specializations: string[];
  experience: number;
  clients: number;
  instagram: string;
  bio: string;
}

export interface GymClass {
  id: string;
  name: string;
  instructor: string;
  duration: number;
  intensity: 'Low' | 'Medium' | 'High' | 'Extreme';
  category: string;
  schedule: { day: string; time: string }[];
  description: string;
  icon: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  transformation: string;
  months: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
