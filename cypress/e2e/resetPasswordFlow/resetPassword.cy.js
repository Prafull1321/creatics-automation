import LoginPage from "../../pageObjectModule/loginPage";
import ResetPassword from "../../pageObjectModule/resetPasswordPage";
import ResetVerify from "../../pageObjectModule/resetVerifyPage";
import ResetConfirm from "../../pageObjectModule/resetConfirmPage";
import SignUpPage from "../../pageObjectModule/signUpPage";
import EmailVerification from "../../pageObjectModule/emailVerification";
import ProfileMenu from "../../pageObjectModule/commonComponent/headerMenu";
import myAccountPage from "../../pageObjectModule/myAccount/myAccountPage";

describe("Verify functionality of Reset password", () => {
  const FirstName = "Testing";
  const LastName = "Testing";
  const Password = "Qwerty@123";
  //   const mainPassword = "@01";
  const PasswordTest001 = "Testing@001";
  const PasswordTest002 = "Testing@002";
  const PasswordTest003 = "Testing@003";
  const PasswordTest004 = "Testing@004";

  const BASE_URL = "https://dev.creatics.org/";
  const logInURL = "https://testing.creatics.org/userProfiles";
  const Testing_URL = "https://testing.creatics.org/";
  const Assert_URL = "https://testing.creatics.org/";

  let inbox;

  before(() => {
    // Initialize MailSlurp and create a new inbox
    cy.initializeMailSlurp().then((generatedInbox) => {
      inbox = generatedInbox;

      // Sign up a new user
      LoginPage.visit(Testing_URL);
      cy.wait(10000);
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

          cy.wait(12000);
        });
      });
      cy.wait(5000);
      cy.get(".dropdown").first().click();
      cy.get(".profileCard").contains("LOGOUT").click();
      cy.wait(4000);
    });
  });

  //   beforeEach(() => {
  //     // Visit base URL and open the sign-in option before each test
  //     LoginPage.visit(Testing_URL);
  //     LoginPage.signInOption();
  //   });

  it("Verify the functionality of the 'Forgot Password' link and reset password through OTP.", () => {
    LoginPage.visit(Testing_URL);
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.fillEmailText(inbox.emailAddress);
    ResetPassword.emailMeButton();

    // Retrieve OTP from inbox and verify it
    cy.getOTPFromInbox(inbox.id).then((otp) => {
      ResetVerify.fillVerificationOTP(otp);
      ResetVerify.verifyOtpButton();
      cy.wait(2000); // Wait for onboarding pages or any necessary action to complete
    });
    ResetConfirm.fillResetPassword(PasswordTest001);
    ResetConfirm.fillConfirmPassword(PasswordTest001);
    ResetConfirm.confirmVerifyButton();

    //sign-in page is open
    LoginPage.emailText(inbox.emailAddress);
    LoginPage.passwordText(PasswordTest001);
    LoginPage.loginButton();
    LoginPage.assertPartialUrl(logInURL);
  });

  it("Verify the ability to reset the password through the email verification link.", () => {
    LoginPage.visit(Testing_URL);
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.fillEmailText(inbox.emailAddress);
    ResetPassword.emailMeButton();
    cy.wait(10000);

    cy.getLatestEmail(inbox.id).then((email) => {
      cy.extractVerifyLink(email).then((verifyLink1) => {
        // Visit the verification link
        EmailVerification.visitEmailLink(verifyLink1);
      });
    });
    cy.wait(5000);
    ResetConfirm.fillResetPassword(PasswordTest002);
    ResetConfirm.fillConfirmPassword(PasswordTest002);
    ResetConfirm.confirmVerifyButton();
    cy.wait(5000);

    LoginPage.emailText(inbox.emailAddress);
    LoginPage.passwordText(PasswordTest002);
    LoginPage.loginButton();
    LoginPage.assertPartialUrl(logInURL);
  });

  it("Verify login functionality using the second OTP received in the email.", () => {
    LoginPage.visit(Testing_URL);
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.fillEmailText(inbox.emailAddress);
    ResetPassword.emailMeButton();
    cy.wait(4000);
    cy.getOTPFromInbox(inbox.id).then((otp) => {
      ResetVerify.fillVerificationOTP(otp);
      cy.log(otp);
      cy.wait(30000);

      ResetVerify.resendVerificationEmail();

      cy.getOTPFromInbox(inbox.id).then((otp1) => {
        ResetVerify.fillVerificationOTP(otp1);

        ResetVerify.verifyOtpButton();
        cy.wait(2000); // Wait for onboarding pages or any necessary action to complete
      });
    });
    ResetConfirm.fillResetPassword(PasswordTest003);
    ResetConfirm.fillConfirmPassword(PasswordTest003);
    ResetConfirm.confirmVerifyButton();

    //sign-in page is open
    LoginPage.emailText(inbox.emailAddress);
    LoginPage.passwordText(PasswordTest003);
    LoginPage.loginButton();
    LoginPage.assertPartialUrl(logInURL);
  });

  it("Verify login functionality using the second email verification button.", () => {
    LoginPage.visit(Testing_URL);
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.fillEmailText(inbox.emailAddress);
    ResetPassword.emailMeButton();
    cy.wait(10000);
    cy.getLatestEmail(inbox.id).then((email) => {
      cy.extractVerifyLink(email).then((verifyLink1) => {
        cy.log(verifyLink1);
        cy.wait(25000);
        ResetVerify.resendVerificationEmail();
        cy.wait(10000);
        cy.getLatestEmail(inbox.id).then((email) => {
          cy.extractVerifyLink(email).then((verifyLink1) => {
            // Visit the verification link
            EmailVerification.visitEmailLink(verifyLink1);
          });
        });
      });
    });
    cy.wait(5000);
    ResetConfirm.fillResetPassword(PasswordTest004);
    ResetConfirm.fillConfirmPassword(PasswordTest004);
    ResetConfirm.confirmVerifyButton();

    LoginPage.emailText(inbox.emailAddress);
    LoginPage.passwordText(PasswordTest004);
    LoginPage.loginButton();
    LoginPage.assertPartialUrl(logInURL);
  });

  it("Verify the error handling for empty state and invalid email on the email textbox.", () => {
    LoginPage.visit(Testing_URL);
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.emailMeButton();
    ResetPassword.emailTextEmpty();
    ResetPassword.fillEmailText("invalidemail");
    ResetPassword.emailInvalidError();
  });

  it("Verify error handling when a non-existing email is used in the email textbox.", () => {
    const NewEmail = "CheckingTest@test.com"; //uniqueemail@Testing.com
    LoginPage.visit(Testing_URL);
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.fillEmailText(NewEmail);
    cy.wait(4000);
    ResetPassword.emailMeButton();
    cy.wait(10000);
    ResetPassword.unregisteredEmailError();
    ResetPassword.newAccountCreate();
    SignUpPage.titleText();
    // SignUpPage.titleSubText();
    SignUpPage.signUpPageURL();
  });

  it("Verify error handling when textboxes are left empty or invalid data is entered on the OTP page.", () => {
    LoginPage.visit(Testing_URL);
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.fillEmailText(inbox.emailAddress);
    ResetPassword.emailMeButton();

    ResetVerify.verifyOtpButton();
    ResetVerify.otpTextEmptyError();
    ResetVerify.fillVerificationOTP("123");
    ResetVerify.verifyOtpButton();
    ResetVerify.invalidOtpError();
  });

  it("Verify error message when an expired OTP is used on the OTP page.", () => {
    LoginPage.visit(Testing_URL);
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.fillEmailText(inbox.emailAddress);
    ResetPassword.emailMeButton();
    cy.wait(4000);
    cy.getOTPFromInbox(inbox.id).then((firstOtp) => {
      ResetVerify.fillVerificationOTP(firstOtp);
      cy.log(firstOtp);
      cy.wait(30000);

      ResetVerify.resendVerificationEmail();

      cy.getOTPFromInbox(inbox.id).then((sceondOtp) => {
        cy.log(sceondOtp);
        ResetVerify.fillVerificationOTP(firstOtp);
        ResetVerify.verifyOtpButton();
        cy.wait(4000);
        ResetVerify.invalidOtpError();
        cy.wait(2000); // Wait for onboarding pages or any necessary action to complete
      });
    });
  });

  it("Verify error handling on the Password Confirmation page.", () => {
    LoginPage.visit(Testing_URL);
    LoginPage.signInOption();
    LoginPage.forgotPasswordButton();
    ResetPassword.fillEmailText(inbox.emailAddress);
    ResetPassword.emailMeButton();
    cy.wait(10000);
    // Retrieve OTP from inbox and verify it
    cy.getOTPFromInbox(inbox.id).then((otp) => {
      ResetVerify.fillVerificationOTP(otp);
      ResetVerify.verifyOtpButton();
      cy.wait(6000); // Wait for onboarding pages or any necessary action to complete
    });
    ResetConfirm.confirmVerifyButton();
    cy.wait(2000);
    ResetConfirm.emptyResetPassword();
    ResetConfirm.emptyConfirmPassword();
    ResetConfirm.fillResetPassword("12");
    ResetConfirm.fillConfirmPassword("test");
    cy.wait(2000);
    ResetConfirm.invalidResetPassword();
    ResetConfirm.invalidConfirmPassword();
    ResetConfirm.fillResetPassword("Test@111");
    ResetConfirm.fillConfirmPassword("Test@222");
    cy.wait(2000);
    ResetConfirm.passwordMismatchError();
    // ResetConfirm.fillResetPassword(Password);
    // ResetConfirm.fillConfirmPassword(Password);
    ResetConfirm.fillResetPassword(PasswordTest004);
    ResetConfirm.fillConfirmPassword(PasswordTest004);
    ResetConfirm.confirmVerifyButton();
    cy.wait(2000);
    ResetConfirm.oldPasswordError();
  });

  afterEach(() => {
    // Runs after each test
    cy.wait(4000);
    cy.clearCookies();
    // cy.get(".dropdown").first().click();
    // cy.get(".profileCard").contains("LOGOUT").click();
    cy.wait(4000);
  });
  after(() => {
    // LoginPage.visit(Testing_URL);
    // cy.wait(10000);
    LoginPage.signInOption();
    cy.wait(4000);
    LoginPage.emailText(inbox.emailAddress);
    LoginPage.passwordText(PasswordTest004);
    LoginPage.loginButton();
    cy.wait(6000);
    ProfileMenu.dropDownMenu();
    ProfileMenu.selectMyAccount();
    cy.wait(10000);
    cy.get("body").then(($body) => {
      if (Cypress.$(".custom-dialog-container:visible").length > 0) {
        cy.get(".custom-button").should("be.visible").click();
      }
    });
    myAccountPage.moreOptionSection();
    myAccountPage.removeButton();
    cy.wait(4000);
    myAccountPage.removePopupYesBtn();
    cy.wait(4000);
    myAccountPage.removePopupConfirmTextbox("Confirm");
    myAccountPage.selectRemoveBtnPopup();
    cy.wait(4000);
    myAccountPage.gotItBtnRemoved2Popup();
    cy.wait(4000);
  });
});
