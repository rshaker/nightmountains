import { openOrActivateTab } from './util/misc';
import { getBrowserContext } from "./util/context";

console.info("navigator.userAgent", navigator.userAgent);
console.info(`Startup in context: ${getBrowserContext()}`);

document.querySelector("#actionSettings")?.addEventListener("click", (_event: any) => {
    openOrActivateTab('settings.html');
});
