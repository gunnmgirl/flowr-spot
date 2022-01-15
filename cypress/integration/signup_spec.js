describe("The signup flow", () => {
  it("email already taken", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=signup-button]").click();
    cy.get("[data-cy=signup-first-name-input]").type("Dzana");
    cy.get("[data-cy=signup-last-name-input]").type("Twee");
    cy.get("[data-cy=signup-datepicker]").click();
    cy.contains("28").click();
    cy.get("[data-cy=signup-email-input]").type("dzana@hotmail.com");
    cy.get("[data-cy=signup-password-input]").type("aaaaaaaa");
    cy.get("[data-cy=signup-submit-button]").click();
    cy.contains("Email has already been taken");
    cy.location("pathname").should("equal", "/");
  });
});
