class EmailVerification {
  visitEmailLink(verifyLink) {
    cy.visit(verifyLink, {
      failOnStatusCode: false,
    });
  }

  assertButtonURL() {
    cy.url().should("include", "/emailVerify");
  }

  assertLoggedURL() {
    cy.url().should("include", "/userProfiles");
  }

  assertHeadingAfterLogin() {
    cy.get(".heading1").should(
      "have.text",
      "Welcome to Creatics - Let's Get Started!"
    );
  }
}

export default new EmailVerification();
