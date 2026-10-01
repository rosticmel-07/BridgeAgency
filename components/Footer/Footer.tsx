'use client';

import Image from 'next/image';
import Link from 'next/link';

import { FiArrowUp, FiArrowUpRight, FiMail } from 'react-icons/fi';

import { FaInstagram, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';

import styles from './Footer.module.css';

import { services as serviceItems } from '@/data/services';
import { TELEGRAM_URL } from '@/data/contact';

const navigation = [
  {
    label: 'Головна',
    href: '/#top',
  },
  {
    label: 'Про нас',
    href: '/#about',
  },
  {
    label: 'Послуги',
    href: '/#services',
  },
  {
    label: 'Портфоліо',
    href: '/#portfolio',
  },
  {
    label: 'Як ми працюємо',
    href: '/#process',
  },
  {
    label: 'FAQ',
    href: '/#faq',
  },
];

const services = serviceItems.map((service) => ({
  label: service.title,
  href: service.href,
}));

const socials = [
  {
    label: 'Telegram',
    href: TELEGRAM_URL,
    icon: FaTelegramPlane,
    external: true,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/bridg.eagency/',
    icon: FaInstagram,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rostic-melnychuk/?isSelfProfile=true',
    icon: FaLinkedinIn,
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:agency.bridgeee@gmail.com',
    icon: FiMail,
    external: false,
  },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.main}>
            <div className={styles.brand}>
              <Link
                href="/#top"
                className={styles.logo}
                aria-label="Bridge Agency — на головну"
              >
                <Image
                  src="/logo/logo.svg"
                  alt="Bridge Agency"
                  width={130}
                  height={72}
                />
              </Link>

              <p className={styles.brandText}>
                Створюємо digital-рішення для бізнесу: сайти, Telegram-боти та
                рекламу.
              </p>

              <Link href="/#contact" className={styles.contactLink}>
                <span>Обговорити проєкт</span>
                <FiArrowUpRight aria-hidden />
              </Link>
            </div>

            <div className={styles.links}>
              <div className={styles.column}>
                <span className={styles.columnTitle}>Навігація</span>

                <nav className={styles.columnLinks}>
                  {navigation.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={styles.footerLink}
                    >
                      <span>{item.label}</span>

                      <FiArrowUpRight
                        className={styles.linkArrow}
                        aria-hidden
                      />
                    </Link>
                  ))}
                </nav>
              </div>

              <div className={styles.column}>
                <span className={styles.columnTitle}>Послуги</span>

                <div className={styles.columnLinks}>
                  {services.map((service) => (
                    <Link
                      key={service.label}
                      href={service.href}
                      className={styles.footerLink}
                    >
                      <span>{service.label}</span>

                      <FiArrowUpRight
                        className={styles.linkArrow}
                        aria-hidden
                      />
                    </Link>
                  ))}
                </div>
              </div>

              <div className={styles.column}>
                <span className={styles.columnTitle}>Контакти</span>

                <div className={styles.socials}>
                  {socials.map((social) => {
                    const Icon = social.icon;

                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target={social.external ? '_blank' : undefined}
                        rel={
                          social.external ? 'noopener noreferrer' : undefined
                        }
                        className={styles.social}
                        aria-label={social.label}
                      >
                        <span className={styles.socialIcon}>
                          <Icon aria-hidden />
                        </span>

                        <span className={styles.socialName}>
                          {social.label}
                        </span>

                        <FiArrowUpRight
                          className={styles.socialArrow}
                          aria-hidden
                        />
                      </a>
                    );
                  })}
                </div>

                <a
                  href="mailto:agency.bridgeee@gmail.com"
                  className={styles.emailAddress}
                >
                  agency.bridgeee@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <div className={styles.copyright}>
              <span>© 2026 Bridge Agency</span>

              <span className={styles.bottomDot} aria-hidden />

              <span>Всі права захищені</span>
            </div>

            <button
              type="button"
              className={styles.backToTop}
              onClick={scrollToTop}
            >
              <span>Повернутись нагору</span>

              <span className={styles.backIcon}>
                <FiArrowUp aria-hidden />
              </span>
            </button>
          </div>

          <div className={styles.wordmark} aria-hidden>
            BRIDGE <span>AGENCY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
