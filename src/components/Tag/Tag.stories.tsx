import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: { kind: 'xp', value: 30 },
  argTypes: {
    kind: { control: 'inline-radio', options: ['xp', 'coins'] },
    value: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Теги опыта (**XP**) и награды (**монеты**). Фон — `bg/surface`, иконка опыта — `progress/xp`. ' +
          'В макете теги лежат на градиентном hero, поэтому на canvas они выглядят «белыми таблетками».',
      },
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Experience: Story = { args: { kind: 'xp', value: 30 } };

export const Coins: Story = { args: { kind: 'coins', value: 30 } };

export const Reward: Story = {
  name: 'Reward (XP + coins)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 6 }}>
      <Tag kind="xp" value={30} />
      <Tag kind="coins" value={30} />
    </div>
  ),
};

export const OnHero: Story = {
  name: 'On hero background',
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 6,
        padding: 32,
        borderRadius: 'var(--radius-20)',
        background:
          'linear-gradient(135deg, var(--color-bg-hero-start), var(--color-bg-hero-end) 60%, var(--cobalt-500))',
      }}
    >
      <Tag kind="xp" value={30} />
      <Tag kind="coins" value={30} />
    </div>
  ),
};
