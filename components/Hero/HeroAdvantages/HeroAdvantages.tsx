import { heroAdvantages } from '@/data/heroAdvantages';

import styles from './HeroAdvantages.module.css';

export function HeroAdvantages() {
  return (
    <ul className={styles.list}>
      {heroAdvantages.map((advantage) => (
        <li key={advantage.n} className={styles.item}>
          <div className={styles.head}>
            <span className={styles.number}>{advantage.n}</span>

            <span className={styles.rule} aria-hidden />
          </div>

          <h3 className={styles.title}>{advantage.title}</h3>

          <p className={styles.text}>{advantage.text}</p>
        </li>
      ))}
    </ul>
  );
}
