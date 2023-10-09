/// <reference types="cypress" />

describe("Characters API", () => {
  it("should return a list of characters", () => {
    // make request to harry potter api
    cy.request("GET", "https://hp-api.onrender.com/api/characters").then(
      (response) => {
        expect(response.status).equals(200);
        cy.writeFile("cypress/fixtures/characters.json", response.body);
      }
    );
  });
});
