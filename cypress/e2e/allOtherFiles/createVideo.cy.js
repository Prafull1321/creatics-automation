describe.skip("template spec", function () {
  const username = "saurabh.gaikwad@scalevista.com";
  const mainPassword = "Saurabh@01";
  const newPassword = "Saurabh@02";

  beforeEach(() => {
    cy.visit("https://testing.creatics.org/", {
      failOnStatusCode: false,
    });
    cy.url().should("eq", "https://testing.creatics.org/");

    cy.get(".cus-spacing").contains("SIGN IN").click();
    cy.get("#email").type(username, { log: false }); // to hide the creds
    cy.get("#password").type(mainPassword, { log: false }); // to hide the creds
    cy.get(".btn").click();
    cy.wait(2000);

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
        "I am Video removed successfully!",
        // "(confirm) Video is getting uploaded. Please wait for few seconds!",
      ]).to.contains(normalizedMessage);
    });

    cy.on("window:confirm", (message1) => {
      const normalizedMessage1 = message1
        // .replace(/[\u00a0\n\*\*]+/g, " ")
        .replace(/\u00a0/g, " ")
        .replace(/\n/g, " ")
        .trim();
      expect([
        "Video is getting uploaded. Please wait for few seconds!",
        // "(confirm) Video is getting uploaded. Please wait for few seconds!",
      ]).to.contains(normalizedMessage1);
    });
  });

  it("Verify if user is able to create video", () => {
    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY PROFILE").click();

    cy.get(".videoEdit").click();
    // cy.get('.btn-iam').click()
    cy.get(".submitbtn").contains("Create").click();
    cy.wait(5000);
    cy.get('input.form-control[type="file"]')
      .eq(0)
      .selectFile("cypress/fixtures/videos/football.mp4", {
        force: true,
      });
    cy.wait(5000);
    cy.get('[data-bs-toggle="modal"]').click({ force: true });
    cy.wait(5000);
    cy.get(".modal-body").should("be.visible");
    cy.wait(120000);
    cy.get(".input1").type("0");
    cy.get(".input2").type("1");
    cy.get("#submit-video").click();
  });
});
