import loginPage from "../../pageObjectModule/loginPage";
import myAccountPage from "../../pageObjectModule/myAccount/myAccountPage";
import ProfileMenu from "../../pageObjectModule/commonComponent/headerMenu";
import profilePage from "../../pageObjectModule/profilePage";
import headerMenu from "../../pageObjectModule/commonComponent/headerMenu";
import { onboardSetup4 } from "../../pageObjectModule/onboardingPages";

describe("Profile Page Test cases", function () {
  const username = "hinavik528@cashbn.com";
  const mainPassword = "Qwerty@123";
  const newPassword = "Saurabh@01";
  const Production_URL = "https://creatics.org/";
  const Mobile_1_URL = "https://mobile.creatics.org/";
  const Mobile_2_URL = "https://mobilej21.creatics.org/";
  const Dev_URL = "https://dev.creatics.org/";
  const logInURL = "https://dev.creatics.org/userProfiles";
  const BASE_URL = Dev_URL;

  it("Verify user ID", () => {
    loginPage.visit(BASE_URL);
    cy.wait(10000);
    loginPage.assertUrl(BASE_URL);
    loginPage.signInOption();
    loginPage.emailText(username);
    loginPage.passwordText(mainPassword);
    loginPage.loginButton();
    cy.wait(5000);

    cy.url().then((url) => {
      const userID = url.split("/").pop(); // Extract the userID (last part of the URL)
      cy.log("Extracted UserID:", userID);

      cy.wait(4000);

      // Construct the dynamic URL inside the .then() block
      const Step1Page = `https://dev.creatics.org/userProfiles/${userID}/setup/1`;

      // Visit the constructed URL
      cy.visit(Step1Page, { failOnStatusCode: false });

      // Verify the URL
      cy.url().should("eq", Step1Page);
    });
  });
  afterEach(() => {
    cy.wait(6000);

    ProfileMenu.dropDownMenu();
    ProfileMenu.selectMyAccount();
    cy.wait(10000);
    myAccountPage.moreOptionSection();
    myAccountPage.removeButton();
    cy.wait(4000);
    myAccountPage.removePopupYesBtn();
    cy.wait(4000);
    myAccountPage.removePopupConfirmTextbox("Confirms");
    myAccountPage.selectRemoveBtnPopup();
    cy.wait(4000);
    myAccountPage.gotItBtnRemoved2Popup();
    cy.wait(4000);
  });
});
