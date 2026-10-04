import type { ServiceDetail } from '@/types/types';
import { Reveal } from '../Reveal/Reveal';
import { ServiceSectionHeader } from '../ServiceSectionHeader/ServiceSectionHeader';
import styles from './ServiceFeatures.module.css';
import { FiArrowUpRight } from 'react-icons/fi';

type Props = { detail: ServiceDetail };

export function ServiceFeatures({ detail }: Props) {
  return (
    <section className={styles.section} id="included">
      <Reveal>
        <ServiceSectionHeader
          kicker="02 / НАПОВНЕННЯ"
          title="Усе має"
          accent="свою задачу."
          description="Від першого знайомства до конкретної дії. Продумуємо зміст, вигляд і роботу кожної частини."
        />
      </Reveal>
      <div className={styles.grid}>
        {detail.features.map(([title, text], index) => (
          <Reveal key={title} delay={index * 80}>
            <article className={styles.card}>
              <div className={styles.top}>
                <span>0{index + 1}</span>
                <span>
                  <FiArrowUpRight aria-hidden />
                </span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className={styles.glow} />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
