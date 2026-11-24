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
          'под шапкой — прогресс чтения, после 800px появляется кнопка «Наверх», фон с пятнами гаснет за первые 700px.',
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

/** Тема берётся из переключателя «Тема» в панели Storybook или из меню профиля. */
export const ThemeSwitch: Story = {
  name: 'Desktop 1920 · Theme switch',
};
