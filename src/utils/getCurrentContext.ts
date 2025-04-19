export type BrowserContext = 'background' | 'extension page' | 'isolated' | 'main';

/**
 * Detects the current Chromium context:
 * - background: service‐worker (no document)
 * - extension page: chrome-extension:// + document
 * - isolated (content script): page protocol + document + chrome.runtime
 * - main: no chrome.runtime
 */
export function getCurrentContext(): BrowserContext {
  const hasChrome = typeof chrome === 'object' && !!chrome.runtime;
  const hasDocument = typeof document !== 'undefined';

  // Background (service worker)
  if (hasChrome && !hasDocument) {
    return 'background';
  }

  // Extension page (popup/options)
  if (hasChrome && hasDocument && location.protocol === 'chrome-extension:') {
    return 'extension page';
  }

  // Content script (isolated world)
  if (hasChrome && hasDocument && location.protocol !== 'chrome-extension:') {
    return 'isolated';
  }

  // Fallback to normal web context
  return 'main';
}
