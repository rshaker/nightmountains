// import { getBrowserContext } from "./util/context";
// import { markers, predictContext } from "./util/gestalt";
// import { getBrowserName } from "../util/determine";
import { detectContext, getBrowserName } from "./util/detect";

console.info("detectContext", detectContext());
console.info("getBrowserName", getBrowserName());
// Firefox: navigator.userAgent == Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:137.0) Gecko/20100101 Firefox/137.0
// Chrome: navigator.userAgent == Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36
// Edge: navigator.userAgent == Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0
// Safari: navigator.userAgent == Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0.1 Safari/605.1.15
console.info("navigator.userAgent", navigator.userAgent);
// console.info("Markers:", markers);
// console.info("Prediction:", predictContext());
// console.info(`Startup in context: ${getBrowserContext()}`);

