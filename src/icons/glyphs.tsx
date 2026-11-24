import React from 'react';

/*
 * Glyphs that are used inside components but are NOT part of «Chiron icons.zip».
 * Arrow and bolt use the exact vectors from the Figma file (Button / Primary, XP icon).
 */

export function ArrowRightGlyph({ size = 15, className }: { size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2.5 7.5h9.375M8.125 11.25l3.75-3.75-3.75-3.75"
        stroke="currentColor"
        strokeWidth="1.03125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Figma: Button / Secondary → arrow-left (15×15). */
export function ArrowLeftGlyph({ size = 15, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 15 15" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12.5 7.5H2.5M6.5 11.5L2.5 7.5L6.5 3.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Figma: Icon/Check (14×14) inside «Selection / Check». */
export function CheckSmallGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M2.91667 7L5.25 9.33333L11.0833 3.5"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BoltGlyph({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
      <path d="M7.35 0.5 1.75 6.8h3.5l-0.6 4.65 5.65-6.85H6.75L7.35 0.5Z" fill="currentColor" />
    </svg>
  );
}

let coinId = 0;
export function CoinGlyph({ size = 20 }: { size?: number }) {
  const id = React.useMemo(() => `chiron-coin-${coinId++}`, []);
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-face`} cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#FFE9A0" />
          <stop offset="0.55" stopColor="#F7BE32" />
          <stop offset="1" stopColor="#D98B0C" />
        </radialGradient>
      </defs>
      <circle cx="11" cy="11" r="10" fill={`url(#${id}-face)`} />
      <circle cx="11" cy="11" r="7.2" stroke="#B9770A" strokeOpacity="0.45" strokeWidth="1" />
      <path d="M6.2 7.2a6.4 6.4 0 0 1 5.4-2.6" stroke="#fff" strokeOpacity="0.75" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
