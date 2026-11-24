import React from 'react';
import './TableOfContents.css';

export interface TocItem {
  id: string;
  label: string;
}

export interface TableOfContentsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  title?: string;
  items: TocItem[];
  /** Highlighted item (the section in view). */
  activeId?: string;
  onSelect?: (id: string) => void;
}

/** Lesson table of contents (Figma: «Содержание урока», TOC items). */
export function TableOfContents({
  title = 'Содержание урока',
  items,
  activeId,
  onSelect,
  className,
  ...rest
}: TableOfContentsProps) {
  return (
    <nav {...rest} className={['chiron-toc', className].filter(Boolean).join(' ')} aria-label={title}>
      <p className="chiron-toc__title">{title}</p>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={['chiron-toc__item', active && 'is-active'].filter(Boolean).join(' ')}
            aria-current={active ? 'location' : undefined}
            onClick={(e) => {
              if (!onSelect) return;
              e.preventDefault();
              onSelect(item.id);
            }}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
