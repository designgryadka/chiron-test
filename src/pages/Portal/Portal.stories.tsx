import type { Meta, StoryObj } from '@storybook/react-vite';
import { Portal } from './Portal';

const meta = {
  title: 'Pages/Портал',
  component: Portal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Главная и страница урока вместе: «Начать урок» на главной открывает урок, «Назад» на уроке возвращает на главную. ' +
          'Текущая страница хранится в адресе (#lesson), так что работает и кнопка «Назад» браузера.',
      },
    },
  },
} satisfies Meta<typeof Portal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {
  name: 'Главная → урок · Dark',
  globals: { theme: 'dark' },
};

export const Light: Story = {
  name: 'Главная → урок · Light',
  globals: { theme: 'light' },
};
