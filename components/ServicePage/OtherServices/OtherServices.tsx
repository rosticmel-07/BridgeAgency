import Link from 'next/link';
import type { ServiceItem } from '@/types/types';
import { Reveal } from '../Reveal/Reveal';
import styles from './OtherServices.module.css';
import { FiArrowUpRight } from 'react-icons/fi';
type Props = {
  services: ServiceItem[];
  currentHref: string;
};

export function OtherServices({ services, currentHref }: Props) {
  const items = services.filter((item) => item.href !== currentHref);

  return (
    <section className={styles.section}>
      <Reveal>
        <p className={styles.kicker}>ІНША ЗАДАЧА?</p>
        <h2>
          Оберіть свій наступний крок<span>.</span>
        </h2>
      </Reveal>
      <div className={styles.list}>
        {items.map((item, index) => (
          <Reveal key={item.id} delay={index * 60}>
            <Link href={item.href} className={styles.item}>
              <span>{item.title}</span>
              <strong>
                {item.fixedPrice ? '' : 'від '}${item.price}
                <small>
                  <FiArrowUpRight aria-hidden />
                </small>
              </strong>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
