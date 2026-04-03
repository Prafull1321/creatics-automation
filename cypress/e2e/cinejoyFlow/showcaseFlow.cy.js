import cinejoyHomepage from "../../pageObjectModule/cinejoyHomepage";
import loginPage from "../../pageObjectModule/loginPage";
import showcasePage from "../../pageObjectModule/showcasePage";
import spotlightPage from "../../pageObjectModule/spotlightPage";

describe("Showcase Testcases", function() {
    const username = "0znclqyo3j@xkxkud.com";
    const mainPassword = "Test@123";
    const Production_URL = "https://creatics.org/";
      const Mobile_1_URL = "https://mobile.creatics.org/";
      const Mobile_2_URL = "https://mobilej21.creatics.org/";
      const Dev_URL = "https://dev.creatics.org/";
      const logInURL = "https://dev.creatics.org/userProfiles";
      const Testing_URL = "https://testing.creatics.org/";
      const BASE_URL = Testing_URL;
    
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
        cinejoyHomepage.navigateToShowcase();
    
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

      it("Verify showcase movie homepage", () => {
        showcasePage.verifyShowcasePage();
        showcasePage.verifyMovieDetails();         
      });

      it("Verify user is able to watch movie", () => {
        showcasePage.navigateToFeaturesPage();
        showcasePage.navigateToWatchPage();  
      });

      it("Verify user is able to add movies in watchlist", () => {
        showcasePage.addShowcaseMovieToWatchlist();
        showcasePage.removeMovieFromWatchlist();
      });

      // it.only("Verify user is able to rate the movie", () => {
      //   showcasePage.naviagteToMoviePage();
      //   showcasePage.verifyMovieRate();
      //   showcasePage.validateRatingSubmitted();
      // });

      it("Validate Trailer, Special features, Cast and Crew, more info and message tab", () => {
        showcasePage.naviagteToMoviePage();
        //showcasePage.verifyTrailerPlayAndPause();
        showcasePage.verifyCastCrewAndMoreInfo();
      });

      afterEach(() => {
    // Runs after each test
    cy.wait(2000);
    cy.clearCookies();
  });

});