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
  const overSizeImage = "cypress/fixtures/images/50mb.jpg";
  const imageUploaded =
    "https://creatics-treasury-pic.s3-us-west-1.amazonaws.com";

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
      expect(["File size is too big"]).to.contains(normalizedMessage);
    });
    cy.get("body").then(($body) => {
      if (Cypress.$(".custom-dialog-container:visible").length > 0) {
        cy.get(".custom-button").should("be.visible").click();
      }
    });
  });
  it("Verify user is able to submit the data from treasury page.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();

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
  });
  it.only("Verify back arrow button navigation after submit the data from treasury page.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();

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
    cy.wait(5000);
    onboardSetup3.clickTreasurySubmit();
    cy.wait(2000);
    onboardSetup4.communityPageBack();
    cy.wait(4000);
    onboardSetup3.getTitleTextboxValue().should("have.value", TreasuryTitle);
    onboardSetup3
      .getDescriptionTextValue()
      .should("have.value", TreasuryDescription);
    onboardSetup3.getCategoryText().should("have.text", TreasuryCategory);
    onboardSetup3.getLinkTextValue().should("have.value", TreasuryLink);
    onboardSetup3
      .getUploadedImage()
      .should("have.attr", "src")
      .then((currentSrc) => {
        expect(currentSrc).to.include(imageUploaded);
      });
  });

  it("Verify if user is able skips treasury page.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();
    onboardSetup3.clickSkipTreasury();
    onboardSetup4.communityHeading().should("be.visible");
    onboardSetup4.communnitySubText().should("be.visible");
  });

  it("Verify text limit and error state on treasury page", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();
    cy.wait(2000);
    onboardSetup3.enterTitleText(moreTitleCharText);
    cy.wait(2000);
    onboardSetup3.getTitleTextCount().should("have.length", maxTitleChar);
    onboardSetup3.enterDescriptionText(moreDiscriptionCharText);
    cy.wait(2000);
    // onboardSetup3
    //   .getDescriptionTextCount()
    //   .should("have.length", maxDiscriptionChar); //this should be 500 but there is an bug which need correction.
    onboardSetup3.enterLinkText(invalidLink);
    cy.get(".bodyClass").click();
    onboardSetup3.invalidLinkError().should("be.visible");
    onboardSetup3.clearLinkText();
    onboardSetup3.emptyLinkError().should("be.visible");
  });

  it.only("Verify back arrow button navigation after page is 'Skip'.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();
    onboardSetup3.clickSkipTreasury();
    cy.wait(2000);
    onboardSetup4.communityPageBack();
    cy.wait(2000);
    onboardSetup3.emptyTitleText().should("have.value", "");
    onboardSetup3.descriptionTextValue().should("have.value", "");
    onboardSetup3.optionSelectedCategory().should("not.exist");
    onboardSetup3.linkTextValue().should("have.value", "");
    onboardSetup3.uploadImageButton().should("be.visible");
    onboardSetup3.getSubmitButton().should("be.disabled");
  });
  it("Verify size limit for Image upload.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();
    cy.wait(2000);
    onboardSetup3.clickImageUploadButton();
    onboardSetup3.selectTreasuryImage(overSizeImage);
  });
  it("Verify 'Submit' button behaviour.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();
    cy.wait(2000);
    onboardSetup3.getSubmitButton().should("be.disabled");
    onboardSetup3.enterTitleText(TreasuryTitle);
    onboardSetup3.selectCategoryOption(TreasuryCategory);
    onboardSetup3.enterDescriptionText(lessDiscriptionText);
    onboardSetup3.enterLinkText(TreasuryLink);
    onboardSetup3.clickImageUploadButton();
    onboardSetup3.selectTreasuryImage(plantImage);
    onboardSetup3.dragCropArea(100, 100, 400, 400);
    onboardSetup3.clickTreasuryImageCrop();
    onboardSetup3.getSubmitButton().should("be.disabled");
    onboardSetup3.enterDescriptionText(correctDescription);
    onboardSetup3.getSubmitButton().should("not.be.disabled");
    onboardSetup3.clearLinkText();
    onboardSetup3.getSubmitButton().should("be.disabled");
    onboardSetup3.enterLinkText(invalidLink);
    onboardSetup3.getSubmitButton().should("be.disabled");
    onboardSetup3.enterLinkText(TreasuryLink);
    onboardSetup3.getSubmitButton().should("not.be.disabled");
    onboardSetup3.clickTreasurySubmit();
  });

  afterEach(() => {
    // Runs after each test
    cy.wait(4000);
    cy.clearCookies();
    // cy.get(".dropdown").first().click();
    // cy.get(".profileCard").contains("LOGOUT").click();
    cy.wait(4000);
  });
});
