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
  const Mobile_URL = "https://mobile.creatics.org/";
  const Dev_URL = "https://dev.creatics.org/";
  const logInURL = "https://dev.creatics.org/userProfiles";
  const BASE_URL = Testing_URL;

  const foxImage = "cypress/fixtures/images/fox.jpg";
  const overSizeImage = "cypress/fixtures/images/50mb.jpg";
  const differentFormatImage = "cypress/fixtures/images/horse.gif";
  const myWordText = "Testing is difficult to teach";
  const maxCharacters = 130;
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
  const longVideo = "cypress/fixtures/videos/2-minute-timer.mp4";
  const moreMBVideo = "cypress/fixtures/videos/Snail.mp4";
  const invalidFormatVideo = "cypress/fixtures/videos/upsupported_file.flv";

  const TreasuryImageUploaded =
    "https://creatics-treasury-pic.s3.us-west-1.amazonaws.com";
  const ProfileImageUploaded =
    "https://creatics-profile-pic.s3-us-west-1.amazonaws.com";

  let inbox;
  let userID;
  let Step1Page;
  let Step2Page;
  let Step3Page;
  let Step4Page;

  before(() => {
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

          cy.wait(10000);
        });
      });
      
      onboardSetup2.clickPopupGotItButton();
      cy.wait(2000);
      ProfileMenu.siteLogo();
      cy.wait(5000);
      //Enteract with welcome popup
      cy.get("body").then(($body) => {
        if (Cypress.$(".custom-dialog-container:visible").length > 0) {
          cy.get(".custom-button").should("be.visible").click();
        }
      });

      cy.url().then((url) => {
        // const
        userID = url.split("/").pop(); // Extract the userID (last part of the URL)
        cy.log("Extracted UserID:", userID);

        cy.wait(4000);
      });
      ProfileMenu.dropDownMenu();
      ProfileMenu.selectLogout();
      cy.wait(5000);
    });
  });

  beforeEach(() => {
    LoginPage.visit(BASE_URL);
    cy.wait(10000);
    LoginPage.assertUrl(BASE_URL);
    LoginPage.signInOption();
    LoginPage.emailText(inbox.emailAddress);
    LoginPage.passwordText(Password);
    LoginPage.loginButton();
    cy.wait(5000);

    const Step1Page = `https://testing.creatics.org/userProfiles/${userID}/setup/1`;

    cy.visit(Step1Page, { failOnStatusCode: false });

    // Verify the URL
    cy.url().should("eq", Step1Page);

    cy.wait(5000);

    cy.on("window:alert", (message) => {
      const normalizedMessage = message
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
        .replace(/\u00a0/g, " ")
        .replace(/\n/g, " ")
        .trim();
      expect([
        "Video is getting uploaded. Please wait for few seconds!",
      ]).to.contains(normalizedMessage1);
    });
  });

  it.skip("Verify that the system enforces the file size limit for profile picture uploads.", () => {
    onboardSetup1.getPageHeading();
    onboardSetup1.clickUploadProfile();
    onboardSetup1.getProfileImageSelect(overSizeImage);
  });

  it("Verify that only supported file formats are accepted for profile picture uploads.", () => {
    onboardSetup1.getPageHeading();
    onboardSetup1.clickUploadProfile();
    onboardSetup1.getProfileImageSelect(differentFormatImage);
  });

  it("Verify 'My Words' field functionality and character limit.", () => {
    onboardSetup1.getPageHeading();
    onboardSetup1.getWordsTextbox(moreCharaterWordText);
    onboardSetup1.getWordsTextCount().should("have.length", maxCharacters);
  });

  it("Verify that the user can skip the profile setup page.", () => {
    onboardSetup1.getPageHeading();
    onboardSetup1.clickStep1Skip();
    onboardSetup2.step2PageHeading();
  });

  it("Verify that the fields on the profile setup page are empty after skipping and returning to the page.", () => {
    onboardSetup1.getPageHeading();
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.backArrowBtn().should("be.visible");
    onboardSetup2.clickBackArrowBtn();
    cy.wait(2000);
    onboardSetup1.uploadProfileButton().should("be.visible");
    onboardSetup1.myWordTextboxValue().should("have.value", "");
  });

  it("Verify that the 'Submit' button is enabled only when all required fields are filled and remains disabled otherwise.", () => {
    onboardSetup1.getPageHeading();
    onboardSetup1.uploadProfileButton().should("be.visible");
    onboardSetup1.myWordTextboxValue().should("have.value", "");
    onboardSetup1.submitButtonState().should("be.disabled");
    onboardSetup1.clickUploadProfile();
    onboardSetup1.getProfileImageSelect(foxImage);
    onboardSetup1.dragCropArea(100, 100, 400, 400);
    onboardSetup1.clickCropButton();
    cy.wait(5000);
    onboardSetup1.submitButtonState().should("not.be.disabled");
  });

  it("Verify that the user completes the sign-up process, navigates to the profile page, and successfully submits the data.", () => {
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
    cy.wait(5000);
  });

  it("Verify that the submitted data remains on the profile setup page when the user navigates back.", () => {
    onboardSetup1.clickProfileSubmit();
    onboardSetup2.backArrowBtn().should("be.visible");
    onboardSetup2.clickBackArrowBtn();
    cy.wait(5000);
    onboardSetup1.getUploadedImage().should("be.visible");
  });

  it("Verify the maximum selection limit of 3 options and the select/unselect behavior on the Interest page.", () => {
    const selectImFan = ["Books & Storytelling", "Fashion", "Television"];
    const selectfan1 = "Books & Storytelling";
    const selectfan2 = ["Fashion", "Television"];
    const selectImCreator = ["Music", "Film", "Dance"];
    const selectCreator1 = ["Music", "Film"];
    const selectCreator2 = ["Dance"];

    onboardSetup1.clickStep1Skip();
    onboardSetup2.step2PageHeading();
    cy.wait(4000);
    onboardSetup2.selectFanOption(selectImFan);
    onboardSetup2.selectCreatorOption(selectImCreator);
    onboardSetup2.fansDisabledOption(6);
    onboardSetup2.creatorsDisabledOption(6);
    cy.wait(2000);
    onboardSetup2.selectFanOption(selectfan1);
    onboardSetup2.selectCreatorOption(selectCreator2);
    onboardSetup2.clickableFansElements(9);
    onboardSetup2.clickableCreatorsElements(9);
    onboardSetup2.fansDisabledOption(0);
    onboardSetup2.creatorsDisabledOption(0);
  });

  it("Verify the functionality of the Interest Skip button.", () => {
    onboardSetup1.clickStep1Skip();
    onboardSetup2.step2PageHeading();
    cy.wait(2000);
    onboardSetup2.clickSkipInterest();
    cy.wait(2000);
    onboardSetup3.treasuryPageTitle();
  });

  it("Verify that the fields on the Interest page are empty after skipping and returning to the page.", () => {
    const notSelectedFansOption = 9;
    const notSelectedCreatorsOption = 9;
    const noColor = "rgba(0, 0, 0, 0)";

    onboardSetup1.clickStep1Skip();
    onboardSetup2.step2PageHeading();
    cy.wait(2000);
    onboardSetup2.clickSkipInterest();
    cy.wait(2000);
    onboardSetup3.clickTreasuryBackButton();
    cy.wait(4000);
    onboardSetup2.fansBackgroundColorCount(notSelectedFansOption, noColor);
    onboardSetup2.creatorsBackgroundColorCount(
      notSelectedCreatorsOption,
      noColor
    );
  });

  it("Verify that the user can submit the selected option on the Interest page.", () => {
    onboardSetup1.clickStep1Skip();
    onboardSetup2.step2PageHeading();
    cy.wait(4000);

    const selectfan1 = "Books & Storytelling";
    const selectfan2 = ["Fashion", "Television"];
    const selectImFan = ["Books & Storytelling", "Fashion", "Television"];
    const selectImCreator = ["Music", "Film", "Dance"];
    onboardSetup2.selectFanOption(selectImFan);
    onboardSetup2.selectCreatorOption(selectImCreator);
    cy.wait(2000);
    onboardSetup2.clickInterestSubmit();
    cy.wait(5000);
    onboardSetup3.treasuryPageTitle();
  });

  it("Verify that the submitted data remains on the Interest page when the user navigates back.", () => {
    const selectImFan = ["Books & Storytelling", "Fashion", "Television"];
    const selectImCreator = ["Music", "Film", "Dance"];
    const fansSelectedCount = 3;
    const creatorSelectedCount = 3;
    const orangeColor = "rgb(241, 73, 37)";
    const blueColor = "rgb(111, 194, 210)";

    onboardSetup1.clickStep1Skip();
    onboardSetup2.step2PageHeading();
    cy.wait(4000);
    onboardSetup2.clickInterestSubmit();
    cy.wait(4000);
    onboardSetup3.clickTreasuryBackButton();
    cy.wait(4000);

    onboardSetup2.fansBackgroundColorCount(fansSelectedCount, orangeColor);
    onboardSetup2.creatorsBackgroundColorCount(creatorSelectedCount, blueColor);
  });

  //---------------------------------------------------------------------------------

  it("Verify the text limit on the Treasury page and error messages for link text.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.clickSkipInterest();
    cy.wait(2000);
    onboardSetup3.enterTitleText(moreTitleCharText);
    cy.wait(2000);
    onboardSetup3.getTitleTextCount().should("have.length", maxTitleChar);
    onboardSetup3.enterDescriptionText(moreDiscriptionCharText);
    cy.wait(2000);
    onboardSetup3
      .getDescriptionTextCount()
      .should("have.length", maxDiscriptionChar);
    onboardSetup3.enterLinkText(invalidLink);
    cy.get(".bodyClass").click();
    onboardSetup3.invalidLinkError().should("be.visible");
    onboardSetup3.clearLinkText();
    onboardSetup3.emptyLinkError().should("be.visible");
  });

  it.skip("Verify the size limit for image uploads on the Treasury page.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.clickSkipInterest();
    cy.wait(2000);
    onboardSetup3.clickImageUploadButton();
    onboardSetup3.selectTreasuryImage(overSizeImage);
  });

  it("Verify that the user can skip the Treasury page.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.clickSkipInterest();
    onboardSetup3.clickSkipTreasury();
    onboardSetup4.communityHeading().should("be.visible");
    onboardSetup4.communnitySubText().should("be.visible");
  });

  it("Verify that the fields on the Treasury page are empty after skipping and returning to the page.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
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

  it("Verify the behavior of the 'Submit' button on the Treasury page.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
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
  });

  it("Verify that the user can submit data from the Treasury page.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
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
    cy.wait(5000);
  });

  it("Verify that the submitted data remains on the Treasury page when the user navigates back.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.clickSkipInterest();
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
        expect(currentSrc).to.include(TreasuryImageUploaded);
      });
  });

  it("Verify how the application handles long videos.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.clickSkipInterest();
    onboardSetup3.clickSkipTreasury();
    onboardSetup4.clickVideoUpload();
    onboardSetup4.videoSelect(longVideo);
  });

  it("Verify how the application handles videos in unsupported formats.", () => {
    onboardSetup1.clickStep1Skip();
    cy.wait(2000);
    onboardSetup2.clickSkipInterest();
    onboardSetup3.clickSkipTreasury();
    cy.wait(2000);
    onboardSetup4.clickVideoUpload();
    onboardSetup4.videoSelect(invalidFormatVideo); // there is a bug, where is accepts all types of format for a video.
  });

  after(() => {
    cy.wait(6000);
    ProfileMenu.dropDownMenu();
    ProfileMenu.selectMyAccount();
    cy.wait(10000);
    myAccountPage.moreOptionSection();
    myAccountPage.removeButton();
    cy.wait(4000);
    myAccountPage.removePopupYesBtn();
    cy.wait(4000);
    myAccountPage.removePopupConfirmTextbox("Confirm");
    myAccountPage.selectRemoveBtnPopup();
    cy.wait(4000);
  });
});
