const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    baseUrl: "https://topdev.vn",
    specPattern: "cypress/e2e/features/**/*.feature",
    stepDefinitions: "cypress/e2e/support/step_definitions/*.cy.js",
    supportFile: "cypress/support/commands.js",
    downloadsFolder: "cypress/downloads",

    setupNodeEvents: async (on, config) => {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );
      on("task", {
        fileExists(filename) {
        const downloadsFolder = config.downloadsFolder;
        const fullPath = path.join(downloadsFolder, filename);
        console.log("🔍 Checking path:", fullPath);
        return fs.existsSync(fullPath);
        },
      });

      return config;
    },
  },
});
