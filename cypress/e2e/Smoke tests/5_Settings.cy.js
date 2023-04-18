const general = require("../../fixtures/pages/general.json");
const createGoalPage = require("../../fixtures/pages/createGoalPage.json");
const goalDashboard = require("../../fixtures/pages/goalDashboard.json");
const creds = require("../../fixtures/creds.json");
const settingsPage = require("../../fixtures/pages/settingsPage.json");

import { faker } from "@faker-js/faker";

describe.only("Profile tab", () => {
  let newName = faker.internet.userName();

  before(() => {
    cy.loginWithCreds(creds);
  });

  it("User can edit user name", () => {
    cy.contains("Settings").click({ force: true });
    cy.contains("Personal Information").should("be.visible");
    cy.get("#name").clear({ force: true }).type(newName);
    cy.get(settingsPage.updateButton).click();
    cy.contains("Log out").click({ force: true });
  });
});

describe("Teammates tab", () => {
  let teammateEmail = faker.internet.email().replace(/@/, "+test@");

  before(() => {
    cy.loginWithCreds(creds);
  });

  it("User can send invitation to a teammate", () => {
    cy.contains("Settings").click({ force: true });
    cy.contains("Teammates").click({ force: true });
    cy.get(".ant-input").type(teammateEmail);
    cy.contains("Send invitation").click();
    cy.get(":nth-child(2) > .ant-card-body").contains(teammateEmail);
    //cy.contains("Log out").click({ force: true });
  });

  it("User can delete invitation from pending list", () => {
    cy.contains("Settings").click({ force: true });
    cy.contains("Teammates").click({ force: true });
    cy.get(":nth-child(2) > .ant-col-4 > .ant-btn > span").click();
  });
});

describe("JavaScript tab", () => {
  before(() => {
    cy.loginWithCreds(creds);
  });

  it("User can copy JavaScript ", () => {
    cy.contains("Settings").click({ force: true });
    cy.contains("JavaScript").click();
    cy.contains("Just want the code?").should("be.visible");
    cy.contains("Copy").click();
    cy.contains("Copied!").should("be.visible");

    //cy.contains("Log out").click({ force: true });
  });
});

describe("Spreadsheet tab", () => {
  before(() => {
    cy.loginWithCreds(creds);
  });
  //the following test fails due to a bug
  it("User can share a Spreadsheet ", () => {
    cy.contains("Settings").click({ force: true });
    cy.contains("Spreadsheet").click();
    cy.contains("Share your Google Sheets").should("be.visible");
    cy.get(
      "#ipa-app > section > section > main > div > div.ant-col.ant-col-24.m-t-40 > div > div > div > form > div:nth-child(1) > div > div > div > div > input"
    ).type("impactproduct@rfyi-staging.iam.gserviceaccount.com");
    cy.contains("Connected to spreadsheet").should("be.visible");
  });
});

describe("Domian tab", () => {
  before(() => {
    cy.loginWithCreds(creds);
  });

  it("User can exclude a domain ", () => {
    cy.contains("Settings").click({ force: true });
    cy.contains("Domain exclusion").click();
    cy.contains("Deny data from").should("be.visible");
    cy.get(settingsPage.domainName).clear().type("winware.com");
    cy.contains("Exclude domain").click({ force: true });
    cy.get(settingsPage.excludedDomainList).contains("winware.com");
  });

  it("user can delete domain from excluded list", () => {
    cy.contains("Remove").click();
    cy.get(settingsPage.removeDomainButton).click();
    cy.contains("You do not have any excluded domain yet.").should(
      "be.visible"
    );
    cy.contains("Log out").click({ force: true });
  });
});
