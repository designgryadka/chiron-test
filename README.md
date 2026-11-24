# Chiron · Storybook

Дизайн-система Chiron: токены (Light / Dark), иконки, кнопка, теги XP и монет, шапка.
Стек: React 18 + TypeScript + Vite + Storybook 9.

## Запуск

```bash
cd chiron-storybook
npm install
npm run storybook     # http://localhost:6006
```

Сборка статической версии: `npm run build-storybook` (результат — `storybook-static/`).
Тема переключается в панели Storybook (иконка «Тема»).

## Что внутри

| Раздел Storybook | Откуда |
|---|---|
| Foundations / Colors | Figma: коллекции `Chiron · Primitives` и `Chiron · Colors` (только Light и Dark) |
| Foundations / Typography | Figma: текстовые стили `Chiron/*` (без `v2`) |
| Foundations / Spacing & Radius | Figma: коллекция `Chiron · Layout`, effect-стили |
| Foundations / Icons | архив `Chiron icons.zip` + набор иконок из Figma (node 30:43), 33 SVG |
| Components / Button | кнопка: Default, Hover, Active, Focus, Disabled |
| Components / Tag | теги XP и монет |
| Components / Header | шапка + Nav item |
| Components / ProfileMenu | меню профиля: переход в профиль (пока неактивен) и переключатель темы |
| Components / Callout, TableOfContents, MoodRating | выноска, содержание урока, оценка занятия (Figma: урок 288:8652) |

## Токены

CSS-переменные лежат в `src/tokens/` и **генерируются из Figma** (не правьте вручную):

- `primitives.css` — `--cobalt-550`, `--neutral-25`, `--alpha-white-10` …
- `colors.css` — `--color-bg-brand`, `--color-text-primary` … Светлая тема — `:root`, тёмная — `[data-theme="dark"]`.
- `layout.css` — `--space-*`, `--radius-*`, `--stroke-*`, `--shadow-*`.
- `typography.css` — `--font-heading`, `--font-body` и классы `.t-heading-h1`, `.t-body-default` …
- `tokens.generated.ts` — список токенов для страниц Foundations.

Чтобы включить тёмную тему в своём приложении: `document.documentElement.dataset.theme = 'dark'`.

## Шрифты

- **Inter** подключается из npm (`@fontsource/inter`, начертания 300–600).
- **Gilroy** (заголовки, логотип) и **Fet** (имя в приветствии) — лицензионные, файлы лежат в `src/styles/fonts/`
  и подключаются в `src/styles/gilroy.css` и `src/styles/fet.css`. Если шрифт установлен в системе, берётся системная копия.

## Иконки

Иконки из архива лежат в `src/icons/svg/`, заливки заменены на `currentColor`, поэтому цвет берётся из токена
(`color="var(--color-icon-brand)"`). Три значка, которых нет в архиве, нарисованы вручную по макету и лежат в
`src/icons/glyphs.tsx`: стрелка кнопки, молния XP, монета.

## Страницы

| Раздел Storybook | Откуда |
|---|---|
| Pages / Главная сотрудника | Figma: «Chiron · Главная сотрудника», 1920 × 1074 — тёмная (239:7913) и светлая (228:4162) темы; тема переключается в меню профиля |
| Pages / Урок | Figma: «Chiron · Урок 6 · Как распознать фишинговое письмо» (288:8652), перенос `lesson.html`: закреплённые шапка и левая колонка, подсветка содержания при скролле, прогресс чтения, кнопка «Наверх», затухающий фон |


## Code Connect

Шаблоны лежат в `src/figma/*.figma.ts` (Button / Primary, Nav item, иконки calendar и clock), конфиг — `figma.config.json`.
Проверка: `npx figma connect parse`. Публикация в Figma: `npx figma connect publish` (нужен токен `FIGMA_ACCESS_TOKEN` и тариф Organization или Enterprise).
