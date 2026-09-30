import styles from './ServiceSectionHeader.module.css';

type Props = {
  kicker: string;
  title: string;
  accent: string;
  description?: string;
};

export function ServiceSectionHeader({
  kicker,
  title,
  accent,
  description,
}: Props) {
  return (
    <div className={styles.root}>
      <p className={styles.kicker}>{kicker}</p>
      <div className={styles.layout}>
        <h2>
          {title}
          <br />
          <span>{accent}</span>
        </h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
}
