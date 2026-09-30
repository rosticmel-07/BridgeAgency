'use client';

import { useRef, useState, type FormEvent } from 'react';

import { FaTelegramPlane, FaViber } from 'react-icons/fa';

import { FiAlertCircle, FiCheck, FiPhone } from 'react-icons/fi';

import { ProjectSelect } from '@/components/ui/ProjectSelect/ProjectSelect';
import { PrimaryButton } from '@/components/ui/PrimaryButton/PrimaryButton';

import styles from './Contact.module.css';

type ContactMethod = 'telegram' | 'viber' | 'phone';

type FormStatus = 'idle' | 'success' | 'error';

type ApiResponse = {
  ok?: boolean;
  error?: string;
};

type Props = {
  serviceSlug?: string;
};

const contactMethods = [
  {
    id: 'telegram' as const,
    label: 'Telegram',
    icon: FaTelegramPlane,
  },
  {
    id: 'viber' as const,
    label: 'Viber',
    icon: FaViber,
  },
  {
    id: 'phone' as const,
    label: 'Дзвінок',
    icon: FiPhone,
  },
];

export function Contact({ serviceSlug = '' }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const [contactMethod, setContactMethod] = useState<ContactMethod>('telegram');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [status, setStatus] = useState<FormStatus>('idle');

  const [feedback, setFeedback] = useState('');

  const [resetVersion, setResetVersion] = useState(0);

  const clearFeedback = () => {
    if (status !== 'idle') {
      setStatus('idle');
      setFeedback('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    setIsSubmitting(true);
    setStatus('idle');
    setFeedback('');

    try {
      const searchParams = new URLSearchParams(window.location.search);

      const campaign = Object.fromEntries(
        [
          'utm_source',
          'utm_medium',
          'utm_campaign',
          'utm_content',
          'utm_term',
        ].map((key) => [key, (searchParams.get(key) ?? '').slice(0, 150)])
      );

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.get('name'),
          contactMethod,
          contact: form.get('contact'),
          projectType: form.get('projectType') ?? '',
          message: form.get('message') ?? '',
          website: form.get('website') ?? '',
          source: window.location.pathname,
          campaign,
        }),
      });

      const result: ApiResponse = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Не вдалося надіслати заявку.');
      }

      const trackingWindow = window as Window & {
        dataLayer?: Record<string, unknown>[];
      };

      trackingWindow.dataLayer = trackingWindow.dataLayer || [];

      trackingWindow.dataLayer.push({
        event: 'generate_lead',
        service: form.get('projectType') || serviceSlug || 'other',
      });

      formElement.reset();

      setContactMethod('telegram');

      setResetVersion((current) => current + 1);

      setStatus('success');

      setFeedback(
        'Заявку отримали. Зв’яжемося з вами обраним способом протягом робочого дня.'
      );
    } catch (error) {
      setStatus('error');

      setFeedback(
        error instanceof Error
          ? error.message
          : 'Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам у Telegram.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactPlaceholder =
    contactMethod === 'telegram'
      ? 'Номер телефону або @username'
      : contactMethod === 'viber'
        ? 'Номер телефону у Viber'
        : 'Номер телефону';

  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <div className={styles.inner}>
          <header className={styles.header}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} aria-hidden />

              <span>ПОЧНЕМО?</span>
            </div>

            <h2 className={styles.heading}>
              Обговорімо <span>ваш проєкт.</span>
            </h2>

            <p className={styles.description}>
              Залиште контакт. Зв’яжемося з вами, обговоримо нішу та задачу,
              запропонуємо обсяг роботи, строки й вартість.
            </p>
          </header>

          <form
            ref={formRef}
            className={styles.form}
            onSubmit={handleSubmit}
            onInput={clearFeedback}
          >
            <div className={styles.formGlow} aria-hidden />

            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="website">Не заповнюйте це поле</label>

              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="name">Ваше ім&apos;я</label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Як до вас звертатися?"
                autoComplete="name"
                maxLength={100}
                required
              />
            </div>

            <fieldset className={styles.contactMethods}>
              <legend>Як вам зручніше спілкуватися?</legend>

              <div className={styles.methodGrid}>
                {contactMethods.map((method) => {
                  const Icon = method.icon;

                  const isActive = contactMethod === method.id;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      className={`${styles.method} ${
                        isActive ? styles.methodActive : ''
                      }`}
                      onClick={() => {
                        setContactMethod(method.id);

                        clearFeedback();
                      }}
                      aria-pressed={isActive}
                    >
                      <Icon className={styles.methodIcon} aria-hidden />

                      <span>{method.label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className={styles.field}>
              <label htmlFor="contact-value">Контакт</label>

              <input
                id="contact-value"
                name="contact"
                type="text"
                placeholder={contactPlaceholder}
                minLength={3}
                maxLength={120}
                required
              />
            </div>

            <div className={styles.field}>
              <label>
                Що потрібно? <span>необов&apos;язково</span>
              </label>

              <ProjectSelect
                key={`${serviceSlug}-${resetVersion}`}
                initialValue={serviceSlug}
                onChange={clearFeedback}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="message">
                Коротко про проєкт
                <span> необов&apos;язково</span>
              </label>

              <textarea
                id="message"
                name="message"
                rows={3}
                maxLength={800}
                placeholder="Що потрібно зробити, чим займається ваш бізнес, які є побажання..."
              />
            </div>

            <div className={styles.footer}>
              <PrimaryButton
                type="submit"
                disabled={isSubmitting}
                className={styles.submit}
              >
                {isSubmitting ? 'Надсилаємо...' : 'Надіслати заявку'}
              </PrimaryButton>

              <p className={styles.note}>
                Використаємо ваш контакт, щоб відповісти щодо проєкту.
              </p>
            </div>

            {status !== 'idle' && (
              <div
                className={`${styles.feedbackBox} ${
                  status === 'success'
                    ? styles.feedbackSuccess
                    : styles.feedbackError
                }`}
                role="status"
                aria-live="polite"
              >
                <span className={styles.feedbackIcon}>
                  {status === 'success' ? (
                    <FiCheck aria-hidden />
                  ) : (
                    <FiAlertCircle aria-hidden />
                  )}
                </span>

                <div className={styles.feedbackContent}>
                  <strong>
                    {status === 'success'
                      ? 'Заявку надіслано'
                      : 'Не вдалося надіслати'}
                  </strong>

                  <p>{feedback}</p>
                </div>
              </div>
            )}
          </form>

          <div className={styles.bottom}>
            <span className={styles.statusDot} aria-hidden />

            <span>Зазвичай відповідаємо протягом робочого дня</span>
          </div>
        </div>
      </div>
    </section>
  );
}
