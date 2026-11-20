import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header, defaultNavItems } from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Шапка: логотип (Gilroy Bold 32), навигация (Nav item: default / hover / active) и профиль с тегами XP и монет. ' +
          'Шапка — «таблетка» (`radius/999`): в светлой теме белая (`bg/surface`), в тёмной — чёрная 30%. ' +
          'Если передать `onThemeChange`, аватар открывает меню профиля с переключателем темы.',
      },
    },
  },
  args: {
    items: defaultNavItems,
    activeId: 'learning',
    user: { name: 'Ирина Петрова' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithRewards: Story = {
  name: 'With XP and coins',
  args: { xp: 120, coins: 30 },
};

export const Interactive: Story = {
  name: 'Interactive navigation',
  parameters: { controls: { disable: true } },
  render: (args) => {
    const [active, setActive] = useState('learning');
    return <Header {...args} activeId={active} onNavigate={setActive} />;
  },
};

export const ActiveItem: Story = {
  args: { activeId: 'knowledge' },
};

export const WithProfileMenu: Story = {
  name: 'Profile menu (click the avatar)',
  parameters: { controls: { disable: true } },
  render: (args) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    return (
      <div data-theme={theme} style={{ padding: 16, minHeight: 360, background: 'var(--color-bg-canvas)' }}>
        <Header {...args} theme={theme} onThemeChange={setTheme} />
      </div>
    );
  },
};
