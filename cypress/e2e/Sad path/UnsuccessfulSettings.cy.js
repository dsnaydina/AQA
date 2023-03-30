const general = require("../../fixtures/pages/general.json");
const createGoalPage = require("../../fixtures/pages/createGoalPage.json");
const goalDashboard = require("../../fixtures/pages/goalDashboard.json");
const creds = require("../../fixtures/creds.json");
const settingsPage = require("../../fixtures/pages/settingsPage.json");

import { faker } from "@faker-js/faker";

describe("Domian tab", () => {
  const fakeDomain = faker.internet.domainName();
  before(() => {
    cy.loginWithCreds(creds);
  });

  it("User can not exclude an excluded domain ", () => {
    cy.contains("Settings").click({ force: true });
    cy.contains("Domain exclusion").click();
    cy.contains("Deny data from").should("be.visible");
    cy.get(settingsPage.domainName).clear().type("winware.com");
    cy.get(settingsPage.excludeButton).click();
    cy.get(settingsPage.excludedDomainList).contains("winware.com");
    cy.get(settingsPage.domainName).clear().type("winware.com");
    cy.get(settingsPage.excludeButton).click();
    cy.contains("This domain is already excluded").should("be.visible");
  });

  it.only("user can not exclude more then 5 domains", () => {
    cy.contains("Settings").click({ force: true });
    cy.contains("Domain exclusion").click();
    cy.contains("Deny data from").should("be.visible");

    // Generate 5 different fake domain names
    for (let i = 0; i < 6; i++) {
      const fakeDomain = faker.internet.domainName();

      cy.get(settingsPage.domainName).clear().type(fakeDomain);
      cy.get(settingsPage.excludeButton).click();
    }
    cy.contains("You can add up to 5 domains").should("be.visible");

    //Deleting excluded domains from the list
    for (let i = 0; i < 5; i++) {
      cy.contains("Remove").click();
      cy.get(settingsPage.removeDomainButton).click();
    }
  });
});
