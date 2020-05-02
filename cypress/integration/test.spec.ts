describe("Test with no beforeEach", function() {
  it("should be able to ping an API", function() {
    cy.server();

    // Delay of 2 seconds
    cy.route("POST", "https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=2000ms").as("sample");
    cy.visit("/");

    cy.get("[data-cy=button]").click();
    cy.wait("@sample");
    cy.get("@sample").should("have.property", "status", 200);
  });

  it("should be able to ping an API a second time", function() {
    cy.server();

    // Delay of 2 seconds
    cy.route("POST", "https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=2000ms").as("sample");
    cy.visit("/");

    cy.get("[data-cy=button]").click();
    cy.wait("@sample");
    cy.get("@sample").should("have.property", "status", 200);
  });

  it("should be able to ping an API a third time using a different alias", function() {
    cy.server();

    // Delay of 2 seconds
    cy.route("POST", "https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=2000ms").as("anotherSample");
    cy.visit("/");

    cy.get("[data-cy=button]").click();
    cy.wait("@anotherSample");
    cy.get("@anotherSample").should("have.property", "status", 200);
  });

  it("should be able to stub a response with status 400", function() {
    cy.server();

    cy.route({
      method: "POST",
      url: "https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=2000ms",
      response: {"stubbed": "stubbed"},
      status: 400,
    }).as("sample");
    cy.visit("/");

    cy.get("[data-cy=button]").click();
    cy.wait("@sample");
    cy.get("@sample").should("have.property", "status", 400);
  });
});
