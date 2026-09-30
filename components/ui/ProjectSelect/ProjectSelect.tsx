'use client';

import { useEffect, useRef, useState } from 'react';

import { FiCheck, FiChevronDown } from 'react-icons/fi';

import styles from './ProjectSelect.module.css';

type ProjectOption = {
  value: string;
  label: string;
};

type Props = {
  initialValue?: string;
  onChange?: () => void;
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

export function ProjectSelect({ initialValue = '', onChange }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  const initialOption =
    options.find((option) => option.value === initialValue) ?? null;

  const [selected, setSelected] = useState<ProjectOption | null>(initialOption);

  const [isOpen, setIsOpen] = useState(false);

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
    setSelected(option);
    setIsOpen(false);
    onChange?.();
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <input type="hidden" name="projectType" value={selected?.value ?? ''} />

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
            const isSelected = selected?.value === option.value;

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
