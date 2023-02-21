const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "b1fgmp",
  e2e: {
    //baseUrl: "https://app.staging.winware.ai/",
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
