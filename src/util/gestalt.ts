export const markers: {
    hasBrowser?: boolean;
    hasBrowserRuntime?: boolean;
    hasBrowserRuntimeId?: boolean;
    hasChrome?: boolean;
    hasChromeRuntime?: boolean;
    hasChromeRuntimeId?: boolean;
    hasServiceWorkerGlobalScope?: boolean;
    isServiceWorkerGlobalScope?: boolean;
    hasChromeExtension?: boolean;
    hasChromeExtensionViews?: boolean;
    isPopupView?: boolean;
    locationProtocol?: string;
    windowLocationProtocol?: string;
    isChromeExtensionPage?: boolean;
    isMozExtensionPage?: boolean;
    isSafariWebExtensionPage?: boolean;
    isExtensionPage?: boolean;
    isBackgroundPage?: boolean;
    hasWindow?: boolean;
    hasDocument?: boolean;
} = {};

function safeAssign<K extends keyof typeof markers>(
    key: K,
    value: () => (typeof markers)[K],
    defaultValue?: (typeof markers)[K]
): void {
    try {
        markers[key] = value();
    } catch {
        markers[key] = defaultValue;
    }
}

safeAssign("hasBrowser", () => !!browser, false);
safeAssign("hasBrowserRuntime", () => !!browser.runtime, false);
safeAssign("hasBrowserRuntimeId", () => !!browser.runtime.id, false);

safeAssign("hasChrome", () => !!chrome, false);
safeAssign("hasChromeRuntime", () => !!chrome.runtime, false);
safeAssign("hasChromeRuntimeId", () => !!chrome.runtime.id, false);

safeAssign("hasServiceWorkerGlobalScope", () => typeof ServiceWorkerGlobalScope !== "undefined", false);
safeAssign("isServiceWorkerGlobalScope", () => self instanceof ServiceWorkerGlobalScope, false);

safeAssign("hasChromeExtension", () => !!chrome.extension, false);
safeAssign("hasChromeExtensionViews", () => !!chrome.extension.getViews, false);
safeAssign("isPopupView", () => chrome.extension.getViews({ type: "popup" }).includes(window), false);

safeAssign("locationProtocol", () => location.protocol, "");
safeAssign("windowLocationProtocol", () => window.location.protocol, "");
safeAssign("isChromeExtensionPage", () => window.location.protocol === "chrome-extension:", false);
safeAssign("isMozExtensionPage", () => window.location.protocol === "moz-extension:", false);
safeAssign("isSafariWebExtensionPage", () => window.location.protocol === "safari-web-extension:", false);
safeAssign("isExtensionPage", () => /^((chrome|moz)-extension|safari-web-extension):/.test(location.protocol), false);

safeAssign("hasWindow", () => typeof window !== "undefined", false);
safeAssign("hasDocument", () => typeof document !== "undefined", false);

safeAssign(
    "isBackgroundPage",
    () => {
        // MV3 Service Worker check
        if (typeof ServiceWorkerGlobalScope !== "undefined" && self instanceof ServiceWorkerGlobalScope) {
            return true;
        }
        // MV2/Firefox Background Page check
        if (typeof chrome?.extension?.getBackgroundPage === "function") {
            try {
                return chrome.extension.getBackgroundPage() === window;
            } catch {
                // Ignore errors (e.g., Safari or restricted access)
            }
        }
        return false; // Default if neither condition met or errors occurred
    },
    false
); // Default value is false

// Chromium
const chromiumBackgroundWorkerContext = {
    hasBrowser: false,
    hasBrowserRuntime: false,
    hasBrowserRuntimeId: false,
    hasChrome: true,
    hasChromeRuntime: true,
    hasChromeRuntimeId: true,
    hasServiceWorkerGlobalScope: true,
    isServiceWorkerGlobalScope: true,
    hasChromeExtension: true,
    hasChromeExtensionViews: false,
    isPopupView: false,
    locationProtocol: "chrome-extension:",
    windowLocationProtocol: "",
    isChromeExtensionPage: false,
    isMozExtensionPage: false,
    isSafariWebExtensionPage: false,
    isExtensionPage: true,
};

const chromiumMainPageContext = {
    hasBrowser: false,
    hasBrowserRuntime: false,
    hasBrowserRuntimeId: false,
    hasChrome: true,
    hasChromeRuntime: true,
    hasChromeRuntimeId: false,
    hasServiceWorkerGlobalScope: false,
    isServiceWorkerGlobalScope: false,
    hasChromeExtension: false,
    hasChromeExtensionViews: false,
    isPopupView: false,
    locationProtocol: "https:",
    windowLocationProtocol: "https:",
    isChromeExtensionPage: false,
    isMozExtensionPage: false,
    isSafariWebExtensionPage: false,
    isExtensionPage: false,
};

