const general = require("../../fixtures/pages/general.json");
const createGoalPage = require("../../fixtures/pages/createGoalPage.json");
const goalDashboard = require("../../fixtures/pages/goalDashboard.json");
const creds = require("../../fixtures/creds.json");
const settingsPage = require("../../fixtures/pages/settingsPage.json");

describe("User can navigate to Accounts & Users", () => {
  before(() => {
    cy.loginWithCreds(creds);
  });
  it("User can check accounts and select account as a favorite", () => {
    cy.contains("Accounts & Users").click();
    cy.get("Welcome to Winware!").should("be.visible");
  });
});
