class SignUpPage {
  fillFirstName(Name) {
    return cy.get("#firstname").type(Name);
  }

  fillLastName(Name) {
    return cy.get("#lastname").type(Name);
  }
  fillEmail(emailText) {
    console.log("Email text: ", emailText);
    return cy.get("#email").clear().type(emailText);
  }
  fillPassword(passwordText) {
    return cy.get("#password").type(passwordText);
  }
  joinButton() {
    return cy.get(".btn").contains("Join Now").click({ force: true });
  }

  titleText() {
    return cy.get(".card-title").contains("Sign Up");
  }

  signUpPageURL() {
    return cy.url().should("include", "signup");
  }

  emptyFristNameError() {
    return cy
      .get(".text-danger")
      .contains(" First Name is required ")
      .should("be.visible");
  }
  emptyLastNameError() {
    return cy
      .get(".text-danger")
      .contains(" Last Name is required ")
      .should("be.visible");
  }
  emptyEmailError() {
    return cy
      .get(".text-danger")
      .contains(" Email is required ")
      .should("be.visible");
  }
  emptyPasswordError() {
    return cy
      .get(".text-danger")
      .contains(" Password is required ")
      .should("be.visible");
  }
  invalidEmailError() {
    return cy
      .get(".text-danger")
      .contains(" Enter a valid email address ")
      .should("be.visible");
  }
  invalidPasswordError() {
    return cy
      .get(".text-danger")
      .contains(" Password must between 6 to 30 charactes long ")
      .should("be.visible");
  }

  googleCTA() {
    return cy.get(".sso-login").contains("Continue with Google").click();
  }
  facebookButton() {
    return cy.get(".sso-login").contains("Continue with Facebook").click();
  }

  appleButton() {
    return cy.get(".sso-login").contains("Continue with Apple").click();
  }
  signInButton() {
    return cy.get(".login").click();
  }

  alreadyUsedEmailError() {
    return cy
      .get(".err-msg")
      .contains("A user with the same email address has already registered.")
      .should("be.visible");
  }

  ssoPopupClosedError() {
    return cy
      .get(".err-msg")
      .contains(
        "The popup has been closed by the user before finalizing the operation."
      );
  }

  otpPageTitle() {
    return cy.get(".card-title").contains("Email Confirmation");
  }
  fillOTP(otp) {
    return cy.get("#exampleInputEmail1").clear().type(otp);
  }
  resendEmail() {
    return cy.get(".resend-txt").contains("Resend Email").click();
  }
  verifyOtpBtn() {
    return cy.get(".btn").contains("Verify Email").click();
  }
  titleSubText(subText) {
    return cy.get(".ng-untouched").should("eq", subText);
  }
  emptyOtpError() {
    return cy
      .get(".text-danger")
      .contains(" Verification code is required ")
      .should("be.visible");
  }
  invalidOtpText() {
    return cy
      .get(".err-msg")
      .contains("Invalid verification code")
      .should("be.visible");
  }
}
export default new SignUpPage();