const chromiumIsolatedPageContext = {
    hasBrowser: false,
    hasBrowserRuntime: false,
    hasBrowserRuntimeId: false,
    hasChrome: true,
    hasChromeRuntime: true,
    hasChromeRuntimeId: true,
    hasServiceWorkerGlobalScope: false,
    isServiceWorkerGlobalScope: false,
    hasChromeExtension: true,
    hasChromeExtensionViews: false,
    isPopupView: false,
    locationProtocol: "https:",
    windowLocationProtocol: "https:",
    isChromeExtensionPage: false,
    isMozExtensionPage: false,
    isSafariWebExtensionPage: false,
    isExtensionPage: false,
};

const chromiumExtensionPageContext = {
    hasBrowser: false,
    hasBrowserRuntime: false,
    hasBrowserRuntimeId: false,
    hasChrome: true,
    hasChromeRuntime: true,
    hasChromeRuntimeId: true,
    hasServiceWorkerGlobalScope: false,
    isServiceWorkerGlobalScope: false,
    hasChromeExtension: true,
    hasChromeExtensionViews: true,
    isPopupView: false,
    locationProtocol: "chrome-extension:",
    windowLocationProtocol: "chrome-extension:",
    isChromeExtensionPage: true,
    isMozExtensionPage: false,
    isSafariWebExtensionPage: false,
    isExtensionPage: true,
};

// Edge (should be identical to Chromium?)
const edgeBackgroundWorkerContext = {
    hasBrowser: false,
    hasBrowserRuntime: false,
    hasBrowserRuntimeId: false,
    hasChrome: true,
    hasChromeRuntime: true,
    hasChromeRuntimeId: true,
    hasServiceWorkerGlobalScope: true,
    isServiceWorkerGlobalScope: true,
    hasChromeExtension: true,
    hasChromeExtensionViews: false,
    isPopupView: false,
    locationProtocol: "chrome-extension:",
    windowLocationProtocol: "",
    isChromeExtensionPage: false,
    isMozExtensionPage: false,
    isSafariWebExtensionPage: false,
    isExtensionPage: true,
};

const edgeIsolatedPageContext = {
    hasBrowser: false,
    hasBrowserRuntime: false,
    hasBrowserRuntimeId: false,
    hasChrome: true,
    hasChromeRuntime: true,
    hasChromeRuntimeId: true,
    hasServiceWorkerGlobalScope: false,
    isServiceWorkerGlobalScope: false,
    hasChromeExtension: true,
    hasChromeExtensionViews: false,
    isPopupView: false,
    locationProtocol: "https:",
    windowLocationProtocol: "https:",
    isChromeExtensionPage: false,
    isMozExtensionPage: false,
    isSafariWebExtensionPage: false,
    isExtensionPage: false,
};

const edgeMainPageContext = {
    hasBrowser: false,
    hasBrowserRuntime: false,
    hasBrowserRuntimeId: false,
    hasChrome: true,
    hasChromeRuntime: true,
    hasChromeRuntimeId: false,
    hasServiceWorkerGlobalScope: false,
    isServiceWorkerGlobalScope: false,
    hasChromeExtension: false,
    hasChromeExtensionViews: false,
    isPopupView: false,
    locationProtocol: "https:",
    windowLocationProtocol: "https:",
    isChromeExtensionPage: false,
    isMozExtensionPage: false,
    isSafariWebExtensionPage: false,
    isExtensionPage: false,
};

const edgeExtensionPageContext = {
    hasBrowser: false,
    hasBrowserRuntime: false,
    hasBrowserRuntimeId: false,
    hasChrome: true,
    hasChromeRuntime: true,
    hasChromeRuntimeId: true,
    hasServiceWorkerGlobalScope: true,
    isServiceWorkerGlobalScope: true,
    hasChromeExtension: true,
    hasChromeExtensionViews: false,
    isPopupView: false,
    locationProtocol: "chrome-extension:",
    windowLocationProtocol: "",
    isChromeExtensionPage: false,
    isMozExtensionPage: false,
    isSafariWebExtensionPage: false,
    isExtensionPage: true,
};

// Firefox
const firefoxBackgroundWorkerContext = {
    hasBrowser: true,
    hasBrowserRuntime: true,
    hasBrowserRuntimeId: true,
    hasChrome: true,
    hasChromeRuntime: true,
    hasChromeRuntimeId: true,
    hasServiceWorkerGlobalScope: false,
    isServiceWorkerGlobalScope: false,
    hasChromeExtension: true,
    hasChromeExtensionViews: true,
    isPopupView: false,
    locationProtocol: "moz-extension:",
    windowLocationProtocol: "moz-extension:",
    isChromeExtensionPage: false,
    isMozExtensionPage: true,
    isSafariWebExtensionPage: false,
    isExtensionPage: true,
    hasWindow: true,
    hasDocument: true,
    isBackgroundPage: true,
};

