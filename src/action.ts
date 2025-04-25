import { openOrActivateTab } from './util/misc';
import { getBrowserContext } from "./util/context";
// import { getBrowserName } from "../util/determine";
import { detectContext, getBrowserName } from "./util/detect";

console.info("detectContext", detectContext());
console.info("getBrowserName", getBrowserName());
console.info("navigator.userAgent", navigator.userAgent);
console.info(`Startup in context: ${getBrowserContext()}`);

document.querySelector("#actionSettings")?.addEventListener("click", (_event: any) => {
    openOrActivateTab('settings.html');
});
