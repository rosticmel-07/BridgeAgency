import styles from './ServiceSectionNav.module.css';

const items = [
  ['#included', 'Можливості'],
  ['#case', 'Приклад роботи'],
  ['#process', 'Процес'],
  ['#package', 'Вартість'],
  ['#service-faq', 'Питання'],
];

export function ServiceSectionNav() {
  return (
    <nav className={styles.nav} aria-label="Розділи послуги">
      <div className={styles.track}>
        {items.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
