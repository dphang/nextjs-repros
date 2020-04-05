describe("Test page", function() {
  beforeEach(function () {
    cy.server();
    cy.route("POST", "https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=5000ms").as("sample");
    cy.visit("/");
  });

  it("should be able to ping an API", function() {
    cy.get("[data-cy=button]").click();
    cy.wait("@sample");
    cy.get("@sample").should("have.property", "status", 200);
  });

  it("should be able to ping an API a second time", function() {
    cy.get("[data-cy=button]").click();
    cy.wait("@sample");
    cy.get("@sample").should("have.property", "status", 200);
  });
});
