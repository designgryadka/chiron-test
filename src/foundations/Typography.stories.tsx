import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { typeStyles } from '../tokens/tokens.generated';
import './foundations.css';

const weightName: Record<number, string> = { 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold' };
const familyName = { heading: 'Gilroy', body: 'Inter' } as const;

function Typography() {
  return (
    <div className="fd-page">
      <h1 className="t-heading-h2">Typography</h1>
      <p className="t-body-default fd-lead">
        Текстовые стили из Figma. Применяйте классы <code>.t-…</code> или переменные <code>--font-heading</code> /{' '}
        <code>--font-body</code>. Заголовки — Gilroy (если установлен, иначе Inter), текст — Inter.
      </p>
      {typeStyles.map((s) => (
        <div className="fd-type-row" key={s.className}>
          <div className="fd-type-meta">
            <strong className="t-body-small-emphasis">{s.name}</strong>
            <span className="fd-mono">
              {familyName[s.family as 'heading' | 'body']} {weightName[s.weight]} · {s.size}/{s.lineHeight}
              {s.letterSpacing !== '0' ? ` · ${s.letterSpacing}` : ''}
            </span>
            <br />
            <span className="fd-mono">.{s.className}</span>
          </div>
          <div className={s.className}>Съешь ещё этих мягких французских булок, да выпей чаю</div>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextStyles: Story = { name: 'Text styles', render: () => <Typography /> };
