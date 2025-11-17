import LoginPage from "../../pageObjectModule/loginPage";
import SignUpPage from "../../pageObjectModule/signUpPage";
import EmailVerification from "../../pageObjectModule/emailVerification";
import ProfileMenu from "../../pageObjectModule/commonComponent/headerMenu";
import myAccountPage from "../../pageObjectModule/myAccount/myAccountPage";
import { onboardSetup2 } from "../../pageObjectModule/onboardingPages";

describe("Sign-Up Page Test Cases", function () {
  const FirstName = "Dhiren";
  const LastName = "Parmar";
  const Password = "Test@123";
  const Mobile_1_URL = "https://mobile.creatics.org/";
  const Testing_URL = "https://testing.creatics.org/";
  const Assert_URL = "https://testing.creatics.org/";
  const BASE_URL = Testing_URL;
  //   const logInURL = "https://mobile.creatics.org/userProfiles/home";

  let inbox;

  // before(() => {
  //   // Initialize MailSlurp and create a new inbox
  //   cy.initializeMailSlurp().then((generatedInbox) => {
  //     inbox = generatedInbox;
  //   });
  // });

  beforeEach(() => {
    cy.initializeMailSlurp().then((generatedInbox) => {
      inbox = generatedInbox;
    });

    LoginPage.visit(BASE_URL);
    LoginPage.assertUrl(Assert_URL);
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
        // Visit the verification link
        EmailVerification.visitEmailLink(verifyLink);
      });
    });

    EmailVerification.assertButtonURL();
    EmailVerification.assertLoggedURL();
    EmailVerification.assertHeadingAfterLogin();
    cy.wait(12000);
  });

  it("Verify that a user can resend the verification email and create an account using the Verify button in the email.", () => {
    const emailAddress = inbox.emailAddress;
    const inboxId = inbox.id;

    // Visit the sign-up page and complete the form
    LoginPage.signInOption();
    LoginPage.signUpButton();
    SignUpPage.fillFirstName(FirstName);
    SignUpPage.fillLastName(LastName);
    SignUpPage.fillEmail(emailAddress);
    SignUpPage.fillPassword(Password);
    cy.wait(5000);
    SignUpPage.joinButton();
    cy.wait(5000);
    SignUpPage.otpPageTitle();

    //verify first mail button contains
    cy.getLatestEmail(inbox.id).then((email) => {
      cy.extractVerifyLink(email).then((verifyLink) => {
        expect(verifyLink).to.contain("/emailVerify");
      });

      cy.wait(30000);

      //resend email verify flow
      SignUpPage.resendEmail();
      cy.wait(10000);

      //verify second mail button contains by visiting
      cy.getLatestEmail(inbox.id).then((email) => {
        cy.extractVerifyLink(email).then((verifyLink2) => {
          EmailVerification.visitEmailLink(verifyLink2);
        });
      });
      // Wait for the onboarding pages to load
      cy.wait(8000);
      // Assert the user is redirected to the correct page after skipping onboarding
      EmailVerification.assertLoggedURL();
      cy.wait(12000);
    });
  });

  it("Verify that a user can create an account after entering the correct OTP.", () => {
    const emailAddress = inbox.emailAddress;
    const inboxId = inbox.id;

    // Visit the sign-up page and complete the form
    LoginPage.signInOption();
    LoginPage.signUpButton();
    SignUpPage.fillFirstName(FirstName);
    SignUpPage.fillLastName(LastName);
    SignUpPage.fillEmail(emailAddress);
    SignUpPage.fillPassword(Password);
    SignUpPage.joinButton();
    SignUpPage.otpPageTitle();

    // Get the OTP from the email and use it in the application
    cy.getOTPFromInbox(inboxId).then((otp) => {
      SignUpPage.fillOTP(otp);
      SignUpPage.verifyOtpBtn();
      // Wait for the onboarding pages to load
      cy.wait(8000);

      // Assert the user is redirected to the correct page after skipping onboarding
      EmailVerification.assertLoggedURL();
      cy.wait(12000);
    });
  });

  it("Verify that a user can resend the verification email and create an account using the second OTP provided in the email.", () => {
    const emailAddress = inbox.emailAddress;
    const inboxId = inbox.id;

    // Visit the sign-up page and complete the form
    LoginPage.signInOption();
    LoginPage.signUpButton();
    SignUpPage.fillFirstName(FirstName);
    SignUpPage.fillLastName(LastName);
    SignUpPage.fillEmail(emailAddress);
    SignUpPage.fillPassword(Password);
    SignUpPage.joinButton();
    SignUpPage.otpPageTitle();

    // Get the OTP from the email and use it in the application
    cy.getOTPFromInbox(inboxId).then((otp) => {
      SignUpPage.fillOTP(otp);
      // SignUpPage.verifyOtpBtn();
      cy.wait(30000);

      //resend otp flow
      SignUpPage.resendEmail();
      cy.getOTPFromInbox(inboxId).then((newOtp) => {
        SignUpPage.fillOTP(newOtp);
        SignUpPage.verifyOtpBtn();
      });
      // Wait for the onboarding pages to load
      cy.wait(8000);
      // Assert the user is redirected to the correct page after skipping onboarding
      EmailVerification.assertLoggedURL();
      cy.wait(12000);
    });
  });

  it("Verify the error handling when textboxes are left empty on the sign-up page.", () => {
    LoginPage.signInOption();
    LoginPage.signUpButton();
    //Empty Error check
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
    //Invalid Error check
    SignUpPage.fillEmail("Qwerty");
    SignUpPage.invalidEmailError();
    SignUpPage.fillPassword("Q");
    SignUpPage.invalidPasswordError();
  });

  it("Verify the error handling when an existing email is used during sign-up.", () => {
    LoginPage.signInOption();
    LoginPage.signUpButton();
    //Email already Present Error
    SignUpPage.fillFirstName(FirstName);
    SignUpPage.fillLastName(LastName);
    SignUpPage.fillEmail("qwerty@qwerty.com");
    SignUpPage.fillPassword(Password);
    SignUpPage.joinButton();
    SignUpPage.alreadyUsedEmailError();
  });

  it("Verify the error handling when textboxes are left empty and invalid data is entered on the OTP page.", () => {
    const emailAddress = inbox.emailAddress;
    // const inboxId = inbox.id;

    // Visit the sign-up page and complete the form
    LoginPage.signInOption();
    LoginPage.signUpButton();
    SignUpPage.fillFirstName(FirstName);
    SignUpPage.fillLastName(LastName);
    SignUpPage.fillEmail(emailAddress);
    SignUpPage.fillPassword(Password);
    SignUpPage.joinButton();
    // otp page
    SignUpPage.verifyOtpBtn();
    SignUpPage.emptyOtpError();
    SignUpPage.fillOTP("111111");
    SignUpPage.verifyOtpBtn();
    SignUpPage.invalidOtpText();
  });

  it("Verify the error message displayed when an expired OTP is used on the OTP page.", () => {
    const emailAddress = inbox.emailAddress;
    const inboxId = inbox.id;
    LoginPage.signInOption();
    LoginPage.signUpButton();
    SignUpPage.fillFirstName(FirstName);
    SignUpPage.fillLastName(LastName);
    SignUpPage.fillEmail(emailAddress);
    SignUpPage.fillPassword(Password);
    SignUpPage.joinButton();

    cy.getOTPFromInbox(inboxId).then((firstOtp) => {
      SignUpPage.fillOTP(firstOtp);
      // SignUpPage.verifyOtpBtn();
      cy.wait(30000);
      SignUpPage.resendEmail();
      cy.getOTPFromInbox(inboxId).then((sceondOtp) => {
        cy.log(sceondOtp);
        SignUpPage.fillOTP(firstOtp);
        SignUpPage.verifyOtpBtn();
        SignUpPage.invalidOtpText();
      });
    });
  });
  //   afterEach(() => {
  //     // Runs after each test
  //     cy.wait(6000);
  //     cy.clearCookies();
  //     // cy.get(".dropdown").first().click();
  //     // cy.get(".profileCard").contains("LOGOUT").click();
  //     cy.wait(6000);
  //   });
  // });

  afterEach(() => {
    // Runs after each test
    cy.wait(2000);

    cy.get("body").then(($body) => {
      // Check if the "SIGN IN" link is not present (meaning user is logged in)
      if ($body.find('a[href="/login"]').length === 0) {
        // "SIGN IN" link is not present, meaning user is logged in
        // Proceed with delete flow
        onboardSetup2.clickPopupGotItButton();
        ProfileMenu.dropDownMenu();
        ProfileMenu.selectMyAccount();
        cy.wait(10000);
        // Handle the custom popup if it appears
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
        // myAccountPage.gotItBtnRemoved2Popup();
        // cy.wait(4000);
      } else {
        // "SIGN IN" link is present, meaning user is logged out
        // Clear cookies
        cy.clearCookies();
      }
    });
  });
});
