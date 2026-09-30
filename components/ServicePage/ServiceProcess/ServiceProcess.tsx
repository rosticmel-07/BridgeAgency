'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { ServiceDetail } from '@/types/types';
import { Reveal } from '../Reveal/Reveal';
import styles from './ServiceProcess.module.css';

type Props = {
  detail: ServiceDetail;
  isBot: boolean;
};

export function ServiceProcess({ detail, isBot }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ''}`}
      id="process"
    >
      <div className={styles.shell}>
        <Reveal className={styles.intro}>
          <p className={styles.kicker}>04 / ВІД ЗАДАЧІ ДО ЗАПУСКУ</p>

          <h2 className={styles.heading}>
            {isBot ? 'Спочатку перевіряєте.' : 'Ви бачите кожен крок.'}
            <br />
            <span>{isBot ? 'Потім оплачуєте.' : 'І знаєте наступний.'}</span>
          </h2>

          <p className={styles.description}>
            Прозорий процес без хаосу: рухаємось поетапно, узгоджуємо ключові
            точки і ви завжди розумієте, що вже зроблено та що буде далі.
          </p>

          {!isBot && (
            <div className={styles.paymentNote}>
              <span className={styles.paymentDot} />
              <p>50% після затвердження концепції / дизайну</p>
            </div>
          )}
        </Reveal>

        <div className={styles.timeline}>
          <span className={styles.rail} />
          <span className={styles.progress} />
          <span className={styles.beam} />

          {detail.steps.map(([title, text], index) => (
            <Reveal key={title} delay={index * 110}>
              <article
                className={`${styles.step} ${index % 2 === 0 ? styles.left : styles.right}`}
                style={{ '--step-delay': `${index * 220}ms` } as CSSProperties}
              >
                <div className={styles.markerWrap}>
                  <span className={styles.marker} />
                  <span className={styles.number}>0{index + 1}</span>
                </div>

                <div className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.index}>0{index + 1}</span>
                    <span className={styles.line} />
                  </div>

                  <h3>{title}</h3>
                  <p>{text}</p>

                  {!isBot && index === 1 && (
                    <div className={styles.badge}>
                      <strong>50%</strong>
                      <span>після узгодження</span>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
