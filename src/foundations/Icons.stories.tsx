import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, iconNames, type IconName } from '../icons/Icon';
import './foundations.css';

const colorOptions = {
  'icon/primary': 'var(--color-icon-primary)',
  'icon/secondary': 'var(--color-icon-secondary)',
  'icon/muted': 'var(--color-icon-muted)',
  'icon/brand': 'var(--color-icon-brand)',
  'icon/brand-hover': 'var(--color-icon-brand-hover)',
  'icon/info': 'var(--color-icon-info)',
  'icon/danger': 'var(--color-icon-danger)',
  'icon/disabled': 'var(--color-icon-disabled)',
};

const meta = {
  title: 'Foundations/Icons',
  component: Icon,
  tags: ['autodocs'],
  args: { name: 'clock', color: colorOptions['icon/primary'] },
  argTypes: {
    name: { control: 'select', options: iconNames },
    size: { control: { type: 'number', min: 12, max: 96, step: 2 } },
    color: { control: 'select', options: Object.values(colorOptions) },
  },
  parameters: {
    docs: {
      description: {
        component:
          '19 иконок из архива «Chiron icons». Цвет задаётся через `currentColor`, поэтому иконка берёт цвет токена ' +
          '`icon/*` и меняется вместе с темой. Родная сетка — 24×24 (у `course-type` — 16×16).',
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};

export const AllIcons: Story = {
  name: 'All icons',
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div className="fd-page">
      <h1 className="t-heading-h2">Icons</h1>
      <p className="t-body-default fd-lead">
        {iconNames.length} иконок. Размер и цвет можно менять в панели Controls.
      </p>
      <div className="fd-icon-grid">
        {iconNames.map((name: IconName) => (
          <div className="fd-icon-cell" key={name}>
            <Icon name={name} size={args.size} color={args.color} />
            <span className="fd-mono">{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Colors: Story = {
  name: 'Token colors',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 24 }}>
      {Object.entries(colorOptions).map(([label, value]) => (
        <div key={label} style={{ display: 'grid', gap: 8, justifyItems: 'center' }}>
          <Icon name="notification" size={32} color={value} />
          <span className="fd-mono">{label}</span>
        </div>
      ))}
    </div>
  ),
};
