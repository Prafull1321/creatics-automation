describe("template spec", function () {
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

  it("Verify if user is able to edit My Information", () => {
    const expectedValues = {
      "first-name": "Saurabh",
      "last-name": "Gaikwad",
      "communication-email": "saurabh@gmail.com",
    };

    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY ACCOUNT").click();
    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-4").click();
    cy.wait(2000);
    cy.get("button.ng-star-inserted").click();
    cy.wait(2000);

    let allTextboxesMatch = true;

    // Function to check and update textboxes
    const checkAndUpdateTextboxes = () => {
      Object.keys(expectedValues).forEach((textboxId) => {
        cy.get(`#${textboxId}`).then(($textbox) => {
          const actualValue = $textbox.val();
          if (actualValue !== expectedValues[textboxId]) {
            allTextboxesMatch = false;
            // Update the textbox with the correct value if it doesn't match
            cy.get(`#${textboxId}`).clear().type(expectedValues[textboxId]);
          }
        });
      });
    };

    // Check and update textboxes
    checkAndUpdateTextboxes();

    // Click Save or Cancel based on whether changes were made
    cy.then(() => {
      if (allTextboxesMatch) {
        // If all textboxes match expected values, click Cancel button
        cy.get('[type="button"]').contains("Cancel").click();
      } else {
        // If there were changes, save them
        cy.get('[type="button"]').contains("Save").click();
      }
    });

    cy.wait(2000); // Wait for the action to complete

    // Continue with the remaining flow
    cy.get(".ng-valid > :nth-child(1) > span").should(
      "have.text",
      expectedValues["first-name"]
    );
    cy.get(":nth-child(2) > span").should(
      "have.text",
      expectedValues["last-name"]
    );
    cy.get(":nth-child(4) > span").should(
      "have.text",
      expectedValues["communication-email"]
    );

    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY PROFILE").click();
    cy.get(".username").should("have.text", expectedValues["first-name"]);

    const fullName = `${expectedValues["first-name"]} ${expectedValues["last-name"]}`;

    cy.get(".welcome-text").should("include.text", fullName);
  });

  it("Verify if user is able to edit My Word", () => {
    const expectedValue = "This is just a test 101";

    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY ACCOUNT").click();
    cy.get("#mat-expansion-panel-header-1").click();
    cy.wait(4000);
    cy.get("#mat-expansion-panel-header-5").click();
    cy.wait(2000);
    cy.get('input[type="text"]').then(($textbox) => {
      const actualValue = $textbox.val();

      if (actualValue !== expectedValue) {
        // Update the textbox with the correct value if it doesn't match
        cy.get('input[type="text"]').clear().type(expectedValue);
      }
    });

    cy.get('[type="submit"]').contains("Update My Words").click();

    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY PROFILE").click();
    cy.get(".welcome-sub-text").should("include.text", expectedValue);
  });

  it("Verify if user is able edit/add Im Fan and also check its assertion", () => {
    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY ACCOUNT").click();
    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-6").click();
    cy.wait(2000);
    cy.get(".checkbox-container").click();
    cy.wait(2000);

    // Check that three checkboxes are checked initially
    cy.get('input[type="checkbox"]')
      .filter(":checked")
      .should("have.length", 3);

    // Uncheck all checkboxes
    cy.get('input[type="checkbox"]').uncheck({ force: true });

    // Handle alert messages
    // cy.on("window:alert", (message) => {
    //   const normalizedMessage = message.replace(/\u00a0/g, " ").trim();
    //   expect([
    //     "Please select only 3 options",
    //     "I’m Fan of updated successfully!",
    //   ]).to.contains(normalizedMessage);
    // });

    // Function to check a checkbox and click update button
    const checkAndSubmit = (selector) => {
      cy.get(selector).check({ force: true });
      cy.get(".update-button").click();
      cy.wait(2000);
    };

    // Check checkboxes and click update button
    const checkboxes = [
      'input[type="checkbox"][name="Film"]',
      'input[type="checkbox"][name="Fashion"]',
      'input[type="checkbox"][name="Dance"]',
      'input[type="checkbox"][name="Music"]',
    ];

    checkboxes.forEach((selector) => {
      checkAndSubmit(selector);
    });

    // Go back to the user profile
    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY PROFILE").click();

    const expectedTexts = ["Dance", "Film", "Fashion"];

    expectedTexts.forEach((expectedTextFan) => {
      cy.contains("div.award-header", "I'm a fan of:")
        .next() // moves to the next sibling (the container with the buttons)
        .contains("div.comming-soon-btn", expectedTextFan)
        .invoke("text")
        .then((text) => {
          expect(text.replace(/\u00a0/g, " ").trim()).to.equal(expectedTextFan);
        });
    });
  });

  it("Verify if user is able edit/add Im Creator and also check its assertion", () => {
    cy.get(".dropdown").first().click();
    cy.get(".profileCard").contains("MY ACCOUNT").click();
    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-7").click();
    cy.wait(2000);
    cy.get(".checkbox-group").click();
    cy.wait(2000);

    cy.get('input[type="checkbox"]').uncheck({ force: true });

    // cy.on("window:alert", (message) => {
    //   const normalizedMessage = message.replace(/\u00a0/g, " ").trim();
    //   expect([
    //     "Please select only 3 options",
    //     "I’m Creator of updated successfully!",
    //   ]).to.contains(normalizedMessage);
    // });

    const checkAndSubmitCreator = (selector) => {
      cy.get(selector).check({ force: true });
      cy.get(".update-button").click();
      cy.wait(2000);
    };

    const checkboxesCreator = [
      'input[type="checkbox"][name="Art & Design"]',
      'input[type="checkbox"][name="Television"]',
      'input[type="checkbox"][name="Music"]',
      'input[type="checkbox"][name="Virtual Reality"]',
    ];

    checkboxesCreator.forEach((selector) => {
      checkAndSubmitCreator(selector);
    });

    cy.reload();
    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-7").click();
    cy.wait(2000);
    cy.get(".checkbox-group").click();
    cy.wait(2000);

    cy.get('input[type="checkbox"]')
      .filter(":checked")
      .should("have.length", 3);
    cy.get(
      ".dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn"
    ).click();
    cy.get(".profileCard > :nth-child(1) > a").click();

    const expectedTextsCreators = ["Art & Design", "Television", "Music"];
    // expectedTextsCreators.forEach((expectedTextCreator) => {
    //   cy.contains("div.comming-soon-btn", expectedTextCreator)
    //     // .should("be.visible")
    //     .invoke("text")
    //     .then((text) => {
    //       expect(text.replace(/\u00a0/g, " ").trim()).to.equal(
    //         expectedTextCreator
    //       );
    //     });
    // });
    expectedTextsCreators.forEach((expectedTextCreator) => {
      cy.contains("div.award-header", "I'm a creator of:")
        .next() // moves to the next sibling (the container with the buttons)
        .contains("div.comming-soon-btn", expectedTextCreator)
        .invoke("text")
        .then((text) => {
          expect(text.replace(/\u00a0/g, " ").trim()).to.equal(
            expectedTextCreator
          );
        });
    });
  });

  it.only("Verify if user isable to edit/change Profile Picture", () => {
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

  it("Verify if user is able to add Profile Picture", () => {
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

  it("Verify if user is able to edit Background from default 4 Images", () => {
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

  it("Verify if user is able to change Background Picture by upload method", () => {
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

  it("Verify if user is able to Change Password", () => {
    cy.get(".dropdown").first().click();
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
