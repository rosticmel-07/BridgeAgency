import { HeroHeading } from './HeroHeading/HeroHeading';
import { HeroAdvantages } from './HeroAdvantages/HeroAdvantages';
import { DeviceShowcase } from './DeviceShowcase/DeviceShowcase';

import { Marquee } from '@/components/ui/Marquee/Marquee';

import { marqueeItems } from '@/data/marquee';

import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.section} id="top">
      <div className={styles.backgroundGrid} aria-hidden />

      <div className={styles.ambientGlow} aria-hidden />

      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <HeroHeading />
          </div>

          <div className={styles.visual}>
            <DeviceShowcase />
          </div>

          <div className={styles.benefits}>
            <HeroAdvantages />
          </div>
        </div>
      </div>

      <Marquee items={marqueeItems} className={styles.marquee} />
    </section>
  );
}
