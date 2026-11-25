import React from 'react';
import { Header, defaultNavItems, type HeaderProps } from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import { Tag } from '../../components/Tag/Tag';
import { Backdrop } from '../../components/Backdrop/Backdrop';
import { Callout } from '../../components/Callout/Callout';
import { TableOfContents, type TocItem } from '../../components/TableOfContents/TableOfContents';
import { MoodRating } from '../../components/MoodRating/MoodRating';
import { Icon, type IconName } from '../../icons/Icon';
import { ArrowLeftGlyph, CheckSmallGlyph } from '../../icons/glyphs';
import { usePageTheme, type ThemeName } from '../../hooks/usePageTheme';
import avatarUrl from '../../assets/avatar.png';
import heroImage31 from '../EmployeeHome/assets/hero-image-31.png';
import image40 from './assets/image-40.png';
import './Lesson.css';

/* Figma: «Chiron · Урок 6 · Как распознать фишинговое письмо» (node 288:8652), dark theme.
   Ported from lesson.html: sticky header and left column, TOC scroll-spy, reading
   progress bar, «back to top» button, background fading out on scroll. */

export interface LessonPageProps {
  user?: HeaderProps['user'];
  /** Initial theme. By default it is taken from `<html data-theme>`. */
  defaultTheme?: ThemeName;
  onThemeChange?: (theme: ThemeName) => void;
  onNavigate?: (id: string) => void;
  /** «Назад»: back to the employee home page. */
  onBack?: () => void;
  /** Logo click: the employee home page (falls back to `onBack`). */
  onHome?: () => void;
}

export const lessonToc: TocItem[] = [
  { id: 's1', label: 'Что такое фишинг?' },
  { id: 's2', label: 'Почему письма работают' },
  { id: 's3', label: '5 признаков фишинга' },
  { id: 's4', label: 'Разбор письма' },
  { id: 's5', label: 'Что делать' },
  { id: 's6', label: 'Ситуация с руководителем' },
  { id: 's7', label: 'Проверка ссылки' },
  { id: 's8', label: 'Чек-лист' },
  { id: 's9', label: 'Главное из урока' },
];

/* Scroll behaviour (values from lesson.html) */
const SPY_LINE = 0.38; // a section is active once its top passes 38% of the viewport
const PROGRESS_SHOW_AFTER = 8; // px
const TO_TOP_SHOW_AFTER = 800; // px
const BACKDROP_FADE_DISTANCE = 700; // px: backdrop opacity 1 → 0

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Scroll-driven state: active TOC item, reading progress, «to top» button, backdrop fade. */
function useLessonScroll(sectionIds: string[]) {
  const [activeId, setActiveId] = React.useState(sectionIds[0]);
  const [progressVisible, setProgressVisible] = React.useState(false);
  const [toTopVisible, setToTopVisible] = React.useState(false);
  const progressFill = React.useRef<HTMLSpanElement>(null);
  const progressBar = React.useRef<HTMLDivElement>(null);
  const backdrop = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

      // Written straight to the DOM: these change on every frame.
      // Width rather than scaleX: the rounded ends and the glow keep their shape.
      if (progressFill.current) progressFill.current.style.width = `${(progress * 100).toFixed(3)}%`;
      progressBar.current?.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
      if (backdrop.current) {
        backdrop.current.style.opacity = Math.max(0, 1 - y / BACKDROP_FADE_DISTANCE).toFixed(3);
      }
      setProgressVisible(y > PROGRESS_SHOW_AFTER);
      setToTopVisible(y > TO_TOP_SHOW_AFTER);

      // Scroll-spy: the last section whose top is above the line; at the very bottom — the last one.
      const line = window.innerHeight * SPY_LINE;
      let active = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) active = id;
      }
      if (window.innerHeight + y >= doc.scrollHeight - 4) active = sectionIds[sectionIds.length - 1];
      setActiveId(active);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [sectionIds]);

  const scrollToSection = React.useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, []);

  const scrollToTop = React.useCallback(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, []);

  return { activeId, progressVisible, toTopVisible, progressFill, progressBar, backdrop, scrollToSection, scrollToTop };
}

