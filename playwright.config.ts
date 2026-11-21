// import path from "path";
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// TEST_BUILD says which build of the extension the tests run against: "dev" or "prod".
// The npm scripts set it. Tests that need development-only files are skipped for "prod".
// If it is missing or invalid, warn and fall back to "dev". The value is written back to
// process.env, so worker processes inherit it and the warning is printed only once.
const testBuild = process.env.TEST_BUILD;
if (testBuild !== "dev" && testBuild !== "prod") {
    const found = testBuild === undefined ? "is not set" : `has the invalid value "${testBuild}"`;
    const bar = "=".repeat(78);
    console.warn(
        [
            "",
            bar,
            `WARNING: the TEST_BUILD environment variable ${found}.`,
            "",
            'The tests will run as TEST_BUILD=dev, which assumes the extension in webext/',
            "was built in development mode. Against a production build, the tests that",
            "need development-only files will fail instead of being skipped.",
            "",
            "To fix this, do one of the following:",
            "  - Run the tests through npm, which builds first and sets TEST_BUILD:",
            "        npm run playwright:test:dev",
            "        npm run playwright:test:prod",
            "  - Or set it yourself to match the build that is in webext/:",
            "        TEST_BUILD=dev npx playwright test",
            "        TEST_BUILD=prod npx playwright test",
            bar,
            "",
        ].join("\n")
    );
    process.env.TEST_BUILD = "dev";
}

export default defineConfig({
    testDir: "playwright/specs",
    // It's not possible to run projects sequentially and run tests in parallel at the same time,
    // everything will run in parallel if anything is run in parallel and the number of workers is greater than 1.
    // This seems to be a limitation of Playwright. But we don't want to run in parallel anyway.
    fullyParallel: false,
    forbidOnly: !!process.env.CI, // don't know what forbidOnly does
    retries: process.env.CI ? 2 : 0,
    workers: 1, // No parallel testing allowed!

    // Reporter to use. See https://playwright.dev/docs/test-reporters
    reporter: [
        ["list"], // Console output
        ["html", { open: "never", outputFolder: "playwright/playwright-report" }],
    ],
    outputDir: "playwright/test-results", // Set the directory for screenshots, videos, etc.
    use: {
        viewport: { width: 1200, height: 800 },

        // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
        trace: "on",
        // video: "on", // Won't work here, because we use custom contexts
    },
    projects: [
        // { name: "auth", testMatch: /auth\.setup\.ts/ },

        // Projects that reuse the authenticated session state
        {
            name: "auth project",
            use: {
                ...devices["Desktop Chrome"],
                // storageState, // Reuse cookies
                // launchOptions: {
                //     args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`],
                // },
            },
            // dependencies: ["auth"],
        },
    ],
});
