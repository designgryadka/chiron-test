import React from 'react';
import { BoltGlyph } from '../../icons/glyphs';
import coinUrl from '../../assets/coin.png';
import './Tag.css';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** `xp` — очки опыта, `coins` — монеты (награда). */
  kind: 'xp' | 'coins';
  /** Количество. */
  value: number | string;
}

export function Tag({ kind, value, className, ...rest }: TagProps) {
  const label = kind === 'xp' ? `+${value} XP` : `${value}`;
  const accessible = kind === 'xp' ? `${value} очков опыта` : `${value} монет`;

  return (
    <span
      {...rest}
      className={['chiron-tag', `chiron-tag--${kind}`, className].filter(Boolean).join(' ')}
      aria-label={accessible}
    >
      <span className="chiron-tag__icon" aria-hidden="true">
        {kind === 'xp' ? (
          <BoltGlyph />
        ) : (
          <img className="chiron-tag__coin" src={coinUrl} width={22} height={22} alt="" />
        )}
      </span>
      <span className="chiron-tag__label" aria-hidden="true">
        {label}
      </span>
    </span>
  );
}
