describe("template spec", function () {
  beforeEach(() => {
    cy.visit("https://creatics.org/", {
      failOnStatusCode: false,
    });
    cy.url().should("eq", "https://creatics.org/");

    cy.get(".cus-spacing").contains("SIGN IN").click();
    // cy.get(".cus-spacing > .ng-star-inserted > div > a").click();
    cy.get("#email").type("saurabh.gaikwad@scalevista.com");
    cy.get("#password").type("Saurabh@01");
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
      ]).to.contains(normalizedMessage);
    });
  });

  it("Edit Profile Picture", () => {
    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY ACCOUNT").click();
    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-8").click();
    cy.get(".button-container > .change-button").click();
    // cy.get("input[_ngcontent-cmj-c343][type='file']")

    cy.get('input[type="file"]')
      .first()
      .selectFile("cypress/fixtures/images/dog.jpg", {
        force: true,
      });
    cy.get(".move").click();
    cy.get("image-cropper.ng-star-inserted").first().should("be.visible");
    // .trigger("mousedown", 300, 79, { force: true })
    // .trigger("mouseup", { force: true });
    cy.get(".cropButton").click();
    cy.get(".button-container > .change-button").click();
    cy.wait(8000);
    cy.reload();

    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-8").click();
    cy.wait(2000);
    cy.get(".profile-picture")
      .should("be.visible")
      .then(($img) => {
        // Extract the src attribute of the uploaded image
        const uploadedImageSrc = $img.attr("src");
        cy.wrap(uploadedImageSrc).as("uploadedImageSrc");
      });

    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY PROFILE").click();

    // Verify the image on the profile page
    cy.get("@uploadedImageSrc").then((uploadedImageSrc) => {
      cy.get(".img-circle")
        .should("be.visible")
        .and("have.attr", "src", uploadedImageSrc);
    });
  });

  it("Add Profile Picture", () => {
    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY ACCOUNT").click();

    // cy.get(".profileCard > :nth-child(3) > a").click();
    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-8").click();

    //Add this if remove CTA is present or Picture is already uploaded.
    cy.get(".remove-button").click();
    cy.wait(2000);
    cy.reload();
    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-8").click();
    // //-----------------------------------------------------------------
    cy.get('input[type="file"]')
      .first()
      .selectFile("cypress/fixtures/images/dog.jpg", {
        force: true,
      });

    cy.get(".move").click();

    cy.get(".cropButton").click();
    cy.get(".update-button").click();
    cy.wait(8000);
    cy.reload();

    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-8").click();
    cy.wait(2000);
    cy.get(".profile-picture")
      .should("be.visible")
      .then(($img) => {
        // Extract the src attribute of the uploaded image
        const uploadedImageSrc = $img.attr("src");
        cy.wrap(uploadedImageSrc).as("uploadedImageSrc");
      });

    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY PROFILE").click();

    // Verify the image on the profile page
    cy.get("@uploadedImageSrc").then((uploadedImageSrc) => {
      cy.get(".img-circle")
        .should("be.visible")
        .and("have.attr", "src", uploadedImageSrc);
    });
  });
});
