const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
        },
        baseUrl: "https://demoqa.com",
        supportFile: "cypress/support/e2e.js",
        specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    },
});
