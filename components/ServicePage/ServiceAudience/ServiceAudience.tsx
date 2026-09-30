import type { ServiceDetail } from '@/types/types';
import { Reveal } from '../Reveal/Reveal';
import { ServiceSectionHeader } from '../ServiceSectionHeader/ServiceSectionHeader';
import styles from './ServiceAudience.module.css';

type Props = { detail: ServiceDetail };

export function ServiceAudience({ detail }: Props) {
  return (
    <section className={styles.section}>
      <Reveal>
        <ServiceSectionHeader
          kicker="01 / ВАША СИТУАЦІЯ"
          title="Починаємо з того,"
          accent="що потрібно бізнесу."
        />
      </Reveal>
      <div className={styles.list}>
        {detail.audience.map(([title, text], index) => (
          <Reveal key={title} delay={index * 90}>
            <article className={styles.item}>
              <span className={styles.number}>0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <span className={styles.arrow}>↗</span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
