import { faker } from "@faker-js/faker";
const general = require("../../fixtures/pages/general.json");

describe("API Login Test", () => {
  it("Logs in and gets user data", () => {
    cy.request({
      method: "POST",
      url: "https://staging.winware.ai/api/signin",
      body: {
        email: "iwish4amd@picsviral.net",
        password: "2211Vfvf",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.request({
        method: "GET",
        url: "https://staging.winware.ai/api/users/me",
        headers: {
          Authorization: `Bearer ${response.body.token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        // Add more assertions as needed
      });
    });
  });
});
