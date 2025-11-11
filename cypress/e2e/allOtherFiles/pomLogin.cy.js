import LoginPage from "../pageObjectModule/login";
import ProfilePage from "../pageObjectModule/profile";

describe("Email OTP verification", () => {
  it.only("Verify if user is able to skip all pages of onboarding", () => {
    const BASE_URL = "https://creatics.org/";
    const EMAIL = "xulity@teleg.eu";
    const PASSWORD = "Qwerty@123";
    const BANNER_BACKGROUND_IMAGE = "myprofilebackground_official_01.jpg";
    const USER_ICON_SRC = "../../../assets/images/user-icon-1.png";

    cy.visit(BASE_URL, { failOnStatusCode: false });
    cy.url().should("eq", BASE_URL);

    LoginPage.signInOption();
    LoginPage.emailText().type(EMAIL);
    LoginPage.passwordText().type(PASSWORD);
    LoginPage.loginButton();
    cy.wait(10000);

    LoginPage.menuDropdown();
    LoginPage.profileOption();

    ProfilePage.banner
      .should("have.css", "background-image")
      .and("include", BANNER_BACKGROUND_IMAGE);

    ProfilePage.creatorEmptyButton.should("have.text", " Coming Soon ");
    ProfilePage.fanEmptyButton.should("have.text", " Coming Soon ");

    ProfilePage.userIcon.should("have.attr", "src", USER_ICON_SRC);

    ProfilePage.tresures
      .children()
      .should("have.length", 1)
      .and("have.class", "card");

    ProfilePage.uploadIamButton.should("have.text", "Upload IAM video ");
  });
});
