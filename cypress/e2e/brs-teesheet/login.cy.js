/// <reference types="cypress" />

context("Login screen", () => {
  beforeEach(() => {
    // assumes brs-teesheet is up and running at this url
    cy.visit(Cypress.env("APP_URL") + "/devel/login");
  });

  it("should load the login page", () => {
    cy.get("#headerClub").should("contain", "My Development Club");

    cy.get(".formContainer input[name=_username]").type(
      Cypress.env("USERNAME")
    );
    cy.get(".formContainer input[name=_password]").type(
      Cypress.env("PASSWORD")
    );

    cy.screenshot({
      capture: "fullPage",
      blackout: ["input[name=_password]"],
    });
    cy.intercept({
      method: "POST",
      url: Cypress.env("APP_URL") + "/devel/login**",
    }).as("postLogin");
    cy.get(".formContainer input[type=submit]").invoke("click");
    cy.wait("@postLogin").then(console.log);
    cy.url().should("contain", "/dashboard");
    cy.get("#dashboard #reports h3.panel-title").should("contain", "Bookings");
    cy.getCookie("BrsLoggedIn").should("exist");
    cy.screenshot({
      capture: "fullPage",
      blackout: ["#today"],
    });
  });
});
