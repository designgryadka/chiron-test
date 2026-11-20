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
          'Макет нарисован в тёмной теме — переключите тему в панели Storybook.',
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

/** Тема берётся из переключателя «Тема» в панели Storybook. */
export const Desktop1920: Story = {
  name: 'Desktop 1920 · Theme switch',
};