/* ---------- Small content blocks ---------- */

function NumberedPoint({ n, danger, children }: { n: number; danger?: boolean; children: React.ReactNode }) {
  return (
    <div className="lp-point">
      <span className={['lp-marker', danger && 'lp-marker--danger'].filter(Boolean).join(' ')}>{n}</span>
      {children}
    </div>
  );
}

function TitledPoint({ n, title, text, danger }: { n: number; title: string; text: string; danger?: boolean }) {
  return (
    <div className="lp-point lp-point--center">
      <span className={['lp-marker', danger && 'lp-marker--danger'].filter(Boolean).join(' ')}>{n}</span>
      <p className="lp-point__text lp-point__text--titled">
        <span className="lp-point__title">{title}</span>
        <span className="lp-point__note">{text}</span>
      </p>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="lp-step">
      <span className="lp-step__n">{n}</span>
      <div className="lp-step__text">
        <p className="lp-step__title t-body-emphasis">{title}</p>
        <p className="lp-step__desc lp-body-small">{children}</p>
      </div>
    </div>
  );
}

function Tile({ icon, children }: { icon: IconName; children: React.ReactNode }) {
  return (
    <div className="lp-tile">
      <span className="lp-icon-box">
        <Icon name={icon} size={20} color="var(--color-icon-primary)" />
      </span>
      <p className="lp-body-small">{children}</p>
    </div>
  );
}

function Address({ ok, url, children }: { ok: boolean; url: string; children: React.ReactNode }) {
  return (
    <div className="lp-row-card">
      <Icon name={ok ? 'checkmark' : 'cancel'} size={16} color={ok ? 'var(--lp-success)' : 'var(--lp-danger)'} />
      <div className="lp-address">
        <p className={['lp-address__url', ok ? 'is-ok' : 'is-bad'].join(' ')}>{url}</p>
        <p className="lp-address__note t-caption-default">{children}</p>
      </div>
    </div>
  );
}

function SideWidget({
  label,
  icon,
  title,
  kind,
  offset = 0,
  inline = false,
}: {
  label: string;
  icon: IconName;
  title: React.ReactNode;
  kind: string;
  /** Distance from the section top, px (as placed in Figma). */
  offset?: number;
  /** In the text flow (narrower screens) instead of the column to the right of the text. */
  inline?: boolean;
}) {
  return (
    <aside
      className={['lp-aside', inline ? 'lp-aside--inline' : 'lp-aside--side'].join(' ')}
      aria-label={label}
      style={inline ? undefined : { top: offset }}
    >
      <p className="lp-aside__label t-overline">{label}</p>
      <div className="lp-aside__row">
        <span className="lp-aside__icon">
          <Icon name={icon} size={20} color="var(--color-icon-primary)" />
        </span>
        <div className="lp-aside__text">
          <p className="lp-body-small">{title}</p>
          <span className="t-caption-default">{kind}</span>
        </div>
      </div>
    </aside>
  );
}

/* Side widgets: to the right of the text on wide screens, in the text flow below 1600px. */
const articleWidget = {
  label: 'Дополнительно',
  icon: 'news',
  title: (
    <>
      Тут название статьи
      <br className="lp-br-wide" />
      из базы знаний
    </>
  ),
  kind: 'Статья',
} as const;

const checklistWidget = {
  label: 'Памятка',
  icon: 'checklist',
  title: 'Чек-лист перед открытием письма',
  kind: 'Краткая памятка',
} as const;

/* ---------- Page ---------- */

