describe("template spec", function () {
  const username = "saurabh.gaikwad@scalevista.com";
  const mainPassword = "Saurabh@01";
  const newPassword = "Saurabh@01";

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
  it("check upload popup", () => {
    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY PROFILE").click();
    cy.get(".card").eq(0).click();
    cy.get(".mat-dialog-container").should("be.visible");
    cy.wait(2000);
    cy.get(".check-group input[type='radio']").check("Dance", {
      multiple: true,
    });
    // cy.get('input[type="radio"]').check("Dance", { multiple: true });
    cy.wait(2000);
    cy.get("#title").type("Checking");
    cy.wait(2000);
    // cy.get(".icons").click();
    cy.get("#fileupload").selectFile("cypress/fixtures/images/plant.jpg", {
      force: true,
    });
    cy.wait(2000);
    cy.get(".move").click();
    cy.wait(2000);
    cy.get('[type="submit"]').contains("CROP").click();
    cy.wait(2000);
    cy.get('[formcontrolname="description"]').type("This is only a test");
    cy.wait(2000);
    cy.get("#link").type("www.google.com");
    cy.wait(5000);
    cy.get('[type="cancel"]').click();
    // cy.get('[type="button"]').contains("Close").click();
  });
});
