describe("template spec", function () {
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

    // cy.on("window:alert", (message) => {
    //   const normalizedMessage = message
    //     // .replace(/[\u00a0\n\*\*]+/g, " ")
    //     .replace(/\u00a0/g, " ")
    //     .replace(/\n/g, " ")
    //     .trim();
    //   expect([
    //     "My Information updated successfully!",
    //     "My Words updated successfully!",
    //     "Please select only 3 options",
    //     "I’m Creator of updated successfully!",
    //     "I’m Fan of updated successfully!",
    //     "Please select an image to upload",
    //     "Profile Picture removed successfully!",
    //     "Profile picture updated successfully!",
    //     "Profile Picture removed successfully!",
    //     "Background Picture updated successfully!",
    //     "Passwords do not match!",
    //     "Password updated successfully! Login with your new password",
    //     "I am Video removed successfully!",
    //     // "(confirm) Video is getting uploaded. Please wait for few seconds!",
    //   ]).to.contains(normalizedMessage);
    // });

    cy.on("window:alert", (message) => {
      const normalizedMessage = message
        .replace(/\u00a0/g, " ")
        .replace(/\n/g, " ")
        .trim();

      // Regex to capture and assert the complete video duration message
      const videoDurationRegex =
        /Length of this video is (\d+\.\d+) sec but the expected is 9 sec\. Please trim this video with the tool below\./;

      expect(normalizedMessage).to.match(videoDurationRegex);

      // Extract and log the video duration
      const match = normalizedMessage.match(videoDurationRegex);
      const actualDuration = parseFloat(match[1]);
      cy.log(`Actual Video Duration: ${actualDuration} sec`);
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
    //Step 1 page starts
    cy.get('input.form-control[type="file"]')
      .eq(0)
      .selectFile("cypress/fixtures/videos/cat.mp4", {
        force: true,
      });
    cy.wait(5000);
    cy.get('[data-bs-toggle="modal"]').click({ force: true });
    cy.wait(5000);
    cy.get(".modal-body").should("be.visible");
    cy.wait(30000);
    cy.get(".input1").type("0");
    cy.get(".input2").type("1");
    cy.get("#submit-video").click();
    cy.wait(25000);
    cy.contains("Upload And Next").click();
    cy.wait(5000);
    //Step 2 page starts
    //first image upload
    cy.get(".vdocaption ").eq("0").click();
    cy.get('input[type="file"]')
      .eq("0")
      .selectFile("cypress/fixtures/images/plant.jpg", {
        force: true,
      });
    cy.wait(5000);
    cy.get(".imagecropbtn").click();
    cy.get(".modal-content").should("be.visible");
    cy.get("[type='text']").type("Full Image");
    cy.contains("Submit").click();
    //second image upload
    cy.wait(2000);
    cy.get(".vdocaption ").eq("0").click();
    cy.get('input[type="file"]')
      .eq("2")
      .selectFile("cypress/fixtures/images/fox.jpg", {
        force: true,
      });
    cy.wait(5000);
    cy.get(".imagecropbtn").eq("1").click();
    cy.get(".modal-content").should("be.visible");
    cy.get("[type='text']").type("Full Image");
    cy.contains("Submit").click();
    //Third image upload
    cy.wait(2000);
    cy.get(".vdocaption ").eq("0").click();
    cy.get('input[type="file"]')
      .eq("4")
      .selectFile("cypress/fixtures/images/dog.jpg", {
        force: true,
      });
    cy.wait(5000);
    cy.get(".imagecropbtn").eq("2").click();
    cy.get(".modal-content").should("be.visible");
    cy.get("[type='text']").type("Full Image");
    cy.contains("Submit").click();
    //Forth image upload
    cy.wait(2000);
    cy.get(".vdocaption ").eq("0").click();
    cy.get('input[type="file"]')
      .eq("6")
      .selectFile("cypress/fixtures/images/sky.jpg", {
        force: true,
      });
    cy.wait(5000);
    cy.get(".imagecropbtn").eq("3").click();
    cy.get(".modal-content").should("be.visible");
    cy.get("[type='text']").type("Full Image");
    cy.contains("Submit").click();
    // Fifth section Video upload
    cy.wait(2000);
    cy.get("#vdoCap").click();
    cy.get('input[type="file"]')
      .eq("8")
      .selectFile("cypress/fixtures/videos/football.mp4", {
        force: true,
      });
    cy.contains("Describe and Trim Video ").click({ force: true });
    cy.get(".modal-content").should("be.visible");
    cy.get('[name="video2Text"]').type("Video to Watch");
    cy.contains("Submit").click();
    cy.wait(5000);
    cy.get(".modal-body").should("be.visible");
    cy.wait(50000);
    cy.get(".input1").type("0");
    cy.get(".input2").type("1");
    cy.get("#submit-video").click();
    cy.wait(20000);
    cy.contains("Upload And Next").click();
    cy.wait(5000);
    // Sixth section Video upload
    cy.wait(2000);
    cy.contains("figcaption", "Upload video of passion").click();
    // cy.get("#vdoCap").click();
    cy.get('input[type="file"]')
      .eq("10")
      .selectFile("cypress/fixtures/videos/football.mp4", {
        force: true,
      });
    cy.contains("Describe and Trim Video ").click({ force: true });
    cy.get(".modal-content").should("be.visible");
    cy.get('[name="video2Text"]').type("Video to Watch");
    cy.contains("Submit").click();
    cy.wait(5000);
    cy.get(".modal-body").should("be.visible");
    cy.wait(50000);
    cy.get(".input1").type("0");
    cy.get(".input2").type("1");
    cy.get("#submit-video").click();
    cy.wait(20000);
    cy.contains("Upload And Next").click();
    cy.wait(5000);
    cy.contains("NEXT").click({ force: true });
    cy.wait(5000);
    //Step 3 page starts
    // first scetion image upload
    cy.contains("figcaption", " Upload Video ").click();
    cy.get('input[type="file"]')
      .eq("0")
      .selectFile("cypress/fixtures/videos/cat.mp4", {
        force: true,
      });
    cy.wait(2000);
    cy.contains("Trim Video").click({ force: true });
    // cy.get(".modal-content").should("be.visible");
    // cy.get('[name="video2Text"]').type("Video to Watch");
    // cy.contains("Submit").click();
    // cy.wait(5000);
    cy.get(".modal-body").should("be.visible");
    cy.wait(40000);
    cy.get(".input1").type("0");
    cy.get(".input2").type("1");
    cy.get("#submit-video").click();
    cy.wait(30000);
    cy.contains("Upload And Next").click();
    cy.wait(2000);
    // second scetion image upload
    cy.contains("figcaption", " Upload Your Image ").click();
    cy.get('input[type="file"]')
      .eq("2")
      .selectFile("cypress/fixtures/images/sky.jpg", {
        force: true,
      });
    cy.wait(5000);
    cy.contains(" Describe and Crop Image").click({ force: true });
    cy.get(".modal-content").should("be.visible");
    cy.get("[type='text']").type("Full Image");
    cy.contains("Submit").click();
    cy.wait(2000);
    cy.contains("Make My Video").click({ force: true });
  });
});
