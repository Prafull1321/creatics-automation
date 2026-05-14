import LoginPage from "../../pageObjectModule/loginPage";
import ResetPassword from "../../pageObjectModule/resetPasswordPage";
import ResetVerify from "../../pageObjectModule/resetVerifyPage";
import ResetConfirm from "../../pageObjectModule/resetConfirmPage";
import SignUpPage from "../../pageObjectModule/signUpPage";
import EmailVerification from "../../pageObjectModule/emailVerification";
import ProfileMenu from "../../pageObjectModule/commonComponent/headerMenu";
import myAccountPage from "../../pageObjectModule/myAccount/myAccountPage";
import { onboardSetup2 } from "../../pageObjectModule/onboardingPages";

describe("Verify functionality of Reset password", () => {
  const FirstName = "Testing";
  const LastName = "Testing";
  const Password = "Qwerty@123";
  const PasswordTest001 = "Testing@001";
  const PasswordTest002 = "Testing@002";
  const PasswordTest003 = "Testing@003";
  const PasswordTest004 = "Testing@004";

  const Testing_URL = "https://testing.creatics.org/";
  const logInURL = "https://testing.creatics.org/userProfiles";

  let inbox;

  before(() => {
    // Initialize MailSlurp and create a new inbox
    cy.initializeMailSlurp().then((generatedInbox) => {
      inbox = generatedInbox;

      // Sign up a new user
      LoginPage.visit(Testing_URL);
      cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
      LoginPage.signInOption();
      LoginPage.signUpButton();
      SignUpPage.fillFirstName(FirstName);
      SignUpPage.fillLastName(LastName);
      SignUpPage.fillEmail(inbox.emailAddress);
      SignUpPage.fillPassword(Password);
      SignUpPage.joinButton();

      // Verify the email
      cy.getLatestEmail(inbox.id).then((email) => {
        cy.extractVerifyLink(email).then((verifyLink) => {
          EmailVerification.visitEmailLink(verifyLink);
          cy.get('.custom-button', { timeout: 30000 }).should('be.visible');
          onboardSetup2.clickPopupGotItButton();
        });
      });
      cy.get(".dropdown", { timeout: 15000 }).first().should('be.visible').click();
      cy.get(".profileCard").contains("LOGOUT").click();
      cy.url({ timeout: 15000 }).should('include', Testing_URL);
    });
  });

  it("Verify the functionality of the 'Forgot Password' link and reset password through OTP.", () => {
    LoginPage.visit(Testing_URL);
    cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.fillEmailText(inbox.emailAddress);
    ResetPassword.emailMeButton();

    // Retrieve OTP from inbox and verify it
    cy.getOTPFromInbox(inbox.id).then((otp) => {
      ResetVerify.fillVerificationOTP(otp);
      ResetVerify.verifyOtpButton();
    });
    // Wait for navigation to setup-password page before filling form
    cy.url({ timeout: 15000 }).should('include', 'setup-password');
    ResetConfirm.fillResetPassword(PasswordTest001);
    ResetConfirm.fillConfirmPassword(PasswordTest001);
    ResetConfirm.confirmVerifyButton();

    // Wait for navigation to login page
    cy.url({ timeout: 15000 }).should('include', 'login');
    cy.get("#email", { timeout: 10000 }).should('be.visible');
    LoginPage.emailText(inbox.emailAddress);
    LoginPage.passwordText(PasswordTest001);
    LoginPage.loginButton();
    LoginPage.assertPartialUrl(logInURL);
  });

  it("Verify the ability to reset the password through the email verification link.", () => {
    LoginPage.visit(Testing_URL);
    cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.fillEmailText(inbox.emailAddress);
    ResetPassword.emailMeButton();

    cy.getLatestEmail(inbox.id).then((email) => {
      cy.extractVerifyLink(email).then((verifyLink1) => {
        // Visit the verification link
        EmailVerification.visitEmailLink(verifyLink1);
      });
    });
    // Wait for navigation to setup-password page
    cy.url({ timeout: 15000 }).should('include', 'setup-password');
    ResetConfirm.fillResetPassword(PasswordTest002);
    ResetConfirm.fillConfirmPassword(PasswordTest002);
    ResetConfirm.confirmVerifyButton();
    // Wait for navigation to login page
    cy.url({ timeout: 15000 }).should('include', 'login');
    cy.get("#email", { timeout: 10000 }).should('be.visible');

    LoginPage.emailText(inbox.emailAddress);
    LoginPage.passwordText(PasswordTest002);
    LoginPage.loginButton();
    LoginPage.assertPartialUrl(logInURL);
  });

  it("Verify login functionality using the second OTP received in the email.", () => {
    LoginPage.visit(Testing_URL);
    cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.fillEmailText(inbox.emailAddress);
    ResetPassword.emailMeButton();

    cy.getOTPFromInbox(inbox.id).then((otp) => {
      ResetVerify.fillVerificationOTP(otp);
      cy.log(otp);
      // Wait 30s for the first OTP to expire before resending
      cy.wait(30000);

      ResetVerify.resendVerificationEmail();

      cy.getOTPFromInbox(inbox.id).then((otp1) => {
        ResetVerify.fillVerificationOTP(otp1);
        ResetVerify.verifyOtpButton();
      });
    });
    // Wait for navigation to setup-password page
    cy.url({ timeout: 15000 }).should('include', 'setup-password');
    ResetConfirm.fillResetPassword(PasswordTest003);
    ResetConfirm.fillConfirmPassword(PasswordTest003);
    ResetConfirm.confirmVerifyButton();

    // Wait for navigation to login page
    cy.url({ timeout: 15000 }).should('include', 'login');
    cy.get("#email", { timeout: 10000 }).should('be.visible');
    LoginPage.emailText(inbox.emailAddress);
    LoginPage.passwordText(PasswordTest003);
    LoginPage.loginButton();
    LoginPage.assertPartialUrl(logInURL);
  });

  it("Verify login functionality using the second email verification button.", () => {
    LoginPage.visit(Testing_URL);
    cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.fillEmailText(inbox.emailAddress);
    const emailSentAt = new Date();
    ResetPassword.emailMeButton();

    cy.getLatestEmail(inbox.id, emailSentAt).then((email) => {
      cy.extractVerifyLink(email).then((verifyLink1) => {
        cy.log(verifyLink1);
        // Wait 30s for the first link to expire and resend cooldown
        cy.wait(30000);
        const resendAt = new Date();
        ResetVerify.resendVerificationEmail();
        cy.getLatestEmail(inbox.id, resendAt).then((email2) => {
          cy.extractVerifyLink(email2).then((verifyLink2) => {
            // Visit the second verification link
            EmailVerification.visitEmailLink(verifyLink2);
          });
        });
      });
    });
    // Wait for navigation to setup-password page
    cy.url({ timeout: 15000 }).should('include', 'setup-password');
    ResetConfirm.fillResetPassword(PasswordTest004);
    ResetConfirm.fillConfirmPassword(PasswordTest004);
    ResetConfirm.confirmVerifyButton();

    // Wait for navigation to login page
    cy.url({ timeout: 15000 }).should('include', 'login');
    cy.get("#email", { timeout: 10000 }).should('be.visible');
    LoginPage.emailText(inbox.emailAddress);
    LoginPage.passwordText(PasswordTest004);
    LoginPage.loginButton();
    LoginPage.assertPartialUrl(logInURL);
  });

  it("Verify the error handling for empty state and invalid email on the email textbox.", () => {
    LoginPage.visit(Testing_URL);
    cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.emailMeButton();
    ResetPassword.emailTextEmpty();
    ResetPassword.fillEmailText("invalidemail");
    ResetPassword.emailInvalidError();
  });

  it("Verify error handling when a non-existing email is used in the email textbox.", () => {
    const NewEmail = "CheckingTest@test.com";
    LoginPage.visit(Testing_URL);
    cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.fillEmailText(NewEmail);
    ResetPassword.emailMeButton();
    cy.get('.err-msg', { timeout: 20000 }).should('be.visible');
    ResetPassword.unregisteredEmailError();
    ResetPassword.newAccountCreate();
    SignUpPage.titleText();
    SignUpPage.signUpPageURL();
  });

  it("Verify error handling when textboxes are left empty or invalid data is entered on the OTP page.", () => {
    LoginPage.visit(Testing_URL);
    cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.fillEmailText(inbox.emailAddress);
    ResetPassword.emailMeButton();

    ResetVerify.verifyOtpButton();
    ResetVerify.otpTextEmptyError();
    ResetVerify.fillVerificationOTP("123");
    ResetVerify.verifyOtpButton();
    ResetVerify.invalidOtpError();
    // Consume the unread email to prevent stale OTP issues in later tests
    cy.getOTPFromInbox(inbox.id);
  });

  it("Verify error message when an expired OTP is used on the OTP page.", () => {
    LoginPage.visit(Testing_URL);
    cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.fillEmailText(inbox.emailAddress);
    ResetPassword.emailMeButton();

    cy.getOTPFromInbox(inbox.id).then((firstOtp) => {
      ResetVerify.fillVerificationOTP(firstOtp);
      cy.log(firstOtp);
      // Wait 30s for the first OTP to expire
      cy.wait(30000);

      ResetVerify.resendVerificationEmail();

      cy.getOTPFromInbox(inbox.id).then((secondOtp) => {
        cy.log(secondOtp);
        // Enter the expired first OTP
        ResetVerify.fillVerificationOTP(firstOtp);
        ResetVerify.verifyOtpButton();
        cy.get('.err-msg', { timeout: 10000 }).should('be.visible');
        ResetVerify.invalidOtpError();
      });
    });
  });

  it("Verify error handling on the Password Confirmation page.", () => {
    LoginPage.visit(Testing_URL);
    cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.fillEmailText(inbox.emailAddress);
    const emailSentAt = new Date();
    ResetPassword.emailMeButton();

    // Retrieve OTP from inbox and verify it
    cy.getOTPFromInbox(inbox.id, emailSentAt).then((otp) => {
      ResetVerify.fillVerificationOTP(otp);
      ResetVerify.verifyOtpButton();
    });
    // Wait for navigation to setup-password page
    cy.url({ timeout: 15000 }).should('include', 'setup-password');
    ResetConfirm.confirmVerifyButton();
    ResetConfirm.emptyResetPassword();
    ResetConfirm.emptyConfirmPassword();
    ResetConfirm.fillResetPassword("12");
    ResetConfirm.fillConfirmPassword("test");
    ResetConfirm.invalidResetPassword();
    ResetConfirm.invalidConfirmPassword();
    ResetConfirm.fillResetPassword("Test@111");
    ResetConfirm.fillConfirmPassword("Test@222");
    ResetConfirm.passwordMismatchError();
    ResetConfirm.fillResetPassword(PasswordTest004);
    ResetConfirm.fillConfirmPassword(PasswordTest004);
    ResetConfirm.confirmVerifyButton();
    cy.get('.err-msg', { timeout: 10000 }).should('be.visible');
    ResetConfirm.oldPasswordError();
  });

  afterEach(() => {
    cy.clearCookies();
  });

  after(() => {
    LoginPage.visit(Testing_URL);
    cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
    LoginPage.signInOption();
    LoginPage.emailText(inbox.emailAddress);
    LoginPage.passwordText(PasswordTest004);
    LoginPage.loginButton();
    cy.url({ timeout: 15000 }).should('include', 'userProfiles');
    ProfileMenu.dropDownMenu();
    ProfileMenu.selectMyAccount();
    cy.get(".heading", { timeout: 15000 }).should('be.visible');
    cy.get("body").then(($body) => {
      if (Cypress.$(".custom-dialog-container:visible").length > 0) {
        cy.get(".custom-button").should("be.visible").click();
      }
    });
    myAccountPage.moreOptionSection();
    myAccountPage.removeButton();
    cy.get(".btn", { timeout: 10000 }).contains("Yes").should('be.visible');
    myAccountPage.removePopupYesBtn();
    cy.get("#confirmationText", { timeout: 10000 }).should('be.visible');
    myAccountPage.removePopupConfirmTextbox("Confirm");
    myAccountPage.selectRemoveBtnPopup();
    cy.wait(4000);
  });
});
