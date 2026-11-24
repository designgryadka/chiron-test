import React from 'react';
import './Backdrop.css';

export interface BackdropProps {
  /** `fixed` — stays in place while the page scrolls (lesson page). Default: scrolls with the page. */
  fixed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Blurred colour blobs behind the page content (Figma group «Fon»: Ellipse 15/16/17,
 * Glow · cobalt 1 and 2). The 1920px artboard is centred, so the blobs keep their
 * position relative to the content at any window width.
 */
export function Backdrop({ fixed = false, className, style }: BackdropProps) {
  return (
    <div
      className={['chiron-backdrop', fixed && 'chiron-backdrop--fixed', className].filter(Boolean).join(' ')}
      style={style}
      aria-hidden="true"
    >
      <div className="chiron-backdrop__artboard">
        <span className="chiron-blob chiron-blob--sky" />
        <span className="chiron-blob chiron-blob--light" />
        <span className="chiron-blob chiron-blob--indigo" />
        <span className="chiron-blob chiron-blob--halo" />
        <span className="chiron-blob chiron-blob--glow" />
      </div>
    </div>
  );
}
