import LoginPage from "../../pageObjectModule/loginPage";
import SignUpPage from "../../pageObjectModule/signUpPage";
import EmailVerification from "../../pageObjectModule/emailVerification";
import ProfileMenu from "../../pageObjectModule/commonComponent/headerMenu";
import myAccountPage from "../../pageObjectModule/myAccount/myAccountPage";
import { onboardSetup2 } from "../../pageObjectModule/onboardingPages";

describe("Sign-Up - OTP Verification Flow", function () {
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

  it("Verify that a user can create an account after entering the correct OTP.", () => {
    LoginPage.signInOption();
    LoginPage.signUpButton();
    SignUpPage.fillFirstName(FirstName);
    SignUpPage.fillLastName(LastName);
    SignUpPage.fillEmail(inbox.emailAddress);
    SignUpPage.fillPassword(Password);
    SignUpPage.joinButton();
    SignUpPage.otpPageTitle();

    cy.getOTPFromInbox(inbox.id).then((otp) => {
      SignUpPage.fillOTP(otp);
      SignUpPage.verifyOtpBtn();
      cy.wait(8000);

      EmailVerification.assertLoggedURL();
      cy.wait(12000);
    });
  });

  it("Verify that a user can resend the verification email and create an account using the second OTP.", () => {
    LoginPage.signInOption();
    LoginPage.signUpButton();
    SignUpPage.fillFirstName(FirstName);
    SignUpPage.fillLastName(LastName);
    SignUpPage.fillEmail(inbox.emailAddress);
    SignUpPage.fillPassword(Password);
    SignUpPage.joinButton();
    SignUpPage.otpPageTitle();

    cy.getOTPFromInbox(inbox.id).then((otp) => {
      SignUpPage.fillOTP(otp);
      cy.wait(30000);

      // Resend OTP and use the new one
      SignUpPage.resendEmail();
      cy.getOTPFromInbox(inbox.id).then((newOtp) => {
        SignUpPage.fillOTP(newOtp);
        SignUpPage.verifyOtpBtn();
      });

      cy.wait(8000);
      EmailVerification.assertLoggedURL();
      cy.wait(12000);
    });
  });

  it("Verify the error message displayed when an expired OTP is used on the OTP page.", () => {
    LoginPage.signInOption();
    LoginPage.signUpButton();
    SignUpPage.fillFirstName(FirstName);
    SignUpPage.fillLastName(LastName);
    SignUpPage.fillEmail(inbox.emailAddress);
    SignUpPage.fillPassword(Password);
    SignUpPage.joinButton();

    cy.getOTPFromInbox(inbox.id).then((firstOtp) => {
      SignUpPage.fillOTP(firstOtp);
      cy.wait(30000);

      // Resend to invalidate the first OTP
      SignUpPage.resendEmail();
      cy.getOTPFromInbox(inbox.id).then((secondOtp) => {
        // Submit the old (expired) OTP
        SignUpPage.fillOTP(firstOtp);
        SignUpPage.verifyOtpBtn();
        SignUpPage.invalidOtpText();
      });
    });
  });

  afterEach(() => {
    cy.wait(2000);

    cy.get("body").then(($body) => {
      if ($body.find('a[href="/login"]').length === 0) {
        // User is logged in — proceed with account deletion
        onboardSetup2.clickPopupGotItButton();
        ProfileMenu.dropDownMenu();
        ProfileMenu.selectMyAccount();
        cy.wait(10000);

        cy.get("body").then(($body) => {
          if ($body.find(".custom-dialog-container:visible").length > 0) {
            cy.get(".custom-button").should("be.visible").click();
          }
        });

        cy.wait(5000);
        myAccountPage.moreOptionSection();
        myAccountPage.removeButton();
        cy.wait(4000);
        myAccountPage.removePopupYesBtn();
        cy.wait(4000);
        myAccountPage.removePopupConfirmTextbox("Confirm");
        myAccountPage.selectRemoveBtnPopup();
        cy.wait(4000);
      } else {
        // User is not logged in — clear cookies
        cy.clearCookies();
      }
    });
  });
});
