import loginPage from "../pageObjectModule/loginPage";
import myAccountPage from "../pageObjectModule/myAccount/myAccountPage";
import ProfileMenu from "../pageObjectModule/commonComponent/headerMenu";
import profilePage from "../pageObjectModule/profilePage";
import headerMenu from "../pageObjectModule/commonComponent/headerMenu";
import { onboardSetup4 } from "../pageObjectModule/onboardingPages";

// 🔁 Reusable function to delete all added containers from the #tresures section
// function deleteAllAddedContainers() {
//   //   cy.get("#tresures .card.ng-star-inserted")
//   profilePage.treasuryCards().then(($treasurys) => {
//     // Get all containers inside the #tresures section
//     const addedTreasury = [...$treasurys].filter((el) => {
//       // Convert jQuery object to array and filter out the default "Add" container
//       return !el.querySelector("img")?.getAttribute("src")?.includes("add.svg");
//     });
//     if (addedTreasury.length === 0) return; // If no added containers are left, exit the function (end recursion)
//     cy.wrap(addedTreasury[0]).within(() => {
//       // Wrap the first added container and scope Cypress commands to it
//       cy.get('img[title="Delete"]').click({ force: true }); // Click the delete icon inside this container
//     });
//     profilePage.treasuryDeletePopup().should("be.visible"); // Confirmation dialog appears after delete click
//     profilePage.treasuryDeleteYesOption(); // Click the "Yes" button to confirm the deletion
//     cy.wait(3000);
//     deleteAllAddedContainers(); // Call the same function again to delete the next added container
//   });
// }

function treasuryCardsCount(limit = 0) {
  // Get all treasury container cards (including default "Add" and added ones)
  profilePage.treasuryCards().then(($treasurys) => {
    // Convert NodeList to array and filter out the default container (the one with add.svg)
    const addedTreasury = [...$treasurys].filter((el) => {
      return !el.querySelector("img")?.getAttribute("src")?.includes("add.svg");
    });
    if (addedTreasury.length <= limit) {
      // ✅ If the number of added containers is already within the limit, stop the recursion
      cy.log(`No action needed. ${addedTreasury.length} ≤ limit (${limit})`);
      return;
    }
    cy.log(
      `Found ${addedTreasury.length} containers. Deleting 1 to reach limit ${limit}...`
    ); // 🗑️ Log current state before deletion
    cy.wrap(addedTreasury[0]).within(() => {
      // 🔽 Pick the first added container and scope Cypress commands inside it
      cy.get('img[title="Delete"]').click({ force: true }); // Click the Delete icon inside the card (force: true in case it's hidden on hover)
    });
    profilePage.treasuryDeletePopup().should("be.visible"); // 🛑 Wait for the confirmation dialog to appear
    profilePage.treasuryDeleteYesOption(); // ✅ Confirm deletion by clicking "Yes"
    cy.wait(3000); // ⏳ Wait for DOM update after deletion (may depend on animation or re-render)
    treasuryCardsCount(limit); // 🔁 Recursively call the function until container count is within the limit
  });
}

