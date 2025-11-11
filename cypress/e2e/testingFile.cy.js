import LoginPage from "../pageObjectModule/loginPage";
import ResetPassword from "../pageObjectModule/resetPasswordPage";
import ResetVerify from "../pageObjectModule/resetVerifyPage";
import ResetConfirm from "../pageObjectModule/resetConfirmPage";
import SignUpPage from "../pageObjectModule/signUpPage";
import EmailVerification from "../pageObjectModule/emailVerification";
import ProfileMenu from "../pageObjectModule/commonComponent/headerMenu";
import myAccountPage from "../pageObjectModule/myAccount/myAccountPage";

describe("Verify functionality of Reset password", () => {
  const FirstName = "Testing";
  const LastName = "Testing";
  const Password = "Qwerty@123";
  //   const mainPassword = "@01";
  const PasswordTest001 = "Testing@001";
  const PasswordTest002 = "Testing@002";
  const PasswordTest003 = "Testing@003";
  const PasswordTest004 = "Testing@004";

  const BASE_URL = "https://dev.creatics.org/";
  const logInURL = "https://testing.creatics.org/userProfiles";
  const Testing_URL = "https://testing.creatics.org/";
  const Assert_URL = "https://testing.creatics.org/";

  const username = "saurabh.gaikwad@scalevista.com";
  const mainPassword = "Saurabh@01";

  let inbox;
  beforeEach(() => {
    LoginPage.visit(Testing_URL);
    cy.wait(10000);
    LoginPage.assertUrl("https://testing.creatics.org/");
    LoginPage.signInOption();
    // //cy.get(".cus-spacing").contains("SIGN IN").click();
    LoginPage.emailText(username), { log: false };
    LoginPage.passwordText(mainPassword, { log: false });
    LoginPage.loginButton();
    cy.wait(5000);
  });

  it.only("First test", () => {
    const AllPasswords = [
      "Testing@001",
      "Testing@002",
      "Testing@003",
      "Saurabh@01",
    ]; // All known test passwords — will try each one if needed

    cy.get("body").then(($body) => {
      // Check if "SIGN IN" is visible to determine login state
      if ($body.find('.cus-spacing:contains("SIGN IN")').length > 0) {
        // If "SIGN IN" button is found, user is NOT logged in
        cy.wrap(null).then(() => {
          // Try each password to log in
          const tryNextPassword = (index = 0) => {
            // Recursive function to try one password at a time
            if (index >= AllPasswords.length) {
              // If all passwords fail, stop with error
              throw new Error("None of the passwords worked.");
            }
            const CheckPassword = AllPasswords[index];
            LoginPage.signInOption(); // Visit login page and attempt login
            LoginPage.emailText(username), { log: false }; // Enter email
            LoginPage.passwordText(CheckPassword, { log: false }); // Enter password
            LoginPage.loginButton(); // Submit login form
            cy.wait(4000);
            cy.get("body", { timeout: 5000 }).then(($innerBody) => {
              // Wait for the body to load and check if login succeeded
              if ($innerBody.find(".dropdown").length > 0) {
                // If user is signed in (dropdown found), run delete flow
                cy.log(`Logged in with password: ${CheckPassword}`);
                deleteAccountFlow(); // ✅ Perform delete
              } else {
                tryNextPassword(index + 1); // If login failed, try the next password
              }
            });
          };
          tryNextPassword(); // Start trying passwords from index 0
        });
      } else {
        deleteAccountFlow(); // ✅ User is already logged in — directly run delete flow
      }
    });
    cy.wait(10000);
    function deleteAccountFlow() {
      // 🔁 Encapsulated function to delete the logged-in account
      cy.get("body").then(($body) => {
        // Popup handling if appeared
        if (Cypress.$(".custom-dialog-container:visible").length > 0) {
          cy.get(".custom-button").should("be.visible").click();
        }
      });
      ProfileMenu.dropDownMenu();
      ProfileMenu.selectMyAccount();
      myAccountPage.moreOptionSection();
      myAccountPage.removeButton();
      cy.wait(4000);
      myAccountPage.removePopupYesBtn();
      cy.wait(4000);
      myAccountPage.removePopupConfirmTextbox("Confirms");
      //   myAccountPage.selectRemoveBtnPopup();
      //   cy.wait(4000);
      //   myAccountPage.gotItBtnRemoved2Popup();
      //   cy.wait(4000);
    }
  });

  it("Second test", () => {
    cy.get("body").then(($body) => {
      if ($body.find('.cus-spacing:contains("SIGN IN")').length > 0) {
        // User is NOT signed in
        cy.get(".cus-spacing").contains("SIGN IN").click();
        LoginPage.emailText(username), { log: false };
        LoginPage.passwordText(mainPassword, { log: false });
        LoginPage.loginButton();
        // Add steps for sign-in flow here
      } else {
        // User IS signed in
        cy.get(".dropdown").first().click();
        ProfileMenu.selectMyAccount();

        // Add signed-in flow steps here
      }
    });
  });
});
