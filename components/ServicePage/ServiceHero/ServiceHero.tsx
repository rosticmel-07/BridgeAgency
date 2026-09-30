import Link from 'next/link';
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import { PrimaryButton } from '@/components/ui/PrimaryButton/PrimaryButton';
import { ServiceExperience } from '@/components/ServicePage/ServiceExperience/ServiceExperience';
import type { ServiceSlug } from '@/data/serviceDetails';
import type { ServiceDetail, ServiceItem } from '@/types/types';
import { Reveal } from '../Reveal/Reveal';
import styles from './ServiceHero.module.css';

type Props = {
  service: ServiceItem;
  detail: ServiceDetail;
  slug: ServiceSlug;
};

export function ServiceHero({ service, detail, slug }: Props) {
  return (
    <>
      <div className={styles.breadcrumb}>
        <Link href="/">Головна</Link>
        <span>/</span>
        <Link href="/#services">Послуги</Link>
        <span>/</span>
        <strong>{service.title}</strong>
      </div>
      <section className={styles.hero}>
        <Reveal className={styles.copy}>
          <p className={styles.kicker}>{detail.eyebrow}</p>
          <h1>
            {detail.headline}
            <br />
            <span>{detail.accent}</span>
          </h1>
          <p className={styles.lead}>{detail.intro}</p>
          <div className={styles.meta}>
            <div>
              <span>Старт</span>
              <strong>
                {service.fixedPrice ? '' : `від `}${service.price}
              </strong>
            </div>
            <div>
              <span>Термін</span>
              <strong>{detail.timing}</strong>
            </div>
          </div>
          <div className={styles.actions}>
            <PrimaryButton href="#contact">Обговорити проєкт</PrimaryButton>
            <a href="#package" className={styles.secondary}>
              <span>Що входить у вартість</span>
              <FiArrowDown />
            </a>
          </div>
          <p className={styles.payment}>
            <span>↳</span>
            {detail.payment}
          </p>
        </Reveal>
        <Reveal className={styles.visual} delay={120}>
          <div className={styles.visualGlow} />
          <div className={styles.visualTop}>
            <span>BRIDGE / SERVICE</span>
            <FiArrowUpRight />
          </div>
          <ServiceExperience kind={slug} />
        </Reveal>
      </section>
    </>
  );
}
