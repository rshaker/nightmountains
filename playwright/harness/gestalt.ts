export const dat: { 
    hasBrowser?: boolean,
    hasBrowserRuntime?: boolean,
    hasBrowserRuntimeId?: boolean,
    hasChrome?: boolean,
    hasChromeRuntime?: boolean,
    hasChromeRuntimeId?: boolean,
    hasServiceWorkerGlobalScope?: boolean,
    isServiceWorkerGlobalScope?: boolean,
    hasChromeExtension?: boolean,
    hasChromeExtensionViews?: boolean,
    isPopupView?: boolean,
    windowLocationProtocol?: string,
    isChromeExtensionPage?: boolean,
    isMozExtensionPage?: boolean,
    isSafariWebExtensionPage?: boolean,
    isExtensionPage?: boolean,
} = {};

dat.hasBrowser = browser ? true : false;
dat.hasBrowserRuntime = browser.runtime ? true : false;
dat.hasBrowserRuntimeId = !!browser.runtime.id;

dat.hasChrome = !!chrome;
dat.hasChromeRuntime = !!chrome.runtime;
dat.hasChromeRuntimeId = !!chrome.runtime.id;

dat.hasServiceWorkerGlobalScope = (typeof ServiceWorkerGlobalScope !== "undefined")
dat.isServiceWorkerGlobalScope = (self instanceof ServiceWorkerGlobalScope);

dat.hasChromeExtension = !!chrome.extension;
dat.hasChromeExtensionViews = !!chrome.extension.getViews;
dat.isPopupView = !!chrome.extension.getViews({ type: "popup" }).includes(window);

dat.windowLocationProtocol = window.location.protocol;
dat.isChromeExtensionPage = (window.location.protocol === "chrome-extension:");
dat.isMozExtensionPage = (window.location.protocol === "moz-extension:");
dat.isSafariWebExtensionPage = (window.location.protocol === "safari-web-extension:");
dat.isExtensionPage = /^((chrome|moz)-extension|safari-web-extension):/.test(location.protocol);

// if (isExtensionPage && typeof chrome?.extension?.getViews === "function") {
// const views = chrome.extension.getViews({ type: "popup" });
// if (views?.includes(window)) {
// if (typeof chrome?.extension?.getBackgroundPage === "function") {
// return chrome.extension.getBackgroundPage() === window;

export {};

