import React from 'react';
import { ArrowRightGlyph } from '../../icons/glyphs';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button label. */
  children?: React.ReactNode;
  /** `primary` — filled brand button, `secondary` — outlined (Figma: Button / Secondary). */
  variant?: 'primary' | 'secondary';
  /** Icon before the label, e.g. a back arrow. */
  leadingIcon?: React.ReactNode;
  /** Show the trailing arrow. */
  showArrow?: boolean;
  /** Stretch to the width of the container. */
  fullWidth?: boolean;
  /**
   * Force a visual state. Only meant for documentation and visual review —
   * real hover / press / keyboard focus work on their own.
   */
  state?: 'hover' | 'active' | 'focus';
}

export function Button({
  children = 'Начать курс',
  variant = 'primary',
  leadingIcon,
  showArrow = variant === 'primary',
  fullWidth = false,
  state,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [
    'chiron-button',
    variant === 'secondary' && 'chiron-button--secondary',
    fullWidth && 'chiron-button--full',
    state && `is-${state}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button {...rest} type={type} className={classes}>
      {leadingIcon}
      <span className="chiron-button__label">{children}</span>
      {showArrow && <ArrowRightGlyph className="chiron-button__arrow" />}
    </button>
  );
}
