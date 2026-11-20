import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { colorTokens, primitiveTokens } from '../tokens/tokens.generated';
import './foundations.css';

const groups = Array.from(new Set(colorTokens.map((t) => t.group)));
const families = Array.from(new Set(primitiveTokens.map((t) => t.name.split('/')[0])));

const pretty = (v: string) => (v.startsWith('@') ? v.slice(1) : v);

function SemanticColors() {
  return (
    <div className="fd-page">
      <h1 className="t-heading-h2">Colors</h1>
      <p className="t-body-default fd-lead">
        Семантические токены коллекции «Chiron · Colors». Только темы <b>Light</b> и <b>Dark</b>. Образец слева живой
        — он меняется вместе с переключателем темы в панели Storybook. В колонках указан примитив (или значение), на
        который ссылается токен.
      </p>
      {groups.map((g) => (
        <section className="fd-section" key={g}>
          <h2 className="t-heading-h3">{g}</h2>
          <table className="fd-table t-body-small">
            <thead>
              <tr>
                <th style={{ width: 80 }}>Цвет</th>
                <th>Токен</th>
                <th>Light</th>
                <th>Dark</th>
              </tr>
            </thead>
            <tbody>
              {colorTokens
                .filter((t) => t.group === g)
                .map((t) => (
                  <tr key={t.name}>
                    <td>
                      <span className="fd-swatch">
                        <i style={{ background: `var(${t.cssVar})` }} />
                      </span>
                    </td>
                    <td>
                      <div>{t.name}</div>
                      <div className="fd-mono">{t.cssVar}</div>
                    </td>
                    <td className="fd-mono">{pretty(t.light)}</td>
                    <td className="fd-mono">{pretty(t.dark)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}

function Primitives() {
  return (
    <div className="fd-page">
      <h1 className="t-heading-h2">Primitives</h1>
      <p className="t-body-default fd-lead">Палитра «Chiron · Primitives». Не зависит от темы.</p>
      {families.map((f) => (
        <section className="fd-section" key={f}>
          <h2 className="t-heading-h4">{f}</h2>
          <div className="fd-grid">
            {primitiveTokens
              .filter((t) => t.name.startsWith(f + '/'))
              .map((t) => (
                <div className="fd-card" key={t.name}>
                  <span className="fd-swatch">
                    <i style={{ background: `var(${t.cssVar})` }} />
                  </span>
                  <strong>{t.name}</strong>
                  <span className="fd-mono">{t.value}</span>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Semantic: Story = { name: 'Semantic (Light / Dark)', render: () => <SemanticColors /> };
export const PrimitivePalette: Story = { name: 'Primitives', render: () => <Primitives /> };
