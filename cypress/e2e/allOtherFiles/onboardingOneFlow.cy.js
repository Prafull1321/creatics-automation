import LoginPage from "../../pageObjectModule/loginPage";
import SignUpPage from "../../pageObjectModule/signUpPage";
import EmailVerification from "../../pageObjectModule/emailVerification";
import {
  onboardSetup1,
  onboardSetup2,
  onboardSetup3,
  onboardSetup4,
} from "../../pageObjectModule/onboardingPages";

describe.skip("Check onboarding flow", () => {
  const FirstName = "Testing";
  const LastName = "Testing";
  const Password = "Qwerty@123";
  const BASE_URL = "https://dev.creatics.org/";
  const logInURL = "https://dev.creatics.org/userProfiles";
  const catVideo = "cypress/fixtures/videos/cat.mp4";
  const longVideo = "cypress/fixtures/videos/2-minute-timer.mp4";
  const moreMBVideo = "cypress/fixtures/videos/Snail.mp4";
  const invalidFormatVideo = "cypress/fixtures/videos/upsupported_file.flv";
  const foxImage = "cypress/fixtures/images/fox.jpg";
  const overSizeImage = "cypress/fixtures/images/50mb.jpg";
  const differentFormatImage = "cypress/fixtures/images/horse.gif";
  const myWordText = "Testing is difficult to teach";
  const maxCharacters = 128;
  const moreCharaterWordText = "A".repeat(maxCharacters + 10);
  const TreasuryTitle = "Testing Is Important";
  const TreasuryDescription = "This is just to check";
  const TreasuryCategory = "Film";
  const TreasuryLink = "www.google.com";
  const plantImage = "cypress/fixtures/images/plant.jpg";
  const maxTitleChar = 128;
  const maxDiscriptionChar = 128; //this should be 500 but there is an bug which need correction.
  const moreTitleCharText = "A".repeat(maxTitleChar + 10);
  const moreDiscriptionCharText = "A".repeat(maxDiscriptionChar + 10);
  const lessDiscriptionText = "A".repeat(5);
  const correctDescription = "A".repeat(6);
  const invalidLink = "Testing";
  const TreasuryImageUploaded =
    "https://creatics-treasury-pic.s3-us-west-1.amazonaws.com";
  const ProfileImageUploaded =
    "https://creatics-profile-pic.s3-us-west-1.amazonaws.com";

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
        "File type must be png, jpg, jpeg",
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

  it.only("Verify navigation to profile setup screen after sign-up.", () => {
    onboardSetup1.getPageHeading();
    onboardSetup1.clickUploadProfile();
    onboardSetup1.getProfileImageSelect(foxImage);
    onboardSetup1.dragCropArea(100, 100, 400, 400);
    onboardSetup1.clickCropButton();
    cy.wait(5000);
    onboardSetup1.saveUploadedImage("croppedImage");
    onboardSetup1.getWordsTextbox(myWordText);
    onboardSetup1.submitButtonState().should("not.be.disabled");
    onboardSetup1.clickProfileSubmit();
    onboardSetup2.step2PageHeading();
    cy.wait(4000);
    // onboardSetup2.getNotificationPopup();
    // onboardSetup2.clickPopupGotItButton();

    const selectImFan = ["Books & Storytelling", "Fashion", "Television"];
    const selectImCreator = ["Music", "Film", "Dance"];

    onboardSetup2.selectFanOption(selectImFan);
    onboardSetup2.selectCreatorOption(selectImCreator);
    cy.wait(2000);
    onboardSetup2.clickInterestSubmit();
    cy.wait(2000);
    onboardSetup3.treasuryPageTitle().should("be.visible");
    cy.wait(2000);
    onboardSetup3.enterTitleText(TreasuryTitle);
    onboardSetup3.selectCategoryOption(TreasuryCategory);
    onboardSetup3.enterDescriptionText(TreasuryDescription);
    onboardSetup3.enterLinkText(TreasuryLink);
    onboardSetup3.clickImageUploadButton();
    onboardSetup3.selectTreasuryImage(plantImage);
    onboardSetup3.dragCropArea(100, 100, 400, 400);
    onboardSetup3.clickTreasuryImageCrop();
    onboardSetup3.clickTreasurySubmit();
    cy.wait(2000);
    onboardSetup4.communityHeading().should("be.visible");
    onboardSetup4.communnitySubText().should("be.visible");
    onboardSetup4.clickVideoUpload();
    onboardSetup4.videoSelect(catVideo);
    cy.wait(30000);
    //----------------------------------------------------------------------------------------
    cy.get(".img-circle").should("be.visible"); // this part need to be coverd in profile Pom(profile image)
    //   .then((currentSrc) => {
    //     expect(currentSrc).to.include(ProfileImageUploaded);
    //   });
    //----------------------------------------------------------------------------------------
    cy.get(".welcome-sub-text").should("include.text", myWordText); // this part need to be coverd in profile Pom(my word text)
    //----------------------------------------------------------------------------------------
    cy.get(".treasuryTitle-name").contains(TreasuryTitle).should("be.visible"); // this part need to be coverd in profile Pom(Treasury)
    //----------------------------------------------------------------------------------------
    cy.get("#video1").should("be.visible");
    const expectedSrcPattern = "cat.mp4";
    cy.get("#video1 source") // this part need to be coverd in profile Pom(im video)
      .should("have.attr", "src")
      .and("include", expectedSrcPattern);
    //----------------------------------------------------------------------------------------
    selectImFan.forEach((selectImFan) => {
      cy.contains("div.comming-soon-btn", selectImFan)
        .should("be.visible")
        .invoke("text") // this part need to be coverd in profile Pom(im fans option)
        .then((text) => {
          expect(text.replace(/\u00a0/g, " ").trim()).to.equal(selectImFan);
        });
    });
    //----------------------------------------------------------------------------------------
    selectImCreator.forEach((selectImCreator) => {
      cy.contains("div.comming-soon-btn", selectImCreator)
        // .should("be.visible")
        .invoke("text") // this part need to be coverd in profile Pom(im creator option)
        .then((text) => {
          expect(text.replace(/\u00a0/g, " ").trim()).to.equal(selectImCreator);
        });
    });
    //----------------------------------------------------------------------------------------
  });

  it("Verify navigation to profile setup screen after skipping very step.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();
    onboardSetup3.clickSkipTreasury();
    onboardSetup4.clickSkipVideoPage();
    cy.url().should("contains", "userProfiles");
  });
});
