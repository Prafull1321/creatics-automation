// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js
// cypress/support/commands.js

// ------------------------------------------------------------
// cypress/support/commands.js

Cypress.on("uncaught:exception", (err, runnable) => {
  // We expect a classList error to occur, so we return false to prevent Cypress from failing the test
  if (
    err.message.includes(
      "Cannot read properties of undefined (reading 'classList')"
    )
  ) {
    return false;
  }
  // Suppress Stripe checkout expressCheckout mount error
  if (err.message.includes("expressCheckout")) {
    return false;
  }
  // If we don't recognize the error, let Cypress handle it normally
  return true;
});

// ------------------------------------------------------------
Cypress.Commands.add("dismissPopup", () => {
  cy.get("body").then(($body) => {
    if ($body.find(".custom-dialog-container").length > 0) {
      cy.get(".custom-button").click();
    }
  });
});

//-------------------------------------------------------------

import { MailSlurp } from "mailslurp-client";

// Initialize MailSlurp and store the instance and inbox ID in Cypress environment variables
Cypress.Commands.add("initializeMailSlurp", () => {
  const apiKey =
    "cb633a38e797a635b16f5809d965af6d3245f2fb4b8b84ac372286da2908350f"; // Replace with your MailSlurp API key -- 0ea5ed1d5d42a9dfd309cdb5783e910f61b4ea1ece3b1d7d2baf09fc1e991d58
  const mailslurp = new MailSlurp({ apiKey }); //  ----------haldons mailslurp key -- cb633a38e797a635b16f5809d965af6d3245f2fb4b8b84ac372286da2908350f

  // Create a new inbox and store the inbox ID and email address
  return mailslurp.createInbox().then((inbox) => {
    Cypress.env("mailslurp", mailslurp);
    Cypress.env("inboxId", inbox.id);
    return inbox; // Return the full inbox object containing id and email address
  });
});

// Fetch the latest unread email from the inbox (optional `since` Date filters to emails received after that time)
Cypress.Commands.add("getLatestEmail", (inboxId, since) => {
  const mailslurp = Cypress.env("mailslurp");
  return mailslurp.waitForLatestEmail(inboxId, 60000, true, since);
});

// Extract the verification link from the latest email
Cypress.Commands.add("extractVerifyLink", (email) => {
  const parser = new DOMParser();
  const emailDoc = parser.parseFromString(email.body, "text/html");
  const verifyButton = emailDoc.querySelector("a"); // Adjust selector if necessary
  return verifyButton.href;
});

// Extract the OTP code from the latest email (optional `since` Date filters to emails received after that time)
Cypress.Commands.add("getOTPFromInbox", (inboxId, since) => {
  const mailslurp = Cypress.env("mailslurp");
  return mailslurp.waitForLatestEmail(inboxId, 60000, true, since).then((email) => {
    const otpMatch = email.body.match(/\b\d{6}\b/); // Assume the OTP is a 6-digit code
    if (otpMatch) {
      return otpMatch[0];
    } else {
      throw new Error("OTP not found in the email");
    }
  });
});

// Cypress.Commands.overwrite('visit', (originalFn, url, options = {}) => {
//   options = {
//     ...options,
//     timeout: 60000,
//     // Prevent Cypress from waiting for window.load
//     onBeforeLoad(win) {
//       // Fake load event
//       Object.defineProperty(win.performance, 'timing', {
//         value: { loadEventEnd: 1 },
//         configurable: true,
//       });
//     }
//   };
  
//   return originalFn(url, options);
// });

//-----------------------------------------------------------------------