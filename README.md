# cypress-test

Test repository to reproduce issue in where Cypress alias routes time out on POST requests. I was facing this issue on my Next.js app where I was doing a login test like below:

```
describe("Login page", function() {
  const loginUrl = "/login";
  const apiUrl = Cypress.env("API_URL");

  beforeEach(function() {
    cy.server();
    cy.route("POST", apiUrl + "/accounts/login/").as("login");
    cy.visit(loginUrl);
    cy.location("pathname").should("eq", "/login");
  });

  it("should show error alert with invalid credentials", function() {
    cy.get("[data-cy=email]").type("example@example.com");
    cy.get("[data-cy=password]").type("wrongpassword1234");
    cy.get("[data-cy=sign-in]").click();
    
    // Below code that waits for @login and checks status of 400 would often fail on CircleCI as it says that no request ever occurred.
    cy.wait("@login");
    cy.get("@login").should("have.property", "status", 400);

    cy.get("[data-cy=error-alert]").should("be.visible");

    cy.location("pathname").should("eq", "/login");
  });
}
```

And similar tests for happy cases (200 responses from login). I would get errors like the below:

CypressError: `cy.wait()` timed out waiting `15000ms` for the 1st request to the route: `login`. No request ever occurred.

Interestingly, for my project, the above would always pass locally, but kept failing in CircleCI. I followed some suggestions in https://github.com/cypress-io/cypress/issues/3427, such as moving `cy.server()` and `cy.route()` calls at the start, but it did not help.

## Test Project

To attempt to reproduce this, I created this repository: a Next.js app with a simple page with a "Test Button" button, which when clicked will call https://mocky.io/ with a 2000 ms delay. It has mostly the same `package.json` file as the one used in my private repo.

Index page with simple button: https://github.com/dphang/cypress-test/blob/master/pages/index.tsx
Cypress test: https://github.com/dphang/cypress-test/blob/master/cypress/integration/test.spec.ts

The Cypress test has two duplicate tests that will verify an API called in the app returns a 200 status ( https://www.mocky.io/ with 2000 ms delay). About 50% of the time, one of the two tests would fail locally, and it fails all (or nearly all) the time on CircleCI. Note that this is different from my private project, where it was failing on CircleCI only.

Example error:

```
  Running:  test.spec.ts                                                                    (1 of 1)


  Test page
    ✓ should be able to ping an API (2707ms)
    1) should be able to ping an API a second time

Cannot find coverage file /root/repo/.nyc_output/out.json
Skipping coverage report

  1 passing (18s)
  1 failing

  1) Test page should be able to ping an API a second time:
     CypressError: `cy.wait()` timed out waiting `15000ms` for the 1st request to the route: `sample`. No request ever occurred.
      at cypressErr (http://localhost:3000/__cypress/runner/cypress_runner.js:146180:16)
      at Object.throwErr (http://localhost:3000/__cypress/runner/cypress_runner.js:146114:11)
      at Object.retry (http://localhost:3000/__cypress/runner/cypress_runner.js:139807:19)
      at checkForXhr (http://localhost:3000/__cypress/runner/cypress_runner.js:136125:17)
      at http://localhost:3000/__cypress/runner/cypress_runner.js:136126:28
      at tryCatcher (http://localhost:3000/__cypress/runner/cypress_runner.js:9059:23)
      at Function.Promise.attempt.Promise.try (http://localhost:3000/__cypress/runner/cypress_runner.js:6333:29)
      at tryFn (http://localhost:3000/__cypress/runner/cypress_runner.js:140268:21)
      at whenStable (http://localhost:3000/__cypress/runner/cypress_runner.js:140303:12)
      at http://localhost:3000/__cypress/runner/cypress_runner.js:139847:16
      at tryCatcher (http://localhost:3000/__cypress/runner/cypress_runner.js:9059:23)
      at Promise._settlePromiseFromHandler (http://localhost:3000/__cypress/runner/cypress_runner.js:6994:31)
      at Promise._settlePromise (http://localhost:3000/__cypress/runner/cypress_runner.js:7051:18)
      at Promise._settlePromise0 (http://localhost:3000/__cypress/runner/cypress_runner.js:7096:10)
      at Promise._settlePromises (http://localhost:3000/__cypress/runner/cypress_runner.js:7176:18)
      at Promise._fulfill (http://localhost:3000/__cypress/runner/cypress_runner.js:7120:18)

```

I am not sure whether it's my stack that's an issue (TypeScript + Next.js + MaterialUI) or some bug in Cypress. Hopefully this repro helps.

Versions: Cypress 4.3.0, Electron 80, Next 9.3.0, React 16.13.0

Example CircleCI build that's failing: https://app.circleci.com/pipelines/github/dphang/cypress-test/8/workflows/afaf8207-3497-46bf-9885-44efc72e62a1/jobs/8
