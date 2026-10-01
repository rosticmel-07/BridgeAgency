'use client';

import { useEffect, useRef, useState } from 'react';
import { FiCheck, FiChevronDown } from 'react-icons/fi';

import styles from './ProjectSelect.module.css';

type ProjectOption = {
  value: string;
  label: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const options: ProjectOption[] = [
  {
    value: 'landing',
    label: 'Лендінг',
  },
  {
    value: 'business-site',
    label: 'Багатосторінковий сайт',
  },
  {
    value: 'telegram-bot',
    label: 'Telegram-бот',
  },
  {
    value: 'site-ads',
    label: 'Сайт + реклама',
  },
  {
    value: 'other',
    label: 'Інше',
  },
];

export function ProjectSelect({ value, onChange }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const selected = options.find((option) => option.value === value) ?? null;

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

  const selectOption = (option: ProjectOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={selected ? styles.selectedText : styles.placeholder}>
          {selected?.label ?? 'Оберіть тип проєкту'}
        </span>

        <FiChevronDown
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          aria-hidden
        />
      </button>

      <div
        className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ''}`}
      >
        <div className={styles.options} role="listbox">
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`${styles.option} ${
                  isSelected ? styles.optionSelected : ''
                }`}
                onClick={() => selectOption(option)}
              >
                <span>{option.label}</span>

                {isSelected && <FiCheck className={styles.check} aria-hidden />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
