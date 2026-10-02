import Link from 'next/link';

import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi';

import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.glow} />

      <div className={styles.content}>
        <span className={styles.code}>404</span>

        <p className={styles.kicker}>СТОРІНКУ НЕ ЗНАЙДЕНО</p>

        <h1>
          Схоже, цього
          <br />
          <span>маршруту немає.</span>
        </h1>

        <p className={styles.description}>
          Сторінка могла бути переміщена або адреса введена неправильно.
          Поверніться на головну або перегляньте наші послуги.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.primary}>
            <FiArrowLeft />
            На головну
          </Link>

          <Link href="/#services" className={styles.secondary}>
            Послуги
            <FiArrowUpRight />
          </Link>
        </div>
      </div>
    </main>
  );
}
