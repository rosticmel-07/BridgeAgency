'use client';

import Image from 'next/image';

import { useRef, type PointerEvent } from 'react';

import styles from './DeviceShowcase.module.css';

export function DeviceShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = wrapRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;

    const y = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.setProperty('--move-x', `${x * 9}px`);

    element.style.setProperty('--move-y', `${y * 7}px`);

    element.style.setProperty('--rotate-y', `${x * 1.3}deg`);

    element.style.setProperty('--rotate-x', `${y * -1}deg`);

    element.style.setProperty('--glow-x', `${50 + x * 10}%`);

    element.style.setProperty('--glow-y', `${50 + y * 8}%`);
  };

  const handlePointerLeave = () => {
    const element = wrapRef.current;

    if (!element) return;

    element.style.setProperty('--move-x', '0px');
    element.style.setProperty('--move-y', '0px');

    element.style.setProperty('--rotate-x', '0deg');

    element.style.setProperty('--rotate-y', '0deg');

    element.style.setProperty('--glow-x', '50%');
    element.style.setProperty('--glow-y', '50%');
  };

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className={styles.glow} aria-hidden />

      <div className={styles.floor} aria-hidden />

      <div className={styles.parallax}>
        <div className={styles.float}>
          <Image
            src="/Hero/device.png"
            alt="Приклади робіт Bridge Agency на ноутбуці та телефоні"
            width={1600}
            height={1100}
            priority
            className={styles.devices}
          />
        </div>
      </div>
    </div>
  );
}
