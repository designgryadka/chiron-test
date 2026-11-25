import React, { useEffect } from 'react';
import type { Preview, Decorator } from '@storybook/react-vite';
import '../src/styles/index.css';

type ThemeName = 'light' | 'dark';

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as ThemeName) ?? 'light';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Docs pages render several stories at once, so the theme is set on <html>
  // and the canvas colour comes from the token, not from Storybook's backgrounds.
  return (
    <div
      data-theme={theme}
      style={{
        background: 'var(--color-bg-canvas)',
        color: 'var(--color-text-primary)',
        padding: context.parameters.layout === 'fullscreen' ? 0 : 24,
        minHeight: context.parameters.layout === 'fullscreen' ? '100vh' : undefined,
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Тема интерфейса',
      toolbar: {
        title: 'Тема',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [withTheme],
  parameters: {
    layout: 'centered',
    backgrounds: { disabled: true },
    viewport: {
      options: {
        desktop1920: { name: 'Desktop 1920', styles: { width: '1920px', height: '1080px' }, type: 'desktop' },
        tablet768: { name: 'Планшет 768', styles: { width: '768px', height: '1024px' }, type: 'tablet' },
        mobile390: { name: 'Мобильный 390', styles: { width: '390px', height: '844px' }, type: 'mobile' },
      },
    },
    controls: { matchers: { color: /(background|color)$/i } },
    options: {
      storySort: {
        order: ['Foundations', ['Colors', 'Typography', 'Spacing & Radius', 'Icons'], 'Components', 'Pages'],
      },
    },
  },
};

export default preview;
