import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import { FloatingContact } from '@/components/ui/FloatingContact/FloatingContact';
import './globals.css';
import { Footer } from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'Bridge Agency — ваш міст до цифрового успіху',
  description:
    'Сайти, Telegram-боти та реклама для бізнесу в Україні. Лендінг за $150. Концепція першого екрану до оплати, далі два платежі по 50%.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>
        <Header />

        {children}
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
