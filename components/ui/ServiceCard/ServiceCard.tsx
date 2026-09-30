import Link from 'next/link';

import {
  FiArrowRight,
  FiMonitor,
  FiLayout,
  FiSend,
  FiTrendingUp,
} from 'react-icons/fi';

import type { Service, ServiceIcon } from '@/data/services';

import styles from './ServiceCard.module.css';

type ServiceCardProps = {
  service: Service;
  index: number;
  isVisible: boolean;
};

const icons = {
  landing: FiMonitor,
  shop: FiLayout,
  telegram: FiSend,
  advertising: FiTrendingUp,
} satisfies Record<ServiceIcon, typeof FiMonitor>;

export function ServiceCard({ service, index, isVisible }: ServiceCardProps) {
  const Icon = icons[service.icon];

  return (
    <article
      className={`${styles.card} ${service.fixedPrice ? styles.featured : ''} ${isVisible ? styles.visible : ''}`}
      style={
        {
          '--delay': `${index * 0.09}s`,
        } as React.CSSProperties
      }
    >
      <div className={styles.backgroundGlow} aria-hidden />

      <Icon className={styles.backgroundIcon} aria-hidden />

      <div className={styles.top}>
        <Icon className={styles.icon} aria-hidden />

        <span className={styles.number}>{service.number}</span>
      </div>

      <div className={styles.content}>
        <h3>{service.title}</h3>

        <p>{service.description}</p>
      </div>

      <div className={styles.footer}>
        <div className={styles.price}>
          <span className={styles.from}>
            {service.fixedPrice ? 'фіксована ціна' : 'від'}
          </span>

          <span className={styles.amount}>${service.price}</span>
        </div>

        <Link href={service.href} className={styles.link}>
          <span>Детальніше</span>

          <FiArrowRight className={styles.arrow} aria-hidden />
        </Link>
      </div>
    </article>
  );
}
