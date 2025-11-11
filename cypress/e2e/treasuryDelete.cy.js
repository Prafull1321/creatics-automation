import loginPage from "../pageObjectModule/loginPage";
import myAccountPage from "../pageObjectModule/myAccount/myAccountPage";
import ProfileMenu from "../pageObjectModule/commonComponent/headerMenu";
import profilePage from "../pageObjectModule/profilePage";
import headerMenu from "../pageObjectModule/commonComponent/headerMenu";
import { onboardSetup4 } from "../pageObjectModule/onboardingPages";

// 🔁 Reusable function to delete all added containers from the #tresures section
function deleteAllAddedContainers() {
  //   cy.get("#tresures .card.ng-star-inserted")
  profilePage.treasuryCards().then(($containers) => {
    // Get all containers inside the #tresures section
    const addedContainers = [...$containers].filter((el) => {
      // Convert jQuery object to array and filter out the default "Add" container
      return !el.querySelector("img")?.getAttribute("src")?.includes("add.svg");
    });
    if (addedContainers.length === 0) return; // If no added containers are left, exit the function (end recursion)
    cy.wrap(addedContainers[0]).within(() => {
      // Wrap the first added container and scope Cypress commands to it
      cy.get('img[title="Delete"]').click({ force: true }); // Click the delete icon inside this container
    });
    profilePage.treasuryDeletePopup().should("be.visible"); // Confirmation dialog appears after delete click
    profilePage.treasuryDeleteYesOption(); // Click the "Yes" button to confirm the deletion
    cy.wait(3000);
    deleteAllAddedContainers(); // Call the same function again to delete the next added container
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
    // cy.wait(5000);
    // ProfileMenu.dropDownMenu();
    // ProfileMenu.selectMyProfile();
    // cy.wait(5000);
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

  it("Verify if user delete all cards then only Add new card is shown", () => {
    const TitleText2 = "Dog";
    const TitleText3 = "Future";
    const CardsNumber = "1";
    cy.wait(5000);
    ProfileMenu.dropDownMenu();
    ProfileMenu.selectMyProfile();
    cy.wait(10000);

    cy.get("#tresures .card").then(($allContainers) => {
      // Filter out the default container by checking for 'add.svg' image
      const $addedContainers = $allContainers.filter((index, el) => {
        return !el
          .querySelector("img")
          ?.getAttribute("src")
          ?.includes("add.svg");
      });

      if ($addedContainers.length > 0) {
        cy.wrap($addedContainers).each(($container) => {
          cy.wrap($container).within(() => {
            // Click the delete icon with title "Delete"
            cy.get('img[title="Delete"]').click({ force: true });
            cy.wait(4000);
            // Confirm deletion in the dialog

            // cy.get("mat-dialog-container", { timeout: 10000 }) // wait up to 10s
            //   .should("exist")
            //   .within(() => {
            //     cy.contains("button", "Yes").click();
            //   });

            // Wait for deletion to complete (adjust if there's an animation or delay)
            cy.wait(5000);
          });
          profilePage.treasuryDeletePopup().should("be.visible");
          profilePage.treasuryDeleteYesOption();
          cy.wait(3000);
        });
      }
    });
    cy.get("#tresures .card.ng-star-inserted").should("have.length", 1);
    cy.get('#tresures img[src*="add.svg"]').should("exist");

    // profilePage.clickCardsDeleteOption(TitleText2);
    // profilePage.treasuryDeletePopup().should("be.visible");
    // profilePage.treasuryDeleteYesOption();
    // cy.wait(4000);
    // profilePage.clickCardsDeleteOption(TitleText3);
    // profilePage.treasuryDeletePopup().should("be.visible");
    // profilePage.treasuryDeleteYesOption();
    // cy.wait(4000);
    // profilePage.treasuryCards().should("have.length", CardsNumber);
    // profilePage.addNewTreasuryCards().should("be.visible");
  });

  it.only("should delete all added containers and retain only the default one", () => {
    cy.wait(5000);
    ProfileMenu.dropDownMenu();
    ProfileMenu.selectMyProfile();
    cy.wait(10000);

    // function deleteAllAddedContainers() {
    //   // Get all containers again each time (because the DOM changes after each delete)
    //   cy.get("#tresures .card.ng-star-inserted").then(($containers) => {
    //     // Filter out the default container (with add.svg)
    //     const addedContainers = [...$containers].filter((el) => {
    //       return !el
    //         .querySelector("img")
    //         ?.getAttribute("src")
    //         ?.includes("add.svg");
    //     });

    //     // If no added containers left, test can move on
    //     if (addedContainers.length === 0) return;

    //     // Wrap the first added container and delete it
    //     cy.wrap(addedContainers[0]).within(() => {
    //       cy.get('img[title="Delete"]').click({ force: true });
    //     });
    //     // Handle confirmation popup
    //     profilePage.treasuryDeletePopup().should("be.visible");
    //     profilePage.treasuryDeleteYesOption();
    //     // Recursively call the function again until no added containers remain
    //     cy.wait(3000); // optional: wait for DOM to update
    //     deleteAllAddedContainers();
    //   });
    // }
    // Start the recursive deletion
    deleteAllAddedContainers();
    // Final assertion
    profilePage.treasuryCards().should("have.length", 1);
    // cy.get('#tresures img[class="card-img-top"]').should("exist");
    cy.get('#tresures img[src*="add.svg"]').should("exist");
  });
});
