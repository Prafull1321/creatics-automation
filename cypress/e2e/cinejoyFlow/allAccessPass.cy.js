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
import cinejoyHomepage from "../../pageObjectModule/cinejoyHomepage";

describe("Verify All Access Pass Test Cases", () => {
  const FirstName = "Testing";
  const LastName = "Testing";
  const Password = "Test@123";
  const emailAddress = "0znclqyo3j@xkxkud.com";
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


    it("Verify buy pass flow", { retries: 0 }, () => {
        const promoCode = "Free4All";

        // 1. Sign up a new user so the All-Access Pass is guaranteed unpurchased.
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

        // 2. Complete onboarding.
        onboardSetup2.clickPopupGotItButton();
        onboardSetup1.clickStep1Skip();
        cy.wait(2000);
        // onboardSetup2.getNotificationPopup();
        onboardSetup2.clickSkipInterest();
        onboardSetup3.clickSkipTreasury();
        onboardSetup4.clickSkipVideoPage();
        cy.wait(2000);

        // 3. Navigate to Cinejoy → All-Access Passes.
        cy.get("img[alt='creatics_logo'][src='assets/images/logo.jpg'][height='45']").click();
        cinejoyHomepage.navigateToCinejoy();
        cinejoyHomepage.allAccessPassBtn();
        cinejoyHomepage.buyAllAccessPass();

        // 4. Complete the purchase with Free4All promo code via Stripe checkout.
        cinejoyHomepage.completeAllAccessPassPurchase(promoCode);

        // 5. Wait for Stripe to redirect back to the app.
        cy.url({ timeout: 60000 }).should('include', 'creatics.org');
        cy.wait(3000);

        // 6. Validate the purchase confirmation dialog.
        cy.contains('Thank you for your purchase', { timeout: 15000 }).should('be.visible');
        cy.contains('$0.00', { timeout: 10000 }).should('be.visible');

        // 7. Click the "My Tickets" link inside the success dialog to navigate.
        cy.contains('a', 'My Tickets', { timeout: 10000 }).click({ force: true });
        cy.wait(5000);

        // 8. Validate the All-Access Pass appears in the My Tickets modal.
        cy.get('ngb-modal-window', { timeout: 15000 })
            .should('be.visible')
            .contains('All-Access', { timeout: 10000 })
            .should('be.visible');
    });

   afterEach(() => {
      // Runs after each test
    cy.wait(2000);
    cy.clearCookies();
    });
  });
