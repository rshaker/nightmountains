export enum ContextType {
    EXTENSION = "ExtensionPage",
    BACKGROUND = "BackgroundWorker",
    ACTION = "ActionButton",
    MAIN = "WorldMain",
    ISOLATED = "WorldIsolated",
}

function getBrowserContext(): ContextType {

    return null;
}

function frag0(): ContextType {
    const hasExtensionAPIAccess = 
        !!chrome &&
        !!chrome.runtime &&
        !!chrome.runtime.id;

    const isServiceWorker =
        hasExtensionAPIAccess &&
        typeof ServiceWorkerGlobalScope !== "undefined" &&
        self instanceof ServiceWorkerGlobalScope;

    const isActionPopup =
        hasExtensionAPIAccess &&
        !isServiceWorker &&
        chrome.extension &&
        chrome.extension.getViews &&
        chrome.extension.getViews({ type: "popup" }).includes(window);

    const isExtensionPage =
        hasExtensionAPIAccess &&
        !isServiceWorker &&
        !isActionPopup &&
        window.location.protocol === "chrome-extension:";

    const isIsolatedTab =
        hasExtensionAPIAccess &&
        !isServiceWorker &&
        window.location.protocol !== "chrome-extension:";

    const isMainTab =
        !hasExtensionAPIAccess &&
        window.location.protocol !== "chrome-extension:";

    switch (true) {
        case isServiceWorker:
            return ContextType.BACKGROUND;
        case isExtensionPage:
            return ContextType.EXTENSION;
        case isActionPopup:
            return ContextType.ACTION;
        case isIsolatedTab:
            return ContextType.ISOLATED;
        case isMainTab:
            return ContextType.MAIN;
        default:
            throw new Error("Unable to determine browser context.");
    }
}

function frag1() {
    const hasExtensionAPIAccess = !!chrome && !!chrome.runtime && !!chrome.runtime.id;

    const isServiceWorker =
        hasExtensionAPIAccess &&
        typeof ServiceWorkerGlobalScope !== "undefined" &&
        self instanceof ServiceWorkerGlobalScope;

    const isActionPopup =
        hasExtensionAPIAccess &&
        !isServiceWorker &&
        chrome.extension &&
        chrome.extension.getViews &&
        chrome.extension.getViews({ type: "popup" }).includes(window);

    const isExtensionPage =
        hasExtensionAPIAccess && !isServiceWorker && !isActionPopup && window.location.protocol === "chrome-extension:";

    const isIsolatedTab = hasExtensionAPIAccess && !isServiceWorker && window.location.protocol !== "chrome-extension:";

    const isMainTab = !hasExtensionAPIAccess && window.location.protocol !== "chrome-extension:";

    switch (true) {
        case isServiceWorker:
            return ContextType.BACKGROUND;
        case isExtensionPage:
            return ContextType.EXTENSION;
        case isActionPopup:
            return ContextType.ACTION;
        case isIsolatedTab:
            return ContextType.ISOLATED;
        case isMainTab:
            return ContextType.MAIN;
        default:
            throw new Error("Unable to determine browser context.");
    }
}

function frag2() {
    // 1. Background **service‑worker / background‑page**
    if (isBackgroundPage()) {
        return ContextType.BACKGROUND;
    }
    // if (typeof ServiceWorkerGlobalScope !== "undefined" && self instanceof ServiceWorkerGlobalScope) {
    //     return ContextType.BACKGROUND;
    // }

    // Browser extension APIs are exposed only inside the extension sandbox
    const hasExtensionAPI =
        (typeof chrome !== "undefined" && chrome.runtime?.id) ||
        (typeof browser !== "undefined" && browser.runtime?.id);

    // 2. Regular web page (no extension API)
    if (!hasExtensionAPI) {
        return ContextType.MAIN;
    }

    // 3. Full‑page HTML inside the extension package (options, devtools, etc.)
    const proto = location.protocol;
    const isExtensionPage =
        proto.startsWith("chrome-extension:") ||
        proto.startsWith("moz-extension:") ||
        proto.startsWith("safari-web-extension:"); // Safari

    // 3a. Action‑button popup (only Chrome/Firefox support getViews)
    if (isExtensionPage && typeof chrome?.extension?.getViews === "function") {
        try {
            const views = chrome.extension.getViews({ type: "popup" });
            if (views?.some((v) => v === window)) {
                return ContextType.ACTION;
            }
        } catch {
            /* not supported (e.g. Safari) */
        }
    }

    // 4. Content‑script (isolated world) – runs on web pages but **has** extension API
    if (!isExtensionPage) {
        return ContextType.ISOLATED;
    }

    // 5. Fallback to generic extension page
    return ContextType.EXTENSION;
}

function frag3() {
    /* ---------- BACKGROUND ---------- */
    if (isBackgroundPage()) {
        return ContextType.BACKGROUND;
    }

    /* ---------- EXTENSION API PRESENT? ---------- */
    const hasExtensionAPI =
        (typeof chrome !== "undefined" && chrome.runtime?.id) ||
        (typeof browser !== "undefined" && (browser as any).runtime?.id);

    /* ---------- ORDINARY WEB PAGE ---------- */
    if (!hasExtensionAPI) {
        return ContextType.MAIN;
    }

    /* ---------- EXTENSION PAGE vs CONTENT SCRIPT ---------- */
    const isExtensionPage = /^((chrome|moz)-extension|safari-web-extension):/.test(location.protocol);

    /* ---------- ACTION‑POPUP ---------- */
    if (isExtensionPage && typeof chrome?.extension?.getViews === "function") {
        try {
            const views = chrome.extension.getViews({ type: "popup" });
            if (views?.includes(window)) {
                return ContextType.ACTION;
            }
        } catch {
            /* Safari: getViews not available */
        }
    }

    /* ---------- CONTENT SCRIPT (ISOLATED WORLD) ---------- */
    if (!isExtensionPage) {
        return ContextType.ISOLATED;
    }

    /* ---------- DEFAULT: OTHER EXTENSION PAGE ---------- */
    return ContextType.EXTENSION;
}

/**
 * Detects whether the current extension page *is itself* the background page.
 * Works in Chrome, Firefox and Safari, MV2 & MV3.
 */
function isBackgroundPage(): boolean {
    // ❶ MV3 service‑worker (Chrome ≥ 88, Firefox ≥ 109 behind pref)
    if (typeof ServiceWorkerGlobalScope !== "undefined" && self instanceof ServiceWorkerGlobalScope) {
        return true;
    }

    // ❷ MV2 / legacy background *HTML page*
    if (typeof chrome?.extension?.getBackgroundPage === "function") {
        try {
            // In the background page this returns its own `window`;
            // in every other extension page it returns `null` (FF) or another Window (Chrome).
            return chrome.extension.getBackgroundPage() === window;
        } catch {
            /* Safari or restrictive settings → ignore */
        }
    }

    return false;
}







export {};
