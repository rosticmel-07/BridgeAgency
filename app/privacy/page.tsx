import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import styles from './privacy.module.css';

export const metadata: Metadata = {
  title: 'Політика конфіденційності',
  description:
    'Політика конфіденційності Bridge Agency: які дані ми отримуємо, для чого використовуємо та як з нами зв’язатися.',
  alternates: {
    canonical: '/privacy',
  },
};

const sections = [
  {
    number: '01',
    title: 'Хто обробляє дані',
    content: (
      <>
        <p>Ця Політика конфіденційності стосується сайту Bridge Agency.</p>

        <p>Якщо у вас є питання щодо ваших персональних даних, напишіть нам:</p>

        <a
          href="mailto:agency.bridgeee@gmail.com"
          className={styles.inlineLink}
        >
          agency.bridgeee@gmail.com
        </a>
      </>
    ),
  },
  {
    number: '02',
    title: 'Які дані ми можемо отримувати',
    content: (
      <>
        <p>
          Коли ви залишаєте заявку через форму на сайті, ми можемо отримувати:
        </p>

        <ul>
          <li>ваше ім’я;</li>
          <li>номер телефону або Telegram username;</li>
          <li>обраний спосіб зв’язку;</li>
          <li>тип проєкту або послуги;</li>
          <li>інформацію, яку ви добровільно вказали у повідомленні;</li>
          <li>сторінку сайту, з якої була надіслана заявка;</li>
          <li>UTM-мітки рекламної кампанії, якщо вони присутні в URL.</li>
        </ul>

        <p>
          Хостинг-провайдер також може автоматично обробляти стандартні технічні
          дані, необхідні для роботи та безпеки сайту.
        </p>
      </>
    ),
  },
  {
    number: '03',
    title: 'Для чого ми використовуємо дані',
    content: (
      <>
        <p>Отримана інформація використовується для того, щоб:</p>

        <ul>
          <li>зв’язатися з вами щодо вашої заявки;</li>
          <li>уточнити задачу, строки та вартість проєкту;</li>
          <li>підготувати пропозицію щодо наших послуг;</li>
          <li>зрозуміти, з якого рекламного джерела надійшло звернення;</li>
          <li>забезпечувати стабільну та безпечну роботу сайту.</li>
        </ul>

        <p>
          Ми не використовуємо контактні дані для сторонніх розсилок без окремої
          підстави або вашої згоди.
        </p>
      </>
    ),
  },
  {
    number: '04',
    title: 'Як передаються заявки',
    content: (
      <>
        <p>
          Дані, які ви вводите у форму, передаються на сервер сайту та
          надсилаються Bridge Agency через Telegram Bot API.
        </p>

        <p>
          Це означає, що інформація із заявки може оброблятися сервісами, які
          технічно забезпечують роботу сайту та доставку повідомлення.
        </p>
      </>
    ),
  },
  {
    number: '05',
    title: 'Реклама та аналітика',
    content: (
      <>
        <p>
          Для оцінки ефективності рекламних кампаній сайт може використовувати
          UTM-мітки та, після підключення відповідних інструментів, системи
          веб-аналітики або рекламного вимірювання.
        </p>

        <p>
          Якщо на сайті будуть активовані технології на кшталт Google Analytics
          або Meta Pixel, інформація про їх використання та, за необхідності,
          механізм керування згодою будуть додані на сайт.
        </p>
      </>
    ),
  },
  {
    number: '06',
    title: 'Як довго зберігаються дані',
    content: (
      <>
        <p>
          Ми зберігаємо інформацію лише протягом строку, необхідного для
          комунікації щодо проєкту, роботи з клієнтом, вирішення можливих питань
          та виконання вимог, які можуть застосовуватися до діяльності.
        </p>

        <p>
          Якщо інформація більше не потрібна, вона може бути видалена або
          знеособлена.
        </p>
      </>
    ),
  },
  {
    number: '07',
    title: 'Ваші права',
    content: (
      <>
        <p>
          Залежно від законодавства, яке застосовується у вашій ситуації, ви
          можете звернутися до нас із проханням:
        </p>

        <ul>
          <li>повідомити, які ваші дані ми маємо;</li>
          <li>виправити неточну інформацію;</li>
          <li>
            видалити інформацію, якщо немає підстав для її подальшого
            зберігання;
          </li>
          <li>обмежити або заперечити проти певного способу обробки;</li>
          <li>відкликати згоду там, де обробка ґрунтується на згоді.</li>
        </ul>

        <p>
          Для такого запиту напишіть на{' '}
          <a
            href="mailto:agency.bridgeee@gmail.com"
            className={styles.inlineLink}
          >
            agency.bridgeee@gmail.com
          </a>
          .
        </p>
      </>
    ),
  },
  {
    number: '08',
    title: 'Зміни до політики',
    content: (
      <p>
        Ми можемо оновлювати цю Політику, якщо змінюється функціональність
        сайту, спосіб роботи з даними або використовувані сервіси. Актуальна
        версія завжди буде опублікована на цій сторінці.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.inner}>
          <header className={styles.hero}>
            <Link href="/" className={styles.back}>
              <span>←</span>
              На головну
            </Link>

            <div className={styles.kicker}>
              <span className={styles.kickerLine} />
              <span>BRIDGE AGENCY / PRIVACY</span>
            </div>

            <h1>
              Політика
              <br />
              <span>конфіденційності.</span>
            </h1>

            <p className={styles.lead}>
              Тут пояснюємо, які дані може отримувати Bridge Agency через сайт,
              навіщо вони потрібні та як ви можете керувати своєю інформацією.
            </p>

            <p className={styles.updated}>Останнє оновлення: 2 жовтня 2026</p>
          </header>

          <div className={styles.content}>
            {sections.map((section) => (
              <section key={section.number} className={styles.policySection}>
                <div className={styles.sectionNumber}>{section.number}</div>

                <div className={styles.sectionBody}>
                  <h2>{section.title}</h2>

                  <div className={styles.copy}>{section.content}</div>
                </div>
              </section>
            ))}
          </div>

          <footer className={styles.bottom}>
            <div>
              <span>Питання щодо конфіденційності?</span>

              <a href="mailto:agency.bridgeee@gmail.com">
                agency.bridgeee@gmail.com
              </a>
            </div>

            <Link href="/" className={styles.homeLink}>
              Повернутися на сайт
              <FiArrowUpRight aria-hidden />
            </Link>
          </footer>
        </div>
      </div>
    </main>
  );
}
