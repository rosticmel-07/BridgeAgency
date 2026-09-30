'use client';

import { useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';

import { PrimaryButton } from '@/components/ui/PrimaryButton/PrimaryButton';
import { portfolioCases, type PortfolioCase } from '@/data/PortfolioCase';

import styles from './Portfolio.module.css';

export function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const syncCase = () => {
      const caseId = Number(
        new URLSearchParams(window.location.search).get('case')
      );
      const index = portfolioCases.findIndex((item) => item.id === caseId);
      if (index >= 0) setActiveIndex(index);
    };
    syncCase();
    window.addEventListener('popstate', syncCase);
    return () => window.removeEventListener('popstate', syncCase);
  }, []);

  const activeCase = portfolioCases[activeIndex];

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
          {/* =========================
              HEADER
          ========================= */}

          <div className={styles.header}>
            <div className={styles.kicker}>
              <span className={styles.kickerLine} aria-hidden />
              <span>ПОРТФОЛІО</span>
            </div>

            <h2 className={styles.heading}>
              ПРОЄКТИ,
              <br />
              ЯКІ ГОВОРЯТЬ
              <br />
              <span>ЗА НАС.</span>
            </h2>

            <p className={styles.description}>
              Приклади проєктів: яку задачу вирішували та що було реалізовано.
            </p>
          </div>

          {/* =========================
              LAYOUT
          ========================= */}

          <div className={styles.layout}>
            {/* =========================
                SIDEBAR
            ========================= */}

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
                {portfolioCases.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={index === activeIndex}
                    className={`${styles.tab} ${
                      index === activeIndex ? styles.tabActive : ''
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className={styles.tabNumber}>{item.number}</span>

                    <span className={styles.tabText}>
                      <span className={styles.tabTitle}>{item.title}</span>

                      <span className={styles.tabMeta}>{item.category}</span>
                    </span>
                  </button>
                ))}
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

            {/* =========================
                ACTIVE CASE
            ========================= */}

            <div key={activeCase.id} className={styles.stage}>
              <div className={styles.stageTop}>
                <div className={styles.caseMeta}>
                  <span className={styles.caseCategory}>
                    {activeCase.category}
                  </span>

                  <span className={styles.caseBadge}>
                    CASE {activeCase.number}
                  </span>
                </div>

                <h3 className={styles.caseTitle}>{activeCase.title}</h3>

                <p className={styles.caseLead}>{activeCase.lead}</p>
              </div>

              <div className={styles.stageGrid}>
                <div className={styles.visualWrap}>
                  <div className={styles.visualFrame}>
                    <div className={styles.browserBar}>
                      <div className={styles.browserDots}>
                        <span />
                        <span />
                        <span />
                      </div>

                      <div className={styles.browserAddress}>
                        bridge-agency / case-study
                      </div>
                    </div>

                    <CaseVisual item={activeCase} />
                  </div>
                </div>

                <div className={styles.casePanel}>
                  <div className={styles.detailCard}>
                    <span className={styles.detailLabel}>Задача</span>

                    <p>{activeCase.task}</p>
                  </div>

                  <div className={styles.detailCard}>
                    <span className={styles.detailLabel}>Рішення</span>

                    <p>{activeCase.solution}</p>
                  </div>

                  {activeCase.result && (
                    <div className={styles.detailCard}>
                      <span className={styles.detailLabel}>Результат</span>
                      <p>{activeCase.result}</p>
                    </div>
                  )}
                  <details className={styles.stackCard}>
                    <summary className={styles.detailLabel}>
                      Технічні деталі
                    </summary>

                    <div className={styles.stack}>
                      {activeCase.stack.map((tech) => (
                        <span key={tech} className={styles.stackItem}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </details>

                  <div className={styles.actions}>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type CaseVisualProps = {
  item: PortfolioCase;
};

function CaseVisual({ item }: CaseVisualProps) {
  if (item.preview === 'safety') {
    return (
      <div className={`${styles.caseCanvas} ${styles.safety}`}>
        <div className={styles.safetyNav}>
          <span>Послуги</span>
          <span>Сертифікація</span>
          <span>Про компанію</span>
          <span>Контакти</span>
        </div>

        <div className={styles.safetyHero}>
          <div className={styles.safetyLeft}>
            <span className={styles.canvasKicker}>Охорона праці</span>

            <h4>
              Професійні рішення для безпеки
              <br />
              вашого бізнесу
            </h4>

            <div className={styles.fakeButton}>Отримати консультацію</div>
          </div>

          <div className={styles.safetyStamp}>
            ISO
            <br />
            45001
          </div>
        </div>

        <div className={styles.safetyGrid}>
          <div className={styles.surfaceCard}>Аудит підприємства</div>
          <div className={styles.surfaceCard}>Навчання персоналу</div>
          <div className={styles.surfaceCard}>Документація</div>
          <div className={styles.surfaceCard}>Сертифікація</div>
        </div>

        <div className={styles.certificateRow}>
          <div className={styles.certificateCard}>Сертифікати</div>
          <div className={styles.certificateCard}>Ліцензії</div>
          <div className={styles.certificateCard}>Контакти</div>
        </div>
      </div>
    );
  }

  if (item.preview === 'composite') {
    return (
      <div className={`${styles.caseCanvas} ${styles.composite}`}>
        <div className={styles.compositeTop}>
          <div>
            <span className={styles.canvasKicker}>Композитна сітка</span>

            <h4>Матеріали для міцних рішень</h4>

            <p>Композитна сітка, арматура, доставка по Західній Україні.</p>
          </div>

          <div className={styles.productBars}>
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.fakeInput}>Оберіть товар</div>
          <div className={styles.fakeInput}>Кількість</div>
          <div className={styles.fakePrimary}>Отримати ціну</div>
        </div>

        <div className={styles.priceCards}>
          <div className={styles.priceCard}>
            <span>Сітка</span>
            <strong>від 76 грн</strong>
          </div>

          <div className={styles.priceCard}>
            <span>Арматура</span>
            <strong>від 42 грн</strong>
          </div>

          <div className={styles.priceCard}>
            <span>Доставка</span>
            <strong>Захід України</strong>
          </div>
        </div>

        <div className={styles.leadsStripe}>
          <span>Meta Ads</span>
          <span>Lead form</span>
          <span>CRM / База даних</span>
        </div>
      </div>
    );
  }

  if (item.preview === 'realtor') {
    return (
      <div className={`${styles.caseCanvas} ${styles.realtor}`}>
        <div className={styles.botTags}>
          <span>/description</span>
          <span>/reply</span>
          <span>/followup</span>
          <span>/adcopy</span>
        </div>

        <div className={styles.phoneMockup}>
          <div className={styles.phoneHeader}>AI Realtor Assistant</div>

          <div className={styles.chatBody}>
            <div className={styles.chatBubbleLeft}>
              Створи опис квартири в центрі Львова
            </div>

            <div className={styles.chatBubbleRight}>
              Простора квартира в центрі Львова з сучасним ремонтом...
            </div>

            <div className={styles.chatBubbleLeft}>
              Напиши follow-up для клієнта
            </div>

            <div className={styles.chatBubbleRight}>
              Вітаю! Надсилаю деталі по об’єкту, який вас цікавив...
            </div>
          </div>
        </div>

        <div className={styles.botFooter}>
          Telegram • AI • Швидка генерація текстів
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.caseCanvas} ${styles.game}`}>
      <div className={styles.gameSplit}>
        <div className={styles.gameLeft}>
          <span className={styles.canvasKicker}>Mobile Game Landing</span>

          <h4>Match, Collect & Play</h4>

          <p>
            Промо-сторінка, яка презентує гру та веде користувача до
            встановлення в Google Play.
          </p>

          <div className={styles.playBadge}>
            GET IT ON
            <strong>Google Play</strong>
          </div>
        </div>

        <div className={styles.gameWorld}>
          <span className={styles.worldBubbleOne} />
          <span className={styles.worldBubbleTwo} />
          <span className={styles.worldBubbleThree} />
          <span className={styles.worldCharacterOne} />
          <span className={styles.worldCharacterTwo} />
          <span className={styles.worldCharacterThree} />
        </div>
      </div>

      <div className={styles.gameCards}>
        <div className={styles.gameCard}>Gameplay</div>
        <div className={styles.gameCard}>Features</div>
        <div className={styles.gameCard}>Download CTA</div>
      </div>
    </div>
  );
}
