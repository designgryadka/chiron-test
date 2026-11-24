import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableOfContents } from './TableOfContents';

const items = [
  { id: 's1', label: 'Что такое фишинг?' },
  { id: 's2', label: 'Почему письма работают' },
  { id: 's3', label: '5 признаков фишинга' },
  { id: 's4', label: 'Разбор письма' },
];

const meta = {
  title: 'Components/TableOfContents',
  component: TableOfContents,
  tags: ['autodocs'],
  args: { items, activeId: 's1' },
  parameters: {
    docs: {
      description: {
        component:
          'Содержание урока. Активный пункт (раздел, который сейчас на экране) — `bg/subtle` и `text/primary`. ' +
          'На странице урока активный пункт меняется при скролле.',
      },
    },
  },
} satisfies Meta<typeof TableOfContents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interactive: Story = {
  render: (args) => {
    const [active, setActive] = useState('s1');
    return <TableOfContents {...args} activeId={active} onSelect={setActive} />;
  },
};
