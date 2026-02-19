const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000, // 10 seconds timeout for all commands
  pageLoadTimeout: 60000, // 60 seconds timeout for page load
  retries: 2, // retries attempts

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports", // Directory where reports are stored
    overwrite: false, // Do not overwrite previous reports
    html: true, // Generate HTML report
    json: true, // Generate JSON report
    charts: true, // Include charts in the report (optional)
    reportPageTitle: "Test Report", // Title for the HTML report
    embeddedScreenshots: true, // Embed screenshots in the report
    inlineAssets: true, // Embed assets inline in the report
  },

   e2e: {
    setupNodeEvents(on, config) {
      grep(config);
      return config;
    }
  },

  e2e: {
    baseUrl: 'https://testing.creatics.org',
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true
  },

  projectId: "3uirpk",   // <-- your actual projectId
  e2e: {
    setupNodeEvents(on, config) {
      // node events
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
      // Enable plugin for Cypress
      // return config;
    },
    specPattern: "cypress/e2e/**/*.cy.js", // Matches all .cy.js files in e2e and its subdirectories
  },
});