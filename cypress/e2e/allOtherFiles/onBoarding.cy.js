import LoginPage from "../../pageObjectModule/loginPage";
import SignUpPage from "../../pageObjectModule/signUpPage";
import EmailVerification from "../../pageObjectModule/emailVerification";
import {
  onboardSetup1,
  onboardSetup2,
  onboardSetup3,
} from "../../pageObjectModule/onboardingPages";

describe("Check onboarding flow", () => {
  const FirstName = "Testing";
  const LastName = "Testing";
  const Password = "Qwerty@123";
  const BASE_URL = "https://dev.creatics.org/";
  const logInURL = "https://dev.creatics.org/userProfiles";
  const foxImage = "cypress/fixtures/images/fox.jpg";
  const overSizeImage = "cypress/fixtures/images/50mb.jpg";
  const differentFormatImage = "cypress/fixtures/images/horse.gif";
  const myWordText = "Testing is difficult to teach";
  const maxCharacters = 128;
  const moreCharaterWordText = "A".repeat(maxCharacters + 10);

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
      ]).to.contains(normalizedMessage);
    });
    cy.get("body").then(($body) => {
      if (Cypress.$(".custom-dialog-container:visible").length > 0) {
        cy.get(".custom-button").should("be.visible").click();
      }
    });
  });

  it("Verify navigation to profile setup screen after sign-up.", () => {
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

    const selectfan1 = "Books & Storytelling";
    const selectfan2 = ["Fashion", "Television"];
    const selectImFan = ["Books & Storytelling", "Fashion", "Television"];
    const selectImCreator = ["Music", "Film", "Dance"];

    onboardSetup2.selectFanOption(selectfan1);
    onboardSetup2.selectFanOption(selectfan2);
    onboardSetup2.selectFanOption(selectfan1);
    // onboardSetup2.selectFanOption(selectImFan);
    onboardSetup2.selectCreatorOption(selectImCreator);
    onboardSetup2.clickInterestSubmit();
  });
  it.only("Verify back arrow button navigation once data is submit.", () => {
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
    onboardSetup2.backArrowBtn().should("be.visible");
    onboardSetup2.clickBackArrowBtn();
    cy.wait(5000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup1.getUploadedImage().should("be.visible");
    // onboardSetup1.myWordTextboxValue().should("have.value", myWordText); //----------there is an issues which need to be fix
  });
  it("Verify 'Skip' button functionality.", () => {
    onboardSetup1.getPageHeading();
    onboardSetup1.clickStep1Skip();
    onboardSetup2.step2PageHeading();
  });
  it.only("Verify back arrow button navigation after page is 'Skip' adding any data.", () => {
    onboardSetup1.getPageHeading();
    onboardSetup1.clickStep1Skip();
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    cy.wait(2000);
    onboardSetup2.backArrowBtn().should("be.visible");
    onboardSetup2.clickBackArrowBtn();
    cy.wait(2000);
    onboardSetup1.uploadProfileButton().should("be.visible");
    onboardSetup1.myWordTextboxValue().should("have.value", "");
  });

  it("Verify 'Submit' button behaviour.", () => {
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
    onboardSetup1.clickProfileSubmit();
  });
  it("Verify size limit for profile picture upload.", () => {
    onboardSetup1.getPageHeading();
    onboardSetup1.clickUploadProfile();
    onboardSetup1.getProfileImageSelect(overSizeImage);
  });
  it("Verify accepted file formats for profile picture.", () => {
    onboardSetup1.getPageHeading();
    onboardSetup1.clickUploadProfile();
    onboardSetup1.getProfileImageSelect(differentFormatImage);
  });
  it("Verify 'My Words' field functionality and character limit.", () => {
    onboardSetup1.getPageHeading();
    onboardSetup1.getWordsTextbox(moreCharaterWordText);
    onboardSetup1.getWordsTextCount().should("have.length", maxCharacters);
  });

  //----------------------
  //step starts from below
  it("Verify navigation to Interest Page after skipping or submitting profile setup 1.", () => {
    onboardSetup1.clickStep1Skip();
    onboardSetup2.step2PageHeading();
    cy.wait(4000);
    // cy.dismissPopup();
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();

    const selectfan1 = "Books & Storytelling";
    const selectfan2 = ["Fashion", "Television"];
    const selectImFan = ["Books & Storytelling", "Fashion", "Television"];
    const selectImCreator = ["Music", "Film", "Dance"];

    // onboardSetup2.selectFanOption(selectfan1);
    // onboardSetup2.selectFanOption(selectfan2);
    // onboardSetup2.selectFanOption(selectfan1);
    onboardSetup2.selectFanOption(selectImFan);
    onboardSetup2.selectCreatorOption(selectImCreator);
    cy.wait(4000);
    onboardSetup2.assertSelectedFansCount(3);
    cy.wait(4000);

    onboardSetup2.clickInterestSubmit();
    onboardSetup3.treasuryPageTitle();
  });
  it("Verify back arrow button navigation after different option are selected in previous page.", () => {
    const selectImFan = ["Books & Storytelling", "Fashion"]; //, "Television"];
    const selectImCreator = ["Music", "Film", "Dance"];

    onboardSetup1.clickStep1Skip();
    onboardSetup2.step2PageHeading();
    cy.wait(4000);
    // cy.dismissPopup();
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.selectFanOption(selectImFan);
    onboardSetup2.selectCreatorOption(selectImCreator);
    onboardSetup2.clickInterestSubmit();
    cy.wait(4000);
    onboardSetup3.clickTreasuryBackButton();
    cy.wait(4000);

    const expectedCount = 2; // Replace this with the number you want to check

    let count = 0; // Initialize a counter to keep track of matching elements

    cy.get("label .slider")
      .each(($el) => {
        cy.wrap($el)
          .invoke("css", "background-color")
          .then((bgColor) => {
            if (bgColor === "rgb(241, 73, 37)") {
              // Check if the background color matches #f14925
              count++; // Increment the counter if it matches
            }
          });
      })
      .then(() => {
        // After the loop is completed, assert that the count matches the expected count
        expect(count).to.equal(expectedCount);
      });

    // onboardSetup2.assertSelectedFansCount(2);
    // onboardSetup2.assertSelectedCreatorsCount(3);
    // onboardSetup2.fansOptionNotSelected(6);
  });

  it("Verify functionality of the Interest Skip button.", () => {
    onboardSetup1.clickStep1Skip();
    onboardSetup2.step2PageHeading();
    cy.wait(2000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();
    cy.wait(2000);
    onboardSetup3.treasuryPageTitle();
  });
  it("Verify functionality of the Interest Skip button.", () => {
    onboardSetup1.clickStep1Skip();
    onboardSetup2.step2PageHeading();
    cy.wait(2000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();
    cy.wait(2000);
    onboardSetup3.clickTreasuryBackButton();
    cy.wait(4000);
    onboardSetup2.fansOptionNotSelected(9);
    onboardSetup2.creatorsOptionNotSelected(9);
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
