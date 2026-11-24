import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MoodRating } from './MoodRating';

const meta = {
  title: 'Components/MoodRating',
  component: MoodRating,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 650 }}><Story /></div>],
  parameters: {
    docs: { description: { component: 'Оценка занятия: пять лиц (Figma: Mood 1–5). Выбранное увеличено, остальные приглушены.' } },
  },
} satisfies Meta<typeof MoodRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = { args: { value: 4 } };

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<number>();
    return <MoodRating {...args} value={value} onChange={setValue} />;
  },
};
