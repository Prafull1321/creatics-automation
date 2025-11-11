describe("template spec", function () {
  beforeEach(() => {
    cy.visit("https://creatics.org/", {
      failOnStatusCode: false,
    });
    cy.url().should("eq", "https://creatics.org/");

    cy.get(".cus-spacing").contains("SIGN IN").click();
    // cy.get(".cus-spacing > .ng-star-inserted > div > a").click();
    cy.get("#email").type("saurabh.gaikwad@scalevista.com", { log: false }); // to hide the creds
    cy.get("#password").type("Saurabh@01", { log: false }); // to hide the creds
    cy.get(".btn").click();

    cy.on("window:alert", (message) => {
      const normalizedMessage = message.replace(/\u00a0/g, " ").trim();
      expect([
        "Please select only 3 options",
        "I’m Creator of updated successfully!",
        "I’m Fan of updated successfully!",
        "Please select an image to upload",
        "Profile Picture removed successfully!",
        "Profile picture updated successfully!",
        "Profile Picture removed successfully!",
        "Background Picture updated successfully!",
      ]).to.contains(normalizedMessage);
    });
  });

  it("Edit Background from default 4 Images", () => {
    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY ACCOUNT").click();
    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-9").click();

    cy.get('.imageItem img[alt="Image 2"]').click();
    cy.get(".change-button").click();
    cy.wait(8000);
    cy.reload();

    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-9").click();
    cy.wait(2000);
    cy.get(".currentBackground [alt='Current Background']")
      .should("be.visible")
      .then(($img) => {
        const currentDefaultBackground = $img.attr("src");
        cy.wrap(currentDefaultBackground).as("currentDefaultBackground");
      });

    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY PROFILE").click();
    cy.wait(2000);
    // Get the background-image URL from the div
    cy.get(".banner")
      .should("be.visible")
      .then(($div) => {
        const profileBackground = $div.css("background-image");
        const profileBackgroundUrl = profileBackground
          .replace(/^url\(["']?/, "")
          .replace(/["']?\)$/, "");
        cy.wrap(profileBackgroundUrl).as("profileBackgroundUrl");
      });

    // Compare the img src attribute with the background image URL
    cy.get("@currentDefaultBackground").then((currentDefaultBackground) => {
      cy.get("@profileBackgroundUrl").then((profileBackgroundUrl) => {
        expect(currentDefaultBackground).to.equal(profileBackgroundUrl);
      });
    });
  });

  it("Check Background for Newly upload Image", () => {
    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY ACCOUNT").click();
    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-9").click();

    cy.get('input[type="file"]')
      //   .next()
      .selectFile("cypress/fixtures/images/darkblue.jpg", {
        force: true,
      });
    cy.get(".move").click();
    //   .trigger("mousedown", 300, 79, { force: true })
    // .trigger("mouseup", { force: true });
    cy.get(".cropButton").click();
    cy.get(".change-button").click();
    cy.wait(8000);
    cy.reload();

    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-9").click();
    cy.wait(2000);
    cy.get(".currentBackground [alt='Current Background']")
      .should("be.visible")
      .then(($img) => {
        const currentNewUploadBackground = $img.attr("src");
        cy.wrap(currentNewUploadBackground).as("currentNewUploadBackground");
      });

    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY PROFILE").click();
    cy.wait(2000);
    // Get the background-image URL from the div
    cy.get(".banner")
      .should("be.visible")
      .then(($div) => {
        const profileBackground = $div.css("background-image");
        const profileBackgroundUrl = profileBackground
          .replace(/^url\(["']?/, "")
          .replace(/["']?\)$/, "");
        cy.wrap(profileBackgroundUrl).as("profileBackgroundUrl");
      });

    // Compare the img src attribute with the background image URL
    cy.get("@currentNewUploadBackground").then((currentNewUploadBackground) => {
      cy.get("@profileBackgroundUrl").then((profileBackgroundUrl) => {
        expect(currentNewUploadBackground).to.equal(profileBackgroundUrl);
      });
    });
  });
});
