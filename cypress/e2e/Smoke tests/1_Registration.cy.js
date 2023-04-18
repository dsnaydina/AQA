import { faker } from "@faker-js/faker";
const general = require("../../fixtures/pages/general.json");

describe("User successful registration and login", () => {
  let userData;

  beforeEach(() => {
    userData = {
      userName: faker.internet.userName(),
      email: faker.internet.email().replace(/@/, "+test@o"),
      password: faker.internet.password(),
    };
    cy.visit("/signup");
  });

  it("should allow a user to register and login", () => {
    cy.registerUser(userData);
    cy.visit("/login");
    cy.login(userData);
    cy.contains("Settings").click();
    cy.get("@registeredUser").then((userData) => {
      // Check if the email value is displayed in the input field
      cy.get("#email")
        .should("be.visible")
        .should("have.value", userData.email.toLowerCase()); // convert to lower case
    });

    // Check if the email value matches the one in the `userData` object
    cy.get("#email").then(($emailField) => {
      const emailFromField = $emailField.val().toLowerCase(); // convert to lower case
      expect(emailFromField).to.equal(userData.email.toLowerCase());
    });

    cy.log(`User ${userData.userName} successfully logged in!`);
  });
});
