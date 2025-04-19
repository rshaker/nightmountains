import { getBrowserContext } from "./util/context";
import { markers } from "./util/gestalt";

console.info("Markers:", markers);
console.info(`Startup in context: ${getBrowserContext()}`);

