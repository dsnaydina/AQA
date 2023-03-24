import { faker } from "@faker-js/faker";
const general = require("../../fixtures/pages/general.json");

describe("User successful registration and login", () => {
  let userData;

  beforeEach(() => {
    userData = {
      userName: faker.internet.userName(),
      email: faker.internet.email().replace(/@/, "+test@"),
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

describe("Unsuccessful registration - invalid user name ", () => {
  it.only("should display an error message when registering with an empty 'userName' field", () => {
    const userWithEmptyName = {
      userName: "",
      email: faker.internet.email().replace(/@/, "+test@"),
      password: faker.internet.password(),
    };

    cy.visit("/signup");
    cy.registerUser(userWithEmptyName);
    cy.contains("Name is required").should("be.visible");
  });
  it("should display an error message when registering with a 'userName' that contains special characters", () => {
    const userWithSpecialCharactersInName = {
      userName: "Test User#1",
      email: faker.internet.email().replace(/@/, "+test@"),
      password: faker.internet.password(),
    };

    cy.visit("/signup");
    cy.registerUser(userWithSpecialCharactersInName);
    cy.contains("Name should not contain special characters").should(
      "be.visible"
    );
  });

  it("should display an error message when registering with a name that is too long", () => {
    const name = faker.name.firstName().toLowerCase();
    const email = `${name}+test@example.org`;
    const password = "Password1234";
    const userWithLongName = {
      userName:
        "Test User with a very long name that exceeds the maximum allowed length",
      email: email,
      password: password,
    };

    cy.visit("/signup");
    cy.registerUser(userWithLongName);
    //cy.contains("Name is too long").should("be.visible");
  });
});

describe("Unsuccessful registration - invalid password", () => {
  it("should display an error message when registering with an invalid email format", () => {
    const invalidEmail = "notanemail";
    const errorMessage = "Please enter a valid email address.";
    const expectedAlertMessage = "Please include '@' in the email address.";

    cy.get("#name").type(userData.userName);
    cy.get("#email").type(invalidEmail);
    cy.get("#password").type(userData.password);
    cy.get('button[type="submit"]').click();

    cy.get('button[type="submit"]').click();
    cy.contains("Create your account").should("be.visible");
    cy.log("Registration with invalid email failed");
  });

  it("should display an error message when registering with an email that is already in use", () => {
    const existingEmail = "iwish4amd@picsviral.net"; // replace with an email that already exists in the system

    cy.get("#name").type(userData.userName);
    cy.get("#email").type(existingEmail);
    cy.get("#password").type("2211Vfvf");
    cy.get('button[type="submit"]').click();
    cy.contains(
      "The email address is already in use by another account"
    ).should("be.visible");
    cy.log("Registration with invalid email failed");
  });
});

describe("Unsuccessful registration - invalid password ", () => {
  it("should display an error message when registering with a password that is too short", () => {
    const invalidPassword = "123";

    cy.get("#name").type(userData.userName);
    cy.get("#email").type(userData.email);
    cy.get("#password").type(invalidPassword);
    cy.get('button[type="submit"]').click();
    cy.contains("Create your account").should("be.visible");
    cy.log("Registration with invalid email failed");
  });
});
