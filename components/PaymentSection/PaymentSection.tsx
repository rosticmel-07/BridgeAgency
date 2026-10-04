'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { PrimaryButton } from '@/components/ui/PrimaryButton/PrimaryButton';
import { PaymentSeal } from '@/components/ui/PaymentSeal/PaymentSeal';
import styles from './PaymentSection.module.css';

const steps = [
  {
    number: '01',
    title: 'Задача й домовленості',
    text: 'Обговорюємо бізнес, погоджуємо обсяг роботи, вартість і строки.',
  },
  {
    number: '02',
    title: 'Концепція → 50%',
    text: 'Показуємо концепцію першого екрану без оплати. Після її погодження ви вносите перші 50%.',
  },
  {
    number: '03',
    title: 'Дизайн і розробка',
    text: 'Завершуємо дизайн, розробляємо сайт і перевіряємо погоджені функції та мобільну версію.',
  },
  {
    number: '04',
    title: 'Готовий проєкт → 50%',
    text: 'Ви перевіряєте результат. Решта 50% — після виконання повного погодженого обсягу завдань.',
  },
];

export function PaymentSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className={`${styles.section} ${isVisible ? styles.visible : ''}`}
    >
      <div className="container">
        <div className={styles.inner}>
          {/* =========================
              TOP
          ========================= */}

          <div className={styles.top}>
            <div className={styles.content}>
              <div className={styles.kicker}>
                <span className={styles.kickerLine} aria-hidden />

                <span>ПРОЦЕС І ОПЛАТА</span>
              </div>

              <h2 className={styles.heading}>
                СПОЧАТКУ
                <br />
                КОНЦЕПЦІЯ.
                <br />
                <span>ПОТІМ 50%.</span>
              </h2>

              <div className={styles.copy}>
                <p>
                  До першої оплати ви бачите концепцію першого екрану: напрямок
                  дизайну, основний заголовок і подачу пропозиції.
                </p>
                <p>
                  Погоджуєте концепцію — сплачуєте <strong>50% вартості</strong>
                  . Решту — після виконання погоджених завдань.
                </p>
                <p className={styles.accentText}>
                  Для лендінгу за $150: $75 після концепції та $75 після
                  завершення.
                </p>
              </div>

              <div className={styles.cta}>
                <PrimaryButton href="#contact">Обговорити проєкт</PrimaryButton>
              </div>
            </div>

            {/* =========================
                SEAL
            ========================= */}

            <PaymentSeal className={styles.seal} />
          </div>

          {/* =========================
              PROCESS
          ========================= */}

          <div className={styles.process}>
            <svg
              className={styles.processLine}
              viewBox="0 0 1200 150"
              preserveAspectRatio="none"
              aria-hidden
            >
              {/* Сіра горизонтальна основа */}

              <line
                x1="20"
                y1="100"
                x2="1180"
                y2="100"
                className={styles.timelineBase}
              />

              {/* Одна червона лінія з трьох дуг */}

              <path
                pathLength="1"
                d="M20 100 C110 20 310 20 400 100 C490 20 710 20 800 100 C890 20 1090 20 1180 100"
                className={styles.timelinePath}
              />

              {/* 4 етапи */}

              <circle cx="20" cy="100" r="6" className={styles.timelineDot} />

              <circle cx="400" cy="100" r="6" className={styles.timelineDot} />

              <circle cx="800" cy="100" r="6" className={styles.timelineDot} />

              <circle
                cx="1180"
                cy="100"
                r="8"
                className={`${styles.timelineDot} ${styles.timelineDotFinal}`}
              />
            </svg>

            <div className={styles.steps}>
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={styles.step}
                  style={
                    {
                      '--step-delay': `${0.65 + index * 0.28}s`,
                    } as CSSProperties
                  }
                >
                  <span className={styles.stepNumber}>{step.number}</span>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
