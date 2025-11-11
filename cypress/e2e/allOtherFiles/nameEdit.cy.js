describe("template spec", function () {
  const username = "saurabh.gaikwad@scalevista.com";
  const mainPassword = "Saurabh@02";
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

  it("My Account Name Edit", () => {
    const expectedValues = {
      "first-name": "Saurabh",
      "last-name": "G",
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

  it("Verify My Word section", () => {
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

  //   it("My Account Name Edit", () => {
  //     const expectedValues = {
  //       "first-name": "Saurabh",
  //       "last-name": "Gaikwad",
  //       "communication-email": "saurabh@gmail.com",
  //     };

  //     cy.get(".dropdown").first().click();
  //     cy.get(".profileCard").contains("MY ACCOUNT").click();
  //     cy.get("#mat-expansion-panel-header-1").click();
  //     cy.get("#mat-expansion-panel-header-4").click();
  //     cy.wait(2000);
  //     cy.get("button.ng-star-inserted").click();
  //     cy.wait(2000);

  //     Object.keys(expectedValues).forEach((textboxId) => {
  //       cy.get(`#${textboxId}`).then(($textbox) => {
  //         const actualValue = $textbox.val();

  //         if (actualValue !== expectedValues[textboxId]) {
  //           // Update the textbox with the correct value if it doesn't match
  //           cy.get(`#${textboxId}`).clear().type(expectedValues[textboxId]);
  //         }
  //       });
  //     });

  //     cy.get("#first-name").should("have.value", expectedValues["first-name"]);
  //     cy.get("#last-name").should("have.value", expectedValues["last-name"]);
  //     cy.get("#communication-email").should(
  //       "have.value",
  //       expectedValues["communication-email"]
  //     );

  //     cy.get('[type="button"]').contains("Save").click();
  //     cy.wait(2000);
  //     cy.get(".ng-valid > :nth-child(1) > span").should(
  //       "have.text",
  //       expectedValues["first-name"]
  //     );
  //     cy.get(":nth-child(2) > span").should(
  //       "have.text",
  //       expectedValues["last-name"]
  //     );
  //     cy.get(":nth-child(4) > span").should(
  //       "have.text",
  //       expectedValues["communication-email"]
  //     );

  //     cy.get(".dropdown").first().click();
  //     cy.get(".profileCard").contains("MY PROFILE").click();
  //     cy.get(".username").should("have.text", expectedValues["first-name"]);

  //     const fullName = `${expectedValues["first-name"]} ${expectedValues["last-name"]}`;

  //     cy.get(".welcome-text").should("include.text", fullName);

  //     // cy.get("#first-name").should("have.value", "Saurabh1");
  //   });
});
