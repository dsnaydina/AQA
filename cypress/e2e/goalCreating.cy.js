const general = require("../fixtures/pages/general.json");
const createGoalPage = require("../fixtures/pages/createGoalPage.json");
const goalDashboard = require("../fixtures/pages/goalDashboard.json");

describe("User can create and delete a goal", () => {
  before(() => {
    cy.login("dsnaydina@gmail.com", "2211Vfvf");
  });

  it("User can  create a goal based on plan upgrade", () => {
    //user creates a goal
    cy.get(general.createNewGoal).click({ force: true });
    cy.contains("What is your goal?").should("exist");
    cy.get(createGoalPage.basedOnPlanUpgrade).click({ force: true });
    cy.get(createGoalPage.nextButton).click({ force: true });
    cy.contains("Define your victory condition").should("exist");
    cy.get(createGoalPage.fromField).type("free");
    cy.get(createGoalPage.toField).type("pro");
    cy.get(createGoalPage.saveNewGoalButton).click();
    cy.get(createGoalPage.saveNewGoalButton).click();
    cy.contains("Goal: Conversion & Expansion").should("exist");
    //deleting a goal
    cy.get(goalDashboard.dropdownMenu).click({ force: true });
    cy.get(goalDashboard.deleteGoalOption).click({ force: true });
    cy.contains("Are you sure you want to delete this goal?").should("exist");
    cy.get(goalDashboard.deleteButton).click({ force: true });
    cy.contains("No active goals").should("exist");
  });

  it("User can create a goal based on a click event", () => {
    cy.get(general.createNewGoal).click({ force: true });
    cy.contains("What is your goal?").should("exist");
    cy.get(createGoalPage.basedOnClickEvent).click({ force: true });
    cy.get(createGoalPage.nextButton).click({ force: true });
    cy.contains("Define your victory condition").should("exist");
    cy.get(createGoalPage.event).click({ force: true });
    cy.get(createGoalPage.saveNewGoalButton).click();
    cy.contains("Based on a click event").should("exist");
    //deleting a goal
    cy.get(goalDashboard.dropdownMenu).click({ force: true });
    cy.get(goalDashboard.deleteGoalOption).click({ force: true });
    cy.contains("Are you sure you want to delete this goal?").should("exist");
    cy.get(goalDashboard.deleteButton).click({ force: true });
    cy.contains("No active goals").should("exist");
  });

  it("User can create a goal based url destination", () => {
    cy.get(general.createNewGoal).click({ force: true });
    cy.contains("What is your goal?").should("exist");
    cy.get(createGoalPage.basedOnUrlDestination).click({ force: true });
    cy.get(createGoalPage.nextButton).click({ force: true });
    cy.contains(
      "Enter the destination url that will complete your victory condition"
    ).should("exist");
    cy.get(createGoalPage.url).type("home");
    cy.get(createGoalPage.saveNewGoalButton).click();
    cy.contains("Based on URL destination").should("exist");
    //    //deleting a goal
    cy.get(goalDashboard.dropdownMenu).click({ force: true });
    cy.get(goalDashboard.deleteGoalOption).click({ force: true });
    cy.contains("Are you sure you want to delete this goal?").should("exist");
    cy.get(goalDashboard.deleteButton).click({ force: true });
    cy.contains("No active goals").should("exist");
  });

  it("User can create a retention goal based on a customer???s health score", () => {
    cy.get(general.createNewGoal).click({ force: true });
    cy.contains("What is your goal?").should("exist");
    cy.get(createGoalPage.basedOnCustomersScore).click({ force: true });
    cy.get(createGoalPage.nextButton).click({ force: true }).wait(4000);
    cy.contains(
      "Understand user behavior base on plan upgrade event and get recommendations"
    ).should("exist");
    cy.get(createGoalPage.fromHealthField).click({ force: true });
    cy.get(createGoalPage.toHealthField).click({ force: true });
    cy.get(createGoalPage.saveNewGoalButton).click().wait(9000);
    cy.contains("Based on a customer???s health score").should("exist");
    //    //deleting a goal
    cy.get(goalDashboard.dropdownMenu).click({ force: true });
    cy.get(goalDashboard.deleteGoalOption).click({ force: true });
    cy.contains("Are you sure you want to delete this goal?").should("exist");
    cy.get(goalDashboard.deleteButton).click({ force: true });
    cy.contains("No active goals").should("exist");
  });

  it("User can create a retention goal based on a plan renewal", () => {
    cy.get(general.createNewGoal).click({ force: true }).wait(4000);
    cy.contains("What is your goal?").should("exist");
    cy.get(createGoalPage.basedOnPlanRenewal).click({ force: true });
    cy.get(createGoalPage.nextButton).click({ force: true }).wait(4000);
    cy.contains("Decide which plan is your victory condition").should("exist");
    cy.get(createGoalPage.planNameField).type("pro");
    cy.get(createGoalPage.saveNewGoalButton).click();
    cy.get(createGoalPage.saveNewGoalButton).click().wait(4000);
    cy.contains("Based on a plan renewal").should("exist");
    // deleting a goal
    cy.get(goalDashboard.dropdownMenu).click({ force: true });
    cy.get(goalDashboard.deleteGoalOption).click({ force: true });
    cy.contains("Are you sure you want to delete this goal?").should("exist");
    cy.get(goalDashboard.deleteButton).click({ force: true });
    cy.contains("No active goals").should("exist");
    // cy.get(
    //   "#ipa-app > section > aside > div > div > div.ant-col.ant-col-24.bottom-menu > ul > li:nth-child(2)"
    // ).click({ force: true });
  });

  // it('User can delete a goal', () => {
  //     cy.clearCookies();
  //     cy.login("dsnaydina@gmail.com", "2211Vfvf");
  //     cy.get('#ipa-app > section > section > main > div > div.container > div > div:nth-child(1) > div > div > button').click({force: true});
  //     cy.get('body > div:nth-child(3) > div > div > ul > li > span.ant-dropdown-menu-title-content').click({force: true});
  //     cy.contains("Are you sure you want to delete this goal?").should("exist");
  //     cy.get('body > div:nth-child(4) > div > div.ant-modal-wrap > div > div.ant-modal-content > div > div.ant-row.m-t-8 > div:nth-child(2) > button > span').click({force: true});
  //     cy.clearCookies();
  // });

  after(() => {
    cy.get(general.logOut).click({ force: true });
  });
});
