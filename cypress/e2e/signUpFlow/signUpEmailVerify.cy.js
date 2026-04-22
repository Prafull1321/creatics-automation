import LoginPage from "../../pageObjectModule/loginPage";
import SignUpPage from "../../pageObjectModule/signUpPage";
import EmailVerification from "../../pageObjectModule/emailVerification";
import ProfileMenu from "../../pageObjectModule/commonComponent/headerMenu";
import myAccountPage from "../../pageObjectModule/myAccount/myAccountPage";
import { onboardSetup2 } from "../../pageObjectModule/onboardingPages";

describe("Sign-Up - Email Verification Flow", function () {
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

  it("Verify that a user receives a verification email and can log in by clicking the Verify button.", () => {
    LoginPage.signInOption();
    LoginPage.signUpButton();
    SignUpPage.fillFirstName(FirstName);
    SignUpPage.fillLastName(LastName);
    SignUpPage.fillEmail(inbox.emailAddress);
    SignUpPage.fillPassword(Password);
    SignUpPage.joinButton();

    cy.getLatestEmail(inbox.id).then((email) => {
      cy.extractVerifyLink(email).then((verifyLink) => {
        EmailVerification.visitEmailLink(verifyLink);
      });
    });

    EmailVerification.assertButtonURL();
    EmailVerification.assertLoggedURL();
    EmailVerification.assertHeadingAfterLogin();
    cy.wait(12000);
  });

  it("Verify that a user can resend the verification email and create an account using the Verify button in the email.", () => {
    LoginPage.signInOption();
    LoginPage.signUpButton();
    SignUpPage.fillFirstName(FirstName);
    SignUpPage.fillLastName(LastName);
    SignUpPage.fillEmail(inbox.emailAddress);
    SignUpPage.fillPassword(Password);
    cy.wait(5000);
    SignUpPage.joinButton();
    cy.wait(5000);
    SignUpPage.otpPageTitle();

    // Verify first email contains verification link
    cy.getLatestEmail(inbox.id).then((email) => {
      cy.extractVerifyLink(email).then((verifyLink) => {
        expect(verifyLink).to.contain("/emailVerify");
      });

      cy.wait(30000);

      // Resend email and verify with new link
      SignUpPage.resendEmail();
      cy.wait(10000);

      cy.getLatestEmail(inbox.id).then((email) => {
        cy.extractVerifyLink(email).then((verifyLink2) => {
          EmailVerification.visitEmailLink(verifyLink2);
        });
      });

      cy.wait(8000);
      EmailVerification.assertLoggedURL();
      cy.wait(12000);
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
