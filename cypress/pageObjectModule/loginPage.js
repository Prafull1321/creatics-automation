class LoginPage {
  // Selectors
  visit(URL) {
    return cy.visit(URL, { failOnStatusCode: false });
  }

  assertUrl(loggedInURL) {
    return cy.url().should("eq", loggedInURL);
  }

  loginURL(loginText) {
    return cy.url().should("include", loginText);
  }
  signInTitle(text) {
    return cy.get(".card-title").contains(text);
  }
  signInOption() {
    return cy.get(".cus-spacing").contains("SIGN IN").click();
  }
  emailText(UserID) {
    return cy.get("#email").clear().type(UserID, { log: false });
  }

  emptyEmailText() {
    return cy.get(".text-danger").contains(" Email is required ");
  }

  passwordText(Password) {
    return cy.get("#password").clear().type(Password, { log: false });
  }

  emptyPasswordText() {
    return cy.get(".text-danger").contains(" Password is required ");
  }

  loginButton() {
    return cy.get(".btn").click();
  }

  loginError() {
    return cy
      .get(".err-msg")
      .contains("Please enter valid Email Address and Password.");
  }

  assertPartialUrl(partialUrl) {
    return cy.url().should("include", partialUrl);
  }

  googleButton() {
    return cy.get(".sso-login").contains("Continue with Google").click();
  }

  facebookButton() {
    return cy.get(".sso-login").contains("Continue with Facebook").click();
  }

  applyButton() {
    return cy.get(".sso-login").contains("Continue with Apple").click();
  }

  forgotPasswordButton() {
    return cy.get(".privacy-policy").contains("Forgot Password ?").click();
  }

  signUpButton() {
    return cy.get(".login").click();
  }

  menuDropdown() {
    cy.get(".dropdown").first().click();
  }

  profileOption() {
    cy.get(".profileCard").contains("MY PROFILE").click();
  }
}

export default new LoginPage();
