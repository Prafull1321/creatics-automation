import LoginPage from "../../pageObjectModule/loginPage";

describe("Sign-In Page Test Cases", function () {
  const username = "3gmu5omr92@mrotzis.com";
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
    LoginPage.visit(BASE_URL);
    cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
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

  it("Verify that a user cannot log in with an invalid username.", () => {
    LoginPage.signInOption();
    LoginPage.loginURL("login");
    LoginPage.signInTitle("Sign In");
    LoginPage.emailText("qwerty@123.com");
    LoginPage.passwordText(mainPassword);
    LoginPage.loginButton();
    LoginPage.loginError().should("be.visible");
  });

  it("Verify that a user cannot log in with an invalid password.", () => {
    LoginPage.signInOption();
    LoginPage.loginURL("login");
    LoginPage.signInTitle("Sign In");
    LoginPage.emailText(username);
    LoginPage.passwordText("Qwerty@123");
    LoginPage.loginButton();
    LoginPage.loginError().should("be.visible");
  });
  it("Verify that a user cannot log in with both invalid username and password.", () => {
    LoginPage.signInOption();
    LoginPage.loginURL("login");
    LoginPage.signInTitle("Sign In");
    LoginPage.emailText("qwerty@123.com");
    LoginPage.passwordText("Qwerty@123");
    LoginPage.loginButton();
    LoginPage.loginError().should("be.visible");
  });
  it("Verify the login functionality with an empty username.", () => {
    LoginPage.signInOption();
    LoginPage.loginURL("login");
    LoginPage.signInTitle("Sign In");
    // LoginPage.emailText(username);
    LoginPage.passwordText(mainPassword);
    LoginPage.loginButton();
    LoginPage.emptyEmailText().should("be.visible");
    // LoginPage.emptyPasswordText();
  });
  it("Verify the login functionality with an empty password.", () => {
    LoginPage.signInOption();
    LoginPage.loginURL("login");
    LoginPage.signInTitle("Sign In");
    LoginPage.emailText(username);
    // LoginPage.passwordText("Qwerty@123");
    LoginPage.loginButton();
    // LoginPage.emptyEmailText();
    LoginPage.emptyPasswordText().should("be.visible");
  });
  it("Verify the login functionality with both username and password fields empty.", () => {
    LoginPage.signInOption();
    LoginPage.loginURL("login");
    LoginPage.signInTitle("Sign In");
    // LoginPage.emailText('qwerty@123.com');
    // LoginPage.passwordText("Qwerty@123");
    LoginPage.loginButton();
    LoginPage.emptyEmailText().should("be.visible");
    LoginPage.emptyPasswordText().should("be.visible");
  });

  afterEach(() => {
    // Runs after each test
    cy.wait(6000);
    cy.clearCookies();
    // cy.get(".dropdown").first().click();
    // cy.get(".profileCard").contains("LOGOUT").click();
    cy.wait(6000);
  });
});
