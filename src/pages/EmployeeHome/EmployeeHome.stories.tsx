import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmployeeHome } from './EmployeeHome';

const meta = {
  title: 'Pages/Главная сотрудника',
  component: EmployeeHome,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Главная страница сотрудника, Desktop 1920 (Figma: «Chiron · Главная сотрудника · Desktop 1475»). ' +
          'Тема переключается в меню профиля (клик по аватару) или в панели Storybook.',
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
};

/** Светлая тема (Figma 228:4162). */
export const Desktop1920Light: Story = {
  name: 'Desktop 1920 · Light',
  globals: { theme: 'light' },
};

/** Как в макете, но фон в карточке курса статичный (вариант до анимации фона). */
export const Desktop1920StaticBackground: Story = {
  name: 'Desktop 1920 · Dark · Static background',
  globals: { theme: 'dark' },
  args: { animatedBackground: false },
};

/** Тема берётся из переключателя «Тема» в панели Storybook. */
export const Desktop1920: Story = {
  name: 'Desktop 1920 · Theme switch',
};
