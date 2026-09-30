'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FiFileText, FiMessageCircle, FiX } from 'react-icons/fi';

import { FaRobot, FaTelegramPlane } from 'react-icons/fa';

import styles from './FloatingContact.module.css';

import { TELEGRAM_URL } from '@/data/contact';

const BOT_URL = '';

export function FloatingContact() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  /* =========================
     CLOSE OUTSIDE / ESCAPE
  ========================= */

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);

      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${isOpen ? styles.open : ''}`}
    >
      {/* =========================
          MENU
      ========================= */}

      <div className={styles.menu} aria-hidden={!isOpen}>
        {/* TELEGRAM */}

        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.item}
          onClick={closeMenu}
          tabIndex={isOpen ? 0 : -1}
        >
          <span className={`${styles.itemIcon} ${styles.telegramIcon}`}>
            <FaTelegramPlane aria-hidden />
          </span>

          <span className={styles.itemContent}>
            <strong>Написати в Telegram</strong>

            <small>Зв&apos;язатися напряму</small>
          </span>

          <span className={styles.itemArrow} aria-hidden>
            ↗
          </span>
        </a>

        {/* FORM */}

        <Link
          href={pathname.startsWith('/services/') ? '#contact' : '/#contact'}
          className={styles.item}
          onClick={closeMenu}
          tabIndex={isOpen ? 0 : -1}
        >
          <span className={styles.itemIcon}>
            <FiFileText aria-hidden />
          </span>

          <span className={styles.itemContent}>
            <strong>Залишити заявку</strong>

            <small>Коротка форма на сайті</small>
          </span>

          <span className={styles.itemArrow} aria-hidden>
            →
          </span>
        </Link>

        {/* BOT */}

        {BOT_URL ? (
          <a
            href={BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.item}
            onClick={closeMenu}
            tabIndex={isOpen ? 0 : -1}
          >
            <span className={styles.itemIcon}>
              <FaRobot aria-hidden />
            </span>

            <span className={styles.itemContent}>
              <strong>Наш Telegram-бот</strong>

              <small>Послуги, ціни та кейси</small>
            </span>

            <span className={styles.itemArrow} aria-hidden>
              ↗
            </span>
          </a>
        ) : (
          <div className={`${styles.item} ${styles.disabledItem}`}>
            <span className={styles.itemIcon}>
              <FaRobot aria-hidden />
            </span>

            <span className={styles.itemContent}>
              <strong>Наш Telegram-бот</strong>

              <small>Послуги, ціни та кейси</small>
            </span>

            <span className={styles.soon}>SOON</span>
          </div>
        )}
      </div>

      {/* =========================
          MAIN BUTTON
      ========================= */}

      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((current) => !current)}
        aria-label={
          isOpen ? 'Закрити меню контактів' : 'Відкрити меню контактів'
        }
        aria-expanded={isOpen}
      >
        <span className={styles.triggerGlow} aria-hidden />

        <FiMessageCircle className={styles.chatIcon} aria-hidden />

        <FiX className={styles.closeIcon} aria-hidden />

        <span className={styles.statusDot} aria-hidden />
      </button>
    </div>
  );
}
