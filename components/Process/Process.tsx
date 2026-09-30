'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

import { PrimaryButton } from '@/components/ui/PrimaryButton/PrimaryButton';

import styles from './Process.module.css';

const processSteps = [
  {
    number: '01',
    label: 'Знайомство',
    title: 'Спочатку розбираємося в задачі.',
    text: 'Говоримо про ваш бізнес, продукт, аудиторію та цілі. Визначаємо, що саме потрібно створити і який результат має дати проєкт.',
  },
  {
    number: '02',
    label: 'Дизайн',
    title: 'Будуємо логіку ще до написання коду.',
    text: 'Продумуємо структуру, UX/UI та ключові сценарії. Показуємо дизайн, обговорюємо деталі, вносимо правки й погоджуємо напрямок.',
  },
  {
    number: '03',
    label: 'Розробка',
    title: 'Перетворюємо дизайн у продукт.',
    text: 'Верстаємо адаптивний інтерфейс, додаємо функціонал, форми та потрібні інтеграції. Ви бачите прогрес у процесі роботи.',
  },
  {
    number: '04',
    label: 'Запуск',
    title: 'Перевіряємо все перед стартом.',
    text: 'Тестуємо сайт на різних пристроях, підключаємо необхідні сервіси, переносимо на хостинг і запускаємо готовий продукт.',
  },
];

export function Process() {
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
        threshold: 0.15,
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
              INTRO
          ========================= */}

          <div className={styles.intro}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} aria-hidden />

              <span>ЯК МИ ПРАЦЮЄМО</span>
            </div>

            <h2 className={styles.heading}>
              ВІД ІДЕЇ
              <br />
              ДО ЗАПУСКУ.
              <br />
              <span>БЕЗ ХАОСУ.</span>
            </h2>

            <p className={styles.description}>
              Ви розумієте, що відбувається з проєктом, на якому він етапі та що
              буде далі.
            </p>

            <div className={styles.introCta}>
              <PrimaryButton href="#contact">Почати проєкт</PrimaryButton>
            </div>
          </div>

          {/* =========================
              PROCESS ROUTE
          ========================= */}

          <div className={styles.route}>
            {/* SVG LINE */}

            <svg
              className={styles.routeSvg}
              viewBox="0 0 180 960"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                className={styles.routeBackground}
                d="
                  M 90 30
                  C 90 120, 150 135, 150 230
                  C 150 330, 30 330, 30 445
                  C 30 555, 150 555, 150 670
                  C 150 780, 90 805, 90 930
                "
              />

              <path
                pathLength="1"
                className={styles.routeProgress}
                d="
                  M 90 30
                  C 90 120, 150 135, 150 230
                  C 150 330, 30 330, 30 445
                  C 30 555, 150 555, 150 670
                  C 150 780, 90 805, 90 930
                "
              />
            </svg>

            {/* STEPS */}

            <div className={styles.steps}>
              {processSteps.map((step, index) => (
                <article
                  key={step.number}
                  className={`${styles.step} ${
                    index % 2 === 1 ? styles.stepReverse : ''
                  }`}
                  style={
                    {
                      '--step-delay': `${0.3 + index * 0.22}s`,
                    } as CSSProperties
                  }
                >
                  <div className={styles.marker}>
                    <span>{step.number}</span>
                  </div>

                  <div className={styles.stepContent}>
                    <span className={styles.stepLabel}>{step.label}</span>

                    <h3>{step.title}</h3>

                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
