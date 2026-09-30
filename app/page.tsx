import { About } from '@/components/About/About';
import { Hero } from '@/components/Hero/Hero';
import { Services } from '@/components/Services/Services';
import { PaymentSection } from '@/components/PaymentSection/PaymentSection';
import { Portfolio } from '@/components/Portfolio/Portfolio';
import { FAQ } from '@/components/Faq/Faq';
import { Contact } from '@/components/Contact/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <PaymentSection />
      <FAQ />
      <Contact />
    </main>
  );
}
