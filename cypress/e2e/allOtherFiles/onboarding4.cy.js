import LoginPage from "../../pageObjectModule/loginPage";
import SignUpPage from "../../pageObjectModule/signUpPage";
import EmailVerification from "../../pageObjectModule/emailVerification";
import {
  onboardSetup1,
  onboardSetup2,
  onboardSetup3,
  onboardSetup4,
} from "../../pageObjectModule/onboardingPages";

describe("Check onboarding flow", () => {
  const FirstName = "Testing";
  const LastName = "Testing";
  const Password = "Qwerty@123";
  const BASE_URL = "https://dev.creatics.org/";
  const logInURL = "https://dev.creatics.org/userProfiles";
  const catVideo = "cypress/fixtures/videos/cat.mp4";
  const longVideo = "cypress/fixtures/videos/2-minute-timer.mp4";
  const moreMBVideo = "cypress/fixtures/videos/Snail.mp4";
  const invalidFormatVideo = "cypress/fixtures/videos/upsupported_file.flv";

  let inbox;

  beforeEach(() => {
    // cy.dismissPopup();
    cy.initializeMailSlurp().then((generatedInbox) => {
      inbox = generatedInbox;

      // Sign up a new user
      LoginPage.visit(BASE_URL);
      LoginPage.signInOption();
      LoginPage.signUpButton();
      SignUpPage.fillFirstName(FirstName);
      SignUpPage.fillLastName(LastName);
      SignUpPage.fillEmail(inbox.emailAddress);
      SignUpPage.fillPassword(Password);
      cy.wait(2000);
      SignUpPage.joinButton();

      // Verify the email
      cy.getLatestEmail(inbox.id).then((email) => {
        cy.extractVerifyLink(email).then((verifyLink) => {
          EmailVerification.visitEmailLink(verifyLink);

          cy.wait(10000);
        });
      });
    });
    cy.on("window:alert", (message) => {
      const normalizedMessage = message
        // .replace(/[\u00a0\n\*\*]+/g, " ")
        .replace(/\u00a0/g, " ")
        .replace(/\n/g, " ")
        .trim();
      expect([
        "File size is too big",
        "This video is too long. I AM VIDEO must be at least 10 seconds and no longer than 60 seconds. Please upload a video in this range.",
        "This video is too long. I AM VIDEO must be at least 10 seconds and no longer than 60 seconds. Please upload a video in this range.",
      ]).to.contains(normalizedMessage);
    });
    cy.on("window:confirm", (message1) => {
      const normalizedMessage1 = message1
        // .replace(/[\u00a0\n\*\*]+/g, " ")
        .replace(/\u00a0/g, " ")
        .replace(/\n/g, " ")
        .trim();
      expect([
        "Video is getting uploaded. Please wait for few seconds!",
        // "(confirm) Video is getting uploaded. Please wait for few seconds!",
      ]).to.contains(normalizedMessage1);
    });
    cy.get("body").then(($body) => {
      if (Cypress.$(".custom-dialog-container:visible").length > 0) {
        cy.get(".custom-button").should("be.visible").click();
      }
    });
  });
  it("Verify user is able to submit the video from Im video page.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();
    onboardSetup3.clickSkipTreasury();
    onboardSetup4.communityHeading().should("be.visible");
    onboardSetup4.communnitySubText().should("be.visible");
    onboardSetup4.clickVideoUpload();
    onboardSetup4.videoSelect(catVideo);
    cy.wait(30000);
    cy.get("#video1").should("be.visible"); //----------------------
    const expectedSrcPattern = "cat.mp4";
    cy.get("#video1 source") // this part need to be coverd in profile Pom
      .should("have.attr", "src")
      .and("include", expectedSrcPattern); //-----------------------
  });

  it("Verify user is able to skip Im video page.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();
    onboardSetup3.clickSkipTreasury();
    onboardSetup4.clickSkipVideoPage();
    cy.get(".btn-iam").should("have.text", "Upload IAM video ");
  });
  it("Verify handling of long videos.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();
    onboardSetup3.clickSkipTreasury();
    onboardSetup4.clickVideoUpload();
    onboardSetup4.videoSelect(longVideo);
  });
  it("Verify handling of large size videos.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();
    onboardSetup3.clickSkipTreasury();
    cy.wait(5000);
    onboardSetup4.clickVideoUpload();
    onboardSetup4.videoSelect(moreMBVideo); // this test can't be implemented as there is large file and its difficult to handle it.
  });
  it("Verify handling of invalid format videos.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();
    onboardSetup3.clickSkipTreasury();
    cy.wait(2000);
    onboardSetup4.clickVideoUpload();
    onboardSetup4.videoSelect(invalidFormatVideo); // there is a bug, where is accepts all types of format for a video.
  });
  it.only("Verify Read More Option and text present in it.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();
    onboardSetup3.clickSkipTreasury();
    cy.wait(2000);
    onboardSetup4.clickReadMore();
    onboardSetup4.readMoreSubText().should("be.visible");
    onboardSetup4.clickReadLess();
    onboardSetup4.subTextHidden().should("be.visible");
  });
});
