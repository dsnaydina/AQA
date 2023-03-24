import { faker } from "@faker-js/faker";
const general = require("../../fixtures/pages/general.json");

describe("User successful login", () => {
  let userData;

  it("incorrect email", () => {
    const invalidEmail = "invalidemail@example.com";
    const password = "2211Vfvf";

    cy.login({ email: invalidEmail, password });
    //cy.contains(errorMessage).should("be.visible");
    cy.contains(
      "There is no user record corresponding to this identifier. The user may have been deleted."
    ).should("be.visible");
    cy.log(`Login with invalid email ${invalidEmail} failed`);
  });

  it("incorrect password", () => {
    const email = "iwish4amd@picsviral.net";
    const invalidPassword = "wrongpassword";

    cy.login({ email, password: invalidPassword });
    cy.contains(
      "The password is invalid or the user does not have a password."
    ).should("be.visible");
    cy.log(`Login with invalid email ${invalidEmail} failed`);
  });

  it("empty email field", () => {
    const password = "2211Vfvf";
    cy.visit("/signin");
    cy.get(general.passwordField).type(password);
    cy.get(general.submitButton).click();
    cy.log(`Login with empty email field failed`);
  });

  it("empty password field", () => {
    const email = "invalidemail@example.com";
    cy.visit("/signin");
    cy.get(general.emailField).type(email);
    cy.get(general.submitButton).click();
    cy.log(`Login with empty email field failed`);
  });

  it("password case sensitive", () => {
    const email = "iwish4amd@picsviral.net";
    const password = "2211VFVF";
    cy.visit("/signin");
    cy.get(general.emailField).type(email);
    cy.get(general.passwordField).type(password);
    cy.get(general.submitButton).click();
    cy.contains(
      "The password is invalid or the user does not have a password."
    ).should("be.visible");
    cy.log(`Login with empty email field failed`);
  });

  //email is not case sensitive - is it ok?
  //   it("email case sensitive", () => {
  //     const email = "IWISH4amd@picsviral.NET";
  //     const password = "2211Vfvf";
  //     cy.visit("/signin");
  //     cy.get(general.emailField).type(email);
  //     cy.get(general.passwordField).type(password);
  //     cy.get(general.submitButton).click();
  //     cy.log(`Login with empty email field failed`);
  //   });
});
