const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    baseUrl: "https://topdev.vn",
    specPattern: "cypress/e2e/features/**/*.feature",
    stepDefinitions: "cypress/e2e/support/step_definitions/*.cy.js",
    supportFile: "cypress/support/commands.js",
    setupNodeEvents: async (on, config) => {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );

      return config;
    },
  },
});
