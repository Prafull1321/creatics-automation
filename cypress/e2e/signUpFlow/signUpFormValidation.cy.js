import LoginPage from "../../pageObjectModule/loginPage";
import SignUpPage from "../../pageObjectModule/signUpPage";

describe("Sign-Up - Form Validation", function () {
  const FirstName = "Dhiren";
  const LastName = "Parmar";
  const Password = "Test@123";
  const Testing_URL = "https://testing.creatics.org/";
  const BASE_URL = Testing_URL;
  let inbox;

  beforeEach(() => {
    cy.initializeMailSlurp().then((generatedInbox) => {
      inbox = generatedInbox;
    });

    LoginPage.visit(BASE_URL);
    LoginPage.assertUrl(BASE_URL);
  });

  it("Verify the error handling when textboxes are left empty on the sign-up page.", () => {
    LoginPage.signInOption();
    LoginPage.signUpButton();

    SignUpPage.joinButton();
    SignUpPage.emptyFristNameError();
    SignUpPage.emptyLastNameError();
    SignUpPage.emptyEmailError();
    SignUpPage.emptyPasswordError();
    cy.reload();
  });

  it("Verify the error message displayed when invalid data is entered on the sign-up page.", () => {
    LoginPage.signInOption();
    LoginPage.signUpButton();

    SignUpPage.fillEmail("Qwerty");
    SignUpPage.invalidEmailError();
    SignUpPage.fillPassword("Q");
    SignUpPage.invalidPasswordError();
  });

  it("Verify the error handling when an existing email is used during sign-up.", () => {
    LoginPage.signInOption();
    LoginPage.signUpButton();

    SignUpPage.fillFirstName(FirstName);
    SignUpPage.fillLastName(LastName);
    SignUpPage.fillEmail("qwerty@qwerty.com");
    SignUpPage.fillPassword(Password);
    SignUpPage.joinButton();
    SignUpPage.alreadyUsedEmailError();
  });

  it("Verify the error handling when textboxes are left empty and invalid data is entered on the OTP page.", () => {
    LoginPage.signInOption();
    LoginPage.signUpButton();
    SignUpPage.fillFirstName(FirstName);
    SignUpPage.fillLastName(LastName);
    SignUpPage.fillEmail(inbox.emailAddress);
    SignUpPage.fillPassword(Password);
    SignUpPage.joinButton();

    // OTP page — verify empty and invalid OTP errors
    SignUpPage.verifyOtpBtn();
    SignUpPage.emptyOtpError();
    SignUpPage.fillOTP("111111");
    SignUpPage.verifyOtpBtn();
    SignUpPage.invalidOtpText();
  });

  afterEach(() => {
    cy.wait(2000);
    cy.clearCookies();
  });
});
