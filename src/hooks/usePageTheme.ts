import React from 'react';
import { flushSync } from 'react-dom';
import type { ThemeName } from '../components/ProfileMenu/ProfileMenu';

export type { ThemeName };

const readDocumentTheme = (): ThemeName =>
  typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

/**
 * Page theme. The page puts `data-theme` on its own root (so it wins over any
 * host theme) and mirrors it to `<html>`. External changes of `<html data-theme>`
 * (e.g. the Storybook toolbar) are followed. Switching uses a View Transition
 * cross-fade where available.
 */
export function usePageTheme(defaultTheme?: ThemeName, onThemeChange?: (theme: ThemeName) => void) {
  const [theme, setTheme] = React.useState<ThemeName>(() => defaultTheme ?? readDocumentTheme());

  React.useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      const value = html.dataset.theme;
      if (value === 'light' || value === 'dark') setTheme(value);
    });
    observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const changeTheme = React.useCallback(
    (next: ThemeName) => {
      const apply = () => {
        flushSync(() => setTheme(next));
        document.documentElement.dataset.theme = next;
      };
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
      if (doc.startViewTransition && !reduceMotion && document.visibilityState === 'visible') {
        doc.startViewTransition(apply);
      } else apply();
      onThemeChange?.(next);
    },
    [onThemeChange],
  );

  return [theme, changeTheme] as const;
}
