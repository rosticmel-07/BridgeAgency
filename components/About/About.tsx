'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

import styles from './About.module.css';

const bridgePath = 'M45 230 C45 95 165 25 380 25 C595 25 715 95 715 230';

export function About() {
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
        threshold: 0.2,
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
      id="about"
      className={`${styles.section} ${isVisible ? styles.visible : ''}`}
    >
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.kicker}>
            <span>ПРО АГЕНЦІЮ</span>
            <span className={styles.kickerLine} aria-hidden />
          </div>
          <div className={styles.directContact}>
            <div className={styles.diagram}>
              <div className={styles.diagramLabel}>Прямий контакт</div>

              <svg
                className={styles.bridge}
                viewBox="0 0 760 285"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path d="M28 230H732" className={styles.baseLine} />

                <g className={styles.middleLines}>
                  <line x1="115" y1="230" x2="115" y2="155" />
                  <line x1="175" y1="230" x2="175" y2="108" />
                  <line x1="235" y1="230" x2="235" y2="72" />
                  <line x1="295" y1="230" x2="295" y2="47" />
                  <line x1="355" y1="230" x2="355" y2="30" />
                  <line x1="405" y1="230" x2="405" y2="30" />
                  <line x1="465" y1="230" x2="465" y2="47" />
                  <line x1="525" y1="230" x2="525" y2="72" />
                  <line x1="585" y1="230" x2="585" y2="108" />
                  <line x1="645" y1="230" x2="645" y2="155" />
                </g>

                <path
                  d={bridgePath}
                  pathLength="1"
                  className={styles.bridgePath}
                />

                <circle cx="45" cy="230" r="8" className={styles.startDot} />

                <circle cx="715" cy="230" r="8" className={styles.endDot} />

                {isVisible && (
                  <circle r="5" className={styles.movingDot}>
                    <animateMotion
                      dur="1.8s"
                      begin="0.15s"
                      fill="freeze"
                      path={bridgePath}
                    />
                  </circle>
                )}
              </svg>

              <div className={styles.diagramBottom}>
                <span className={styles.person}>Ви</span>

                <span className={styles.managers}>Без посередників</span>

                <span className={`${styles.person} ${styles.personRight}`}>
                  Ваш
                  <br />
                  розробник
                </span>
              </div>
            </div>

            <div className={styles.directText}>
              <h2 className={styles.heading}>
                Ваш бізнес.
                <br />
                <span>Прямий контакт.</span>
              </h2>
              <p>
                Bridge Agency — незалежна digital-агенція для малого й
                середнього бізнесу в Україні: від будівельних компаній до
                стоматологій.
              </p>
              <ul className={styles.points}>
                <li>
                  <strong>Один відповідальний за проєкт.</strong> Ви спілкуєтеся
                  безпосередньо з розробником — від першої розмови до запуску.
                </li>
                <li>
                  <strong>Починаємо з вашої задачі.</strong> Уточнюємо послуги,
                  аудиторію й потрібні функції, потім погоджуємо обсяг роботи.
                </li>
              </ul>

              <Link href="#portfolio" className={styles.button}>
                <span>Відкрити портфоліо</span>
                <FiArrowUpRight aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
