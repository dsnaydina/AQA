import "cypress-iframe";
const general = require("../fixtures/pages/general.json");
const createGoalPage = require("../fixtures/pages/createGoalPage.json");
const goalDashboard = require("../fixtures/pages/goalDashboard.json");
const userAction = require("../fixtures/pages/userAction.json");

describe("User can create and delete a user action", () => {
  it("User creates a user action", () => {
    cy.login("iwish4amd@picsviral.net", "2211Vfvf");
    cy.get(userAction.userActionTab).click();
    cy.get(".ant-row > .ant-btn").click();

    cy.visit(
      "https://staging.winware.ai/demo/signin?ipa-organization=28b9f9a9-6301-437f-b784-502e4f17ffdf"
    );

    cy.get("iframe").should("be.visible");

    cy.get("iframe#ipa-app").then((iframe) => {
      cy.wait(5000);
      cy.log(iframe.contents());
      cy.get("#ipa-app").contains("Create new").click();

      //   expect(iframe.contents().find("body")).not.to.be.empty;
    });

    // cy.iframe("iframe#ipa-app").then((iframe) => {
    //   expect(iframe.contents().find("iframe#ipa-extension")).to.exist;
    // });

    cy.iframe("#ipa-app").within(() => {
      cy.get("#ipa-extension", { timeout: 10000 })
        .should("be.visible")
        .find("button > span", { timeout: 10000 })
        .click();
    });

    cy.frameLoaded("#ipa-app");
    cy.iframe("#ipa-app")
      .wait(9000)
      .find(
        "#ipa-extension > section > section > main > div > div:nth-child(1) > div > div:nth-child(2) > div"
      )
      .type("New User Action");

    //   cy.get(
    //   "#ipa-extension > section > section > main > div > div:nth-child(1) > div > div:nth-child(2) > div > input"
    // ).type("New User Action");
    // cy.get(
    //   "#ipa-extension > section > section > main > div > div.ant-row.m-t-15 > div > div > div > div > div > button > span"
    // ).click();
    // cy.get("#dashboard").click();
    // cy.frameLoaded("#ipa-app");
    // cy.iframe("#ipa-app").click();
    // const iframe = cy.get("#ipa-app")
    //   .its("0.contentDocument.body")
    //   .should("be.visible")
    //   .then(cy.wrap);

    // cy.iframe(
    //   "#ipa-extension > section > section > main > div > div:nth-child(1) > div > button > span"
    // ).then(($iframe) => {

    //   $iframe
    //     .find(
    //       "#ipa-extension > section > section > main > div > div:nth-child(1) > div > button > span"
    //     )
    //     .click();
    // });
  });
});
