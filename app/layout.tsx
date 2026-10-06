import type { Metadata } from 'next';

import Header from '@/components/Header/Header';
import { FloatingContact } from '@/components/ui/FloatingContact/FloatingContact';
import { Footer } from '@/components/Footer/Footer';
import { MetaPixel } from '@/components/analytics/MetaPixel';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Bridge Agency — сайти, Telegram-боти та реклама',
    template: '%s | Bridge Agency',
  },

  description: SITE_DESCRIPTION,

  applicationName: SITE_NAME,

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: '/',
    siteName: SITE_NAME,
    title: 'Bridge Agency — сайти, Telegram-боти та реклама',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Bridge Agency',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Bridge Agency — сайти, Telegram-боти та реклама',
    description: SITE_DESCRIPTION,
    images: ['/twitter-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
        <MetaPixel />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
