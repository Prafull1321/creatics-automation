import loginPage from "../../pageObjectModule/loginPage";
import myAccountPage from "../../pageObjectModule/myAccount/myAccountPage";
import ProflieMenu from "../../pageObjectModule/commonComponent/headerMenu";

describe("template spec", function () {
  const username = "saurabh.gaikwad@scalevista.com";
  const mainPassword = "Saurabh@01";
  const newPassword = "Saurabh@02";
  const BASE_URL = "https://creatics.org/";

  beforeEach(() => {
    loginPage.visit(BASE_URL);
    loginPage.assertUrl(BASE_URL);
    loginPage.signInOption();
    loginPage.emailText(username);
    loginPage.passwordText(mainPassword);
    loginPage.loginButton();
    cy.wait(2000);

    cy.on("window:alert", (message) => {
      const normalizedMessage = message
        // .replace(/[\u00a0\n\*\*]+/g, " ")
        .replace(/\u00a0/g, " ")
        .replace(/\n/g, " ")
        .trim();
      expect([
        "My Information updated successfully!",
        "My Words updated successfully!",
        "Please select only 3 options",
        "I’m Creator of updated successfully!",
        "I’m Fan of updated successfully!",
        "Please select an image to upload",
        "Profile Picture removed successfully!",
        "Profile picture updated successfully!",
        "Profile Picture removed successfully!",
        "Background Picture updated successfully!",
        "Passwords do not match!",
        "Password updated successfully! Login with your new password",
      ]).to.contains(normalizedMessage);
    });
  });
  it("Verify if my account page gets open.", () => {
    const Name = "Saurabh";
    const checkboxSelectors = ["Film", "Fashion", "Dance"];
    const test = ["Dance"];

    ProflieMenu.dropDownMenu();
    ProflieMenu.selectMyAccount();
    myAccountPage.profileSection().should("be.visible");
    myAccountPage.myInformationSection().should("be.visible");
    cy.wait(2000);
    myAccountPage.clickEditInformationBtn();
    myAccountPage.getFirstNameTextbox(Name);
    myAccountPage.clickSaveBtn();
    cy.wait(2000);
    myAccountPage.savedMyInformation(Name).should("be.visible");
    myAccountPage.myInformationSection().should("be.visible");

    myAccountPage.imFanOfSection();
    myAccountPage.uncheckAllFansOptions();
    // myAccountPage.selectOption(checkboxSelectors);
    myAccountPage.selectFansOptionArray(checkboxSelectors);
    myAccountPage.countSelectedFansOption().should("eq", 3);
    myAccountPage.clickUpdateFanBtn();
    // cy.reload();
    // myAccountPage.profileSection().should("be.visible");
    // myAccountPage.imFanOfSection();
    // cy.wait(2000);
    // cy.get(".checkbox-container").click();

    myAccountPage.countSelectedFansOption().should("eq", 3);

    // myAccountPage.uncheckAllOptions();
    // myAccountPage.uncheckedOption().should("eq", 9);
  });

  it("Verify creators section", () => {
    const Name = "Saurabh";
    const checkboxSelectors = ["Film", "Fashion", "Dance"];
    const test = ["Dance"];

    ProflieMenu.dropDownMenu();
    ProflieMenu.selectMyAccount();
    myAccountPage.profileSection().should("be.visible");

    myAccountPage.imCreatorOfSection();
    cy.wait(2000);
    myAccountPage.getCreatorCheckboxContainer();
    myAccountPage.uncheckAllCreatorOptions();
    myAccountPage.uncheckedCreatorOption().should("eq", 9);
    // myAccountPage.selectOption(checkboxSelectors);
    myAccountPage.selectCreatorsOptionArray(test);
    myAccountPage.countSelectedFansOption().should("eq", 1);
    myAccountPage.clickUpdateCreatorBtn(); // myAccountPage.clickUpdateFanBtn();
  });
  it.only("Verify the functionality of I' M FAN section after option is checked in valid. ", () => {
    const FansOptions = ["Film", "Fashion", "Dance"];
    const SingleFanOption = "Dance";
    ProflieMenu.dropDownMenu();
    ProflieMenu.selectMyAccount();
    myAccountPage.profileSection();
    myAccountPage.imFanOfSection();
    cy.wait(4000);
    myAccountPage.getFanCheckboxContainer();
    myAccountPage.countSelectedFansOption();
    // myAccountPage.uncheckAllFansOptions();
    // myAccountPage.uncheckedFanOption().should("eq", 9);
    const checkAndSubmit = (elementIndex) => {
      // Check if option 2 is selected
      cy.contains(SingleFanOption)
        // .closest(`.element-${elementIndex}`) // Find the closest parent element
        .find('input[type="checkbox"]') // Use the simplified checkbox selector
        .then(($checkbox) => {
          // Check if the checkbox is checked
          if (!$checkbox.is(":checked")) {
            // If not selected, click option 2
            cy.wrap($checkbox).check({ force: true });
            // Click the submit button
            cy.get(".submit-button").click();
            cy.wait(2000);
          } else {
            // If already checked, log a message (optional)
            cy.log(
              `${SingleFanOption} is already checked for element ${elementIndex}`
            );
          }
        });
    };

    // Loop through all elements and ensure option 2 is selected, then submit if not already checked
    for (let i = 1; i <= 9; i++) {
      checkAndSubmit(i);
    }
  });
});
