import React from 'react';
import { Header, defaultNavItems, type HeaderProps } from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import { Tag } from '../../components/Tag/Tag';
import { Icon } from '../../icons/Icon';
import { usePageTheme, type ThemeName } from '../../hooks/usePageTheme';
import { Backdrop } from '../../components/Backdrop/Backdrop';
import avatarUrl from '../../assets/avatar.png';
import heroImage13 from './assets/hero-image-13.png';
import heroImage31 from './assets/hero-image-31.png';
import idCardUrl from './assets/id-card.svg';
import dotUrl from './assets/dot.svg';
import phishingIconUrl from './assets/phishing-icon.svg';
import './EmployeeHome.css';

/* Figma: «Chiron · Главная · Основы кибербезопасности» — Desktop 285:8564,
   Планшет 768 301:9059, Мобильный 390 301:9178. Light theme: the same tokens in
   Light mode (layout of the earlier light mockup 228:4162). */

export interface CourseLesson {
  /** Overline, e.g. «Модуль 2 · Урок 1». */
  label: string;
  title: string;
}

export interface CourseHero {
  category: string;
  meta: string;
  deadline: string;
  duration: string;
  title: React.ReactNode;
  description: React.ReactNode;
  xp: number | string;
  coins: number;
  lesson: CourseLesson;
}

export interface EmployeeHomeProps {
  userName?: string;
  user?: HeaderProps['user'];
  course?: CourseHero;
  onStartLesson?: () => void;
  onNavigate?: (id: string) => void;
  /** Slowly drifting background inside the course card. `false` — static, as in the mockup. */
  animatedBackground?: boolean;
  /** Initial theme. By default it is taken from `<html data-theme>`. */
  defaultTheme?: ThemeName;
  /** Called when the user switches the theme in the profile menu. */
  onThemeChange?: (theme: ThemeName) => void;
}

export const defaultCourse: CourseHero = {
  category: 'Основы',
  meta: '8 модулей · 40 уроков',
  deadline: 'До 1 декабря 23:59 (МСК)',
  duration: '≈ 30 мин',
  title: 'Основы кибербезопасности',
  description: (
    <>
      Научитесь распознавать киберугрозы, защищать рабочие данные и безопасно пользоваться цифровыми сервисами.
      Разберём типичные сценарии атак <br className="eh-br-wide" />и научимся правильно действовать в подозрительных
      ситуациях.
    </>
  ),
  xp: '1 200',
  coins: 30,
  lesson: { label: 'Модуль 2 · Урок 1', title: 'Как распознать фишинговое письмо' },
};

export function EmployeeHome({
  userName = 'Виктория',
  user = { name: 'Ирина Петрова', avatarUrl },
  course = defaultCourse,
  onStartLesson,
  onNavigate,
  animatedBackground = true,
  defaultTheme,
  onThemeChange,
}: EmployeeHomeProps) {
  const [theme, setTheme] = usePageTheme(defaultTheme, onThemeChange);

  // Any theme switch writes the name again: a new key remounts
  // HandwrittenName, which replays its animation.
  const [nameRun, setNameRun] = React.useState(0);
  const previousTheme = React.useRef(theme);
  React.useEffect(() => {
    if (theme !== previousTheme.current) setNameRun((run) => run + 1);
    previousTheme.current = theme;
  }, [theme]);

  return (
    <div className="employee-home" data-theme={theme}>
      {/* Background blobs and glows (decorative) */}
      <Backdrop />

      <div className="employee-home__top">
        <Header
          className="employee-home__header"
          items={defaultNavItems}
          activeId="learning"
          onNavigate={onNavigate}
          user={user}
          theme={theme}
          onThemeChange={setTheme}
        />
      </div>

      <main className="employee-home__workspace">
        <div className="employee-home__main">
          <section className="eh-greeting">
            <h1 className="eh-greeting__title">
              <span className="eh-greeting__line">
                <HandwrittenName key={nameRun} text={`${userName},`} />
                <span className="eh-greeting__space"> </span>
              </span>
              <span className="eh-greeting__line">приветствуем на портале</span>
            </h1>
            <p className="eh-greeting__lead t-body-lead">
              Здесь собрана ваша персональная программа обучения. Постепенно вам откроются все функции,{' '}
              <br className="eh-br-wide" />а пока начните <br className="eh-br-narrow" />с первой задачи - познакомьтесь
              с основами кибербезопасности.
            </p>
          </section>

          <CourseHeroCard course={course} onStartLesson={onStartLesson} animatedBackground={animatedBackground} />
        </div>
      </main>
    </div>
  );
}

/* ---------- Handwritten name ---------- */

