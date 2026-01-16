import LoginPage from "../../pageObjectModule/loginPage";
import SignUpPage from "../../pageObjectModule/signUpPage";
import EmailVerification from "../../pageObjectModule/emailVerification";
import loginPage from "../../pageObjectModule/loginPage";
import {
  onboardSetup1,
  onboardSetup2,
  onboardSetup3,
  onboardSetup4,
} from "../../pageObjectModule/onboardingPages";
import cinejoyHomepage from "../../pageObjectModule/cinejoy/cinejoyHomepage";

describe("Verify All Access Pass Test Cases", () => {
  const FirstName = "Testing";
  const LastName = "Testing";
  const Password = "Qwerty@123";
  const Testing_URL = "https://testing.creatics.org/";
  const Mobile_1_URL = "https://mobile.creatics.org/";
  const Mobile_2_URL = "https://mobilej21.creatics.org/";
  const Dev_URL = "https://dev.creatics.org/";
  const logInURL = "https://dev.creatics.org/userProfiles";
  const BASE_URL = Testing_URL;
  const Assert_URL = "https://testing.creatics.org/";
  let inbox;


  beforeEach(() => {
      cy.dismissPopup();
      cy.initializeMailSlurp().then((generatedInbox) => {
        inbox = generatedInbox;
      });
  
      LoginPage.visit(BASE_URL);
      LoginPage.assertUrl(Assert_URL);
    });
  

    it("Verify buy pass flow", () => {
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
        onboardSetup2.clickPopupGotItButton();
        onboardSetup1.clickStep1Skip();
        cy.wait(2000);
        // onboardSetup2.getNotificationPopup();
        onboardSetup2.clickSkipInterest();
        onboardSetup3.clickSkipTreasury();
        onboardSetup4.clickSkipVideoPage();
        cy.wait(2000);
        cy.get("img[alt='creatics_logo'][src='assets/images/logo.jpg'][height='45']").click();
        cinejoyHomepage.navigateToCinejoy();
        cinejoyHomepage.allAccessPassBtn();

        // ADD INTERCEPT HERE
        cy.intercept(
        'POST',
        '**/api/stripe-purchase/payment-session*',
        {
          statusCode: 200,
          body: {
            url: 'https://testing.creatics.org/payment-success',
            sessionId: 'cs_test_mocked_123'
          }
        }
        ).as('stripeSession');

        cinejoyHomepage.buyAllAccessPass();

        cy.wait('@stripeSession');

        cy.url().should('include', '/payment-success');
    });


    it("Validate add and remove flow of showcase and spotlight movies", () => {
        const emailAddress = inbox.emailAddress;

        loginPage.assertUrl(BASE_URL);
        loginPage.signInOption();
        loginPage.emailText(emailAddress);
        loginPage.passwordText(Password);
        cy.wait(2000);
        loginPage.loginButton();
        cy.wait(5000);
        cinejoyHomepage.navigateToCinejoy();



    });

       






















   afterEach(() => {
      // Runs after each test
    cy.wait(2000);
    cy.clearCookies();
    });
  });