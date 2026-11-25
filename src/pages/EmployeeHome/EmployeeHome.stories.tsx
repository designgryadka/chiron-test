import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmployeeHome } from './EmployeeHome';
import { goToStory } from '../storyNavigation';

const lesson = (story: string) => () => goToStory(`pages-урок--${story}`);

const meta = {
  title: 'Pages/Главная сотрудника',
  component: EmployeeHome,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Главная страница сотрудника (Figma: Desktop 285:8564, Планшет 768 301:9059, Мобильный 390 301:9178). ' +
          'Тема переключается в меню профиля (клик по аватару) или в панели Storybook. ' +
          '«Начать урок» открывает страницу урока того же размера и в той же теме.',
      },
    },
  },
  args: { userName: 'Виктория' },
} satisfies Meta<typeof EmployeeHome>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Как в макете: тёмная тема. */
export const Desktop1920Dark: Story = {
  name: 'Desktop 1920 · Dark',
  globals: { theme: 'dark' },
  args: { onStartLesson: lesson('dark') },
};

/** Светлая тема: те же токены в режиме Light. */
export const Desktop1920Light: Story = {
  name: 'Desktop 1920 · Light',
  globals: { theme: 'light' },
  args: { onStartLesson: lesson('light') },
};

/** Как в макете, но фон в карточке курса статичный (без анимации). */
export const Desktop1920StaticBackground: Story = {
  name: 'Desktop 1920 · Dark · Static background',
  globals: { theme: 'dark' },
  args: { animatedBackground: false, onStartLesson: lesson('dark') },
};

/** Планшет (Figma 301:9059). */
export const Tablet768Dark: Story = {
  name: 'Планшет 768 · Dark',
  globals: { theme: 'dark', viewport: { value: 'tablet768', isRotated: false } },
  args: { onStartLesson: lesson('tablet-dark') },
};

export const Tablet768Light: Story = {
  name: 'Планшет 768 · Light',
  globals: { theme: 'light', viewport: { value: 'tablet768', isRotated: false } },
  args: { onStartLesson: lesson('tablet-light') },
};

/** Мобильный (Figma 301:9178): карточка урока над описанием курса. */
export const Mobile390Dark: Story = {
  name: 'Мобильный 390 · Dark',
  globals: { theme: 'dark', viewport: { value: 'mobile390', isRotated: false } },
  args: { onStartLesson: lesson('mobile-dark') },
};

export const Mobile390Light: Story = {
  name: 'Мобильный 390 · Light',
  globals: { theme: 'light', viewport: { value: 'mobile390', isRotated: false } },
  args: { onStartLesson: lesson('mobile-light') },
};

/** Тема берётся из переключателя «Тема» в панели Storybook. */
export const Desktop1920: Story = {
  name: 'Desktop 1920 · Theme switch',
  args: { onStartLesson: lesson('theme-switch') },
};