// Not sure if this injected correctly...
const firefoxMainPageContext = {
    hasBrowser: false,
    hasBrowserRuntime: false,
    hasBrowserRuntimeId: false,
    hasChrome: false,
    hasChromeRuntime: false,
    hasChromeRuntimeId: false,
    hasServiceWorkerGlobalScope: false,
    isServiceWorkerGlobalScope: false,
    hasChromeExtension: false,
    hasChromeExtensionViews: false,
    isPopupView: false,
    locationProtocol: "https:",
    windowLocationProtocol: "https:",
    isChromeExtensionPage: false,
    isMozExtensionPage: false,
    isSafariWebExtensionPage: false,
    isExtensionPage: false,
    hasWindow: true,
    hasDocument: true,
    isBackgroundPage: false,
};

const firefoxIsolatedPageContext = {
    hasBrowser: true,
    hasBrowserRuntime: true,
    hasBrowserRuntimeId: true,
    hasChrome: true,
    hasChromeRuntime: true,
    hasChromeRuntimeId: true,
    hasServiceWorkerGlobalScope: false,
    isServiceWorkerGlobalScope: false,
    hasChromeExtension: true,
    hasChromeExtensionViews: false,
    isPopupView: false,
    locationProtocol: "https:",
    windowLocationProtocol: "https:",
    isChromeExtensionPage: false,
    isMozExtensionPage: false,
    isSafariWebExtensionPage: false,
    isExtensionPage: false,
    hasWindow: true,
    hasDocument: true,
    isBackgroundPage: false,
};

const firefoxExtensionPageContext = {
    hasBrowser: true,
    hasBrowserRuntime: true,
    hasBrowserRuntimeId: true,
    hasChrome: true,
    hasChromeRuntime: true,
    hasChromeRuntimeId: true,
    hasServiceWorkerGlobalScope: false,
    isServiceWorkerGlobalScope: false,
    hasChromeExtension: true,
    hasChromeExtensionViews: true,
    isPopupView: false,
    locationProtocol: "moz-extension:",
    windowLocationProtocol: "moz-extension:",
    isChromeExtensionPage: false,
    isMozExtensionPage: true,
    isSafariWebExtensionPage: false,
    isExtensionPage: true,
    hasWindow: true,
    hasDocument: true,
    isBackgroundPage: false,
};

// Candidate context objects
const contextsCandidates = [
    { name: "chromiumBackgroundWorkerContext", markers: chromiumBackgroundWorkerContext },
    { name: "chromiumMainPageContext", markers: chromiumMainPageContext },
    { name: "chromiumIsolatedPageContext", markers: chromiumIsolatedPageContext },
    { name: "chromiumExtensionPageContext", markers: chromiumExtensionPageContext },
    { name: "edgeBackgroundWorkerContext", markers: edgeBackgroundWorkerContext },
    { name: "edgeIsolatedPageContext", markers: edgeIsolatedPageContext },
    { name: "edgeMainPageContext", markers: edgeMainPageContext },
    { name: "edgeExtensionPageContext", markers: edgeExtensionPageContext },
    { name: "firefoxBackgroundWorkerContext", markers: firefoxBackgroundWorkerContext },
    { name: "firefoxMainPageContext", markers: firefoxMainPageContext },
    { name: "firefoxIsolatedPageContext", markers: firefoxIsolatedPageContext },
    { name: "firefoxExtensionPageContext", markers: firefoxExtensionPageContext },
];

/**
 * Returns a string prediction of the current browser context and browser.
 * The function compares the currently collected `markers` with each
 * candidate context and picks the one with the highest matching score.
 * If a marker does not match, the candidate is not considered.
 */
export function predictContext(): string {
    let bestMatchName = "unknown";
    let bestScore = -1;

    // Compare each candidate against the inferrred markers.
    for (const candidate of contextsCandidates) {
        let matchScore = 0;
        let totalCompared = 0;
        for (const key in candidate.markers) {
            totalCompared++;
            // Use strict equality to compare. You could adjust the criteria if needed.
            if (markers[key] === candidate.markers[key]) {
                matchScore++;
            }
            else {
                matchScore = -1; // If any marker doesn't match, break out of the loop
                break;
            }
        }
        if (matchScore > bestScore) {
            bestScore = matchScore;
            bestMatchName = candidate.name;
        }
    }
    return bestMatchName;
}

/**
Reference:

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs

https://github.com/mdn/browser-compat-data

npm i @mdn/browser-compat-data --save-dev

import bcd from '@mdn/browser-compat-data';
const portData = bcd.webextensions.api.runtime.Port.__compat.support;

 */