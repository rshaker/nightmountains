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

// Chromium
const chromiumBackgroundWorkerContext = {
    "hasBrowser": false,
    "hasBrowserRuntime": false,
    "hasBrowserRuntimeId": false,
    "hasChrome": true,
    "hasChromeRuntime": true,
    "hasChromeRuntimeId": true,
    "hasServiceWorkerGlobalScope": true,
    "isServiceWorkerGlobalScope": true,
    "hasChromeExtension": true,
    "hasChromeExtensionViews": false,
    "isPopupView": false,
    "locationProtocol": "chrome-extension:",
    "windowLocationProtocol": "",
    "isChromeExtensionPage": false,
    "isMozExtensionPage": false,
    "isSafariWebExtensionPage": false,
    "isExtensionPage": true
};

const chromiumMainPageContext = {
    "hasBrowser": false,
    "hasBrowserRuntime": false,
    "hasBrowserRuntimeId": false,
    "hasChrome": true,
    "hasChromeRuntime": true,
    "hasChromeRuntimeId": false,
    "hasServiceWorkerGlobalScope": false,
    "isServiceWorkerGlobalScope": false,
    "hasChromeExtension": false,
    "hasChromeExtensionViews": false,
    "isPopupView": false,
    "locationProtocol": "https:",
    "windowLocationProtocol": "https:",
    "isChromeExtensionPage": false,
    "isMozExtensionPage": false,
    "isSafariWebExtensionPage": false,
    "isExtensionPage": false
};

const chromiumIsolatedPageContext = {
    "hasBrowser": false,
    "hasBrowserRuntime": false,
    "hasBrowserRuntimeId": false,
    "hasChrome": true,
    "hasChromeRuntime": true,
    "hasChromeRuntimeId": true,
    "hasServiceWorkerGlobalScope": false,
    "isServiceWorkerGlobalScope": false,
    "hasChromeExtension": true,
    "hasChromeExtensionViews": false,
    "isPopupView": false,
    "locationProtocol": "https:",
    "windowLocationProtocol": "https:",
    "isChromeExtensionPage": false,
    "isMozExtensionPage": false,
    "isSafariWebExtensionPage": false,
    "isExtensionPage": false
};

const chromiumExtensionPageContext = {
    "hasBrowser": false,
    "hasBrowserRuntime": false,
    "hasBrowserRuntimeId": false,
    "hasChrome": true,
    "hasChromeRuntime": true,
    "hasChromeRuntimeId": true,
    "hasServiceWorkerGlobalScope": false,
    "isServiceWorkerGlobalScope": false,
    "hasChromeExtension": true,
    "hasChromeExtensionViews": true,
    "isPopupView": false,
    "locationProtocol": "chrome-extension:",
    "windowLocationProtocol": "chrome-extension:",
    "isChromeExtensionPage": true,
    "isMozExtensionPage": false,
    "isSafariWebExtensionPage": false,
    "isExtensionPage": true
};

// Edge (should be identical to Chromium?)
const edgeBackgroundWorkerContext = {
    "hasBrowser": false,
    "hasBrowserRuntime": false,
    "hasBrowserRuntimeId": false,
    "hasChrome": true,
    "hasChromeRuntime": true,
    "hasChromeRuntimeId": true,
    "hasServiceWorkerGlobalScope": true,
    "isServiceWorkerGlobalScope": true,
    "hasChromeExtension": true,
    "hasChromeExtensionViews": false,
    "isPopupView": false,
    "locationProtocol": "chrome-extension:",
    "windowLocationProtocol": "",
    "isChromeExtensionPage": false,
    "isMozExtensionPage": false,
    "isSafariWebExtensionPage": false,
    "isExtensionPage": true
};

const edgeIsolatedPageContext = {
    "hasBrowser": false,
    "hasBrowserRuntime": false,
    "hasBrowserRuntimeId": false,
    "hasChrome": true,
    "hasChromeRuntime": true,
    "hasChromeRuntimeId": true,
    "hasServiceWorkerGlobalScope": false,
    "isServiceWorkerGlobalScope": false,
    "hasChromeExtension": true,
    "hasChromeExtensionViews": false,
    "isPopupView": false,
    "locationProtocol": "https:",
    "windowLocationProtocol": "https:",
    "isChromeExtensionPage": false,
    "isMozExtensionPage": false,
    "isSafariWebExtensionPage": false,
    "isExtensionPage": false
};