describe("Profile Page Test cases", () => {
  const username = "saurabh.gaikwad@scalevista.com";
  const mainPassword = "Saurabh@01";
  const newPassword = "Saurabh@02";
  const Production_URL = "https://creatics.org/";
  const Mobile_1_URL = "https://mobile.creatics.org/";
  const Mobile_2_URL = "https://mobilej21.creatics.org/";
  const Testing_URL = "https://testing.creatics.org/";
  const Dev_URL = "https://dev.creatics.org/";
  const logInURL = "https://dev.creatics.org/userProfiles";
  const BASE_URL = Testing_URL;

  beforeEach(() => {
    loginPage.visit(BASE_URL);
    cy.wait(15000);
    loginPage.assertUrl(BASE_URL);
    loginPage.signInOption();
    loginPage.emailText(username);
    loginPage.passwordText(mainPassword);
    cy.wait(2000);
    loginPage.loginButton();
    cy.wait(5000);
    ProfileMenu.dropDownMenu();
    ProfileMenu.selectMyProfile();
    cy.wait(5000);
    cy.on("window:alert", (message) => {
      const normalizedMessage = message
        // .replace(/[\u00a0\n\*\*]+/g, " ")
        .replace(/\u00a0/g, " ")
        .replace(/\n/g, " ")
        .trim();
      expect([
        "Profile picture updated successfully!",
        "File size is too big",
      ]).to.contains(normalizedMessage);
    });
  });

  // it("Verify that the 'Upload a Treasure' popup opens properly when the add treasury icon is clicked.", () => {
  //     profilePage.clickNewTreasuryCards();
  //     profilePage.treasuryPopup().should("be.visible");
  //   });

  // it("Verify that the 'Save' button is disabled when the popup is opened.", () => {
  //     profilePage.clickNewTreasuryCards();
  //     profilePage.treasuryPopupSaveBtn().should("be.disabled");
  //   });

  //   it("Verify 'Title' and 'Description' field character limits.", () => {
  //     const treasuryMaxChar = 100;
  //     const TreasuryTitle = "A".repeat(treasuryMaxChar + 10);
  //     const descriptionMaxChar = 500;
  //     const DescriptionText = "B".repeat(descriptionMaxChar + 10);
  //     profilePage.clickNewTreasuryCards();
  //     cy.wait(2000);
  //     profilePage.typeTreasuryPopupTitleText(TreasuryTitle).blur();
  //     cy.wait(2000);
  //     profilePage
  //       .treasuryPopupTitleCharater()
  //       .invoke("val")
  //       .should("have.length", treasuryMaxChar);

  //     profilePage.typeTreasuryPopupDescription(DescriptionText).blur();
  //     cy.wait(2000);
  //     profilePage
  //       .treasuryPopupDescriptionCharater()
  //       .invoke("val")
  //       .should("have.length", descriptionMaxChar);
  //   });

  //   it("Verify that an invalid URL and empty input in the 'Experience Link' field shows an error message.", () => {
  //     profilePage.clickNewTreasuryCards();
  //     cy.wait(4000);

  //     profilePage.typeTreasuryPopupLinkText("qwerty").blur();
  //     cy.get("mat-dialog-content").scrollTo("bottom");
  //     cy.wait(4000);
  //     profilePage.invalidLinkErrroTreasuryPopup().should("be.visible");
  //     profilePage.getTreasuryPopupLinkTextBox().clear(); //.blur();
  //     cy.wait(4000);
  //     profilePage.emptyLinkErrroTreasuryPopup().should("be.visible");
  //   });

  //   it("Verify that the 'Category' field allows selection of different categories for treasure creation.", () => {
  //     const SelectCategory = "Dance";
  //     const ChangedCategory = "Film";
  //     profilePage.clickNewTreasuryCards();
  //     cy.wait(4000);
  //     profilePage
  //       .selectCategoryInTreasuryPopup(SelectCategory)
  //       .should("be.checked");
  //     profilePage
  //       .selectCategoryInTreasuryPopup(ChangedCategory)
  //       .should("be.checked");
  //     profilePage
  //       .treasuryPopupCategory()
  //       .filter(":checked")
  //       .should("have.length", 1);
  //   });

  //   it('Verify that the "Upload  Image" in a Treasure popup works properly.', () => {
  //     const ImageUpload = "cypress/fixtures/images/plant.jpg";
  //     profilePage.clickNewTreasuryCards();
  //     cy.wait(4000);
  //     profilePage.clickTreasuryPopupImageOption();
  //     profilePage.selectTreasuryPopupImage(ImageUpload);
  //     profilePage.getTreasuryPopupCroppedImage();
  //     profilePage.cropTreasuryPopupImage();
  //     cy.wait(2000);
  //     profilePage.getCroppedTreasuryPopupImage().should("be.visible");
  //   });

  //   it("Verify that filling all mandatory fields with valid data enables the 'Save'.", () => {
  //     const TitleText = "Testing";
  //     const DescriptionText = "This is for checking";
  //     const LinkText = "www.google.com";
  //     const TreasuryImage = "cypress/fixtures/images/sky.jpg";
  //     const TreasuryCategory = "Dance";

  //     profilePage.clickNewTreasuryCards();
  //     cy.wait(4000);
  //     profilePage.typeTreasuryPopupTitleText(TitleText);
  //     cy.wait(2000);
  //     profilePage.treasuryPopupSaveBtn().should("be.disabled");
  //     profilePage.typeTreasuryPopupDescription(DescriptionText);
  //     cy.wait(2000);
  //     profilePage.treasuryPopupSaveBtn().should("be.disabled");
  //     profilePage.clickTreasuryPopupImageOption();
  //     profilePage.selectTreasuryPopupImage(TreasuryImage);
  //     profilePage.getTreasuryPopupCroppedImage();
  //     profilePage.cropTreasuryPopupImage();
  //     cy.wait(2000);
  //     profilePage.treasuryPopupSaveBtn().should("be.disabled");
  //     profilePage.selectCategoryInTreasuryPopup(TreasuryCategory);
  //     cy.wait(2000);
  //     profilePage.treasuryPopupSaveBtn().should("be.disabled");
  //     cy.get("mat-dialog-content").scrollTo("bottom");
  //     profilePage.typeTreasuryPopupLinkText(LinkText).blur();
  //     cy.wait(4000);
  //     profilePage.treasuryPopupSaveBtn().should("be.visible");
  //     // profilePage
  //     //   .treasuryPopupSaveBtn()
  //     //   .should("have.css", "opacity", "0.65")
  //     //   .and("have.css", "cursor", "not-allowed");  // this is used because button disable acts different when linktext is added.
  //   });

  it("Verify that clicking the 'Save' button creates the treasure and displays it on the profile page.", () => {
    const TitleText = "Testing";
    const DescriptionText = "This is for checking";
    const LinkText = "www.google.com";
    const TreasuryImage = "cypress/fixtures/images/sky.jpg";
    const TreasuryCategory = "Dance";

    treasuryCardsCount(0);
    profilePage.treasuryCards().should("have.length", 1);

    profilePage.clickNewTreasuryCards();
    cy.wait(4000);
    profilePage.typeTreasuryPopupTitleText(TitleText);
    profilePage.typeTreasuryPopupDescription(DescriptionText);
    profilePage.clickTreasuryPopupImageOption();
    profilePage.selectTreasuryPopupImage(TreasuryImage);
    profilePage.getTreasuryPopupCroppedImage();
    profilePage.cropTreasuryPopupImage();
    profilePage.selectCategoryInTreasuryPopup(TreasuryCategory);
    cy.get("mat-dialog-content").scrollTo("bottom");
    profilePage.typeTreasuryPopupLinkText(LinkText).blur();
    cy.wait(4000);
    profilePage.treasuryPopupSaveBtn().should("be.visible");
    profilePage.clickTreasuryPopupSaveBtn();
    cy.wait(2000);
    profilePage.treasury(TitleText).should("be.visible");
  });

  it("Verify that a treasury card displays the title and sub name after successful creation.", () => {
    const TitleText2 = "Checking";
    const DescriptionText2 = "This is for checking";
    const LinkText2 = "www.google.com";
    const TreasuryImage2 = "cypress/fixtures/images/sky.jpg";
    const ImageName2 = "sky.jpg";
    const TreasuryCategory2 = "Dance";

    profilePage.clickNewTreasuryCards();
    cy.wait(4000);
    profilePage.typeTreasuryPopupTitleText(TitleText2);
    profilePage.typeTreasuryPopupDescription(DescriptionText2);
    profilePage.clickTreasuryPopupImageOption();
    profilePage.selectTreasuryPopupImage(TreasuryImage2);
    profilePage.getTreasuryPopupCroppedImage();
    profilePage.cropTreasuryPopupImage();
    profilePage.selectCategoryInTreasuryPopup(TreasuryCategory2);
    cy.get("mat-dialog-content").scrollTo("bottom");
    profilePage.typeTreasuryPopupLinkText(LinkText2).blur();
    cy.wait(4000);
    profilePage.treasuryPopupSaveBtn().should("be.visible");
    profilePage.clickTreasuryPopupSaveBtn();
    cy.wait(15000);
    profilePage.treasury(TitleText2).should("be.visible");
    profilePage.treasurySubName(TreasuryCategory2).should("be.visible");
    // profilePage.clickCardsDeleteOption(TitleText2);
    // profilePage.treasuryConfirmPopupYesOption();
  });

  //   it("Verify that the 'Close' button discards all input and closes the popup.", () => {
  //     const TitleText = "Qwerty@123";
  //     const DescriptionText = "This is for checking";
  //     const LinkText = "www.google.com";
  //     const TreasuryImage = "cypress/fixtures/images/sky.jpg";
  //     const TreasuryCategory = "Dance";
  //     const NumberOfCards = "3";
  //     profilePage.clickNewTreasuryCards();
  //     cy.wait(4000);
  //     profilePage.typeTreasuryPopupTitleText(TitleText);
  //     profilePage.typeTreasuryPopupDescription(DescriptionText);
  //     profilePage.clickTreasuryPopupImageOption();
  //     profilePage.selectTreasuryPopupImage(TreasuryImage);
  //     profilePage.getTreasuryPopupCroppedImage();
  //     profilePage.cropTreasuryPopupImage();
  //     profilePage.selectCategoryInTreasuryPopup(TreasuryCategory);
  //     cy.get("mat-dialog-content").scrollTo("bottom");
  //     profilePage.typeTreasuryPopupLinkText(LinkText).blur();
  //     cy.wait(4000);
  //     profilePage.clickTreasuryPopupCloseBtn();
  //     cy.wait(2000);
  //     profilePage.treasury(TitleText).should("not.exist");

  //     // profilePage.treasuryCards().should("have.length", NumberOfCards);
  //   });

  it("Verify the complete flow of creating a treasury card, accessing its popup, and validating the URL.", () => {
    const TitleText3 = "Future";
    const DescriptionText3 = "This is the future";
    const LinkText3 = "www.google.com";
    const TreasuryImage3 = "cypress/fixtures/images/fox.jpg";
    const ImageName3 = "fox.jpg";
    const TreasuryCategory3 = "Film";

    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });

    profilePage.clickNewTreasuryCards();
    cy.wait(4000);
    profilePage.typeTreasuryPopupTitleText(TitleText3);
    profilePage.typeTreasuryPopupDescription(DescriptionText3);
    profilePage.clickTreasuryPopupImageOption();
    profilePage.selectTreasuryPopupImage(TreasuryImage3);
    profilePage.getTreasuryPopupCroppedImage();
    profilePage.cropTreasuryPopupImage();
    profilePage.selectCategoryInTreasuryPopup(TreasuryCategory3);
    cy.get("mat-dialog-content").scrollTo("bottom");
    profilePage.typeTreasuryPopupLinkText(LinkText3).blur();
    cy.wait(4000);
    profilePage.treasuryPopupSaveBtn().should("be.visible");
    profilePage.clickTreasuryPopupSaveBtn();
    cy.wait(15000);
    profilePage.treasury(TitleText3).should("be.visible");
    profilePage.treasurySubName(TreasuryCategory3).should("be.visible");
    profilePage.clickTreasuryCard(TitleText3);
    profilePage.treasuryAccessPopup().should("be.visible");
    profilePage.treasuryAccessPopupTitle(TitleText3).should("be.visible");
    profilePage
      .treasuryAccessPopupSubText(DescriptionText3)
      .should("be.visible");
    profilePage
      .treasuryAccessPopupImage()
      .should("have.attr", "src")
      .and("include", ImageName3);
    profilePage.clickTreasuryAccessPopupLink();
    cy.get("@windowOpen").should(
      "be.calledWith",
      Cypress.sinon.match(LinkText3)
    );
  });

  it("Verify that user is able to edit treasury details and its shown on profile page after saving them.", () => {
    const OldTitleText = "Checking";
    const EditedTitleText = "Dog";
    const EditedDescriptionText = "This is for checking";
    const EditedLinkText = "www.youtube.com";
    const EditedTreasuryImage = "cypress/fixtures/images/dog.jpg";
    const EditedImageName = "dog.jpg";
    const EditedTreasuryCategory = "Tech & Science";
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });
    profilePage.clickCardsEditOption(OldTitleText);
    cy.wait(4000);
    profilePage.selectCategoryInTreasuryPopup(EditedTreasuryCategory);
    profilePage.typeTreasuryPopupTitleText(EditedTitleText);
    profilePage.clickTreasuryPopupChangeImage();
    profilePage.selectTreasuryPopupImage(EditedTreasuryImage);
    profilePage.getTreasuryPopupCroppedImage();
    profilePage.cropTreasuryPopupImage();
    profilePage.typeTreasuryPopupDescription(EditedDescriptionText);
    profilePage.typeTreasuryPopupLinkText(EditedLinkText);
    profilePage.clickTreasuryPopupSaveBtn();
    cy.wait(4000);
    profilePage.treasury(EditedTitleText).should("be.visible");
    profilePage.clickTreasuryCard(EditedTitleText);
    profilePage.treasuryAccessPopupTitle(EditedTitleText);
    profilePage.treasuryAccessPopupSubText(EditedDescriptionText);
    profilePage
      .treasuryAccessPopupImage()
      .should("have.attr", "src")
      .and("include", EditedImageName);
    profilePage.clickTreasuryAccessPopupLink();
    cy.get("@windowOpen").should(
      "be.calledWith",
      Cypress.sinon.match(EditedLinkText)
    );
  });

  // it("Verify that selecting 'Yes' in the delete confirmation popup deletes the treasury.	", () => {
  //   const TitleText = "Testing";
  //   profilePage.clickCardsDeleteOption(TitleText);
  //   profilePage.treasuryDeletePopup().should("be.visible");
  //   profilePage.treasuryDeleteYesOption();
  //   cy.wait(4000);
  //   profilePage.treasury(TitleText).should("not.exist");
  // });

  it("should edit the title of the first added container", () => {
    // Step 1: Get all containers under #tresures and filter out the default one
    profilePage.treasuryCards().then(($containers) => {
      const addedContainers = [...$containers].filter((el) => {
        return !el
          .querySelector("img")
          ?.getAttribute("src")
          ?.includes("add.svg");
      });

      // Step 2: Ensure there is at least one added container to edit
      expect(addedContainers.length).to.be.greaterThan(0);

      // Step 3: Target the first added container
      const firstAdded = addedContainers[1];
      cy.wrap(firstAdded).as("targetContainer");

      // Step 4: Get current title text
      cy.get("@targetContainer")
        .find(".treasuryTitle-name")
        .invoke("text")
        .then((oldTitle) => {
          const trimmedOldTitle = oldTitle.trim();
          cy.log("Old title:", trimmedOldTitle);

          // Step 5: Click Edit icon inside that container
          cy.get("@targetContainer")
            .find('img[title="Edit"]')
            .click({ force: true });

          // Step 6: Wait for dialog/input to appear and edit the title
          // const newTitle = "Updated Title " + Date.now(); // dynamic unique title
          const newTitle = "Changed Text" + Date.now();
          cy.wait(4000);
          profilePage.typeTreasuryPopupTitleText(newTitle);
          // cy.get('input[formcontrolname="title"]').clear().type(newTitle);

          // Step 7: Click Save (adjust button text/selector if needed)
          profilePage.clickTreasuryPopupSaveBtn();
          // cy.get("button").contains("Save").click();
          cy.wait(6000);
          // Step 8: Wait for the title to update inside the container
          profilePage.treasury(newTitle).should("exist");
          // cy.get("#tresures .treasuryTitle-name").should(
          //   "contain.text",
          //   newTitle
          // );
          // Optionally, ensure old title is no longer visible
          profilePage.treasury(trimmedOldTitle).should("not.exist");
          // cy.get("#tresures .treasuryTitle-name").should(
          //   "not.contain.text",
          //   trimmedOldTitle
          // )
        });
    });
  });

  it.skip("Verify if user delete all cards then only Add new card is shown", () => {
    treasuryCardsCount(0);
    profilePage.treasuryCards().should("have.length", 1);
    profilePage.addNewTreasuryCards().should("be.visible");
  });

  afterEach(() => {
    // Runs after each test
    cy.wait(6000);
    cy.clearCookies();
    // cy.get(".dropdown").first().click();
    // cy.get(".profileCard").contains("LOGOUT").click();
    cy.wait(6000);
  });
});
