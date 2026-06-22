import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import MembershipSection from '@/components/sections/MembershipSection';
import TrainersSection from '@/components/sections/TrainersSection';
import ClassesSection from '@/components/sections/ClassesSection';
import TransformationSection from '@/components/sections/TransformationSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BMICalculator from '@/components/sections/BMICalculator';
import FacilitiesSection from '@/components/sections/FacilitiesSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ClassesSection />
        <MembershipSection />
        <TrainersSection />
        <TransformationSection />
        <TestimonialsSection />
        <BMICalculator />
        <FacilitiesSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
