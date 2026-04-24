import hitmakerPage from "../../pageObjectModule/hitmakerPage";
import loginPage from "../../pageObjectModule/loginPage";

describe("Hitmaker - Post-Production Flow", function () {
    const username = "0znclqyo3j@xkxkud.com";
    const mainPassword = "Test@123";
    const Testing_URL = "https://testing.creatics.org/";
    const BASE_URL = Testing_URL;

    beforeEach(() => {
        cy.viewport(1280, 800);
        loginPage.visit(BASE_URL);
        loginPage.assertUrl(BASE_URL);
        loginPage.signInOption();
        loginPage.emailText(username);
        loginPage.passwordText(mainPassword);
        loginPage.loginButton();
        cy.url({ timeout: 15000 }).should("not.include", "/login");
        hitmakerPage.navigateToHitmaker();
        hitmakerPage.verifyHitmakerLandingPage();
        hitmakerPage.navigateToHitmakerMainPage();
        hitmakerPage.navigateToPostprod();
    });

    it("Validate Post-Production main page sections are visible", () => {
        hitmakerPage.verifyPostprodMainPage();
    });

    it("Validate user is able to play episodes, comment, and navigate", () => {
        hitmakerPage.verifyEpisodePage();
        hitmakerPage.verifyCommentSection();
        hitmakerPage.verifyEpisodesNavigation();
        hitmakerPage.jewelFunction();
    });

    it("Validate Polls, Sneak Peeks, Updates, and Ask Team Anything under Post-Production", () => {
        hitmakerPage.verifyPostprodPollsSneakpeekAndUpdate();
        hitmakerPage.verifyAskTeamAnything("Ask the Team Anything");
    });

    afterEach(() => {
        cy.clearCookies();
    });
});
