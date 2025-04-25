// import bcd from '@mdn/browser-compat-data' with { type: 'json' };
// const apiNames = Object.keys(bcd.webextensions.api);

export function getBrowserName(): string {
    const ua = navigator.userAgent;
    if (/OPR\/\d+/.test(ua) || /Opera\/\d+/.test(ua)) {
        return 'opera';
    }
    if (/Edg\/\d+/.test(ua)) {
        return 'edge';
    }
    if (/Chrome\/\d+/.test(ua) && !/Edg\/\d+/.test(ua) && !/OPR\/\d+/.test(ua)) {
        return 'chrome';
    }
    if (/Firefox\/\d+/.test(ua)) {
        return 'firefox';
    }
    if (/Safari\/\d+/.test(ua) && !/Chrome\/\d+/.test(ua) && !/OPR\/\d+/.test(ua) && !/Edg\/\d+/.test(ua)) {
        return 'safari';
    }
    return 'unknown';
}

export type BrowserContext =
    | 'background-worker'
    | 'popup'
    | 'extension-page'
    | 'isolated-world'
    | 'main-world'
    | 'unknown';

export function detectContext(): BrowserContext {
    const browserName = getBrowserName();

    // 2. Chromium-based
    if (browserName === 'chrome' || browserName === 'edge' || browserName === 'opera') {
        // Background Service Worker
        if (typeof ServiceWorkerGlobalScope !== "undefined" && self instanceof ServiceWorkerGlobalScope) {
            return 'background-worker';
        }
        // Extension Page (chrome-extension:)
        if (location.protocol.startsWith("chrome-extension:")) {
            // Popup (Action)
            if (typeof chrome !== "undefined" && chrome.extension?.getViews) {
                const popups = chrome.extension.getViews({ type: "popup" });
                if (popups && Array.isArray(popups) && popups.includes(window)) {
                    return 'popup';
                }
            }
            return 'extension-page';
        }
        // Content Script (Isolated World)
        if (typeof chrome !== "undefined" && chrome.runtime?.id) {
            return 'isolated-world';
        }
        // Main World (Web Page)
        return 'main-world';
    }

    // 3. Firefox
    if (browserName === 'firefox') {
        // Background Service Worker
        if (typeof ServiceWorkerGlobalScope !== "undefined" && self instanceof ServiceWorkerGlobalScope) {
            return 'background-worker';
        }
        // Extension Page (moz-extension:)
        if (location.protocol.startsWith("moz-extension:")) {
            // Popup (Action)
            if (typeof chrome !== "undefined" && chrome.extension?.getViews) {
                const popups = chrome.extension.getViews({ type: "popup" });
                if (popups && Array.isArray(popups) && popups.includes(window)) {
                    return 'popup';
                }
            }
            // Background Page
            if (typeof chrome !== "undefined" && chrome.extension?.getBackgroundPage) {
                try {
                    if (chrome.extension.getBackgroundPage && chrome.extension.getBackgroundPage() === window) {
                        return 'background-worker';
                    }
                } catch (e) { /* ignore */ }
            }
            return 'extension-page';
        }
        // Content Script (Isolated World)
        if (typeof window !== "undefined" && typeof (globalThis as any).browser !== "undefined" && (globalThis as any).browser.runtime?.id) {
            return 'isolated-world';
        }
        // Main World (Web Page)
        return 'main-world';
    }

    // 4. Safari (Basic)
    if (browserName === 'safari') {
        if (location.protocol.startsWith("safari-web-extension:")) {
            return 'extension-page';
        }
        return 'main-world';
    }

    // Unknown
    return 'unknown';
}