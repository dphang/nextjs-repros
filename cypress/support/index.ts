// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

Cypress.on("window:before:load", win => {
  fetch("https://unpkg.com/unfetch/dist/unfetch.umd.js")
    .then(stream => stream.text())
    .then(response => {
      (win as any).eval(response);
      (win as any).fetch = (win as any).unfetch;
    });
});

import "./commands";
import "@percy/cypress";
import "@cypress/code-coverage/support";
