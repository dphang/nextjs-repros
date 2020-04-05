describe("Test page", function() {
  beforeEach(function() {
    cy.server();
    cy.route("GET", "https://api.github.com/").as("ping");
    cy.visit("/");
  });

  it("should be able to ping GitHub's API", function() {
    cy.get("[data-cy=button]").click();
    cy.wait("@ping");
    cy.get("@ping").should("have.property", "status", 200);
  });
});
