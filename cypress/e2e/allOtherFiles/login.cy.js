describe.skip("Email OTP verification", () => {
  it("should sign up and verify OTP from email", () => {
    // Create a new inbox
    cy.createInbox().then((inbox) => {
      const emailAddress = inbox.emailAddress;
      const inboxId = inbox.id;

      cy.visit("https://mobile.creatics.org/");
      cy.get(".cus-spacing").contains("SIGN IN").click();
      cy.get(".login").click();

      cy.get("#firstname").type("John");
      cy.get("#lastname").type("Doe");
      cy.get("#email").type(emailAddress);
      cy.get("#password").type("password123");
      cy.get(".btn").click();

      // Get the OTP from the email
      cy.getOTPFromInbox(inboxId).then((otp) => {
        // Use the OTP in your application
        cy.get("#exampleInputEmail1").type(otp);
        cy.get(".btn").click();

        cy.wait(8000);
      });
    });
    cy.url().should("include", "https://mobile.creatics.org/userProfiles"); // Check if the URL contains '/part-of-url'

    cy.get(".heading1").should(
      "have.text",
      "Welcome to Creatics - Let's Get Started!"
    );

    // setup page1 started
    cy.get(".skipbtn");
    cy.get(".imgUpload").click();
    cy.get("input[type=file]").selectFile("cypress/fixtures/images/dog.jpg", {
      force: true,
    });
    cy.get("image-cropper.ng-star-inserted")
      .find("img")
      .should("be.visible")
      .trigger("mousedown", 300, 79, { force: true })
      .trigger("mouseup", { force: true });
    cy.get(".cropButton").click();
    cy.get(".inputbox1").type("Foodie, Traveller");

    cy.log("setup page 1 done");

    // setup page2 started
    cy.get(".skipbtn");
    cy.wait(8000);
    cy.get(".container > .heading2");
    cy.get(":nth-child(5) > .slider").click();
    cy.get(":nth-child(6) > .slider").click();
    cy.get(":nth-child(7) > .slider").click();
    cy.get(".bodyClass > :nth-child(4)");
    cy.get(":nth-child(8) > .slider1").click();
    cy.get(":nth-child(9) > .slider1").click();
    cy.get(":nth-child(10) > .slider1").click();
    cy.get(".submitbtn").click();
    cy.log("setup page 2 done");

    //     // setup page3 started
    cy.get(".skipbtn");
    cy.get(".textClass");
    cy.get(".imgUpload").click();
    cy.get("input[type=file]").selectFile("cypress/fixtures/images/dog.jpg", {
      force: true,
    });
    cy.get("image-cropper.ng-star-inserted")
      .find("img")
      .should("be.visible")
      .trigger("mousedown", 300, 79, { force: true })
      .trigger("mouseup", { force: true });
    cy.get(".cropButton").click();
    cy.get(":nth-child(1) > .col-md-10 > #title").type("Fiction");
    cy.get("#category").select("dance");
    cy.get("#description").type(
      "I Love to dance with my heart out! It is my favourite activity to do"
    );
    cy.get(":nth-child(4) > .col-md-10 > #title").type(
      "https://mobile.creatics.org/login"
    );
    cy.get(".submitbtn").click();
    cy.log("setup page 3 done");

    // setup page4 started
    cy.get(".skipbtn");
    //     // upload button code for video
    cy.get(".container-info > .submitbtn").click();
    cy.get("input[type=file]").selectFile("cypress/fixtures/videos/cat.mp4", {
      force: true,
    });
    cy.log("setup page 4 done");
    cy.wait(18000);

    //profile page started
    cy.get(".banner");
    cy.log("Banner image available");
    cy.get(".img-circle");
    cy.log("Profile image available");
    cy.get("#video1");
    cy.log("Video available");
    cy.get(".treasuryTitle-name");
    cy.log("Treasury name available");
    cy.get(".sub-name");
    cy.log("Sub treasury name available");
    cy.get(".option-icons > :nth-child(1) > img");
    cy.get(".option-icons > .ng-star-inserted > img");
    cy.get(":nth-child(3) > img");
    cy.log("Edit, View, Delete icons available");
    cy.get(".option-icons > :nth-child(1) > img").click();

    // Add assertions to verify the OTP verification
    // cy.contains("OTP verified successfully").should("be.visible");
  });

  it.only("Verify if user is able to skip all pages of onboarding", () => {
    // Initialize MailSlurp and create a new inbox
    cy.initializeMailSlurp().then((inbox) => {
      const emailAddress = inbox.emailAddress;
      const inboxId = inbox.id;

      // Visit the sign-up page and complete the form
      cy.visit("https://mobile.creatics.org/");
      cy.get(".cus-spacing").contains("SIGN IN").click();
      cy.get(".login").click();
      cy.get("#firstname").type("John");
      cy.get("#lastname").type("Doe");
      cy.get("#email").type(emailAddress);
      cy.get("#password").type("password123");
      cy.get(".btn").click();

      // Get the OTP from the email and use it in the application
      cy.getOTPFromInbox(inboxId).then((otp) => {
        cy.get("#exampleInputEmail1").type(otp);
        cy.get(".btn").click();

        // Wait for the onboarding pages to load
        cy.wait(8000);

        // Assert the user is redirected to the correct page after skipping onboarding
        cy.url().should("include", "https://mobile.creatics.org/userProfiles");
      });
    });
    // cy.url().should(
    //   "eq",
    //   "https://mobile.creatics.org/userProfiles/3746/setup/1"
    // );

    // cy.get(".cus-spacing").contains("SIGN IN").click();
    // cy.get("#email").type("xulity@teleg.eu"); // to hide the creds
    // cy.get("#password").type("Qwerty@123"); // to hide the creds
    // cy.get(".btn").click();
    // cy.wait(10000);

    const uploadProfileImage = "cypress/fixtures/images/dog.jpg";
    const myWordText = "Foodie, Traveller";

    cy.get("input[type=file]").selectFile(uploadProfileImage, {
      force: true,
    });

    cy.get(".move").click();
    // cy.get("image-cropper.ng-star-inserted")
    //       .find("img")
    //       .should("be.visible")
    //       .trigger("mousedown", 300, 79, { force: true })
    //       .trigger("mouseup", { force: true });
    cy.get(".cropButton").click();
    cy.get(".inputbox1").type(myWordText);
    cy.get(".skipbtn").click();

    cy.wait(5000);
    cy.get(".custom-dialog-container");
    cy.get(".custom-button").click();
    cy.get(".slider")
      .filter((index, element) => {
        // Get the text content of the element
        const imFanText = Cypress.$(element).text();
        // List of names to select
        const selectImFan = ["Books & Storytelling", "Fashion", "Television"];
        // Return true if the element's text is one of the names to select
        return selectImFan.includes(imFanText);
      })
      .then((filteredElements) => {
        // Perform actions on the filtered elements
        cy.wrap(filteredElements).each((el) => {
          // Example action: Click on each element
          cy.wrap(el).click();
        });
      });

    cy.get(".slider1")
      .filter((index, element) => {
        // Get the text content of the element
        const imCreatorText = Cypress.$(element).text();
        // List of names to select
        const selectImCreator = ["Music", "Film", "Dance"];
        // Return true if the element's text is one of the names to select
        return selectImCreator.includes(imCreatorText);
      })
      .then((filteredElements) => {
        // Perform actions on the filtered elements
        cy.wrap(filteredElements).each((el) => {
          // Example action: Click on each element
          cy.wrap(el).click();
        });
      });

    cy.get(".skipbtn").click();

    const treasuryImage = "cypress/fixtures/images/dog.jpg";
    const treasuryTitle = "Vlogs are Important";
    const treasuryCategory = "Radio";
    const treasuryDescription = "This is just a checking account";
    const treasuryLink = "www.google.com";

    cy.get(".form-control").selectFile(treasuryImage, {
      force: true,
    });
    cy.get(".move").click();
    cy.get(".cropButton").click();
    cy.get("#title").type(treasuryTitle);
    cy.get("#category").select(treasuryCategory);
    cy.get("#description").type(treasuryDescription);
    cy.get('[name="link"]').type(treasuryLink);
    // cy.get('.submitbtn').click()
    // cy.get(".skipbtn").click();
    cy.wait(5000);

    // cy.get(".skipbtn").click();
  });

  // it.only("Verify if user is able to skip all pages of onboarding", () => {
  //   const BASE_URL = "https://creatics.org/";
  //   const EMAIL = "xulity@teleg.eu";
  //   const PASSWORD = "Qwerty@123";
  //   const BANNER_BACKGROUND_IMAGE = "myprofilebackground_official_01.jpg";
  //   const USER_ICON_SRC = "../../../assets/images/user-icon-1.png";

  //   cy.visit(BASE_URL, { failOnStatusCode: false });
  //   cy.url().should("eq", BASE_URL);

  //   cy.get(".cus-spacing").contains("SIGN IN").click();
  //   cy.get("#email").type(EMAIL);
  //   cy.get("#password").type(PASSWORD);
  //   cy.get(".btn").click();
  //   cy.wait(10000);

  //   cy.get(".dropdown").first().click();
  //   cy.get(".profileCard").contains("MY PROFILE").click();

  //   cy.get(".banner")
  //     .should("have.css", "background-image")
  //     .and("include", BANNER_BACKGROUND_IMAGE);

  //   cy.get(".desktop-view > :nth-child(2) > .comming-soon-btn").should(
  //     "have.text",
  //     " Coming Soon "
  //   );
  //   cy.get(".desktop-view > :nth-child(4) > .comming-soon-btn").should(
  //     "have.text",
  //     " Coming Soon "
  //   );

  //   cy.get("img.user-icon").should("have.attr", "src", USER_ICON_SRC);

  //   cy.get("#tresures")
  //     .children()
  //     .should("have.length", 1)
  //     .and("have.class", "card");

  //   cy.get(".btn-iam").should("have.text", "Upload IAM video ");
  // });
});
