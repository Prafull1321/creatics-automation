/// <reference types="cypress" />

// describe("Email Verification with MailSlurp", () => {
//   let emailAddress;

//   before(() => {
//     // Initialize MailSlurp and create a new inbox
//     cy.initializeMailSlurp().then((email) => {
//       emailAddress = email;
//     });
//   });

//   it("Should receive verification email and click the verify button", function () {
//     // Use the generated email address during sign-up
//     cy.visit("https://mobile.creatics.org/");
//     cy.get(".cus-spacing").contains("SIGN IN").click();
//     cy.get(".login").click();
//     cy.get("#firstname").type("Name");
//     cy.get("#lastname").type("lastName");
//     cy.get("#email").type(emailAddress);
//     cy.get("#password").type("Qwerty");
//     cy.get(".btn").click();

//     // Wait for the email and extract the verification link
//     cy.getLatestEmail(Cypress.env("inboxId")).then((email) => {
//       cy.extractVerifyLink(email).then((verifyLink) => {
//         // Visit the verification link
//         cy.visit(verifyLink);
//       });
//     });

//     // Assert that the user is logged in or redirected to the correct page
//     cy.url().should("include", "/emailVerify"); // Adjust URL as per your app's redirection
//     cy.url().should("include", "https://mobile.creatics.org/userProfiles");
//     cy.get(".heading1").should(
//       "have.text",
//       "Welcome to Creatics - Let's Get Started!"
//     ); // Adjust selector and text as per your app
//   });
// });

describe.skip("Email Verification with MailSlurp", () => {
  let inbox;

  before(() => {
    // Initialize MailSlurp and create a new inbox
    cy.initializeMailSlurp().then((generatedInbox) => {
      inbox = generatedInbox;
    });
  });

  it("Should receive verification email and click the verify button", function () {
    // Use the generated email address during sign-up
    cy.visit("https://mobile.creatics.org/");
    cy.get(".cus-spacing").contains("SIGN IN").click();
    cy.get(".login").click();
    cy.get("#firstname").type("Name");
    cy.get("#lastname").type("lastName");
    cy.get("#email").type(inbox.emailAddress); // Use inbox.emailAddress here
    cy.get("#password").type("Qwerty");
    cy.get(".btn").click();

    // Wait for the email and extract the verification link
    cy.getLatestEmail(inbox.id).then((email) => {
      cy.extractVerifyLink(email).then((verifyLink) => {
        // Visit the verification link
        cy.visit(verifyLink);
      });
    });

    // Assert that the user is logged in or redirected to the correct page
    cy.url().should("include", "/emailVerify"); // Adjust URL as per your app's redirection
    cy.url().should("include", "https://mobile.creatics.org/userProfiles");
    cy.get(".heading1").should(
      "have.text",
      "Welcome to Creatics - Let's Get Started!"
    ); // Adjust selector and text as per your app
  });
});
