import styles from './Marquee.module.css';

type MarqueeProps = {
  items: readonly string[];
  className?: string;
};

export function Marquee({ items, className = '' }: MarqueeProps) {
  return (
    <div className={`${styles.wrap} ${className}`} aria-hidden>
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <div key={copy} className={styles.group}>
            {[...items, ...items].map((item, i) => (
              <span key={`${copy}-${i}`} className={styles.item}>
                {item}
                <span className={styles.glyph} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
