import cinejoyHomepage from "../../pageObjectModule/cinejoyHomepage";
import loginPage from "../../pageObjectModule/loginPage";
import spotlightPage from "../../pageObjectModule/spotlightPage";

describe("Spotlight Testcases.", function() {
    const username = "0znclqyo3j@xkxkud.com";
    const mainPassword = "Test@123";
    const Testing_URL = "https://testing.creatics.org/";
    const BASE_URL = Testing_URL;
    
      beforeEach(() => {         
        loginPage.visit(BASE_URL);
        //cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
        loginPage.assertUrl(BASE_URL);
        loginPage.signInOption();
        loginPage.emailText(username);
        loginPage.passwordText(mainPassword);
        loginPage.loginButton();
        cy.get('a[href="/cinejoy"]', { timeout: 15000 }).should('be.visible');
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
        spotlightPage.clickOnHostAGroupShare();
        spotlightPage.clickOnAttendAGroupShare();
        spotlightPage.clickOnBuyTicket();
      });

      it("Verify Lineup page More info page" , () => {
        spotlightPage.clickOnMoreInfo();
        //spotlightPage.verifyVideoPlayback();
      });
      
      it("Verify Lineup page add and remove to My watchlist flow" , () => {
        spotlightPage.addSpotlightMovieToWatchlist();
        spotlightPage.removeMovieFromWatchlist();
      });


  afterEach(() => {
    cy.clearCookies();
  });

});