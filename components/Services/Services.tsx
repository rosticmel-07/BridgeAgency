'use client';

import { useEffect, useRef, useState } from 'react';

import { services } from '@/data/services';

import { ServiceCard } from '@/components/ui/ServiceCard/ServiceCard';

import styles from './Services.module.css';

export function Services() {
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
      id="services"
      className={`${styles.section} ${isVisible ? styles.visible : ''}`}
    >
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.header}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} />

              <span>ПОСЛУГИ</span>
            </div>

            <h2 className={styles.heading}>
              Від першого кліку
              <br />
              до <span>заявки.</span>
            </h2>

            <p className={styles.description}>
              Створюємо digital-продукти, які допомагають бізнесу залучати
              клієнтів і продавати онлайн.
            </p>
          </div>

          <div className={styles.grid}>
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
