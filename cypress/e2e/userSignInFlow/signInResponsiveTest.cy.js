import LoginPage from "../../pageObjectModule/loginPage";

const viewports = [
  //{ name: 'mobile', width: 430, height: 932 },
  { name: 'tablet 1', width: 769, height: 1024 },
  { name: 'tablet 2', width: 820, height: 1180 },
  { name: 'tablet 3', width: 1024, height: 800 },
  { name: 'desktop 1', width: 1920, height: 1080 },
  { name: 'desktop 2', width: 1440, height: 1024 },
  { name: 'desktop 3', width: 1200, height: 800 }
];

viewports.forEach(viewport => {
describe(`Sign-In Page Test Cases - ${viewport.name}`, function () {
  const username = "1cg0deu51s@cmhvzylmfc.com";
  const mainPassword = "Test@123";
  const newPassword = "Test@123";
  const productionURL = "https://creatics.org/";
  const productionLoggedIn = "https://creatics.org/userProfiles/home";
  const Mobile_1_URL = "https://mobile.creatics.org/";
  const mobile_1_LoggedIn = "https://mobile.creatics.org/userProfiles/home";
  const mobile_2_URL = "https://mobilej21.creatics.org/";
  const mobile_2_LoggedIn = "https://mobilej21.creatics.org/userProfiles/home";
  const BASE_URL = productionURL;
  const logInURL = productionLoggedIn;

  beforeEach(() => {
    cy.viewport(viewport.width, viewport.height);
    LoginPage.visit(BASE_URL);
    //cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
    LoginPage.assertUrl("https://creatics.org/");
  });

  it("Verify that a user can log in with valid credentials.", () => {
    LoginPage.signInOption();
    LoginPage.loginURL("login");
    LoginPage.signInTitle("Sign In");
    LoginPage.emailText(username), { log: false };
    LoginPage.passwordText(mainPassword, { log: false });
    LoginPage.loginButton();
    LoginPage.assertPartialUrl(logInURL);
  });

  afterEach(() => {
    // Runs after each test
    cy.wait(6000);
    cy.clearCookies();
    cy.wait(6000);
  });
});
});