describe.skip("template spec", function () {
  const username = "1cg0deu51s@cmhvzylmfc.com";
  const mainPassword = "Test@123";
  const newPassword = "Test@124";

  beforeEach(() => {
    cy.visit("https://creatics.org/", {
      failOnStatusCode: false,
    });
    cy.url().should("eq", "https://creatics.org/");

    cy.get(".cus-spacing").contains("SIGN IN").click();
    cy.get("#email").type(username, { log: false }); // to hide the creds
    cy.get("#password").type(mainPassword, { log: false }); // to hide the creds
    cy.get(".btn").click();

    cy.on("window:alert", (message) => {
      const normalizedMessage = message
        // .replace(/[\u00a0\n\*\*]+/g, " ")
        .replace(/\u00a0/g, " ")
        .replace(/\n/g, " ")
        .trim();
      expect([
        "My Information updated successfully!",
        "My Words updated successfully!",
        "Please select only 3 options",
        "I’m Creator of updated successfully!",
        "I’m Fan of updated successfully!",
        "Please select an image to upload",
        "Profile Picture removed successfully!",
        "Profile picture updated successfully!",
        "Profile Picture removed successfully!",
        "Background Picture updated successfully!",
        "Passwords do not match!",
        "Password updated successfully! Login with your new password",
      ]).to.contains(normalizedMessage);
    });
  });

  it("Change Password", () => {
    cy.get("#mat-expansion-panel-header-1").contains(" MY PROFILE ").click();
    cy.get(".profileCard").contains("MY ACCOUNT").click();
    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-11").click();

    //Different text in both field
    cy.get("#newPassword").type(newPassword);
    cy.get("#confirmPassword").type("Saurabh@00", { log: false });
    cy.get("app-my-account.ng-star-inserted > .main-div").click();
    cy.get(".error-msg").should("have.text", "Passwords do not match");
    cy.get(".ng-tns-c106-25 > button").click({ force: true });

    //Same text in both field
    cy.get("#newPassword").clear().type(newPassword);
    cy.get("#confirmPassword").clear().type(newPassword);
    cy.get(".ng-tns-c106-25 > button").click({ force: true });
    cy.wait(10000);
    // cy.reload();   //use this is page dosen't load
    cy.url().should("eq", "https://creatics.org/login?referer=my-account");

    // Login with old password
    cy.get("#email").type(username, { log: false });
    cy.get("#password").type(mainPassword, { log: false });
    cy.get(".btn").click();
    cy.get(".err-msg").should(
      "have.text",
      "Please enter valid Email Address and Password."
    );
    cy.url().should("eq", "https://creatics.org/login?referer=my-account"); // Should remain on same page

    // Login with new password
    cy.get("#email").clear().type(username, { log: false });
    cy.get("#password").clear().type(newPassword, { log: false });
    cy.get(".btn").click();
    cy.wait(5000);
    cy.url().should("eq", "https://creatics.org/my-account"); // Should be able to login
  });
});
