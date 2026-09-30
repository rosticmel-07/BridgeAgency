import { PrimaryButton } from '@/components/ui/PrimaryButton/PrimaryButton';
import type { ServiceDetail, ServiceItem } from '@/types/types';
import { Reveal } from '../Reveal/Reveal';
import { PaymentSeal } from '@/components/ui/PaymentSeal/PaymentSeal';
import styles from './ServicePackage.module.css';

type Props = {
  service: ServiceItem;
  detail: ServiceDetail;
  isBot: boolean;
};

export function ServicePackage({ service, detail, isBot }: Props) {
  const sealValue = isBot ? '100%' : '50%';
  const sealLabel = isBot ? 'ОПЛАТИ' : 'ОПЛАТИ';
  const sealSub = isBot ? 'ПІСЛЯ ТЕСТУВАННЯ' : 'ПІСЛЯ ПОГОДЖЕННЯ КОНЦЕПЦІЇ';
  const sealRingText = isBot
    ? 'ПІСЛЯ ТЕСТУВАННЯ • ПОТІМ ОПЛАТА • ПІСЛЯ ТЕСТУВАННЯ • ПОТІМ ОПЛАТА • '
    : 'ПЕРШИЙ ЕКРАН • ПОТІМ ОПЛАТА • ПІСЛЯ ПОГОДЖЕННЯ КОНЦЕПЦІЇ • ПОТІМ ОПЛАТА • ';

  return (
    <section className={styles.section} id="package">
      <Reveal className={styles.intro}>
        <p className={styles.kicker}>05 / ВАШ ПАКЕТ</p>

        <h2>
          Зрозумілий обсяг.
          <br />
          <span>Прозорий старт.</span>
        </h2>

        <p className={styles.description}>
          Перед початком фіксуємо задачу й умови. Ви знаєте, що отримаєте, коли
          та за яку суму.
        </p>

        <PaymentSeal className={styles.packageSeal} />
      </Reveal>

      <Reveal className={styles.card} delay={100}>
        <div className={styles.top}>
          <span>{detail.packageName}</span>
          <span>↗</span>
        </div>

        <div className={styles.price}>
          {!service.fixedPrice && <small>від</small>}
          <strong>${service.price}</strong>
        </div>

        <p className={styles.timing}>{detail.timing}</p>

        <ul>
          {detail.included.map((item) => (
            <li key={item}>
              <span>✓</span>
              {item}
            </li>
          ))}
        </ul>

        <div className={styles.note}>
          <strong>{detail.payment}</strong>
          <p>{detail.separate}</p>
        </div>

        <PrimaryButton href="#contact">Обговорити цей пакет</PrimaryButton>
      </Reveal>
    </section>
  );
}
