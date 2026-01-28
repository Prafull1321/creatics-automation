import cinejoyHomepage from "../../pageObjectModule/cinejoy/cinejoyHomepage";
import loginPage from "../../pageObjectModule/loginPage";
import spotlightPage from "../../pageObjectModule/spotlightPage";

describe("CineJoy Testcases.", function() {
    const username = "1cg0deu51s@cmhvzylmfc.com";
    const mainPassword = "Test@123";
    const Production_URL = "https://creatics.org/";
      const Mobile_1_URL = "https://mobile.creatics.org/";
      const Mobile_2_URL = "https://mobilej21.creatics.org/";
      const Dev_URL = "https://dev.creatics.org/";
      const logInURL = "https://dev.creatics.org/userProfiles";
      const BASE_URL = Production_URL;
    
      beforeEach(() => {         
        loginPage.visit(BASE_URL);
        //cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
        loginPage.assertUrl(BASE_URL);
        loginPage.signInOption();
        loginPage.emailText(username);
        loginPage.passwordText(mainPassword);
        cy.wait(2000);
        loginPage.loginButton();
        cy.wait(5000);
        cinejoyHomepage.navigateToCinejoy();
        cy.get("img[alt='Cinejoy Home Page']", {timeout: 10000}).should("be.visible");
        cinejoyHomepage.navigateToSpotlight();
    
        cy.on("window:alert", (message) => {
          const normalizedMessage = message
            // .replace(/[\u00a0\n\*\*]+/g, " ")
            .replace(/\u00a0/g, " ")
            .replace(/\n/g, " ")
            .trim();
          expect([
            "First Name can't be blank",
            "Last Name can't be blank",
            "Enter Valid Communication Email Address",
          ]).to.contains(normalizedMessage);
        });
      });


      it("Verify group sharing page features", () => {
        spotlightPage.navigateToGroupshare();
      });
      


      afterEach(() => {
    // Runs after each test
    cy.wait(2000);
    cy.clearCookies();
  });

});