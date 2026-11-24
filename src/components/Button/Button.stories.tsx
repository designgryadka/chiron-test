import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { ArrowLeftGlyph } from '../../icons/glyphs';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Начать курс', showArrow: true, disabled: false },
  argTypes: {
    state: { control: 'select', options: [undefined, 'hover', 'active', 'focus'] },
    variant: { control: 'inline-radio', options: ['primary', 'secondary'] },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Основная кнопка. Состояния: **Default**, **Hover** (`bg/brand-hover`), **Active** (`bg/brand-pressed`), ' +
          '**Focus** (кольцо `border/focus`), **Disabled** (`bg/brand-disabled`). ' +
          'При наведении стрелка плавно сдвигается вправо на 10px. ' +
          'Проп `state` принудительно включает состояние — нужен только для документации; в продукте состояния работают сами.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Hover: Story = { args: { state: 'hover' } };

export const Active: Story = { args: { state: 'active' } };

export const Focus: Story = { args: { state: 'focus' } };

export const Disabled: Story = { args: { disabled: true } };

export const WithoutArrow: Story = { args: { showArrow: false } };

export const LessonLabel: Story = {
  name: 'Label: «Начать урок»',
  args: { children: 'Начать урок' },
};

export const Secondary: Story = {
  name: 'Secondary (back)',
  args: { variant: 'secondary', children: 'Предыдущий урок', leadingIcon: <ArrowLeftGlyph /> },
};

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, auto)', gap: 32, alignItems: 'center' }}>
      {(['Default', 'Hover', 'Active', 'Focus', 'Disabled'] as const).map((label) => (
        <div key={label} style={{ display: 'grid', gap: 12, justifyItems: 'center' }}>
          <Button
            state={label === 'Hover' ? 'hover' : label === 'Active' ? 'active' : label === 'Focus' ? 'focus' : undefined}
            disabled={label === 'Disabled'}
          />
          <span className="t-caption-default" style={{ color: 'var(--color-text-secondary)' }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  ),
};
