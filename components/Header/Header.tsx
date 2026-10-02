'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';

import css from './Header.module.css';

const navigation = [
  { label: 'Головна', href: '/' },
  { label: 'Послуги', href: '/#services' },
  { label: 'Портфоліо', href: '/#portfolio' },
  { label: 'Про нас', href: '/#about' },
  { label: 'Контакти', href: '/#contact' },
  { label: 'Запитання', href: '/#faq' },
];

export default function Header() {
  const pathname = usePathname();
  const contactHref = pathname.startsWith('/services/')
    ? '#contact'
    : '/#contact';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`${css.header} ${scrolled ? css.scrolled : ''}`}>
      <div className="container">
        <div className={css.headerContent}>
          <Link
            href="/"
            className={css.logo}
            aria-label="Bridge Agency — головна"
            onClick={closeMenu}
          >
            <Image
              src="/logo/logo.svg"
              alt="Bridge Agency"
              width={110}
              height={61}
              priority
            />
          </Link>

          <nav className={css.nav} aria-label="Основна навігація">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href === '/#contact' ? contactHref : item.href}
                className={css.navLink}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={css.actions}>
            <Link href={contactHref} className={css.headerButton}>
              <span>Залишити заявку</span>

              <FiArrowUpRight className={css.ctaArrow} aria-hidden />
            </Link>

            <button
              type="button"
              className={css.menuButton}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${css.mobileMenu} ${menuOpen ? css.mobileMenuOpen : ''}`}
      >
        <div className="container">
          <nav className={css.mobileNav} aria-label="Мобільна навігація">
            {navigation.map((item, index) => (
              <Link
                key={item.label}
                href={item.href === '/#contact' ? contactHref : item.href}
                className={css.mobileLink}
                onClick={closeMenu}
              >
                <span className={css.mobileNumber}>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span>{item.label}</span>

                <FiArrowUpRight className={css.mobileArrow} aria-hidden />
              </Link>
            ))}

            <Link
              href={contactHref}
              className={css.mobileCta}
              onClick={closeMenu}
            >
              <span>Обговорити проєкт</span>

              <FiArrowUpRight aria-hidden />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
