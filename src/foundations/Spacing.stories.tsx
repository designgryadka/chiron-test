import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { radiusTokens, shadowTokens, spaceTokens } from '../tokens/tokens.generated';
import './foundations.css';

function SpacingAndRadius() {
  return (
    <div className="fd-page">
      <h1 className="t-heading-h2">Spacing & Radius</h1>
      <p className="t-body-default fd-lead">Коллекция «Chiron · Layout»: отступы, скругления, тени.</p>

      <section className="fd-section">
        <h2 className="t-heading-h3">Spacing</h2>
        {spaceTokens.map((n) => (
          <div className="fd-bar-row t-body-small" key={n}>
            <span className="fd-mono">--space-{n}</span>
            <span className="fd-bar" style={{ width: Math.max(n, 1) }} />
            <span className="fd-mono">{n}px</span>
          </div>
        ))}
      </section>

      <section className="fd-section">
        <h2 className="t-heading-h3">Radius</h2>
        <div className="fd-row">
          {radiusTokens.map((n) => (
            <div key={n} style={{ display: 'grid', gap: 8, justifyItems: 'center' }}>
              <div className="fd-box" style={{ borderRadius: `var(--radius-${n})` }} />
              <span className="fd-mono">--radius-{n}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="fd-section">
        <h2 className="t-heading-h3">Shadows</h2>
        <div className="fd-row" style={{ padding: 24 }}>
          {shadowTokens.map((n) => (
            <div key={n} style={{ display: 'grid', gap: 12, justifyItems: 'center' }}>
              <div className="fd-shadow-box" style={{ boxShadow: `var(--shadow-${n})` }} />
              <span className="fd-mono">--shadow-{n}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: 'Foundations/Spacing & Radius',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = { render: () => <SpacingAndRadius /> };
