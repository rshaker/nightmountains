import { markers } from "./gestalt";

/**
 * Browser‑agnostic context detector
 * (works in Chrome, Firefox, Safari web‑extensions)
 */
export enum ContextType {
    EXTENSION = "ExtensionPage",
    BACKGROUND = "BackgroundWorker",
    ACTION = "ActionButton",
    MAIN = "WorldMain",
    ISOLATED = "WorldIsolated",
}

/** Returns the current execution context. */
export function getBrowserContext(): ContextType {

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