const WRITE_MS_PER_CHAR = 160;
const WRITE_MIN_MS = 800;
const WRITE_MAX_MS = 2400;
const WRITE_DELAY_MS = 300;

type WriteState = 'idle' | 'writing' | 'done';

/**
 * The user's name «writes itself» once the page opens: a soft-edged mask
 * sweeps left to right like a pen. Starts after the Fet font has loaded so
 * the fallback face is never animated; skipped for prefers-reduced-motion.
 */
function HandwrittenName({ text }: { text: string }) {
  const [state, setState] = React.useState<WriteState>('idle');

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState('done');
      return;
    }
    let cancelled = false;
    let timer: number | undefined;
    document.fonts.load('56px Fet', text).finally(() => {
      if (!cancelled) timer = window.setTimeout(() => setState('writing'), WRITE_DELAY_MS);
    });
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [text]);

  const duration = Math.min(WRITE_MAX_MS, Math.max(WRITE_MIN_MS, text.length * WRITE_MS_PER_CHAR));

  return (
    <span
      className={`eh-greeting__name is-${state}`}
      style={{ '--eh-write-duration': `${duration}ms` } as React.CSSProperties}
      onAnimationEnd={() => setState('done')}
    >
      {text}
    </span>
  );
}

function CourseHeroCard({
  course,
  onStartLesson,
  animatedBackground,
}: {
  course: CourseHero;
  onStartLesson?: () => void;
  animatedBackground: boolean;
}) {
  const cardRef = React.useRef<HTMLElement>(null);
  const [onScreen, setOnScreen] = React.useState(true);

  // The background drift is paused while the card is off screen.
  React.useEffect(() => {
    const card = cardRef.current;
    if (!animatedBackground || !card || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(card);
    return () => observer.disconnect();
  }, [animatedBackground]);

  const cardClass = [
    'eh-course__card',
    animatedBackground && 'eh-course__card--animated-bg',
    animatedBackground && !onScreen && 'is-offscreen',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="eh-course">
      <article ref={cardRef} className={cardClass}>
        <div className="eh-course__media" aria-hidden="true">
          {/* image 13 and the glow are visible on tablet and mobile only (hidden in the desktop mockup) */}
          <img className="eh-course__image eh-course__image--13" src={heroImage13} alt="" />
          <div className="eh-course__image eh-course__image--31">
            <img src={heroImage31} alt="" />
            <span className="eh-course__scrim" />
          </div>
          <span className="eh-course__glow" />
        </div>

        <div className="eh-course__status">
          <span className="eh-course__category">
            <span className="eh-course__category-icon">
              <span className="eh-course__category-glyph">
                <img src={idCardUrl} width={14} height={11.2225} alt="" />
              </span>
            </span>
            <span className="eh-course__category-label">{course.category}</span>
          </span>
          <span className="eh-course__meta t-caption-default">{course.meta}</span>
        </div>

        <div className="eh-course__row">
          <div className="eh-course__info">
            <div className="eh-course__details t-caption-default">
              <span className="eh-course__detail">
                <Icon name="calendar" size={12} color="var(--eh-hero-icon)" />
                {course.deadline}
              </span>
              <img className="eh-course__dot" src={dotUrl} width={4} height={4} alt="" />
              <span className="eh-course__detail">
                <Icon name="clock" size={12} color="var(--eh-hero-icon)" />
                {course.duration}
              </span>
            </div>

            <div className="eh-course__name">
              <h2 className="eh-course__title">{course.title}</h2>
              <p className="eh-course__description t-caption-default">{course.description}</p>
              <button type="button" className="eh-course__more t-caption-default">
                Подробнее
                <Icon name="chevron-down" size={16} color="currentColor" />
              </button>
              <div className="eh-course__rewards">
                <Tag kind="xp" value={course.xp} />
                <Tag kind="coins" value={course.coins} />
              </div>
            </div>
          </div>

          <div className="eh-lesson">
            <span
              className="eh-lesson__icon"
              aria-hidden="true"
              style={{ '--eh-lesson-icon': `url("${phishingIconUrl}")` } as React.CSSProperties}
            />
            <div className="eh-lesson__title">
              <p className="eh-lesson__overline t-label-small">{course.lesson.label}</p>
              <h3 className="eh-lesson__heading">{course.lesson.title}</h3>
            </div>
            <Button fullWidth onClick={onStartLesson}>
              Начать урок
            </Button>
          </div>
        </div>
      </article>

      <span className="eh-course__layer eh-course__layer--1" aria-hidden="true" />
      <span className="eh-course__layer eh-course__layer--2" aria-hidden="true" />
    </div>
  );
}
