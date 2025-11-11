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
  it("Verify if user is able to sumbitthe slected option on Interest", () => {
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
    cy.wait(2000);
    onboardSetup2.clickInterestSubmit();
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
    onboardSetup3.treasuryPageTitle();
  });
  it("Verify back arrow button navigation and check selected option in previous page. Interest Skip button.", () => {
    const notSelectedFansOption = 9;
    const notSelectedCreatorsOption = 9;
    const noColor = "rgba(0, 0, 0, 0)";

    onboardSetup1.clickStep1Skip();
    onboardSetup2.step2PageHeading();
    cy.wait(2000);
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
    onboardSetup2.clickSkipInterest();
    cy.wait(2000);
    onboardSetup3.clickTreasuryBackButton();
    cy.wait(4000);
    onboardSetup2.fansBackgroundColorCount(notSelectedFansOption, noColor);
    onboardSetup2.creatorsBackgroundColorCount(
      notSelectedCreatorsOption,
      noColor
    );
    // onboardSetup2.fansOptionNotSelected(9);
    // onboardSetup2.creatorsOptionNotSelected(9);
  });
  it("Verify back arrow button navigation and check selected option in previous page.", () => {
    const selectImFan = ["Books & Storytelling", "Fashion", "Television"];
    const selectImCreator = ["Music", "Film", "Dance"];
    const fansSelectedCount = 3;
    const creatorSelectedCount = 3;
    const orangeColor = "rgb(241, 73, 37)";
    const blueColor = "rgb(111, 194, 210)";

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

    onboardSetup2.fansBackgroundColorCount(fansSelectedCount, orangeColor);
    onboardSetup2.creatorsBackgroundColorCount(creatorSelectedCount, blueColor);
  });
  it("Verify the Maximum Selection Limit of 3 Buttons and the Select/Unselect Behavior of the opention on the Interest Page.", () => {
    const selectImFan = ["Books & Storytelling", "Fashion", "Television"];
    const selectfan1 = "Books & Storytelling";
    const selectfan2 = ["Fashion", "Television"];
    const selectImCreator = ["Music", "Film", "Dance"];
    const selectCreator1 = ["Music", "Film"];
    const selectCreator2 = ["Dance"];

    onboardSetup1.clickStep1Skip();
    onboardSetup2.step2PageHeading();
    cy.wait(4000);
    // cy.dismissPopup();
    onboardSetup2.getNotificationPopup();
    onboardSetup2.clickPopupGotItButton();
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
    // onboardSetup2.selectFanOption(selectfan2);
    // onboardSetup2.selectCreatorOption(selectCreator2);
    // onboardSetup2.fansDisabledOption(6);
    // onboardSetup2.creatorsDisabledOption(6);
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
