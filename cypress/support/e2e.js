// ***********************************************************
// This example support/e2e.js is processed and
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

// Import commands.js using ES2015 syntax:
import "./commands";
import 'cypress-mochawesome-reporter/register';
// Alternatively you can use CommonJS syntax:
// require('./commands')
const app = window.top;
if (!app.document.head.querySelector("[data-hide-command-log-request]")) {
  const style = app.document.createElement("style");
  style.innerHTML =
    ".command-name-request, .command-name-xhr { display: none }";
  style.setAttribute("data-hide-command-log-request", "");

  app.document.head.appendChild(style);
}

import "cypress-mochawesome-reporter/register";
//import "cypress-mailslurp";

// Block third-party scripts that prevent the page load event from firing
beforeEach(() => {
  cy.intercept('GET', '**/*intercom*', { statusCode: 204 });
  cy.intercept('GET', '**/*widget*', { statusCode: 204 });
  cy.intercept('GET', '**/*chat*', { statusCode: 204 });
  cy.intercept('GET', '**/*analytics*', { statusCode: 204 });
  cy.intercept('GET', '**/*googletagmanager*', { statusCode: 204 });
  cy.intercept('GET', '**/*stripe*', { statusCode: 204 });
  cy.intercept('GET', '**/*hotjar*', { statusCode: 204 });
});