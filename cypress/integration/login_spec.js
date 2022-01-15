describe("The login flow", () => {
  it("happy path", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=login-button]").click();
    cy.get("[data-cy=login-email-input]").type("dzana@hotmail.com");
    cy.get("[data-cy=login-password-input]").type("aaaaaaaa");
    cy.get("[data-cy=login-submit-button]").click();
    cy.contains(
      "Congratulations! You have successfully logged into FlowrSpot!"
    );
    cy.location("pathname").should("equal", "/");
  });
});
