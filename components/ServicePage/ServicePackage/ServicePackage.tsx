import { FiCheck, FiArrowRight } from 'react-icons/fi';

import { PrimaryButton } from '@/components/ui/PrimaryButton/PrimaryButton';
import { PaymentSeal } from '@/components/ui/PaymentSeal/PaymentSeal';

import type { ServiceDetail, ServiceItem } from '@/types/types';

import { Reveal } from '../Reveal/Reveal';

import styles from './ServicePackage.module.css';

type Props = {
  service: ServiceItem;
  detail: ServiceDetail;
  isBot: boolean;
};

export function ServicePackage({ service, detail, isBot }: Props) {
  const paymentTitle = isBot
    ? 'Тестування → приймання → 100% оплати'
    : detail.payment;

  const paymentDescription = isBot
    ? 'Спочатку ви тестуєте погоджені функції бота. Після перевірки та приймання готового результату сплачуєте 100% вартості.'
    : detail.separate;

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

        {isBot ? (
          <div className={styles.botPayment}>
            <div className={styles.botPaymentTop}>
              <span className={styles.botPaymentLabel}>ОПЛАТА БОТА</span>

              <span className={styles.botPaymentBadge}>100%</span>
            </div>

            <div className={styles.botPaymentFlow}>
              <span>Тестування</span>

              <FiArrowRight aria-hidden />

              <span>Приймання</span>

              <FiArrowRight aria-hidden />

              <strong>Оплата</strong>
            </div>

            <p>
              Ви спочатку перевіряєте погоджені функції. Оплата — тільки після
              приймання готового бота.
            </p>

            <div className={styles.botPaymentStatus}>
              <span>
                <FiCheck aria-hidden />
              </span>

              <p>Без 50% передоплати після концепції</p>
            </div>
          </div>
        ) : (
          <PaymentSeal className={styles.packageSeal} />
        )}
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

        <div className={`${styles.note} ${isBot ? styles.botNote : ''}`}>
          <strong>{paymentTitle}</strong>

          <p>{paymentDescription}</p>
        </div>

        <PrimaryButton href="#contact">
          {isBot ? 'Обговорити Telegram-бота' : 'Обговорити цей пакет'}
        </PrimaryButton>
      </Reveal>
    </section>
  );
}
