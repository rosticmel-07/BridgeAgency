import Link from 'next/link';
import { PrimaryButton } from '@/components/ui/PrimaryButton/PrimaryButton';

import styles from './HeroHeading.module.css';

export function HeroHeading() {
  return (
    <div className={styles.root}>
      <div className={styles.kicker}>
        <span className={styles.kickerText}>Діджитал-агенція</span>

        <span className={styles.kickerLine} aria-hidden />
      </div>

      <h1 className={styles.heading}>
        <span className={styles.line}>ВАШ МІСТ ДО</span>

        <span className={styles.line}>
          <span className={styles.accent}>ЦИФРОВОГО</span>
        </span>

        <span className={styles.line}>
          УСПІХУ
          <span className={styles.accent}>.</span>
        </span>
      </h1>

      <p className={styles.lede}>
        Сайти, Telegram-боти та реклама для малого й середнього бізнесу в
        Україні. Допомагаємо презентувати послуги й отримувати звернення онлайн.
      </p>

      <Link href="/services/landing" className={styles.offer}>
        Лендінг за $150 <span aria-hidden>↗</span>
      </Link>

      <div className={styles.actions}>
        <PrimaryButton href="#contact">Обговорити проєкт</PrimaryButton>

        <a href="#portfolio" className={styles.secondary}>
          <span>Дивитись кейси</span>

          <span className={styles.arrow} aria-hidden>
            →
          </span>
        </a>
      </div>
    </div>
  );
}
