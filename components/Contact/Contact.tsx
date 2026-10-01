'use client';

import { useState } from 'react';
import { Field, Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { FaTelegramPlane, FaViber } from 'react-icons/fa';
import { FiAlertCircle, FiCheck, FiPhone } from 'react-icons/fi';

import { ProjectSelect } from '@/components/ui/ProjectSelect/ProjectSelect';
import { PrimaryButton } from '@/components/ui/PrimaryButton/PrimaryButton';

import styles from './Contact.module.css';

type ContactMethod = 'telegram' | 'viber' | 'phone';
type FormStatus = 'idle' | 'success' | 'error';

type Props = {
  serviceSlug?: string;
};

type FormValues = {
  name: string;
  contactMethod: ContactMethod;
  contact: string;
  projectType: string;
  message: string;
  website: string;
};

type ApiResponse = {
  ok?: boolean;
  error?: string;
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

const projectTypes = [
  '',
  'landing',
  'business-site',
  'telegram-bot',
  'site-ads',
  'other',
];

const normalizePhone = (value: string) => {
  return value.replace(/[\s()-]/g, '');
};

const isValidPhone = (value: string) => {
  const normalized = normalizePhone(value);

  return /^\+?[1-9]\d{9,14}$/.test(normalized);
};

const isValidTelegramUsername = (value: string) => {
  return /^@[a-zA-Z0-9_]{5,32}$/.test(value.trim());
};

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Вкажіть щонайменше 2 символи')
    .max(100, 'Ім’я занадто довге')
    .matches(/^[\p{L}'’\-\s]+$/u, 'Перевірте ім’я')
    .required('Вкажіть ваше ім’я'),

  contactMethod: Yup.string().oneOf(['telegram', 'viber', 'phone']).required(),

  contact: Yup.string()
    .trim()
    .required('Вкажіть контакт')
    .test('valid-contact', 'Некоректний формат', function (value) {
      if (!value) return false;

      const { contactMethod } = this.parent as FormValues;

      if (contactMethod === 'telegram') {
        if (value.trim().startsWith('@')) {
          return isValidTelegramUsername(value);
        }

        return isValidPhone(value);
      }

      return isValidPhone(value);
    }),

  projectType: Yup.string().oneOf(
    projectTypes,
    'Оберіть коректний тип проєкту'
  ),

  message: Yup.string().max(800, 'Максимум 800 символів'),

  website: Yup.string().max(0),
});

export function Contact({ serviceSlug = '' }: Props) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [feedback, setFeedback] = useState('');

  const initialValues: FormValues = {
    name: '',
    contactMethod: 'telegram',
    contact: '',
    projectType: serviceSlug,
    message: '',
    website: '',
  };

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
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

      const contact =
        values.contactMethod === 'telegram' &&
        values.contact.trim().startsWith('@')
          ? values.contact.trim()
          : normalizePhone(values.contact);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name.trim(),
          contactMethod: values.contactMethod,
          contact,
          projectType: values.projectType,
          message: values.message.trim(),
          website: values.website,
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
        service: values.projectType || serviceSlug || 'other',
      });

      helpers.resetForm({
        values: {
          ...initialValues,
          projectType: serviceSlug,
        },
      });

      setStatus('success');

      setFeedback(
        'Заявку отримали. Зв’яжемося з вами обраним способом протягом робочого дня.'
      );
    } catch (error) {
      setStatus('error');

      setFeedback(
        error instanceof Error
          ? error.message
          : 'Не вдалося надіслати заявку. Спробуйте ще раз.'
      );
    } finally {
      helpers.setSubmitting(false);
    }
  };

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

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              setFieldValue,
              setFieldTouched,
            }) => {
              const contactPlaceholder =
                values.contactMethod === 'telegram'
                  ? '@username або +380...'
                  : '+380...';

              const clearFeedback = () => {
                if (status !== 'idle') {
                  setStatus('idle');
                  setFeedback('');
                }
              };

              const nameError = touched.name && errors.name;

              const contactError = touched.contact && errors.contact;

              const messageError = touched.message && errors.message;

              return (
                <Form
                  className={styles.form}
                  noValidate
                  onInput={clearFeedback}
                >
                  <div className={styles.formGlow} aria-hidden />

                  <div className={styles.honeypot} aria-hidden="true">
                    <label htmlFor="website">Не заповнюйте це поле</label>

                    <Field
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className={styles.field}>
                    <div className={styles.labelRow}>
                      <label htmlFor="name">Ваше ім&apos;я</label>

                      {nameError && (
                        <span className={styles.inlineError}>
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <Field
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      maxLength={100}
                      placeholder="Як до вас звертатися?"
                      className={nameError ? styles.inputError : ''}
                    />
                  </div>

                  <fieldset className={styles.contactMethods}>
                    <legend>Як вам зручніше спілкуватися?</legend>

                    <div className={styles.methodGrid}>
                      {contactMethods.map((method) => {
                        const Icon = method.icon;

                        const isActive = values.contactMethod === method.id;

                        return (
                          <button
                            key={method.id}
                            type="button"
                            className={`${styles.method} ${
                              isActive ? styles.methodActive : ''
                            }`}
                            onClick={async () => {
                              await setFieldValue('contactMethod', method.id);

                              await setFieldValue('contact', '');

                              setFieldTouched('contact', false);

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
                    <div className={styles.labelRow}>
                      <label htmlFor="contact">Контакт</label>

                      {contactError && (
                        <span className={styles.inlineError}>
                          {errors.contact}
                        </span>
                      )}
                    </div>

                    <Field
                      id="contact"
                      name="contact"
                      type="text"
                      inputMode={
                        values.contactMethod === 'telegram' ? 'text' : 'tel'
                      }
                      autoComplete={
                        values.contactMethod === 'telegram' ? 'off' : 'tel'
                      }
                      maxLength={120}
                      placeholder={contactPlaceholder}
                      className={contactError ? styles.inputError : ''}
                    />
                  </div>

                  <div className={styles.field}>
                    <div className={styles.labelRow}>
                      <label>
                        Що потрібно? <span>необов&apos;язково</span>
                      </label>

                      {touched.projectType && errors.projectType && (
                        <span className={styles.inlineError}>
                          {errors.projectType}
                        </span>
                      )}
                    </div>

                    <ProjectSelect
                      value={values.projectType}
                      onChange={(value) => {
                        setFieldValue('projectType', value);

                        setFieldTouched('projectType', true, false);

                        clearFeedback();
                      }}
                    />
                  </div>

                  <div className={styles.field}>
                    <div className={styles.labelRow}>
                      <label htmlFor="message">
                        Коротко про проєкт <span>необов&apos;язково</span>
                      </label>

                      <div className={styles.messageInfo}>
                        {messageError && (
                          <span className={styles.inlineError}>
                            {errors.message}
                          </span>
                        )}

                        <span className={styles.charCount}>
                          {values.message.length}/800
                        </span>
                      </div>
                    </div>

                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      rows={3}
                      maxLength={800}
                      placeholder="Що потрібно зробити, чим займається ваш бізнес, які є побажання..."
                      className={messageError ? styles.inputError : ''}
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
                </Form>
              );
            }}
          </Formik>

          <div className={styles.bottom}>
            <span className={styles.statusDot} aria-hidden />

            <span>Зазвичай відповідаємо протягом робочого дня</span>
          </div>
        </div>
      </div>
    </section>
  );
}
