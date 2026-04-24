import hitmakerPage from "../../pageObjectModule/hitmakerPage";
import loginPage from "../../pageObjectModule/loginPage";

describe("Hitmaker - Release Flow", function () {
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
        hitmakerPage.navigateToRelease();
    });

    it("Validate Release main page content is visible", () => {
        hitmakerPage.verifyReleaseMainPage();
    });

    it("Validate user is able to play episodes and interact with comments", () => {
        hitmakerPage.navigateToReleaseEpisodePage();
        hitmakerPage.verifyReleaseEpisodePage();
        hitmakerPage.verifyCommentSection();
    });

    afterEach(() => {
        cy.clearCookies();
    });
});
