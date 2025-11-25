import loginPage from "../../pageObjectModule/loginPage";
import myAccountPage from "../../pageObjectModule/myAccount/myAccountPage";
import ProfileMenu from "../../pageObjectModule/commonComponent/headerMenu";
import profilePage from "../../pageObjectModule/profilePage";
import headerMenu from "../../pageObjectModule/commonComponent/headerMenu";
import { onboardSetup4 } from "../../pageObjectModule/onboardingPages";

describe("Profile Page Test cases", function () {
  const username = "1cg0deu51s@cmhvzylmfc.com";
  const mainPassword = "Test@123";
  const newPassword = "Test@124";
  const Production_URL = "https://creatics.org/";
  const Mobile_1_URL = "https://mobile.creatics.org/";
  const Mobile_2_URL = "https://mobilej21.creatics.org/";
  const Dev_URL = "https://dev.creatics.org/";
  const logInURL = "https://dev.creatics.org/userProfiles";
  const BASE_URL = Production_URL;

  // beforeEach(() => {
  //   loginPage.visit(BASE_URL);
  //   cy.wait(5000);
  //   loginPage.assertUrl(BASE_URL);
  //   loginPage.signInOption();
  //   loginPage.emailText(username);
  //   loginPage.passwordText(mainPassword);
  //   cy.wait(2000);
  //   loginPage.loginButton();
  //   cy.wait(5000);
  //   ProfileMenu.dropDownMenu();
  //   ProfileMenu.selectMyProfile();
  //   cy.wait(5000);
  //   cy.on("window:alert", (message) => {
  //     const normalizedMessage = message
  //       // .replace(/[\u00a0\n\*\*]+/g, " ")
  //       .replace(/\u00a0/g, " ")
  //       .replace(/\n/g, " ")
  //       .trim();
  //     expect([
  //       "Profile picture updated successfully!",
  //       "File size is too big",
  //     ]).to.contains(normalizedMessage);
  //   });
  // });

beforeEach(() => {
  loginPage.visit(BASE_URL);

  // Wait for login page UI to exist, not for 15 seconds
  cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
  
  loginPage.signInOption();
  loginPage.emailText(username);
  loginPage.passwordText(mainPassword);
  loginPage.loginButton();

  // Wait for post-login redirect
  cy.url({ timeout: 20000 }).should('include', '/home');

  // Open profile menu
  ProfileMenu.dropDownMenu();
  ProfileMenu.selectMyProfile();
  cy.wait(5000);

  // Handle alerts
  cy.on("window:alert", (message) => {
    const normalizedMessage = message
      .replace(/\u00a0/g, " ")
      .replace(/\n/g, " ")
      .trim();

    expect([
      "Profile picture updated successfully!",
      "File size is too big",
    ]).to.contains(normalizedMessage);
  });
});


  it("Verify the visibility of the background image", () => {
    profilePage.banner().should("be.visible");
  });

  it("Verify the functionality of the 'Change Cover' button and the image change process", () => {
    const BlueDesign = "cypress/fixtures/images/design.jpg";

    profilePage.clickChangeBackgroundBtn();
    profilePage.selectBackgroundFile(BlueDesign);
    cy.wait(8000);
    profilePage
      .banner()
      .should("be.visible")
      .invoke("css", "background-image")
      .then((backgroundImage) => {
        expect(backgroundImage).to.include("design.jpg");
      });
  });

  it.skip("Verify the error state in the image change process for invalid formats and large-sized images", () => {
    const LargeSizeImage = "cypress/fixtures/images/50mb.jpg";

    profilePage.clickChangeBackgroundBtn();
    profilePage.selectBackgroundFile(LargeSizeImage);
    cy.wait(8000);
  });

  // Need to check css selector for uploadProfilePopupTitle()
  // it.only("Verify the profile image presence and change functionality.", () => {
  //   const ProfileImage = "cypress/fixtures/images/dog.jpg";

  //   profilePage.imageCircle().should("be.visible");
  //   profilePage.clickChangeProfileBtn();
  //   cy.wait(2000);
  //   //profilePage.uploadProfilePopup().should("be.visible");
  //   profilePage.uploadProfilePopupTitle().should("be.visible");
  //   profilePage.uploadProfilePopupSaveBtn().should("be.disabled");
  //   profilePage.clickProfilePopupUpload();
  //   profilePage.selectUploadProfilePopupImage(ProfileImage);
  //   profilePage.getUploadProfilePopupCroppedImage();
  //   profilePage.clickUploadedProfilePopupCropBtn();
  //   profilePage.clickUploadProfilePopupSaveBtn();
  //   cy.wait(8000);
  //   profilePage.imageCircle().should("be.visible");
  // });

  it.skip("Verify the error state in the profile image change process for invalid formats and large-sized images.", () => {
    const LargeImageSize = "cypress/fixtures/images/50mb.jpg";

    profilePage.imageCircle().should("be.visible");
    profilePage.clickChangeProfileBtn();
    cy.wait(2000);
    profilePage.clickProfilePopupUpload();
    profilePage.selectUploadProfilePopupImage(LargeImageSize);
  });

  // Need to check css selector for uploadProfilePopupTitle()
  // it("Verify the dismissal of profile image changes.", () => {
  //   const ProfileImage = "cypress/fixtures/images/fox.jpg";
  //   let originalImageSrc;

  //   profilePage
  //     .imageCircle()
  //     .invoke("attr", "src")
  //     .then((src) => {
  //       originalImageSrc = src; // Store the original image src
  //     });

  //   profilePage.clickChangeProfileBtn();
  //   cy.wait(2000);
  //   profilePage.uploadProfilePopup().should("be.visible");
  //   profilePage.uploadProfilePopupTitle().should("be.visible");
  //   profilePage.uploadProfilePopupSaveBtn().should("be.disabled");
  //   profilePage.clickProfilePopupUpload();
  //   profilePage.selectUploadProfilePopupImage(ProfileImage);
  //   profilePage.getUploadProfilePopupCroppedImage();
  //   profilePage.clickUploadProfilePopupDismissBtn();
  //   cy.wait(8000);
  //   profilePage.uploadProfilePopup().should("not.exist");

  //   profilePage
  //     .imageCircle()
  //     .invoke("attr", "src")
  //     .then((src) => {
  //       expect(src).to.eq(originalImageSrc);
  //     });
  // });
  //-------------------------

  it("Verify adding or editing the video, and that changes reflect on the profile page.", () => {
    const VideoFile = "cypress/fixtures/videos/ocean.mp4";

    cy.get("div.videoDiv").then(($videoDiv) => {
      // Check if the video element is present
      if ($videoDiv.find("video").length > 0) {
        profilePage.getUploadedVideoEditBtn().should("be.visible");
        profilePage.clickEditUploadedVideo();
      } else {
        // Video is uploaded, so the Edit option should be visible
        profilePage.uploadIamButton().should("be.visible");
        profilePage.clickUploadIamButton();
      }
      onboardSetup4.clickVideoUpload();
      onboardSetup4.videoSelect(VideoFile);
      cy.wait(30000);
      profilePage
        .getUploadedVideoSrc()
        .should("have.attr", "src")
        .and("include", "ocean.mp4");
    });
  });

  it("Verify the video presence and playback functionalities.", () => {
    profilePage.getUploadedVideo().then(($video) => {
      // Trigger play on the video element
      $video[0].play();
    });
    profilePage.getUploadedVideo().should("not.have.prop", "paused", true); // Should not be paused when playing

    cy.wait(8000);

    profilePage.getUploadedVideo().then(($video) => {
      $video[0].pause();
    });

    // Verify that the video is paused
    profilePage.getUploadedVideo().should("have.prop", "paused", true); // Should be paused

    cy.wait(8000);

    profilePage.getUploadedVideo().then(($video) => {
      $video[0].currentTime = 0;
      $video[0].pause();
    });

    // Verify that the video is stopped by checking that currentTime is 0 and paused
    profilePage
      .getUploadedVideo()
      .should("have.prop", "currentTime", 0) // Should be at the beginning
      .and("have.prop", "paused", true); // Should be paused

    cy.wait(4000);
  });

  //------------------------------------

  it("Verify that the 'Upload a Treasure' popup opens properly when the add treasury icon is clicked.", () => {
    profilePage.clickNewTreasuryCards();
    profilePage.treasuryPopup().should("be.visible");
  });

  it("Verify that the 'Save' button is disabled when the popup is opened.", () => {
    profilePage.clickNewTreasuryCards();
    profilePage.treasuryPopupSaveBtn().should("be.disabled");
  });

  it("Verify 'Title' and 'Description' field character limits.", () => {
    const treasuryMaxChar = 100;
    const TreasuryTitle = "A".repeat(treasuryMaxChar + 10);
    const descriptionMaxChar = 500;
    const DescriptionText = "B".repeat(descriptionMaxChar + 10);
    profilePage.clickNewTreasuryCards();
    cy.wait(2000);
    profilePage.typeTreasuryPopupTitleText(TreasuryTitle).blur();
    cy.wait(2000);
    profilePage
      .treasuryPopupTitleCharater()
      .invoke("val")
      .should("have.length", treasuryMaxChar);

    profilePage.typeTreasuryPopupDescription(DescriptionText).blur();
    cy.wait(2000);
    profilePage
      .treasuryPopupDescriptionCharater()
      .invoke("val")
      .should("have.length", descriptionMaxChar);
  });

  it("Verify that an invalid URL and empty input in the 'Experience Link' field shows an error message.", () => {
    profilePage.clickNewTreasuryCards();
    cy.wait(4000);

    profilePage.typeTreasuryPopupLinkText("qwerty").blur();
    cy.get("mat-dialog-content").scrollTo("bottom");
    cy.wait(4000);
    profilePage.invalidLinkErrroTreasuryPopup().should("be.visible");
    profilePage.getTreasuryPopupLinkTextBox().clear(); //.blur();
    cy.wait(4000);
    profilePage.emptyLinkErrroTreasuryPopup().should("be.visible");
  });

  it("Verify that the 'Category' field allows selection of different categories for treasure creation.", () => {
    const SelectCategory = "Dance";
    const ChangedCategory = "Film";
    profilePage.clickNewTreasuryCards();
    cy.wait(4000);
    profilePage
      .selectCategoryInTreasuryPopup(SelectCategory)
      .should("be.checked");
    profilePage
      .selectCategoryInTreasuryPopup(ChangedCategory)
      .should("be.checked");
    profilePage
      .treasuryPopupCategory()
      .filter(":checked")
      .should("have.length", 1);
  });

  it('Verify that the "Upload  Image" in a Treasure popup works properly.', () => {
    const ImageUpload = "cypress/fixtures/images/plant.jpg";
    profilePage.clickNewTreasuryCards();
    cy.wait(4000);
    profilePage.clickTreasuryPopupImageOption();
    profilePage.selectTreasuryPopupImage(ImageUpload);
    profilePage.getTreasuryPopupCroppedImage();
    profilePage.cropTreasuryPopupImage();
    cy.wait(2000);
    profilePage.getCroppedTreasuryPopupImage().should("be.visible");
  });

  it("Verify that filling all mandatory fields with valid data enables the 'Save'.", () => {
    const TitleText = "Testing";
    const DescriptionText = "This is for checking";
    const LinkText = "www.google.com";
    const TreasuryImage = "cypress/fixtures/images/sky.jpg";
    const TreasuryCategory = "Dance";

    profilePage.clickNewTreasuryCards();
    cy.wait(4000);
    profilePage.typeTreasuryPopupTitleText(TitleText);
    cy.wait(2000);
    profilePage.treasuryPopupSaveBtn().should("be.disabled");
    profilePage.typeTreasuryPopupDescription(DescriptionText);
    cy.wait(2000);
    profilePage.treasuryPopupSaveBtn().should("be.disabled");
    profilePage.clickTreasuryPopupImageOption();
    profilePage.selectTreasuryPopupImage(TreasuryImage);
    profilePage.getTreasuryPopupCroppedImage();
    profilePage.cropTreasuryPopupImage();
    cy.wait(2000);
    profilePage.treasuryPopupSaveBtn().should("be.disabled");
    profilePage.selectCategoryInTreasuryPopup(TreasuryCategory);
    cy.wait(2000);
    profilePage.treasuryPopupSaveBtn().should("be.disabled");
    cy.get("mat-dialog-content").scrollTo("bottom");
    profilePage.typeTreasuryPopupLinkText(LinkText).blur();
    cy.wait(4000);
    profilePage.treasuryPopupSaveBtn().should("be.visible");
    // profilePage
    //   .treasuryPopupSaveBtn()
    //   .should("have.css", "opacity", "0.65")
    //   .and("have.css", "cursor", "not-allowed");  // this is used because button disable acts different when linktext is added.
  });

  it("Verify that clicking the 'Save' button creates the treasure and displays it on the profile page.", () => {
    const TitleText = "Testing";
    const DescriptionText = "This is for checking";
    const LinkText = "www.google.com";
    const TreasuryImage = "cypress/fixtures/images/sky.jpg";
    const TreasuryCategory = "Dance";

    profilePage.clickNewTreasuryCards();
    cy.wait(4000);
    profilePage.typeTreasuryPopupTitleText(TitleText);
    profilePage.typeTreasuryPopupDescription(DescriptionText);
    profilePage.clickTreasuryPopupImageOption();
    profilePage.selectTreasuryPopupImage(TreasuryImage);
    profilePage.getTreasuryPopupCroppedImage();
    profilePage.cropTreasuryPopupImage();
    profilePage.selectCategoryInTreasuryPopup(TreasuryCategory);
    cy.get("mat-dialog-content").scrollTo("bottom");
    profilePage.typeTreasuryPopupLinkText(LinkText).blur();
    cy.wait(4000);
    profilePage.treasuryPopupSaveBtn().should("be.visible");
    profilePage.clickTreasuryPopupSaveBtn();
    cy.wait(2000);
    profilePage.treasury(TitleText).should("be.visible");
  });

  it("Verify that a treasury card displays the title and sub name after successful creation.", () => {
    const TitleText2 = "Checking";
    const DescriptionText2 = "This is for checking";
    const LinkText2 = "www.google.com";
    const TreasuryImage2 = "cypress/fixtures/images/sky.jpg";
    const ImageName2 = "sky.jpg";
    const TreasuryCategory2 = "Dance";

    profilePage.clickNewTreasuryCards();
    cy.wait(4000);
    profilePage.typeTreasuryPopupTitleText(TitleText2);
    profilePage.typeTreasuryPopupDescription(DescriptionText2);
    profilePage.clickTreasuryPopupImageOption();
    profilePage.selectTreasuryPopupImage(TreasuryImage2);
    profilePage.getTreasuryPopupCroppedImage();
    profilePage.cropTreasuryPopupImage();
    profilePage.selectCategoryInTreasuryPopup(TreasuryCategory2);
    cy.get("mat-dialog-content").scrollTo("bottom");
    profilePage.typeTreasuryPopupLinkText(LinkText2).blur();
    cy.wait(4000);
    profilePage.treasuryPopupSaveBtn().should("be.visible");
    profilePage.clickTreasuryPopupSaveBtn();
    cy.wait(15000);
    profilePage.treasury(TitleText2).should("be.visible");
    profilePage.treasurySubName(TreasuryCategory2).should("be.visible");
    // profilePage.clickCardsDeleteOption(TitleText2);
    // profilePage.treasuryConfirmPopupYesOption();
  });

  it("Verify that the 'Close' button discards all input and closes the popup.", () => {
    const TitleText = "Qwerty@123";
    const DescriptionText = "This is for checking";
    const LinkText = "www.google.com";
    const TreasuryImage = "cypress/fixtures/images/sky.jpg";
    const TreasuryCategory = "Dance";
    const NumberOfCards = "3";
    profilePage.clickNewTreasuryCards();
    cy.wait(4000);
    profilePage.typeTreasuryPopupTitleText(TitleText);
    profilePage.typeTreasuryPopupDescription(DescriptionText);
    profilePage.clickTreasuryPopupImageOption();
    profilePage.selectTreasuryPopupImage(TreasuryImage);
    profilePage.getTreasuryPopupCroppedImage();
    profilePage.cropTreasuryPopupImage();
    profilePage.selectCategoryInTreasuryPopup(TreasuryCategory);
    cy.get("mat-dialog-content").scrollTo("bottom");
    profilePage.typeTreasuryPopupLinkText(LinkText).blur();
    cy.wait(4000);
    profilePage.clickTreasuryPopupCloseBtn();
    cy.wait(2000);
    profilePage.treasury(TitleText).should("not.exist");

    // profilePage.treasuryCards().should("have.length", NumberOfCards);
  });

  //---------------------------
  // Need to check treasuryAccessPopupTitle css selector
  // it("Verify that clicking on a treasury card opens the respective popup and displays its details.", () => {
  //   const TitleText = "Testing";
  //   const DescriptionText = "This is for checking";
  //   const LinkText = "www.google.com";
  //   const TreasuryImage = "cypress/fixtures/images/sky.jpg";
  //   profilePage.treasury(TitleText).should("be.visible");
  //   profilePage.clickTreasuryCard(TitleText);
  //   profilePage.treasuryAccessPopup().should("be.visible");
  //   profilePage.treasuryAccessPopupTitle(TitleText).should("be.visible");
  //   profilePage
  //     .treasuryAccessPopupImage()
  //     .should("have.attr", "src")
  //     .and("include", "sky.jpg");
  //   profilePage
  //     .treasuryAccessPopupSubText(DescriptionText)
  //     .should("be.visible");
  // });

  it("Verify that the clickable link in the popup works correctly.", () => {
    const TitleText = "Testing";
    const LinkText = "www.google.com";
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });

    profilePage.clickTreasuryCard(TitleText);
    profilePage.clickTreasuryAccessPopupLink();
    cy.get("@windowOpen").should(
      "be.calledWith",
      Cypress.sinon.match(LinkText)
    );
  });

  it("Verify that the dismiss button closes the popup.", () => {
    const TitleText = "Testing";
    profilePage.clickTreasuryCard(TitleText);
    profilePage.treasuryAccessPopup().should("be.visible");
    profilePage.clickTreasuryAccessPopupDismissBtn();
    profilePage.treasuryAccessPopup().should("not.exist");
  });

  // Need to check profilePage.treasuryAccessPopupImage().should("have.attr", "src").and("include", ImageName3);
  // it.only("Verify the complete flow of creating a treasury card, accessing its popup, and validating the URL.", () => {
  //   const TitleText3 = "Future";
  //   const DescriptionText3 = "This is the future";
  //   const LinkText3 = "www.google.com";
  //   const TreasuryImage3 = "cypress/fixtures/images/fox.jpg";
  //   const ImageName3 = "fox.jpg";
  //   const TreasuryCategory3 = "Film";

  //   cy.window().then((win) => {
  //     cy.stub(win, "open").as("windowOpen");
  //   });

  //   profilePage.clickNewTreasuryCards();
  //   cy.wait(4000);
  //   profilePage.typeTreasuryPopupTitleText(TitleText3);
  //   profilePage.typeTreasuryPopupDescription(DescriptionText3);
  //   profilePage.clickTreasuryPopupImageOption();
  //   profilePage.selectTreasuryPopupImage(TreasuryImage3);
  //   profilePage.getTreasuryPopupCroppedImage();
  //   profilePage.cropTreasuryPopupImage();
  //   profilePage.selectCategoryInTreasuryPopup(TreasuryCategory3);
  //   cy.get("mat-dialog-content").scrollTo("bottom");
  //   profilePage.typeTreasuryPopupLinkText(LinkText3).blur();
  //   cy.wait(4000);
  //   profilePage.treasuryPopupSaveBtn().should("be.visible");
  //   profilePage.clickTreasuryPopupSaveBtn();
  //   cy.wait(15000);
  //   profilePage.treasury(TitleText3).should("be.visible");
  //   profilePage.treasurySubName(TreasuryCategory3).should("be.visible");
  //   profilePage.clickTreasuryCard(TitleText3);
  //   profilePage.treasuryAccessPopup().should("be.visible");
  //   //profilePage.treasuryAccessPopupTitle(TitleText3).should("be.visible");
  //   profilePage
  //     .treasuryAccessPopupSubText(DescriptionText3)
  //     .should("be.visible");
  //   profilePage
  //     .treasuryAccessPopupImage().should("have.attr", "src").and("include", ImageName3);
  //   profilePage.clickTreasuryAccessPopupLink();
  //   cy.get("@windowOpen").should(
  //     "be.calledWith",
  //     Cypress.sinon.match(LinkText3)
  //   );
  // });

  //-----------------------------
  it("Verify that the 'Edit' icon is clickable and shows Edit treasury popup", () => {
    const TitleText = "Testing";
    profilePage.treasuryCardEditOption(TitleText).should("be.visible");
    profilePage.clickCardsEditOption(TitleText);
    profilePage.treasuryPopup().should("be.visible");
  });

    // Need to check profilePage.treasuryAccessPopupImage().should("have.attr", "src").and("include", ImageName3);
  // it("Verify that user is able to edit treasury details and its shown on profile page after saving them.", () => {
  //   const OldTitleText = "Checking";
  //   const EditedTitleText = "Dog";
  //   const EditedDescriptionText = "This is for checking";
  //   const EditedLinkText = "www.youtube.com";
  //   const EditedTreasuryImage = "cypress/fixtures/images/dog.jpg";
  //   const EditedImageName = "dog.jpg";
  //   const EditedTreasuryCategory = "Tech & Science";
  //   cy.window().then((win) => {
  //     cy.stub(win, "open").as("windowOpen");
  //   });
  //   profilePage.clickCardsEditOption(OldTitleText);
  //   cy.wait(4000);
  //   profilePage.selectCategoryInTreasuryPopup(EditedTreasuryCategory);
  //   profilePage.typeTreasuryPopupTitleText(EditedTitleText);
  //   profilePage.clickTreasuryPopupChangeImage();
  //   profilePage.selectTreasuryPopupImage(EditedTreasuryImage);
  //   profilePage.getTreasuryPopupCroppedImage();
  //   profilePage.cropTreasuryPopupImage();
  //   profilePage.typeTreasuryPopupDescription(EditedDescriptionText);
  //   profilePage.typeTreasuryPopupLinkText(EditedLinkText);
  //   profilePage.clickTreasuryPopupSaveBtn();
  //   cy.wait(4000);
  //   profilePage.treasury(EditedTitleText).should("be.visible");
  //   profilePage.clickTreasuryCard(EditedTitleText);
  //   profilePage.treasuryAccessPopupTitle(EditedTitleText);
  //   profilePage.treasuryAccessPopupSubText(EditedDescriptionText);
  //   profilePage
  //     .treasuryAccessPopupImage()
  //     .should("have.attr", "src")
  //     .and("include", EditedImageName);
  //   profilePage.clickTreasuryAccessPopupLink();
  //   cy.get("@windowOpen").should(
  //     "be.calledWith",
  //     Cypress.sinon.match(EditedLinkText)
  //   );
  // });
  //-----------------------------

  it("Verify that the 'Hide' icon prompts a confirmation popup with 'Yes' or 'No' options.", () => {
    const TitleText = "Testing";
    profilePage.treasuryHideOption(TitleText).should("be.visible");
    profilePage.clickCardsHideOption(TitleText);
    profilePage.treasuryConfirmPopup().should("be.visible");
    profilePage.confirmPopupHideQuestion().should("be.visible");
  });

  it("Verify that selecting 'No' in the unhide confirmation popup cancels the unhide action.", () => {
    const TitleText = "Testing";
    profilePage.clickCardsHideOption(TitleText);
    profilePage.treasuryConfirmPopup().should("be.visible");
    profilePage.treasuryConfirmPopupNoOption();
    profilePage.treasuryHideOption(TitleText).should("be.visible");
  });

  it("Verify that selecting 'Yes' in the unhide confirmation popup makes the treasury visible again and changes the icon to 'UnHide'.", () => {
    const TitleText = "Testing";
    profilePage.clickCardsHideOption(TitleText);
    profilePage.treasuryConfirmPopup().should("be.visible");
    profilePage.treasuryConfirmPopupYesOption();
    cy.wait(4000);
    profilePage.treasuryUnHideOption(TitleText).should("be.visible");
  });

  // it("Verify that the 'Unhide' icon prompts a confirmation popup with 'Yes' or 'No' options.", () => {
  //   const TitleText = "Testing";
  //   profilePage.treasuryUnHideOption(TitleText).should("be.visible");
  //   profilePage.clickCardsUnHideOption(TitleText);
  //   cy.wait(2000);
  //   profilePage.treasuryConfirmPopup().should("be.visible");
  //   profilePage.confirmPopupHideQuestion().should("be.visible");
  // });

  // it("Verify that selecting 'No' in the hide confirmation popup cancels the hide action.", () => {
  //   const TitleText = "Testing";
  //   profilePage.clickCardsUnHideOption(TitleText);
  //   profilePage.treasuryConfirmPopup().should("be.visible");
  //   profilePage.treasuryConfirmPopupNoOption();
  //   profilePage.treasuryUnHideOption(TitleText).should("be.visible");
  // });

  // it("Verify that selecting 'Yes' in the hide confirmation popup makes the treasury hide and changes the icon to 'Hide'.", () => {
  //   const TitleText = "Testing";
  //   profilePage.clickCardsUnHideOption(TitleText);
  //   profilePage.treasuryConfirmPopup().should("be.visible");
  //   profilePage.treasuryConfirmPopupYesOption();
  //   cy.wait(4000);
  //   profilePage.treasuryHideOption(TitleText).should("be.visible");
  // });

  //------------------------------------

  it("Verify if treasury is shown and private button is shown by default.", () => {
    profilePage.getPublicButton().should("be.visible");
  });

  //Need to add dynamic number of cards value
  it("Verify if all treasury are shown in private view (hidden and unhidden).	", () => {
    const NumberOfCards = "3";
    profilePage.treasuryCards().should("have.length", NumberOfCards);
  });

  it("Verify the view gets changed to public view after user clicks on public button is shown if user clicks on it.", () => {
    profilePage.clickPublicButton();
    profilePage.getPrivateButton().should("be.visible");
  });

  // it.only("Verify if user hide the treasury and checks its visiblity in public view", () => {
  //   const CardTitleText = "Future";
  //   profilePage.clickCardsHideOption(CardTitleText);
  //   profilePage.treasuryConfirmPopupYesOption();
  //   cy.wait(4000);
  //   profilePage.clickPublicButton();
  //   cy.wait(4000);
  //   profilePage.treasury(CardTitleText).should("not.exist");
  // });

  // it("Verify if hidden treasury is not shown in public view.", () => {
  //   const VisibleOfCards = "2";
  //   profilePage.clickPublicButton();
  //   profilePage.getPrivateButton();
  //   profilePage.treasuryCards().should("have.length", VisibleOfCards);
  // });

  // it("Verify if view changes back to private view after user clicks on private button.", () => {
  //   profilePage.clickPublicButton();
  //   cy.wait(4000);
  //   profilePage.getPrivateButton().should("be.visible");
  //   profilePage.clickPrivateButton();
  //   cy.wait(4000);
  //   profilePage.getPublicButton().should("be.visible");
  // });
  // it("Verify if private view contains all treasury after the switch (hidden and unhidden).", () => {
  //   const TotalCards = "4";
  //   const VisibleOfCards = "2";
  //   profilePage.treasuryCards().should("have.length", TotalCards);
  //   profilePage.clickPublicButton();
  //   cy.wait(4000);
  //   profilePage.getPrivateButton();
  //   profilePage.treasuryCards().should("have.length", VisibleOfCards);
  //   profilePage.clickPrivateButton();
  //   cy.wait(4000);
  //   profilePage.getPublicButton();
  //   profilePage.treasuryCards().should("have.length", TotalCards);
  // });

  //---------------------------

  // it.only("Verify that the 'Delete' icon prompts a confirmation popup with 'Yes' or 'No' options.", () => {
  //   const TitleText = "Future";
  //   profilePage.treasuryCardDeleteOption(TitleText).should("be.visible");
  //   profilePage.clickCardsDeleteOption(TitleText);
  //   profilePage.treasuryDeletePopup().should("be.visible");
  // });

  // it("Verify that selecting 'No' in the delete confirmation popup cancels the deletion.	", () => {
  //   const TitleText = "Testing";
  //   profilePage.clickCardsDeleteOption(TitleText);
  //   profilePage.treasuryDeletePopup().should("be.visible");
  //   profilePage.treasuryDeleteNoOption();
  //   cy.wait(4000);
  //   profilePage.treasury(TitleText).should("be.visible");
  // });

  it("Verify that selecting 'Yes' in the delete confirmation popup deletes the treasury.	", () => {
    const TitleText = "Testing";
    profilePage.clickCardsDeleteOption(TitleText);
    //profilePage.treasuryDeletePopup().should("be.visible");
    profilePage.treasuryDeleteYesOption();
    cy.wait(4000);
    profilePage.treasury(TitleText).should("not.exist");
  });

  it("Verify if user delete all cards then only Add new card is shown", () => {
    const TitleText = "Checking";
    const CardsNumber = "1";
    profilePage.clickCardsDeleteOption(TitleText);
    profilePage.treasuryDeleteYesOption();
    cy.wait(2000);
    profilePage.treasuryCards().should("have.length", CardsNumber);
    profilePage.addNewTreasuryCards().should("be.visible");
  });

  afterEach(() => {
    // Runs after each test
    cy.wait(2000);
    cy.clearCookies();
    // cy.get(".dropdown").first().click();
    // cy.get(".profileCard").contains("LOGOUT").click();
  });
});
