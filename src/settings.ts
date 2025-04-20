import { getBrowserContext } from "./util/context";
import { markers, predictContext } from "./util/gestalt";

console.info("Markers:", markers);
console.info("Prediction:", predictContext());
console.info(`Startup in context: ${getBrowserContext()}`);

