import type { Meta, StoryObj } from '@storybook/react-vite';
import { LessonPage } from './Lesson';

const meta = {
  title: 'Pages/Урок',
  component: LessonPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Страница урока «Как распознать фишинговое письмо» (Figma 288:8652), перенесена из lesson.html. ' +
          'Шапка и левая колонка закреплены при скролле, пункт содержания подсвечивается по текущему разделу, ' +
          'под шапкой — прогресс чтения, после 800px появляется кнопка «Наверх», фон с пятнами гаснет за первые 700px. ' +
          'Адаптив: до 1231px — одна колонка (планшет, Figma 301:9293), до 767px — мобильная вёрстка (Figma 301:9853); ' +
          'меню разделов уходит под бургер, содержание урока скрыто, виджеты встают в поток текста.',
      },
    },
  },
} satisfies Meta<typeof LessonPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Как в макете: тёмная тема. */
export const Dark: Story = {
  name: 'Desktop 1920 · Dark',
  globals: { theme: 'dark' },
};

/** Светлая тема: токены Light из Figma, стили по светлому макету урока (262:7235). */
export const Light: Story = {
  name: 'Desktop 1920 · Light',
  globals: { theme: 'light' },
};

/** Планшет (Figma 301:9293): одна колонка, меню разделов под бургером, виджеты в потоке текста. */
export const TabletDark: Story = {
  name: 'Планшет 768 · Dark',
  globals: { theme: 'dark', viewport: { value: 'tablet768', isRotated: false } },
};

export const TabletLight: Story = {
  name: 'Планшет 768 · Light',
  globals: { theme: 'light', viewport: { value: 'tablet768', isRotated: false } },
};

/** Мобильный (Figma 301:9853): заголовки на ступень меньше, плитки списком, кнопки во всю ширину. */
export const MobileDark: Story = {
  name: 'Мобильный 390 · Dark',
  globals: { theme: 'dark', viewport: { value: 'mobile390', isRotated: false } },
};

export const MobileLight: Story = {
  name: 'Мобильный 390 · Light',
  globals: { theme: 'light', viewport: { value: 'mobile390', isRotated: false } },
};

/** Тема берётся из переключателя «Тема» в панели Storybook или из меню профиля. */
export const ThemeSwitch: Story = {
  name: 'Desktop 1920 · Theme switch',
};
