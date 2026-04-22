import cinejoyHomepage from "../../pageObjectModule/cinejoyHomepage";
import loginPage from "../../pageObjectModule/loginPage";
import showcasePage from "../../pageObjectModule/showcasePage";
import spotlightPage from "../../pageObjectModule/spotlightPage";

describe("Showcase Testcases", function() {
    const username = "7krtwbxmsi@yzcalo.com";
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

      it("Verify user is able to buy a showcase movie ticket using Free4All promo code", { retries: 0 }, () => {
        const promoCode = "Free4All";

        // 1. Find a movie with a Buy button available and capture its title.
        showcasePage.selectBuyableMovieAndCapture("purchasedMovie");

        // 2. Click the Buy button for the selected movie.
        showcasePage.clickBuyButton();

        // 3. Apply promo code and complete the purchase.
        showcasePage.applyPromoCodeAndBuy(promoCode);

        // 4. Wait for Stripe to redirect back to the app.
        cy.url({ timeout: 60000 }).should('include', 'creatics.org');
        cy.wait(3000);

        // 5. Validate the purchase confirmation dialog shows the movie title and $0 total.
        cy.contains('Thank you for your purchase', { timeout: 15000 }).should('be.visible');
        // cy.get('@purchasedMovie').then((movieTitle) => {
        //     cy.contains(movieTitle, { timeout: 10000 }).should('be.visible');
        // });
        cy.contains('$0.00', { timeout: 10000 }).should('be.visible');

        // 6. Click the "My Tickets" link inside the success dialog to navigate.
        cy.contains('a', 'My Tickets', { timeout: 10000 }).click({ force: true });
        cy.wait(5000);

        // 7. Validate the purchased movie appears in the My Tickets section.
        showcasePage.validateTicketInMyTickets("purchasedMovie");
      });

      afterEach(() => {
    // Runs after each test
    cy.wait(2000);
    cy.clearCookies();
  });

});