import { getBrowserContext } from "../util/context";
import { markers, predictContext } from "../util/gestalt";

console.info("Markers:", markers);
console.info("Prediction:", predictContext());
console.info(`Startup in context: ${getBrowserContext()}`);

async function install() {
    // CODE HERE: Setup the content script: Add listeners, timers, etc
}

function destructor() {
    // Stop listening for destruction events
    document.removeEventListener(destructionEvent, destructor);

    // CODE HERE: Tear down content script: Remove listeners, clear timers, etc
}

// Unload previous content script by signaling it to destruct
var destructionEvent = "destructmyextension_" + chrome.runtime.id;
document.dispatchEvent(new CustomEvent(destructionEvent));

// Set up new (or replacement) content script, now listening for its future destruction event to arrive
document.addEventListener(destructionEvent, destructor);

install();
