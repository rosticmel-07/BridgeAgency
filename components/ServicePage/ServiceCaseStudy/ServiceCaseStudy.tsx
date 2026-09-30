import Link from 'next/link';
import type { PortfolioCase } from '@/types/types';
import { Reveal } from '../Reveal/Reveal';
import styles from './ServiceCaseStudy.module.css';

type Props = {
  caseStudy: PortfolioCase;
  isBot: boolean;
  slug: string;
};

export function ServiceCaseStudy({ caseStudy, isBot, slug }: Props) {
  return (
    <section className={styles.section} id="case">
      <Reveal className={styles.intro}>
        <p className={styles.kicker}>03 / ПРИКЛАД РОБОТИ</p>
        <span className={styles.tag}>{caseStudy.category}</span>
        <h2>
          {caseStudy.title}
          <span>.</span>
        </h2>
        <p className={styles.lead}>{caseStudy.lead}</p>
        <Link href={`/?case=${caseStudy.id}#portfolio`} className={styles.link}>
          Переглянути в портфоліо <span>↗</span>
        </Link>
      </Reveal>
      <Reveal className={styles.body} delay={100}>
        <div className={styles.block}>
          <span>ЗАДАЧА</span>
          <p>{caseStudy.task}</p>
        </div>
        <div className={styles.block}>
          <span>РІШЕННЯ</span>
          <p>{caseStudy.solution}</p>
        </div>
        {caseStudy.result ? (
          <div className={styles.result}>
            <strong>≈100</strong>
            <div>
              <p>звернень потенційних клієнтів</p>
              <small>
                У проєкті з композитною сіткою. Результат окремого кейсу.
              </small>
            </div>
          </div>
        ) : (
          <div className={styles.foot}>
            <span>↗</span>
            <p>
              {isBot
                ? '4 команди для щоденних задач рієлтора'
                : slug === 'landing'
                  ? 'Сторінка з переходом до гри в Google Play'
                  : 'Послуги, сертифікація та контакти в одній структурі'}
            </p>
          </div>
        )}
      </Reveal>
    </section>
  );
}
