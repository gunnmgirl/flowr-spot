Cypress.Commands.add("login", () => {
  localStorage.clear();
  cy.visit("http://localhost:3000");
  cy.request("POST", "https://flowrspot-api.herokuapp.com/api/v1/users/login", {
    email: "dzana@hotmail.com",
    password: "aaaaaaaa",
  }).then((response) => {
    const { auth_token } = response.body;
    localStorage.setItem("token", auth_token);
  });
});
