import { SITE_URL } from '@/lib/site';

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',

    name: 'Bridge Agency',

    url: SITE_URL,

    logo: `${SITE_URL}/logo/logo.svg`,

    description:
      'Digital-агенція зі створення сайтів, Telegram-ботів та запуску реклами для бізнесу.',

    email: 'agency.bridgeee@gmail.com',

    sameAs: [
      'https://www.instagram.com/bridg.eagency/',
      'https://www.linkedin.com/in/rostic-melnychuk/',
    ],

    contactPoint: {
      '@type': 'ContactPoint',
      email: 'agency.bridgeee@gmail.com',
      contactType: 'customer service',
      availableLanguage: ['uk'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
