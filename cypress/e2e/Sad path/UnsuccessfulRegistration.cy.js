import { faker } from "@faker-js/faker";
const general = require("../../fixtures/pages/general.json");

describe("Unsuccessful registration - invalid user name ", () => {
  let userData;

  it("empty 'userName' field", () => {
    const userWithEmptyName = {
      userName: "",
      email: faker.internet.email().replace(/@/, "+test@"),
      password: faker.internet.password(),
    };

    cy.visit("/signup");
    cy.get("#email").type(userWithEmptyName.email);
    cy.get("#password").type(userWithEmptyName.password);
    cy.get('button[type="submit"]').click();
    cy.contains("Create your account").should("be.visible");
    cy.log("Registration with invalid name failed");
  });

  it("white spaces in the beginning and end of the userName", () => {
    const userData = {
      userName: "  Test User  ",
      email: `test+${Math.random().toString(36).substring(2)}@example.org`,
      password: faker.internet.password(),
    };

    cy.visit("/signup");
    cy.registerUser(userData);
    cy.contains("Create your account").should("be.visible");
    cy.log("Registration with invalid name failed");
  });

  // the following commented tests are not failing due to missing validaition

  // it("userName' with special characters", () => {
  //   const userWithSpecialCharactersInName = {
  //     userName: "Test User#$%#@1",
  //     email: `test+${Math.random().toString(36).substring(2)}@example.org`,
  //     password: faker.internet.password(),
  //   };

  //   cy.visit("/signup");
  //   cy.registerUser(userWithSpecialCharactersInName);
  //   cy.contains("Name should not contain special characters").should(
  //     "be.visible"
  //   );
  // });

  //   it("name that is too long", () => {
  //     const name = faker.name.firstName().toLowerCase();
  //     const email = `${name}+test@example.org`;
  //     const password = "Password1234";
  //     const userWithLongName = {
  //       userName:
  //         "Test User with a very long name that exceeds the maximum allowed length",
  //       email: email,
  //       password: password,
  //     };

  //     cy.visit("/signup");
  //     cy.registerUser(userWithLongName);
  //     cy.contains("Create your account").should("be.visible");
  //   });
});

describe("Unsuccessful registration - invalid email", () => {
  let userData;
  beforeEach(() => {
    userData = {
      userName: faker.internet.userName(),
      email: faker.internet.email().replace(/@/, "+test@"),
      password: faker.internet.password(),
    };
    cy.visit("/signup");
  });

  it("invalid email format", () => {
    const invalidEmail = "notanemail";
    const errorMessage = "Please enter a valid email address.";
    const expectedAlertMessage = "Please include '@' in the email address.";

    cy.visit("/signup");
    cy.get("#name").type(userData.userName);
    cy.get("#email").type(invalidEmail);
    cy.get("#password").type("Password1234");
    cy.get('button[type="submit"]').click();

    cy.get('button[type="submit"]').click();
    cy.contains("Create your account").should("be.visible");
    cy.log("Registration with invalid email failed");
  });

  it("email that is already in use", () => {
    const existingEmail = "iwish4amd@picsviral.net"; // replace with an email that already exists in the system

    cy.get("#name").type(userData.userName);
    cy.get("#email").type(existingEmail);
    cy.get("#password").type(userData.password);
    cy.get('button[type="submit"]').click();
    cy.contains(
      "The email address is already in use by another account"
    ).should("be.visible");
    cy.log("Registration with invalid email failed");
  });

  it("register with an empty email field", () => {
    cy.get("#name").type(userData.userName);
    cy.get("#password").type(userData.password);
    cy.get('button[type="submit"]').click();
    cy.contains("Create your account").should("be.visible");
    cy.log("Registration with invalid email failed");
  });

  it("email with invalid characters", () => {
    const userData = {
      userName: faker.internet.userName(),
      email: "test#example.com",
      password: faker.internet.password(),
    };

    cy.visit("/signup");
    cy.registerUser(userData);
    cy.contains("Create your account").should("be.visible");
    cy.log("Registration with invalid email failed");
  });

  it("email with a missing domain", () => {
    const userData = {
      userName: faker.internet.userName(),
      email: "test@example",
      password: faker.internet.password(),
    };

    cy.visit("/signup");
    cy.registerUser(userData);
    cy.contains("The email address is badly formatted.").should("be.visible");
    cy.log("Registration with invalid email failed");
  });

  it("email with missing username", () => {
    const userData = {
      userName: faker.internet.userName(),
      email: "@example.com",
      password: faker.internet.password(),
    };
    cy.registerUser(userData);
    cy.contains("Create your account").should("be.visible");
    cy.log("Registration with invalid email failed");
  });
});

describe("Unsuccessful registration - invalid password ", () => {
  let userData;
  beforeEach(() => {
    userData = {
      userName: faker.internet.userName(),
      email: faker.internet.email().replace(/@/, "+test@i"),
      password: faker.internet.password(),
    };
    cy.visit("/signup");
  });

  it("password too short", () => {
    const invalidPassword = "12";

    cy.get("#name").type(userData.userName);
    cy.get("#email").type(userData.email);
    cy.get("#password").type(invalidPassword);
    cy.get('button[type="submit"]').click();
    cy.contains(
      "The string should have a minimum length of 8 characters"
    ).should("be.visible");
    cy.log("Registration with invalid password failed");
  });

  it("password with all upper case", () => {
    const invalidPassword = "AAAAAAAA12";

    cy.get("#name").type(userData.userName);
    cy.get("#email").type(userData.email);
    cy.get("#password").type(invalidPassword);
    cy.get('button[type="submit"]').click();
    cy.contains(
      "The string should have a minimum of 1 lowercase letter"
    ).should("be.visible");
    cy.log("Registration with invalid password failed");
  });

  it("password with all lower case", () => {
    const invalidPassword = "aaaeeaq11";

    cy.get("#name").type(userData.userName);
    cy.get("#email").type(userData.email);
    cy.get("#password").type(invalidPassword);
    cy.get('button[type="submit"]').click();
    cy.contains(
      "The string should have a minimum of 1 uppercase letter"
    ).should("be.visible");
    cy.log("Registration with invalid password failed");
  });
});

// The string should have a minimum length of 8 characters
// The string should have a minimum of 1 uppercase letter
// The string should have a minimum of 1 lowercase letter
