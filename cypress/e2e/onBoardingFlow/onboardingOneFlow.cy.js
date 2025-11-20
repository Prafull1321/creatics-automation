import LoginPage from "../../pageObjectModule/loginPage";
import SignUpPage from "../../pageObjectModule/signUpPage";
import EmailVerification from "../../pageObjectModule/emailVerification";
import {
  onboardSetup1,
  onboardSetup2,
  onboardSetup3,
  onboardSetup4,
} from "../../pageObjectModule/onboardingPages";
import profilePage from "../../pageObjectModule/profilePage";
import ProfileMenu from "../../pageObjectModule/commonComponent/headerMenu";
import myAccountPage from "../../pageObjectModule/myAccount/myAccountPage";

describe("Verify Onboarding Flow Test Cases", () => {
  const FirstName = "Testing";
  const LastName = "Testing";
  const Password = "Qwerty@123";
  const Testing_URL = "https://testing.creatics.org/";
  const Mobile_1_URL = "https://mobile.creatics.org/";
  const Mobile_2_URL = "https://mobilej21.creatics.org/";
  const Dev_URL = "https://dev.creatics.org/";
  const logInURL = "https://dev.creatics.org/userProfiles";
  const BASE_URL = Testing_URL;

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
  const maxDiscriptionChar = 500;
  const moreTitleCharText = "A".repeat(maxTitleChar + 10);
  const moreDiscriptionCharText = "A".repeat(maxDiscriptionChar + 10);
  const lessDiscriptionText = "A".repeat(5);
  const correctDescription = "A".repeat(6);
  const invalidLink = "Testing";
  const imageUploaded =
    "https://creatics-treasury-pic.s3-us-west-1.amazonaws.com";
  const catVideo = "cypress/fixtures/videos/cat.mp4";
  const universeVideo = "cypress/fixtures/videos/universe.mp4";
  const longVideo = "cypress/fixtures/videos/2-minute-timer.mp4";
  const moreMBVideo = "cypress/fixtures/videos/Snail.mp4";
  const invalidFormatVideo = "cypress/fixtures/videos/upsupported_file.flv";

  const TreasuryImageUploaded =
    "https://creatics-treasury-pic.s3.us-west-1.amazonaws.com";
  const ProfileImageUploaded =
    "https://creatics-profile-pic.s3-us-west-1.amazonaws.com";

  let inbox;

  beforeEach(() => {
    // cy.dismissPopup();
    cy.initializeMailSlurp().then((generatedInbox) => {
      inbox = generatedInbox;

      // Sign up a new user
      LoginPage.visit(BASE_URL);
      //cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
      LoginPage.signInOption();
      LoginPage.signUpButton();
      SignUpPage.fillFirstName(FirstName);
      SignUpPage.fillLastName(LastName);
      SignUpPage.fillEmail(inbox.emailAddress);
      SignUpPage.fillPassword(Password);
      cy.wait(2000);
      SignUpPage.joinButton();
      cy.wait(5000);

      // Verify the email
      cy.getLatestEmail(inbox.id).then((email) => {
        cy.extractVerifyLink(email).then((verifyLink) => {
          EmailVerification.visitEmailLink(verifyLink);

          cy.wait(20000);
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

  it("Verify that all data submitted from the Profile page, Interest page, Treasury page, and Im Video page is displayed on the Profile page.", () => {
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
    cy.wait(2000);
    onboardSetup3.clickTreasurySubmit();
    cy.wait(2000);
    onboardSetup4.communityHeading().should("be.visible");
    onboardSetup4.communnitySubText().should("be.visible");
    onboardSetup4.clickVideoUpload();
    onboardSetup4.videoSelect(universeVideo);
    cy.wait(40000);

    profilePage.imageCircle().should("be.visible");
    profilePage.getMyWordText().should("include.text", myWordText);

    profilePage.treasury(TreasuryTitle).should("be.visible");

    profilePage.getUploadedVideo().should("be.visible");
    const expectedSrcPattern = "universe.mp4";
    profilePage
      .getUploadedVideoSrc()
      .should("have.attr", "src")
      .and("include", expectedSrcPattern);

    selectImFan.forEach((selectImFan) => {
      profilePage
        .getFanText(selectImFan)
        .invoke("text")
        .then((text) => {
          expect(text.replace(/\u00a0/g, " ").trim()).to.equal(selectImFan);
        });
    });

    selectImCreator.forEach((selectImCreator) => {
      profilePage
        .getCreatorText(selectImCreator)
        .invoke("text")
        .then((text) => {
          expect(text.replace(/\u00a0/g, " ").trim()).to.equal(selectImCreator);
        });
    });
  });

  it("Verify that no data appears on the Profile page when the user skips filling out the Profile page, Interest page, Treasury page, and Im Video page.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
   // onboardSetup2.getNotificationPopup();
   //onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();
    onboardSetup3.clickSkipTreasury();
    onboardSetup4.clickSkipVideoPage();
    cy.wait(20000);
    cy.url().should("contains", "userProfiles");
    profilePage.userIcon().should("be.visible");
    profilePage.uploadIamButton().should("be.visible");
    profilePage.creatorEmptyButton().should("be.visible");
    profilePage.fanEmptyButton().should("be.visible");
    profilePage.treasuryCards().should("have.length", 1);
    profilePage.addNewTreasuryCards().should("be.visible");
  });

  afterEach(() => {
    // Runs after each test
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
    // myAccountPage.gotItBtnRemoved2Popup();
    // cy.wait(4000);
  });
});
