const general = require("../../fixtures/pages/general.json");
const createGoalPage = require("../../fixtures/pages/createGoalPage.json");
const goalDashboard = require("../../fixtures/pages/goalDashboard.json");
const creds = require("../../fixtures/creds.json");
const settingsPage = require("../../fixtures/pages/settingsPage.json");

import { faker } from "@faker-js/faker";

describe("User can navigate to Accounts & Users", () => {
  before(() => {
    cy.loginWithCreds(creds);
  });
  it("User can check accounts", () => {
    cy.contains("Accounts & Users").click();
    cy.get(":nth-child(1) > .ant-card-body > .ant-row > .ant-col-2").click();
  });
});
