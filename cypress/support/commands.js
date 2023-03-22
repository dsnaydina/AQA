const general = require("../fixtures/pages/general.json");

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/signin");
  cy.get(general.emailField).type("iwish4amd@picsviral.net");
  cy.get(general.passwordField).type("2211Vfvf");
  cy.get(general.submitButton).click({ force: true });
});
