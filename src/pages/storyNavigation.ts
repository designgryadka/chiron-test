/**
 * Moves Storybook to another story, keeping the current theme. Inside the Storybook
 * UI the manager URL changes (sidebar and toolbar follow); in a standalone
 * iframe.html link the iframe itself navigates.
 */
export function goToStory(storyId: string) {
  const theme = document.documentElement.getAttribute('data-theme');
  const globals = theme ? `theme:${theme}` : undefined;

  try {
    const parent = window.parent;
    if (parent !== window && parent.location.pathname !== window.location.pathname) {
      const url = new URL(parent.location.href);
      url.searchParams.set('path', `/story/${storyId}`);
      if (globals) url.searchParams.set('globals', globals);
      parent.location.href = url.toString();
      return;
    }
  } catch {
    // Different origin: fall through to the iframe itself.
  }

  const url = new URL(window.location.href);
  url.searchParams.set('id', storyId);
  url.searchParams.set('viewMode', 'story');
  if (globals) url.searchParams.set('globals', globals);
  window.location.href = url.toString();
}