const edgeMainPageContext = {
    "hasBrowser": false,
    "hasBrowserRuntime": false,
    "hasBrowserRuntimeId": false,
    "hasChrome": true,
    "hasChromeRuntime": true,
    "hasChromeRuntimeId": false,
    "hasServiceWorkerGlobalScope": false,
    "isServiceWorkerGlobalScope": false,
    "hasChromeExtension": false,
    "hasChromeExtensionViews": false,
    "isPopupView": false,
    "locationProtocol": "https:",
    "windowLocationProtocol": "https:",
    "isChromeExtensionPage": false,
    "isMozExtensionPage": false,
    "isSafariWebExtensionPage": false,
    "isExtensionPage": false
}

const edgeExtensionPageContext = {
    "hasBrowser": false,
    "hasBrowserRuntime": false,
    "hasBrowserRuntimeId": false,
    "hasChrome": true,
    "hasChromeRuntime": true,
    "hasChromeRuntimeId": true,
    "hasServiceWorkerGlobalScope": true,
    "isServiceWorkerGlobalScope": true,
    "hasChromeExtension": true,
    "hasChromeExtensionViews": false,
    "isPopupView": false,
    "locationProtocol": "chrome-extension:",
    "windowLocationProtocol": "",
    "isChromeExtensionPage": false,
    "isMozExtensionPage": false,
    "isSafariWebExtensionPage": false,
    "isExtensionPage": true
};

// Firefox
const firefoxBackgroundWorkerContext = {
  "hasBrowser": true,
  "hasBrowserRuntime": true,
  "hasBrowserRuntimeId": true,
  "hasChrome": true,
  "hasChromeRuntime": true,
  "hasChromeRuntimeId": true,
  "hasServiceWorkerGlobalScope": false,
  "isServiceWorkerGlobalScope": false,
  "hasChromeExtension": true,
  "hasChromeExtensionViews": true,
  "isPopupView": false,
  "locationProtocol": "moz-extension:",
  "windowLocationProtocol": "moz-extension:",
  "isChromeExtensionPage": false,
  "isMozExtensionPage": true,
  "isSafariWebExtensionPage": false,
  "isExtensionPage": true
};

// Not sure if this injected correctly...
const firefoxMainPageContext = {
  "hasBrowser": false,
  "hasBrowserRuntime": false,
  "hasBrowserRuntimeId": false,
  "hasChrome": false,
  "hasChromeRuntime": false,
  "hasChromeRuntimeId": false,
  "hasServiceWorkerGlobalScope": false,
  "isServiceWorkerGlobalScope": false,
  "hasChromeExtension": false,
  "hasChromeExtensionViews": false,
  "isPopupView": false,
  "locationProtocol": "https:",
  "windowLocationProtocol": "https:",
  "isChromeExtensionPage": false,
  "isMozExtensionPage": false,
  "isSafariWebExtensionPage": false,
  "isExtensionPage": false
};

const firefoxIsolatedPageContext = {
  "hasBrowser": true,
  "hasBrowserRuntime": true,
  "hasBrowserRuntimeId": true,
  "hasChrome": true,
  "hasChromeRuntime": true,
  "hasChromeRuntimeId": true,
  "hasServiceWorkerGlobalScope": false,
  "isServiceWorkerGlobalScope": false,
  "hasChromeExtension": true,
  "hasChromeExtensionViews": false,
  "isPopupView": false,
  "locationProtocol": "https:",
  "windowLocationProtocol": "https:",
  "isChromeExtensionPage": false,
  "isMozExtensionPage": false,
  "isSafariWebExtensionPage": false,
  "isExtensionPage": false
};

const firefoxExtensionPageContext = {
  "hasBrowser": true,
  "hasBrowserRuntime": true,
  "hasBrowserRuntimeId": true,
  "hasChrome": true,
  "hasChromeRuntime": true,
  "hasChromeRuntimeId": true,
  "hasServiceWorkerGlobalScope": false,
  "isServiceWorkerGlobalScope": false,
  "hasChromeExtension": true,
  "hasChromeExtensionViews": true,
  "isPopupView": false,
  "locationProtocol": "moz-extension:",
  "windowLocationProtocol": "moz-extension:",
  "isChromeExtensionPage": false,
  "isMozExtensionPage": true,
  "isSafariWebExtensionPage": false,
  "isExtensionPage": true
};