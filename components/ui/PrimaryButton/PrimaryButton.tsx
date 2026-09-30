import Link from 'next/link';

import { FiArrowRight } from 'react-icons/fi';

import styles from './PrimaryButton.module.css';

type PrimaryButtonProps = {
  children: React.ReactNode;

  href?: string;

  type?: 'button' | 'submit' | 'reset';

  onClick?: () => void;

  disabled?: boolean;

  className?: string;
};

export function PrimaryButton({
  children,
  href,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
}: PrimaryButtonProps) {
  const content = (
    <>
      <span className={styles.text}>{children}</span>

      <FiArrowRight className={styles.arrow} aria-hidden />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${styles.button} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${className}`}
    >
      {content}
    </button>
  );
}
