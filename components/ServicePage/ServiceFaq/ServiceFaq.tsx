'use client';

import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { TELEGRAM_URL } from '@/data/contact';
import type { ServiceDetail } from '@/types/types';
import styles from './ServiceFaq.module.css';

type Props = {
  detail: ServiceDetail;
};

export function ServiceFaq({ detail }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section className={styles.section} id="service-faq">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <div className={styles.kicker}>
            <span className={styles.kickerLine} aria-hidden />
            <span>06 / ДО ПОЧАТКУ РОБОТИ</span>
          </div>

          <h2 className={styles.heading}>
            ПИТАННЯ,
            <br />
            ЯКІ МОЖУТЬ
            <br />
            <span>ВИНИКНУТИ.</span>
          </h2>

          <p className={styles.description}>
            Коротко про вартість, терміни, матеріали та процес роботи саме з
            цією послугою.
          </p>

          <div className={styles.note}>
            <span className={styles.noteDot} />
            <p>
              Не знайшли відповіді?{' '}
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                Напишіть у Telegram ↗
              </a>
            </p>
          </div>
        </div>

        <div className={styles.list}>
          {detail.faq.map(([question, answer], index) => {
            const isOpen = activeIndex === index;

            return (
              <article
                key={question}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
              >
                <button
                  type="button"
                  className={styles.question}
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`service-faq-answer-${index}`}
                >
                  <span className={styles.number}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className={styles.questionText}>{question}</span>

                  <span className={styles.iconWrap}>
                    <FiPlus className={styles.icon} aria-hidden />
                  </span>
                </button>

                <div
                  id={`service-faq-answer-${index}`}
                  className={styles.answerGrid}
                >
                  <div className={styles.answerInner}>
                    <div className={styles.answer}>
                      <span className={styles.answerLine} aria-hidden />
                      <p>{answer}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
