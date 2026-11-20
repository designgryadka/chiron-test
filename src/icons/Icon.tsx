import React from 'react';
import './Icon.css';

// All SVGs from «Chiron icons.zip», with fills replaced by currentColor.
const modules = import.meta.glob<string>('./svg/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export const iconNames = [
  'alert-2',
  'calendar',
  'check',
  'clock',
  'close',
  'copy',
  'course-type',
  'delete',
  'edit',
  'eraser',
  'gear',
  'info',
  'lock-round',
  'minus',
  'notification',
  'plus',
  'question',
  'search',
  'user',
] as const;

export type IconName = (typeof iconNames)[number];

const svgByName: Record<string, string> = {};
for (const [path, raw] of Object.entries(modules)) {
  const name = path.replace('./svg/', '').replace('.svg', '');
  svgByName[name] = raw;
}

/** `course-type` is drawn on a 16×16 grid, all other icons on 24×24. */
const defaultSize = (name: IconName) => (name === 'course-type' ? 16 : 24);

export interface IconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  name: IconName;
  /** Size in px. Defaults to the icon's native grid (24, or 16 for course-type). */
  size?: number;
  /** Any CSS colour; use a token, e.g. `var(--color-icon-brand)`. Defaults to `--color-icon-primary`. */
  color?: string;
  /** If set, the icon is announced to screen readers; otherwise it is decorative. */
  title?: string;
}

export function Icon({ name, size, color, title, className, style, ...rest }: IconProps) {
  const svg = svgByName[name];
  const px = size ?? defaultSize(name);
  if (!svg) {
    console.warn(`[Icon] unknown icon "${name}"`);
    return null;
  }
  return (
    <span
      {...rest}
      className={['chiron-icon', className].filter(Boolean).join(' ')}
      style={{ width: px, height: px, color: color ?? 'var(--color-icon-primary)', ...style }}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
