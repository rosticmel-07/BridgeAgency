import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { services } from '@/data/services';
import { serviceDetails, type ServiceSlug } from '@/data/serviceDetails';
import { portfolioCases } from '@/data/PortfolioCase';
import { Contact } from '@/components/Contact/Contact';
import { ServiceHero } from '@/components/ServicePage/ServiceHero/ServiceHero';
import { ServiceSectionNav } from '@/components/ServicePage/ServiceSectionNav/ServiceSectionNav';
import { ServiceAudience } from '@/components/ServicePage/ServiceAudience/ServiceAudience';
import { ServiceFeatures } from '@/components/ServicePage/ServiceFeatures/ServiceFeatures';
import { ServiceCaseStudy } from '@/components/ServicePage/ServiceCaseStudy/ServiceCaseStudy';
import { ServiceProcess } from '@/components/ServicePage/ServiceProcess/ServiceProcess';
import { ServicePackage } from '@/components/ServicePage/ServicePackage/ServicePackage';
import { ServiceFaq } from '@/components/ServicePage/ServiceFaq/ServiceFaq';
import { OtherServices } from '@/components/ServicePage/OtherServices/OtherServices';
import styles from './service.module.css';

export function generateStaticParams() {
  return [...Object.keys(serviceDetails), 'shop'].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const service = services.find((item) => item.href === `/services/${slug}`);

  if (!service) {
    return {};
  }

  const pathname = `/services/${slug}`;

  const priceText = service.fixedPrice
    ? `$${service.price}`
    : `від $${service.price}`;

  const title = `${service.title} — ${priceText}`;

  const description = service.description;

  return {
    title,
    description,

    alternates: {
      canonical: pathname,
    },

    openGraph: {
      type: 'website',
      locale: 'uk_UA',
      url: pathname,
      siteName: 'Bridge Agency',
      title: `${title} | Bridge Agency`,
      description,
    },

    twitter: {
      card: 'summary_large_image',
      title: `${title} | Bridge Agency`,
      description,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === 'shop') permanentRedirect('/services/business-site');

  const service = services.find((item) => item.href === `/services/${slug}`);
  const detail = serviceDetails[slug as ServiceSlug];

  if (!service || !detail) notFound();

  const caseStudy = portfolioCases.find((item) => item.id === detail.caseId);

  if (!caseStudy) notFound();

  const isBot = slug === 'telegram-bot';

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.shell}>
          <ServiceHero
            service={service}
            detail={detail}
            slug={slug as ServiceSlug}
          />
          <ServiceSectionNav />
          <ServiceAudience detail={detail} />
          <ServiceFeatures detail={detail} />
          <ServiceCaseStudy caseStudy={caseStudy} isBot={isBot} slug={slug} />
          <ServiceProcess detail={detail} isBot={isBot} />
          <ServicePackage service={service} detail={detail} isBot={isBot} />
          <ServiceFaq detail={detail} />
          <OtherServices services={services} currentHref={service.href} />
        </div>
      </div>
      <Contact serviceSlug={slug} />
    </main>
  );
}
