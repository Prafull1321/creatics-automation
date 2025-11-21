describe.skip("template spec", function () {
  const username = "saurabh.gaikwad@scalevista.com";
  const mainPassword = "Saurabh@01";
  const newPassword = "Saurabh@02";

  beforeEach(() => {
    cy.visit("https://creatics.org/", {
      failOnStatusCode: false,
    });
    cy.url().should("eq", "https://creatics.org/");

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

  it("Verify if video does not get delete after user clicks no in My video popup", () => {
    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY ACCOUNT").click();
    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-10").click();

    cy.get(".remove-button").click();
    cy.get("mat-dialog-container").should("be.visible");
    cy.get(".btn").contains("No").click();
    cy.get("video").should("be.visible");
  });

  it.only("Verify if user is able to upload new video using Upload button", () => {
    const football = "cypress/fixtures/videos/football.mp4";
    const cat = "cypress/fixtures/videos/cat.mp4";
    const presentVideo1 = "football.mp4";
    const presentVideo2 = "cat.mp4";
    // Visit the page where the video upload section is located
    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY ACCOUNT").click();
    cy.wait(2000);
    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-10").click();
    cy.wait(4000);

    cy.get("body").then(($body) => {
      if ($body.find("video").length > 0) {
        // Video is present, click the remove button
        cy.get(".remove-button").click();
        cy.get("mat-dialog-container").should("be.visible");
        cy.get(".btn").contains("Yes").click();
        cy.wait(4000);

        cy.get(".main-text").should(
          "have.text",
          "Please click on the button to upload your I am Video."
        );
        cy.get(".update-button").click();
        cy.get(".container-info > .submitbtn").click();
        cy.get("input[type=file]").selectFile(football, {
          force: true,
        });
        cy.wait(50000);
      } else {
        // Video is not present, click the upload button
        cy.get(".main-text").should(
          "have.text",
          "Please click on the button to upload your I am Video."
        );
        cy.get(".update-button").click();
        cy.get(".container-info > .submitbtn").click();
        cy.get("input[type=file]").selectFile(cat, {
          force: true,
        });
        cy.wait(30000);
      }
    });

    cy.get("#video1").should("be.visible");
    cy.get("#video1 source")
      .should("have.attr", "src")
      .and("include", "football.mp4");
  });

  it("Verify if user is able to change exsisting video in My Video ", () => {
    //const videoFilePath = "cypress/fixtures/videos/football.mp4"; // Path to your video file
    const expectedSrcPattern = "football.mp4"; // Part of the URL that remains consistent

    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY ACCOUNT").click();
    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-10").click();
    cy.get("[type='submit']").contains(" Change I Am Video ").click();
    cy.get(".container-info > .submitbtn").click();
    cy.get("input[type=file]").selectFile(
      "cypress/fixtures/videos/football.mp4",
      {
        force: true,
      }
    );

    cy.wait(30000);

    cy.get("#video1").should("be.visible");

    cy.get("#video1 source")
      .should("have.attr", "src")
      .and("include", expectedSrcPattern);

    cy.get("#video1").then(($video) => {
      $video[0].play();
    });

    cy.get("#video1").should(($video) => {
      const isPaused = $video[0].paused;
      expect(isPaused, "Video should be playing").to.be.false; // Ensure the video is not paused
      //expect($video[0].currentTime).to.be.greaterThan(0); //to check time stamp
    });
  });
});