export function LessonPage({
  user = { name: 'Ирина Петрова', avatarUrl },
  defaultTheme,
  onThemeChange,
  onNavigate,
  onBack,
  onHome = onBack,
}: LessonPageProps) {
  const [theme, setTheme] = usePageTheme(defaultTheme, onThemeChange);
  const sectionIds = React.useMemo(() => lessonToc.map((item) => item.id), []);
  const scroll = useLessonScroll(sectionIds);
  const [rating, setRating] = React.useState<number>();

  return (
    <div className="lp" data-theme={theme}>
      <div ref={scroll.backdrop} className="lp__backdrop">
        <Backdrop />
      </div>

      <div
        ref={scroll.progressBar}
        className={['lp-progress', scroll.progressVisible && 'is-visible'].filter(Boolean).join(' ')}
        role="progressbar"
        aria-label="Прогресс прокрутки страницы"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
      >
        <span ref={scroll.progressFill} className="lp-progress__fill" />
      </div>

      <div className="lp__top">
        <Header
          className="lp__header"
          items={defaultNavItems}
          activeId="learning"
          onNavigate={onNavigate}
          user={user}
          theme={theme}
          onThemeChange={setTheme}
          onLogoClick={onHome}
        />
      </div>

      <div className="lp__workspace">
        {/* Left column (sticky) */}
        <div className="lp-nav">
          <div className="lp-course">
            <Button
              variant="secondary"
              className="lp-back"
              onClick={onBack}
              leadingIcon={<Icon name="arrow-left" size={16} color="currentColor" />}
            >
              Назад
            </Button>
            <div className="lp-course__name">
              <span className="lp-course__meta t-caption-default">
                <Icon name="clock" size={12} color="var(--color-icon-primary)" />
                Модуль 2 · 40 минут
              </span>
              <h2 className="lp-course__title lp-heading-hero">Основы кибербезопасности</h2>
              {/* Mobile: course and module as breadcrumbs instead of the meta line and title */}
              <p className="lp-course__crumbs t-caption-default">
                <span>Основы кибербезопасности</span>
                <span aria-hidden="true">/</span>
                <span>Модуль 2</span>
              </p>
            </div>
            <div className="lp-course__rewards">
              <Tag kind="xp" value={30} />
              <Tag kind="coins" value={30} />
            </div>
            <div className="lp-course__progress">
              <div className="lp-bars" role="img" aria-label="Прогресс по модулям: 1 из 8 пройден, 2-й начат">
                <i className="lp-bars__item is-fixed is-done" />
                <i className="lp-bars__item is-fixed is-started" />
                <i className="lp-bars__item" />
                <i className="lp-bars__item is-fixed" />
                <i className="lp-bars__item is-fixed" />
                <i className="lp-bars__item" />
                <i className="lp-bars__item" />
                <i className="lp-bars__item" />
              </div>
              <p className="lp-course__note t-caption-default">0 из 5 уроков модуля пройдено</p>
            </div>
            <button type="button" className="lp-more t-caption-default">
              Подробнее
              <Icon name="chevron-down" size={16} color="currentColor" />
            </button>
          </div>

          <TableOfContents items={lessonToc} activeId={scroll.activeId} onSelect={scroll.scrollToSection} />
        </div>

        {/* Lesson */}
        <main className="lp-lesson">
          <div className="lp-intro">
            <div className="lp-intro__title">
              <span className="lp-chip">Модуль 2 · Теория и практика</span>
              <h1 className="lp-heading-h1">Как распознать фишинговое письмо</h1>
            </div>
            <p className="t-body-large">
              Научитесь отличать настоящие сообщения от поддельных, проверять ссылки и правильно реагировать на попытки
              мошенничества.
            </p>
          </div>

          {/* 1 */}
          <section className="lp-sec" id="s1">
            <h2 className="lp-heading-h2">Что такое фишинг?</h2>
            <p className="lp-body-lead">
              Представьте: утром вы открываете рабочую почту и видите письмо от IT-отдела. В сообщении говорится, что
              срок действия вашего корпоративного пароля истекает через час. Чтобы сохранить доступ к системе,
              необходимо срочно перейти по ссылке и подтвердить учётную запись.
            </p>
            <p className="lp-body-lead">
              Письмо выглядит убедительно: знакомый логотип, официальный стиль, подпись технической поддержки. Но за
              кнопкой «Подтвердить аккаунт» скрывается поддельный сайт, который собирает логины и пароли сотрудников.
              Это типичный пример фишинга.
            </p>
            <p className="lp-body-lead">
              Фишинг — вид интернет-мошенничества, при котором злоумышленники выдают себя за доверенную организацию или
              человека, чтобы получить конфиденциальную информацию, деньги либо заставить жертву выполнить опасное
              действие.
            </p>
            <p className="lp-heading-h4">Чаще всего атакующие пытаются получить:</p>
            <div className="lp-tiles">
              <Tile icon="key">
                Логины и пароли
                <br />
                от рабочих аккаунтов
              </Tile>
              <Tile icon="pin">Одноразовые коды подтверждения входа</Tile>
              <Tile icon="card">
                Банковские реквизиты
                <br />и платёжные данные
              </Tile>
              <Tile icon="user-card-2">Персональные данные сотрудников и клиентов</Tile>
              <Tile icon="doc-attach">Доступ к корпоративным документам и внутренним системам</Tile>
            </div>
            <p className="lp-body-lead">
              Фишинговые атаки не ограничиваются электронной почтой. Поддельные сообщения могут приходить через SMS,
              Telegram, корпоративные мессенджеры и социальные сети. Иногда злоумышленники звонят по телефону,
              представляясь технической поддержкой или руководителем компании.
            </p>
            <Callout label="Запомните">
              Главная цель фишинга — не обязательно взломать устройство техническим способом. Часто злоумышленнику
              достаточно убедить человека добровольно раскрыть пароль, открыть файл или подтвердить вход.
            </Callout>
          </section>

          <SideWidget {...articleWidget} inline />

          {/* 2 */}
          <section className="lp-sec" id="s2">
            <SideWidget {...articleWidget} offset={4} />
            <h2 className="lp-heading-h2">Почему фишинговые письма работают?</h2>
            <p className="lp-body-lead">
              Современные фишинговые сообщения бывают практически неотличимы от настоящих. Злоумышленники копируют
              фирменный стиль компаний, подделывают имена отправителей и используют информацию из открытых источников.
            </p>
            <p className="lp-body-lead">
              Например, мошенник может узнать из социальных сетей, что сотрудник недавно перешёл в новый отдел, а затем
              отправить письмо якобы от HR с предложением заполнить обязательную форму.
            </p>
            <p className="lp-body-lead">Особенно часто используются психологические приёмы:</p>
            <div className="lp-list">
              <NumberedPoint n={1}>
                <p className="lp-point__text lp-body-lead">Срочность. «Ваш аккаунт будет заблокирован через 30 минут».</p>
              </NumberedPoint>
              <NumberedPoint n={2}>
                <p className="lp-point__text lp-body-lead">
                  Страх. «Обнаружена подозрительная активность. Немедленно подтвердите личность».
                </p>
              </NumberedPoint>
              <NumberedPoint n={3}>
                <p className="lp-point__text lp-body-lead">Авторитет. «Руководитель поручил срочно отправить документы».</p>
              </NumberedPoint>
              <NumberedPoint n={4}>
                <p className="lp-point__text lp-body-lead">Любопытство. «Посмотрите обновлённый список премий сотрудников».</p>
              </NumberedPoint>
              <NumberedPoint n={5}>
                <p className="lp-point__text lp-body-lead">Выгода. «Вам доступна компенсация расходов. Получите выплату сегодня».</p>
              </NumberedPoint>
            </div>
            <p className="lp-body-lead">
              Все эти приёмы направлены на то, чтобы человек принял решение эмоционально и не успел проверить
              информацию.
            </p>
            <img
              className="lp-illustration"
              src={image40}
              width={650}
              height={433}
              alt="Иллюстрация: фишинговое письмо давит срочностью и просит открыть ссылку"
            />
            <div className="lp-scheme">Знакомое имя → Срочность → Просьба открыть ссылку или файл</div>
          </section>

          {/* 3 */}
          <section className="lp-sec" id="s3">
            <h2 className="lp-heading-h2">5 признаков фишингового письма</h2>
            <p className="lp-body-lead">
              Не существует единственного признака, который гарантированно указывает на мошенничество. Но сочетание
              нескольких подозрительных деталей — веская причина остановиться и проверить сообщение.
            </p>
            <Step n={1} title="Подозрительный адрес отправителя">
              Имя отправителя может выглядеть совершенно нормально: «IT Support», «HR Department» или «Корпоративная
              безопасность». Однако реальный адрес часто отличается от официального домена компании.
            </Step>
            <div className="lp-sender t-caption-default">
              <div className="lp-sender__row">
                <span>Имя отправителя</span>
                <span>IT Support</span>
              </div>
              <div className="lp-sender__row">
                <span>Адрес отправителя</span>
                <span>support@corp-security.example</span>
              </div>
              <div className="lp-sender__row">
                <span>Официальный домен компании в учебном сценарии</span>
                <span>company.example</span>
              </div>
            </div>
            <Step n={2} title="Давление и требование немедленных действий">
              Фразы вроде «Последнее предупреждение», «Срочно подтвердите» и «Доступ будет закрыт» часто используются,
              чтобы заставить сотрудника действовать без проверки. Если вас одновременно торопят и просят открыть
              неизвестную ссылку, стоит проявить осторожность.
            </Step>
            <Step n={3} title="Ссылки на поддельные сайты">
              Текст ссылки и фактический адрес назначения могут различаться. На компьютере можно навести курсор на
              ссылку, не нажимая её, и посмотреть адрес назначения. Если вы сомневаетесь, лучше самостоятельно открыть
              корпоративный портал через сохранённую закладку.
            </Step>
            <Step n={4} title="Неожиданные вложения">
              Мошенники могут отправлять документы под видом счетов, актов, отчётов или служебных инструкций. Особого
              внимания требуют неожиданные архивы, исполняемые файлы и документы, предлагающие включить макросы либо
              отключить защиту.
            </Step>
            <Step n={5} title="Необычные просьбы и несоответствие контексту">
              Вам пришёл счёт от поставщика, с которым вы никогда не работали? Коллега неожиданно просит прислать код
              подтверждения? Такие ситуации необходимо проверять через независимый канал связи.
            </Step>
          </section>

          {/* 4 */}
          <section className="lp-sec" id="s4">
            <h2 className="lp-heading-h2">Разберём реальное по форме мошенническое письмо</h2>
            <p className="lp-body-lead">
              Ниже — учебный пример, составленный по типичным корпоративным сценариям. Все имена, адреса и события
              вымышлены.
            </p>
            <div className="lp-mail">
              <div className="lp-mail__head t-caption-default">
                <span className="lp-mail__from">
                  <Icon name="mail-receive" size={16} color="var(--color-icon-secondary)" />
                  ВХОДЯЩЕЕ ПИСЬМО
                </span>
                <span>2 минуты назад</span>
              </div>
              <div className="lp-mail__body">
                <div className="lp-mail__field lp-body-small">
                  <span className="lp-mail__key">Отправитель</span>
                  <span className="lp-mail__value">Корпоративная поддержка &lt;support@corp-security.example&gt;</span>
                </div>
                <div className="lp-mail__field lp-body-small">
                  <span className="lp-mail__key">Тема</span>
                  <span className="lp-mail__value lp-mail__value--strong">СРОЧНО: Доступ к учётной записи</span>
                </div>
                <div className="lp-mail__text">
                  <p className="lp-body-lead">
                    «Обнаружена подозрительная активность. Через 30 минут доступ
                    <br />к корпоративной почте будет ограничен».
                  </p>
                  <span className="lp-mail__button t-caption-default">Подтвердить учётную запись</span>
                  <p className="t-caption-default">
                    Если проверка не будет завершена, доступ к корпоративной почте и внутренним системам будет
                    ограничен.
                  </p>
                </div>
                <div className="lp-mail__sign t-caption-default">
                  <p>С уважением,</p>
                  <p>Отдел информационной безопасности</p>
                </div>
              </div>
            </div>
            <h3 className="lp-heading-h3">Что здесь подозрительно?</h3>
            <div className="lp-list lp-list--12">
              <TitledPoint n={1} danger title="Отправитель" text="Полный адрес отличается от адресов компании." />
              <TitledPoint
                n={2}
                danger
                title="Срочность"
                text="Угроза блокировки через 30 минут мешает спокойно проверить сообщение."
              />
              <TitledPoint
                n={3}
                danger
                title="Просьба"
                text="Письмо требует подтвердить учётную запись по ссылке из сообщения."
              />
              <TitledPoint
                n={4}
                danger
                title="Адрес назначения"
                text="В письме указан вымышленный домен, отличный от корпоративного company.example."
              />
            </div>
          </section>

          {/* 5 */}
          <section className="lp-sec" id="s5">
            <SideWidget {...checklistWidget} offset={19} />
            <h2 className="lp-heading-h2">Что делать, если вы получили подозрительное письмо?</h2>
            <p className="lp-body-lead">
              Представьте, что письмо пришло от человека, которого вы знаете. Имя выглядит правильно, стиль общения
              привычный, но внутри неожиданная просьба открыть документ. В этой ситуации важно не пытаться
              самостоятельно доказать, что сообщение безопасно, а действовать по установленной процедуре.
            </p>
            <div className="lp-list lp-list--12">
              <TitledPoint
                n={1}
                title="Не переходите по ссылкам и не открывайте вложения"
                text="Пока подлинность сообщения не подтверждена, не выполняйте запрошенные действия."
              />
              <TitledPoint
                n={2}
                title="Проверьте отправителя и содержание"
                text="Сравните адрес, тему и просьбу с тем, что обычно происходит в рабочих процессах."
              />
              <TitledPoint
                n={3}
                title="Свяжитесь с отправителем другим способом"
                text="Позвоните по известному номеру или напишите в уже существующий корпоративный чат."
              />
              <TitledPoint
                n={4}
                title="Сообщите в службу информационной безопасности"
                text="Используйте корпоративную кнопку «Сообщить о фишинге» либо установленный канал обращения."
              />
              <TitledPoint
                n={5}
                title="Следуйте инструкциям специалистов"
                text="Не пересылайте подозрительное письмо другим коллегам без необходимости."
              />
            </div>
            <Callout label="Если вы уже перешли по ссылке">
              Не скрывайте произошедшее. Даже если вы не вводили пароль, сообщите специалистам. Если вы ввели пароль или
              код подтверждения, немедленно уведомите службу безопасности и следуйте её процедуре защиты аккаунта.
            </Callout>
          </section>

          <SideWidget {...checklistWidget} inline />

          {/* 6 */}
          <section className="lp-sec" id="s6">
            <h2 className="lp-heading-h2">Практическая ситуация: письмо от руководителя</h2>
            <p className="lp-body-lead">
              Вы работаете в финансовом отделе. В пятницу в 17:45 вам приходит письмо от директора по финансам. Тема:
              «Срочный платёж — конфиденциально».
            </p>
            <p className="lp-body-lead">
              В сообщении говорится, что необходимо перечислить аванс новому подрядчику до конца рабочего дня.
              Руководитель просит не звонить ему, поскольку находится на важной встрече. Письмо подписано его именем и
              написано грамотно. При этом реквизиты получателя отличаются от обычных, а согласование платежа не
              проводилось.
            </p>
            <h3 className="lp-heading-h3">Что должно насторожить?</h3>
            <div className="lp-list">
              {[
                'Необычное время и требование срочности.',
                'Попытка обойти стандартную процедуру согласования.',
                'Запрет связываться с руководителем.',
                'Изменённые реквизиты получателя.',
                'Отсутствие подтверждённых документов на оплату.',
              ].map((text) => (
                <div key={text} className="lp-point">
                  <span className="lp-dot" aria-hidden="true" />
                  <p className="lp-point__text lp-body-lead">{text}</p>
                </div>
              ))}
            </div>
            <p className="lp-body-lead">
              Правильное действие — не выполнять платёж до независимой проверки распоряжения и реквизитов. Это пример
              целевой социальной инженерии, при которой мошенники используют особенности внутренних процессов
              компании.
            </p>
          </section>

          {/* 7 */}
          <section className="lp-sec" id="s7">
            <h2 className="lp-heading-h2">Как выглядит безопасная проверка ссылки?</h2>
            <p className="lp-body-lead">Сравните три адреса:</p>
            <div className="lp-list lp-list--12">
              <Address ok url="https://portal.company.example/login">
                Адрес корпоративного портала из доверенной закладки в учебном примере.
              </Address>
              <Address ok={false} url="https://company-login.example/verify">
                Похожее название, но другой домен. Нельзя считать адрес корпоративным только по слову company.
              </Address>
              <Address ok={false} url="https://company.example.account-check.example/login">
                Основной домен здесь — account-check.example, а не company.example.
              </Address>
              <p className="lp-body-lead">
                Все адреса выше демонстрационные и используют зарезервированную доменную зону .example.
              </p>
            </div>
            <Callout label="HTTPS — не гарантия">
              Наличие HTTPS и значка замка означает, что соединение защищено шифрованием, но не доказывает, что сайт
              принадлежит нужной организации. Если ссылка вызывает подозрение, безопаснее открыть сервис самостоятельно
              из известного источника.
            </Callout>
          </section>

          {/* 8 */}
          <section className="lp-checklist" id="s8">
            <div className="lp-checklist__bg" aria-hidden="true">
              <img src={heroImage31} alt="" />
            </div>
            <p className="lp-checklist__title lp-heading-h2">
              Краткий чек-лист <br className="lp-br-narrow" />
              перед открытием письма
            </p>
            {[
              'Я проверил полный адрес отправителя.',
              'Я ожидал это сообщение или подтвердил его по знакомому каналу.',
              'Я сверил просьбу с обычной рабочей процедурой.',
              'Я могу открыть нужный сервис через проверенную закладку.',
              'Я знаю, куда сообщить о подозрительном письме.',
            ].map((text) => (
              <div key={text} className="lp-check-item">
                <span className="lp-check-item__mark">
                  <CheckSmallGlyph />
                </span>
                <p className="lp-body-default">{text}</p>
              </div>
            ))}
          </section>

          {/* 9 */}
          <section className="lp-sec" id="s9">
            <h2 className="lp-heading-h2">Главное из урока</h2>
            <p className="lp-body-lead">
              Фишинг — это не только подозрительные письма с ошибками. Современные мошенники умеют подделывать стиль
              общения, использовать известные бренды и создавать убедительные копии корпоративных сайтов. Чтобы снизить
              риск, придерживайтесь трёх принципов:
            </p>
            <div className="lp-list lp-list--12">
              {[
                'Проверяйте. Не доверяйте сообщению только потому, что оно выглядит официально.',
                'Не торопитесь. Срочность и давление — повод уделить проверке дополнительное внимание.',
                'Сообщайте. При обнаружении потенциальной угрозы обращайтесь к ответственным специалистам.',
              ].map((text) => (
                <div key={text} className="lp-row-card">
                  <Icon name="checkmark" size={24} color="var(--lp-success)" />
                  <p className="lp-body-lead">{text}</p>
                </div>
              ))}
            </div>
            <p className="lp-body-lead">
              Одно своевременное сообщение о подозрительном письме может помочь предотвратить аналогичную атаку на
              других сотрудников.
            </p>
          </section>

          {/* Footer */}
          <footer className="lp-foot">
            <div className="lp-done">
              <span className="lp-icon-box">
                <Icon name="education" size={20} color="var(--color-icon-primary)" />
              </span>
              <p className="lp-body-small">
                Вы познакомились с основными признаками фишинга, разобрали мошенническое письмо и изучили порядок
                действий <br />
                при обнаружении подозрительных сообщений.
              </p>
              <p className="lp-done__next t-caption-default">
                Следующий шаг — проверить знания в небольшом тесте.
                <br />
                Он займёт около 2 минут.
              </p>
            </div>
            <MoodRating value={rating} onChange={setRating} />
            <div className="lp-pager">
              <Button variant="secondary" className="lp-pager__prev" leadingIcon={<ArrowLeftGlyph />}>
                Предыдущий урок
              </Button>
              <Button>Перейти к тесту</Button>
            </div>
          </footer>
        </main>
      </div>

      <button
        type="button"
        className={['lp-to-top', scroll.toTopVisible && 'is-visible'].filter(Boolean).join(' ')}
        aria-label="Наверх"
        tabIndex={scroll.toTopVisible ? 0 : -1}
        onClick={scroll.scrollToTop}
      >
        <Icon name="to-top" size={20} color="currentColor" />
      </button>
    </div>
  );
}
