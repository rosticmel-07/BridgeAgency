'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiExternalLink,
} from 'react-icons/fi';

import { PrimaryButton } from '@/components/ui/PrimaryButton/PrimaryButton';
import { portfolioCases, type PortfolioCase } from '@/data/PortfolioCase';

import styles from './Portfolio.module.css';

type MediaConfig = {
  src: string;
  alt: string;
  type: 'browser' | 'phone';
  url: string;
};

const projectMedia: Record<string, MediaConfig> = {
  safety: {
    src: '/portfolio/safety.png',
    alt: 'Сайт компанії з охорони праці',
    type: 'browser',
    url: '',
  },
  composite: {
    src: '/portfolio/composite.png',
    alt: 'Лендінг виробника композитної сітки',
    type: 'browser',
    url: '',
  },
  realtor: {
    src: '/portfolio/realtor.png',
    alt: 'Telegram AI-бот для рієлторів',
    type: 'phone',
    url: '',
  },
  game: {
    src: '/portfolio/game.png',
    alt: 'Промо-лендінг мобільної гри',
    type: 'browser',
    url: '',
  },
};

export function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const syncCase = () => {
      const caseId = Number(
        new URLSearchParams(window.location.search).get('case')
      );

      const index = portfolioCases.findIndex((item) => item.id === caseId);

      if (index >= 0) {
        setActiveIndex(index);
      }
    };

    syncCase();

    window.addEventListener('popstate', syncCase);

    return () => {
      window.removeEventListener('popstate', syncCase);
    };
  }, []);

  const activeCase = portfolioCases[activeIndex];

  const media = projectMedia[activeCase.preview];

  const goPrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? portfolioCases.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setActiveIndex((prev) =>
      prev === portfolioCases.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className={styles.section} id="portfolio">
      <div className="container">
        <div className={styles.inner}>
          <header className={styles.header}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} aria-hidden />

              <span>ПОРТФОЛІО</span>
            </div>

            <div className={styles.headerGrid}>
              <h2 className={styles.heading}>
                ПРОЄКТИ,
                <br />
                ЯКІ ГОВОРЯТЬ
                <br />
                <span>ЗА НАС.</span>
              </h2>

              <div className={styles.headerCopy}>
                <p>
                  Не концепти для портфоліо. Реальні задачі, продукти та
                  рішення, які вже були реалізовані.
                </p>

                <span>Оберіть кейс і подивіться, що саме було зроблено.</span>
              </div>
            </div>
          </header>

          <div className={styles.layout}>
            <aside className={styles.sidebar}>
              <div className={styles.sidebarTop}>
                <span className={styles.sidebarLabel}>Обраний кейс</span>

                <div className={styles.counter}>
                  <span>{activeCase.number}</span>
                  <span className={styles.counterDivider}>/</span>
                  <span>0{portfolioCases.length}</span>
                </div>
              </div>

              <div
                className={styles.tabs}
                role="group"
                aria-label="Кейси портфоліо"
              >
                {portfolioCases.map((item, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={isActive}
                      className={`${styles.tab} ${
                        isActive ? styles.tabActive : ''
                      }`}
                      onClick={() => setActiveIndex(index)}
                    >
                      <span className={styles.tabNumber}>{item.number}</span>

                      <span className={styles.tabText}>
                        <span className={styles.tabTitle}>{item.title}</span>

                        <span className={styles.tabMeta}>{item.category}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className={styles.controls}>
                <button
                  type="button"
                  className={styles.controlButton}
                  onClick={goPrev}
                  aria-label="Попередній кейс"
                >
                  <FiArrowLeft />
                </button>

                <button
                  type="button"
                  className={styles.controlButton}
                  onClick={goNext}
                  aria-label="Наступний кейс"
                >
                  <FiArrowRight />
                </button>
              </div>
            </aside>

            <article key={activeCase.id} className={styles.stage}>
              <div className={styles.stageHeader}>
                <div>
                  <div className={styles.caseMeta}>
                    <span className={styles.caseCategory}>
                      {activeCase.category}
                    </span>

                    <span className={styles.caseNumber}>
                      CASE {activeCase.number}
                    </span>
                  </div>

                  <h3 className={styles.caseTitle}>{activeCase.title}</h3>

                  <p className={styles.caseLead}>{activeCase.lead}</p>
                </div>

                <div className={styles.realProject}>
                  <span className={styles.liveDot} />
                  <span>Реальний проєкт</span>
                </div>
              </div>

              <div className={styles.showcase}>
                <div className={styles.mediaColumn}>
                  <ProjectMedia config={media} item={activeCase} />

                  <div className={styles.mediaFooter}>
                    <div className={styles.projectStatus}>
                      <span className={styles.statusDot} />
                      <div>
                        <strong>Реальна реалізація</strong>
                        <span>Не дизайн-концепт</span>
                      </div>
                    </div>

                    {media?.url && (
                      <a
                        href={media.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.liveLink}
                      >
                        <span>Відкрити сайт</span>

                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>

                <div className={styles.casePanel}>
                  <CaseDetail
                    number="01"
                    label="Задача"
                    text={activeCase.task}
                  />

                  <CaseDetail
                    number="02"
                    label="Рішення"
                    text={activeCase.solution}
                  />

                  {activeCase.result && (
                    <CaseDetail
                      number="03"
                      label="Результат"
                      text={activeCase.result}
                      accent
                    />
                  )}

                  <div className={styles.stackCard}>
                    <div className={styles.detailHeading}>
                      <span>STACK</span>
                      <span>↗</span>
                    </div>

                    <div className={styles.stack}>
                      {activeCase.stack.map((tech) => (
                        <span key={tech} className={styles.stackItem}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.actions}>
                    {media?.url && (
                      <a
                        href={media.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLink}
                      >
                        <span>Переглянути проєкт</span>

                        <FiExternalLink />
                      </a>
                    )}

                    <PrimaryButton href="#contact">
                      Обговорити схожий проєкт
                    </PrimaryButton>

                    <button
                      type="button"
                      className={styles.nextCase}
                      onClick={goNext}
                    >
                      <span>Наступний кейс</span>

                      <FiArrowUpRight aria-hidden />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

type CaseDetailProps = {
  number: string;
  label: string;
  text: string;
  accent?: boolean;
};

function CaseDetail({ number, label, text, accent = false }: CaseDetailProps) {
  return (
    <div
      className={`${styles.detailCard} ${
        accent ? styles.detailCardAccent : ''
      }`}
    >
      <div className={styles.detailHeading}>
        <span>{number}</span>
        <span>{label}</span>
      </div>

      <p>{text}</p>
    </div>
  );
}

function ProjectMedia({
  config,
  item,
}: {
  config?: MediaConfig;
  item: PortfolioCase;
}) {
  if (!config) {
    return (
      <div className={styles.mediaFallback}>
        <span>Preview unavailable</span>
      </div>
    );
  }

  if (config.type === 'phone') {
    return (
      <div className={styles.phoneStage}>
        <div className={styles.phoneGlow} />

        <div className={styles.phoneInfo}>
          <span>TELEGRAM BOT</span>

          <strong>
            AI-помічник
            <br />
            для рієлторів
          </strong>

          <p>Реальний інтерфейс бота та приклад роботи команд.</p>
        </div>

        <div className={styles.phone}>
          <div className={styles.phoneSpeaker} />

          <div className={styles.phoneScreen}>
            <Image
              src={config.src}
              alt={config.alt}
              fill
              sizes="(max-width: 700px) 70vw, 330px"
              className={styles.phoneImage}
            />
          </div>
        </div>

        <div className={styles.botCommands}>
          <span>/listing</span>
          <span>/reply</span>
          <span>/followup</span>
          <span>/ad</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.browser}>
      <div className={styles.browserBar}>
        <div className={styles.browserDots}>
          <span />
          <span />
          <span />
        </div>

        <div className={styles.browserAddress}>
          <span className={styles.lockDot} />
          live-project
        </div>

        <FiExternalLink className={styles.browserIcon} />
      </div>

      <div className={styles.browserScreen}>
        <Image
          src={config.src}
          alt={config.alt}
          fill
          sizes="(max-width: 1100px) 100vw, 720px"
          className={styles.browserImage}
          priority={item.id === portfolioCases[0]?.id}
        />
      </div>
    </div>
  );
}
