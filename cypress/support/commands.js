const general = require("../fixtures/pages/general.json");
const creds = require("../fixtures/creds.json");
require("cypress-iframe");
import { faker } from "@faker-js/faker";

Cypress.Commands.add("registerUser", (userData) => {
  cy.log(
    `Registering user with username: ${userData.userName}, email: ${userData.email}, password: ${userData.password}`
  );

  cy.get("#name").type(userData.userName);
  cy.get("#email").type(userData.email);
  cy.get("#password").type(userData.password);
  cy.get('button[type="submit"]').click();
  cy.log(`User ${userData.userName} successfully registered!`);

  // Store registered user data for later use in login tests
  cy.wrap(userData).as("registeredUser");
});

Cypress.Commands.add("login", (userData) => {
  cy.log(
    `Logging in with username: ${userData.userName}, password: ${userData.password}`
  );
  cy.visit("/signin");
  cy.get(general.emailField).type(userData.email);
  cy.get(general.passwordField).type(userData.password);
  cy.get(general.submitButton).click();
});

Cypress.Commands.add("storeUserData", (userData) => {
  cy.wrap(userData).as("userData");
});

Cypress.Commands.add("loginWithCreds", (creds, userIndex = 0) => {
  const { userEmail, userPassword } = creds[userIndex].user;
  cy.log(`Logging in with email: ${userEmail}, password: ${userPassword}`);
  cy.visit("/signin");
  cy.get(general.emailField).type(userEmail);
  cy.get(general.passwordField).type(userPassword);
  cy.get(general.submitButton).click();
});

// Cypress.Commands.add("login", (userData) => {
//   cy.log(
//     `Logging in with username: ${userData.userName}, password: ${userData.password}`
//   );
//   cy.visit("/signin");
//   cy.get(general.emailField).type(userData.email);
//   cy.get(general.passwordField).type(userData.password);
//   cy.get(general.submitButton).click();
// });
