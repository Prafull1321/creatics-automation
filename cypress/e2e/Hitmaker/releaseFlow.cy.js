import hitmakerPage from "../../pageObjectModule/hitmakerPage";
import loginPage from "../../pageObjectModule/loginPage";


describe("CineJoy Testcases.", function() {
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
        cy.viewport(1280, 800); 
        loginPage.visit(BASE_URL);
        //cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
        loginPage.assertUrl(BASE_URL);
        loginPage.signInOption();
        loginPage.emailText(username);
        loginPage.passwordText(mainPassword);
        cy.wait(2000);
        loginPage.loginButton();
        cy.wait(5000);
        hitmakerPage.navigateToHitmaker();
        cy.contains("Get Inside the Studio & World Premiere of a Hit Film.", {timeout: 10000}).should("be.visible");
        hitmakerPage.naviagteToHitmakerMainPage();
        hitmakerPage.navigateToRelease();
        
    
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

      it("Validate user is able to play episodes" , () =>{
        hitmakerPage.navigateToReleaseEpisodePage();
        hitmakerPage.verifyReleaseEpisodePage();
        hitmakerPage.verifyCommentSection();
      });

      afterEach(() => {
    // Runs after each test
    cy.wait(2000);
    cy.clearCookies();
  });

});