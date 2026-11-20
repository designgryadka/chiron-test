import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileMenu, type ThemeName } from './ProfileMenu';

const meta = {
  title: 'Components/ProfileMenu',
  component: ProfileMenu,
  tags: ['autodocs'],
  args: {
    theme: 'light',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Дропдаун профиля, открывается по клику на аватар в шапке. Пункт «Профиль» пока неактивен ' +
          '(`aria-disabled`). Переключатель темы — сегментированный контрол (`role="radiogroup"`). ' +
          'Стили: `bg/surface`, `border/default`, `radius/20`, тень Raised-L.',
      },
    },
  },
} satisfies Meta<typeof ProfileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interactive: Story = {
  render: (args) => {
    const [theme, setTheme] = useState<ThemeName>('light');
    return (
      <div data-theme={theme} style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
        <ProfileMenu {...args} theme={theme} onThemeChange={setTheme} />
      </div>
    );
  },
};
