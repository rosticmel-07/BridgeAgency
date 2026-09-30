'use client';

import { useId } from 'react';
import styles from './PaymentSeal.module.css';

type PaymentSealProps = {
  value?: string;
  caption?: string;
  topText?: string;
  bottomText?: string;
  ariaLabel?: string;
  className?: string;
};

export function PaymentSeal({
  value = '50%',
  caption = 'ОПЛАТИ',
  topText = 'ПІСЛЯ ПОГОДЖЕННЯ КОНЦЕПЦІЇ',
  bottomText = 'ПЕРШИЙ ЕКРАН • ПОТІМ ОПЛАТА',
  ariaLabel = '50% оплати після погодження концепції першого екрану',
  className = '',
}: PaymentSealProps) {
  const id = useId().replace(/:/g, '');
  const topPathId = `sealTopPath-${id}`;
  const bottomPathId = `sealBottomPath-${id}`;

  return (
    <div className={`${styles.sealWrap} ${className}`}>
      <div className={styles.sealGlow} aria-hidden />
      <svg
        className={styles.seal}
        viewBox="0 0 320 320"
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <path id={topPathId} d="M55 160 A105 105 0 0 1 265 160" />
          <path id={bottomPathId} d="M265 160 A105 105 0 0 1 55 160" />
        </defs>

        <circle cx="160" cy="160" r="128" className={styles.sealOuter} />
        <circle cx="160" cy="160" r="110" className={styles.sealMiddle} />
        <circle cx="160" cy="160" r="82" className={styles.sealInner} />

        <g className={styles.rotatingText}>
          <text className={styles.sealText}>
            <textPath
              href={`#${topPathId}`}
              startOffset="50%"
              textAnchor="middle"
            >
              {topText}
            </textPath>
          </text>

          <text className={styles.sealText}>
            <textPath
              href={`#${bottomPathId}`}
              startOffset="50%"
              textAnchor="middle"
            >
              {bottomText}
            </textPath>
          </text>

          <circle cx="42" cy="160" r="3" className={styles.sealDot} />
          <circle cx="278" cy="160" r="3" className={styles.sealDot} />
        </g>

        <text x="160" y="151" textAnchor="middle" className={styles.sealValue}>
          {value}
        </text>

        <text
          x="160"
          y="181"
          textAnchor="middle"
          className={styles.sealCaption}
        >
          {caption}
        </text>
      </svg>
    </div>
  );
}
