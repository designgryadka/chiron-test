import React from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import './Callout.css';

export interface CalloutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Overline, e.g. «Запомните». */
  label: React.ReactNode;
  children: React.ReactNode;
  icon?: IconName;
}

/** Figma: Callout / Important (269:7477) — info background, brand icon circle, overline and text. */
export function Callout({ label, children, icon = 'alert-2', className, ...rest }: CalloutProps) {
  return (
    <div {...rest} className={['chiron-callout', className].filter(Boolean).join(' ')}>
      <span className="chiron-callout__icon">
        <Icon name={icon} size={18} color="var(--color-icon-inverse)" />
      </span>
      <div className="chiron-callout__text">
        <p className="chiron-callout__label">{label}</p>
        <p className="chiron-callout__body">{children}</p>
      </div>
    </div>
  );
}
