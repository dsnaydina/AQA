const general = require("../../fixtures/pages/general.json");
const createGoalPage = require("../../fixtures/pages/createGoalPage.json");
const goalDashboard = require("../../fixtures/pages/goalDashboard.json");
const userAction = require("../../fixtures/pages/userAction.json");

describe("User can edit and delete a user action", () => {
  it("User can edit a user action name ", () => {
    //cy.login1("iwish4amd@picsviral.net", "2211Vfvf");

    cy.visit("/login");
    cy.login(userData);
    cy.get(userAction.userActionTab).click();
    cy.contains("Create new action").should("be.visible");
    cy.get(userAction.editButton).click();
    cy.contains("Name").should("be.visible");
    cy.get(userAction.nameInput).clear().type("New name");
    cy.get(userAction.saveButton).click();
    cy.contains("Create new action").should("be.visible");
  });
  it("User can navigate in the user action dashboard", () => {
    cy.get(userAction.userActionItem).click();
    cy.contains("How many users are clicking it?").should("be.visible");
    cy.get(userAction.segmentsDropdown).click();

    // user can navigate on 'people ' tab
    cy.contains("Enterprise").click().wait(1000);
    cy.contains("SMB").click().wait(1000);
    cy.contains("Non-US").click().wait(1000);
    // cy.contains("US").click().wait(1000);
    // user can navigate on click tab
    cy.contains("Clicks").click().wait(4000);
    cy.contains("Are users clicking it?").should("be.visible");
    // user can navigate on adoption tab
    cy.contains("Adoption").click().wait(4000);
    cy.contains("What % of my users click on this element(s)?").should(
      "be.visible"
    );
  });

  it("User can delete a user action", () => {
    cy.get(".nav-item").click();
    cy.get(
      "#ipa-app > section > section > main > div > div.container > div > div > div > div > div > ul > li > ul > li:nth-child(3) > a > div > div > span > svg"
    ).click();
  });
});
