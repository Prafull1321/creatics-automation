import loginPage from "../../pageObjectModule/loginPage";
import myAccountPage from "../../pageObjectModule/myAccount/myAccountPage";
import ProfileMenu from "../../pageObjectModule/commonComponent/headerMenu";
import profilePage from "../../pageObjectModule/profilePage";
import headerMenu from "../../pageObjectModule/commonComponent/headerMenu";
import { onboardSetup4 } from "../../pageObjectModule/onboardingPages";

describe("My Account test cases (Profile Section).", function () {
  const username = "1cg0deu51s@cmhvzylmfc.com";
  const mainPassword = "Test@123";
  const newPassword = "Test@123";
  // const BASE_URL = "https://creatics.org/";
  const Production_URL = "https://creatics.org/";
  const Mobile_1_URL = "https://mobile.creatics.org/";
  const Mobile_2_URL = "https://mobilej21.creatics.org/";
  const Dev_URL = "https://dev.creatics.org/";
  const logInURL = "https://dev.creatics.org/userProfiles";
  const BASE_URL = Production_URL;

  beforeEach(() => {
    loginPage.visit(BASE_URL);
    //cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
    loginPage.assertUrl(BASE_URL);
    loginPage.signInOption();
    loginPage.emailText(username);
    loginPage.passwordText(mainPassword);
    cy.wait(2000);
    loginPage.loginButton();
    cy.wait(5000);
    ProfileMenu.dropDownMenu();
    ProfileMenu.selectMyAccount();
    cy.wait(8000);

    cy.on("window:alert", (message) => {
      const normalizedMessage = message
        // .replace(/[\u00a0\n\*\*]+/g, " ")
        .replace(/\u00a0/g, " ")
        .replace(/\n/g, " ")
        .trim();
      expect([
        "First Name can't be blank",
        "Last Name can't be blank",
        "Enter Valid Communication Email Address",
        "My Information updated successfully!",
        "My Words updated successfully!",
        "Please select only 3 options",
        "Select I'm Creator of",
        "I’m Creator of updated successfully!",
        "Select I'm Fan of",
        "I’m Fan of updated successfully!",
        "Please select an image to upload",
        "Profile Picture removed successfully!",
        "Profile picture updated successfully!",
        "Profile Picture removed successfully!",
        "File size is too big",
        "Please crop the image before submitting.",
        "Background Picture updated successfully!",
        "I am Video removed successfully!",
        "Please select a background picture from above OR upload an image of your choice",
        "Passwords do not match!",
        "Password updated successfully! Login with your new password",
        "Your new password cannot be same as your current password",
      ]).to.contains(normalizedMessage);
    });
  });

  it("Verify My Profile (My Information) functionality.", () => {
    const UserInformation = {
      "first-name": "Dhiren",
      "last-name": "Parmar",
      "communication-email": "1cg0deu51s@cmhvzylmfc.com",
    };
    myAccountPage.profileSection();
    myAccountPage.myInformationSection();
    cy.wait(4000);
    myAccountPage.clickEditInformationBtn();
    cy.wait(4000);
    myAccountPage.typeFirstName(UserInformation["first-name"]);
    myAccountPage.typeLastName(UserInformation["last-name"]);
    myAccountPage.typeCommunication(UserInformation["communication-email"]);
    myAccountPage.clickSaveBtn();
    cy.wait(2000);
    cy.wrap(Object.values(UserInformation)).each((value) => {
      myAccountPage.savedMyInformation(value).should("be.visible");
    });
  });

  it("Verify Cancel functionality does not save changes.", () => {
    const UserInformation = {
      "first-name": "Peter",
      "last-name": "May",
      "communication-email": "Ready@gmail.com",
    };
    myAccountPage.profileSection();
    myAccountPage.myInformationSection();
    cy.wait(2000);
    myAccountPage.clickEditInformationBtn();
    myAccountPage.typeFirstName(UserInformation["first-name"]);
    myAccountPage.typeLastName(UserInformation["last-name"]);
    myAccountPage.typeCommunication(UserInformation["communication-email"]);
    myAccountPage.clickCancelBtn();
    cy.wait(2000);
    cy.wrap(Object.values(UserInformation)).each((value) => {
      myAccountPage.savedMyInformation(value).should("not.exist");
    });
  });

  it("Verify error messages are shown on invalid inputs.", () => {
    const UserInformation = {
      "first-name": "Dhiren",
      "last-name": "Parmar",
      "communication-email": "Ready@gmail.com",
      "invalid-email": "invalid.com",
    };
    myAccountPage.profileSection();
    cy.wait(4000);
    myAccountPage.myInformationSection();
    cy.wait(4000);
    myAccountPage.clickEditInformationBtn();
    myAccountPage.getFirstNameTextbox().clear();
    myAccountPage.getLastNameTextbox().clear();
    myAccountPage.clickSaveBtn();
    cy.wait(4000);
    myAccountPage.typeFirstName(UserInformation["first-name"]);
    myAccountPage.typeLastName(UserInformation["last-name"]);
    myAccountPage.typeCommunication(UserInformation["invalid-email"]);
    myAccountPage.clickSaveBtn();
  });

  it("Verify edited information is reflected in My Information and Profile sections.", () => {
    const UserInformation = {
      "first-name": "Dhiren",
      "last-name": "Parmar",
      "communication-email": "1cg0deu51s@cmhvzylmfc.com",
    };
    const FullName = `${UserInformation["first-name"]} ${UserInformation["last-name"]}`;

    myAccountPage.profileSection();
    myAccountPage.myInformationSection();
    cy.wait(2000);
    myAccountPage.clickEditInformationBtn();
    myAccountPage.typeFirstName(UserInformation["first-name"]);
    myAccountPage.typeLastName(UserInformation["last-name"]);
    myAccountPage.typeCommunication(UserInformation["communication-email"]);
    myAccountPage.clickSaveBtn();
    cy.wait(2000);
    ProfileMenu.dropDownMenu();
    ProfileMenu.selectMyProfile();
    profilePage.getFullNameText().should("include.text", FullName);
    ProfileMenu.userFirstName().should(
      "have.text",
      UserInformation["first-name"]
    );
  });

  it("Verify My Profile (My Words) functionality.", () => {
    const myWordText = "This is just a test 101";
    myAccountPage.profileSection();
    myAccountPage.myWordSection();
    myAccountPage.myWordSubText().should("be.visible");
    myAccountPage.getMyWordTextbox(myWordText);
    myAccountPage.clickUpdateMyWordBtn();
  });

  it("Verify if My Words changes are reflected on Profile page.", () => {
    const myWordText = "This is just a test 101";
    myAccountPage.profileSection();
    myAccountPage.myWordSection();
    cy.wait(4000);
    myAccountPage.myWordSubText().should("be.visible");
    myAccountPage.getMyWordTextbox(myWordText);
    myAccountPage.clickUpdateMyWordBtn();
    cy.wait(10000);
    headerMenu.dropDownMenu();
    headerMenu.selectMyProfile();
    cy.wait(4000);
    profilePage.getMyWordText().should("include.text", myWordText);
  });

  it("Verify the text when user navigates to Profile page without saving data.", () => {
    const CheckText = "this should not be present";
    myAccountPage.profileSection();
    myAccountPage.myWordSection();
    cy.wait(4000);
    myAccountPage.myWordSubText().should("be.visible");
    myAccountPage.getMyWordTextbox(CheckText);
    headerMenu.dropDownMenu();
    headerMenu.selectMyProfile();
    cy.wait(4000);
    profilePage.getMyWordText().should("not.contain", CheckText);
  });

  it("Verify if user is able to keep My Words section empty.", () => {
    myAccountPage.profileSection();
    myAccountPage.myWordSection();
    myAccountPage.myWordSubText().should("be.visible");
    myAccountPage.getMyWordTextbox("Erase").clear();
    cy.wait(2000);
    myAccountPage.clickUpdateMyWordBtn();
    cy.wait(10000);
    headerMenu.dropDownMenu();
    headerMenu.selectMyProfile();
    cy.wait(4000);
    profilePage.getMyWordText().should("not.exist");
  });

  it("Verify the functionality of I'M FAN section with valid selections.", () => {
    const FansOptions = ["Film", "Fashion", "Dance"];
    myAccountPage.profileSection();
    myAccountPage.imFanOfSection();
    cy.wait(4000);
    myAccountPage.getFanCheckboxContainer();
    myAccountPage.countSelectedFansOption();
    myAccountPage.uncheckAllFansOptions();
    myAccountPage.uncheckedFanOption().should("eq", 9);
    myAccountPage.selectFansOptionArray(FansOptions);
    myAccountPage.clickUpdateFanBtn();
    cy.wait(4000);
    myAccountPage.countSelectedFansOption().should("eq", 3);
  });

  it("Verify the functionality of I'M FAN section when selections exceed the allowed limit.", () => {
    const AboveValidOption = ["Film", "Fashion", "Dance", "Television"];
    myAccountPage.profileSection();
    myAccountPage.imFanOfSection();
    cy.wait(4000);
    myAccountPage.getFanCheckboxContainer();
    myAccountPage.uncheckAllFansOptions();
    myAccountPage.selectFansOptionArray(AboveValidOption);
    myAccountPage.countSelectedFansOption().should("eq", 4);
    cy.wait(2000);
    myAccountPage.clickUpdateFanBtn();
    cy.wait(4000);
  });

  it("Verify the functionality of I'M FAN section when no options are selected.", () => {
    myAccountPage.profileSection();
    myAccountPage.imFanOfSection();
    cy.wait(4000);
    myAccountPage.getFanCheckboxContainer();
    myAccountPage.countSelectedFansOption();
    myAccountPage.uncheckAllFansOptions();
    myAccountPage.clickUpdateFanBtn();
    myAccountPage.uncheckedFanOption().should("eq", 9);
  });

  it("Verify that changes in I'M FAN section are reflected on Profile page.", () => {
    const MultipleFansOptions = ["Film", "Fashion", "Dance"];
    const SingleFanOption = ["Dance"];
    const SelectedCount = 3;

    const FinalSelectedOption = MultipleFansOptions;
    myAccountPage.profileSection();
    myAccountPage.imFanOfSection();
    cy.wait(4000);
    myAccountPage.getFanCheckboxContainer();
    myAccountPage.uncheckAllFansOptions();
    myAccountPage.selectFansOptionArray(FinalSelectedOption);
    myAccountPage.clickUpdateFanBtn();
    cy.wait(4000);
    myAccountPage.countSelectedFansOption().should("eq", SelectedCount);
    headerMenu.dropDownMenu();
    headerMenu.selectMyProfile();
    cy.wait(6000);
    FinalSelectedOption.forEach((FinalSelectedOption) => {
      profilePage
        .getFanText(FinalSelectedOption)
        .invoke("text")
        .then((text) => {
          expect(text.replace(/\u00a0/g, " ").trim()).to.equal(
            FinalSelectedOption
          );
        });
    });
  });

  it("Verify if the user can remove a specific option from the I'M FAN section.", () => {
    const preferredOption = "Dance";
    const maxAllowedSelections = 3;

    myAccountPage.profileSection();
    myAccountPage.imFanOfSection();
    cy.wait(4000);
    myAccountPage.getFanCheckboxContainer();

    myAccountPage.countSelectedFansOption().then((selectedCount) => {
      if (selectedCount === maxAllowedSelections) {
        myAccountPage.getFansOption(preferredOption).uncheck();
        myAccountPage.clickUpdateFanBtn();

        myAccountPage
          .countSelectedFansOption()
          .should("be.lte", maxAllowedSelections);
        myAccountPage.getFansOption(preferredOption).should("not.be.checked");

        const CheckRemovedOption = [preferredOption];
        headerMenu.dropDownMenu();
        headerMenu.selectMyProfile();
        cy.wait(6000);

        CheckRemovedOption.forEach((CheckRemovedOption) => {
          profilePage.getFanText(CheckRemovedOption).should("not.exist"); // Assert the fan option is not present
        });
      }
    });
  });

  it("Verify if the user can add a specific option if less than 3 options are selected in the I'M FAN section.", () => {
    const AddingOption = "Virtual Reality";
    const maxAllowedSelections = 3;

    myAccountPage.profileSection();
    myAccountPage.imFanOfSection();
    cy.wait(4000);
    myAccountPage.getFanCheckboxContainer();

    myAccountPage.countSelectedFansOption().then((selectedCount) => {
      if (selectedCount < maxAllowedSelections) {
        myAccountPage.getFansOption(AddingOption).check();
        myAccountPage.clickUpdateFanBtn();
        myAccountPage
          .countSelectedFansOption()
          .should("be.lte", maxAllowedSelections);
      }
    });
    const CheckAddedOption = [AddingOption];
    headerMenu.dropDownMenu();
    headerMenu.selectMyProfile();
    cy.wait(6000);
    CheckAddedOption.forEach((CheckAddedOption) => {
      profilePage
        .getFanText(CheckAddedOption)
        .invoke("text")
        .then((text) => {
          expect(text.replace(/\u00a0/g, " ").trim()).to.equal(
            CheckAddedOption
          );
        });
    });
  });

  it("Verify the functionality of I'm Creator section with valid selections.", () => {
    const FansOptions = [
      "Books & Storytelling",
      "Virtual Reality",
      "Tech & Science",
    ];
    myAccountPage.profileSection();
    myAccountPage.imCreatorOfSection();
    cy.wait(4000);
    myAccountPage.getCreatorCheckboxContainer();
    myAccountPage.countSelectedCreatorsOption();
    myAccountPage.uncheckAllCreatorOptions();
    myAccountPage.uncheckedCreatorOption().should("eq", 9);
    myAccountPage.selectCreatorsOptionArray(FansOptions);
    myAccountPage.clickUpdateCreatorBtn();
    cy.wait(4000);
    myAccountPage.countSelectedCreatorsOption().should("eq", 3);
  });

  it("Verify the functionality of I'm Creator section when selections exceed the allowed limit.", () => {
    const AboveValidOption = [
      "Books & Storytelling",
      "Virtual Reality",
      "Tech & Science",
      "Film",
    ];
    myAccountPage.profileSection();
    myAccountPage.imCreatorOfSection();
    cy.wait(4000);
    myAccountPage.getCreatorCheckboxContainer();
    myAccountPage.uncheckAllCreatorOptions();
    myAccountPage.selectCreatorsOptionArray(AboveValidOption);
    myAccountPage.countSelectedCreatorsOption().should("eq", 4);
    cy.wait(2000);
    myAccountPage.clickUpdateCreatorBtn();
    cy.wait(4000);
  });

  it("Verify the functionality of I'm Creator section when no options are selected.", () => {
    myAccountPage.profileSection();
    myAccountPage.imCreatorOfSection();
    cy.wait(4000);
    myAccountPage.getCreatorCheckboxContainer();
    myAccountPage.countSelectedCreatorsOption();
    myAccountPage.uncheckAllCreatorOptions();
    myAccountPage.clickUpdateCreatorBtn();
    myAccountPage.uncheckedCreatorOption().should("eq", 9);
  });

  it("Verify that changes in the I'm Creator section are reflected on the Profile page.", () => {
    const MultipleFansOptions = [
      "Books & Storytelling",
      "Virtual Reality",
      "Tech & Science",
    ];
    const SingleFanOption = ["Virtual Reality"];
    const SelectedCount = 3;

    const FinalSelectedOption = MultipleFansOptions;
    myAccountPage.profileSection();
    myAccountPage.imCreatorOfSection();
    cy.wait(4000);
    myAccountPage.getCreatorCheckboxContainer();
    myAccountPage.uncheckAllCreatorOptions();
    myAccountPage.selectCreatorsOptionArray(FinalSelectedOption);
    myAccountPage.clickUpdateCreatorBtn();
    cy.wait(4000);
    myAccountPage.countSelectedCreatorsOption().should("eq", SelectedCount);
    headerMenu.dropDownMenu();
    headerMenu.selectMyProfile();
    cy.wait(6000);
    FinalSelectedOption.forEach((FinalSelectedOption) => {
      profilePage
        .getCreatorText(FinalSelectedOption)
        .invoke("text")
        .then((text) => {
          expect(text.replace(/\u00a0/g, " ").trim()).to.equal(
            FinalSelectedOption
          );
        });
    });
  });

  it("Verify if the user can remove a specific option from the I'm Creator section.", () => {
    const preferredOption = "Tech & Science";
    const maxAllowedSelections = 3;

    myAccountPage.profileSection();
    myAccountPage.imCreatorOfSection();
    cy.wait(4000);
    myAccountPage.getCreatorCheckboxContainer();

    myAccountPage.countSelectedCreatorsOption().then((selectedCount) => {
      if (selectedCount === maxAllowedSelections) {
        myAccountPage.getCreatorsOption(preferredOption).uncheck();
        myAccountPage.clickUpdateCreatorBtn();

        myAccountPage
          .countSelectedCreatorsOption()
          .should("be.lte", maxAllowedSelections);
        myAccountPage
          .getCreatorsOption(preferredOption)
          .should("not.be.checked");

        const CheckRemovedOption = [preferredOption];
        headerMenu.dropDownMenu();
        headerMenu.selectMyProfile();
        cy.wait(6000);

        CheckRemovedOption.forEach((CheckRemovedOption) => {
          profilePage.getCreatorText(CheckRemovedOption).should("not.exist"); // Assert the fan option is not present
        });
      }
    });
  });

  it("Verify if the user can add a specific option if fewer than three options are selected in the I'm Creator section.", () => {
    const AddingOption = "Film";
    const maxAllowedSelections = 3;

    myAccountPage.profileSection();
    myAccountPage.imCreatorOfSection();
    cy.wait(4000);
    myAccountPage.getCreatorCheckboxContainer();

    myAccountPage.countSelectedCreatorsOption().then((selectedCount) => {
      if (selectedCount < maxAllowedSelections) {
        myAccountPage.getCreatorsOption(AddingOption).check();
        myAccountPage.clickUpdateCreatorBtn();
        myAccountPage
          .countSelectedCreatorsOption()
          .should("be.lte", maxAllowedSelections);
      }
    });
    const CheckAddedOption = [AddingOption];
    headerMenu.dropDownMenu();
    headerMenu.selectMyProfile();
    cy.wait(6000);
    CheckAddedOption.forEach((CheckAddedOption) => {
      profilePage
        .getCreatorText(CheckAddedOption)
        .invoke("text")
        .then((text) => {
          expect(text.replace(/\u00a0/g, " ").trim()).to.equal(
            CheckAddedOption
          );
        });
    });
  });

  it("Verify the image selection functionality in the Profile Picture section through upload or change.", () => {
    const DogImage = "cypress/fixtures/images/dog.jpg";
    const plantImage = "cypress/fixtures/images/plant.jpg";
    myAccountPage.profileSection();
    myAccountPage.profilePictureSection();
    cy.wait(8000);
    // Check if the image with alt "Profile Picture" is present
    cy.get("body").then(($body) => {
      if ($body.find('img[alt="Profile Picture"]').length) {
        // If the image is present, 'Change Picture' button should be shown
        myAccountPage.clickChangeProfilePictureSection();
        myAccountPage.selectProfileUploadFile(plantImage);
        myAccountPage.moveCropBox(200, 200, 500, 500);
        myAccountPage.dragCropArea(100, 100, 400, 400);
        myAccountPage.clickCropButton();
        cy.wait(4000);
        myAccountPage.clickChangeProfileBtn();
        cy.wait(10000);
      } else {
        // If the image is not present, 'Upload Picture' button should be shown
        myAccountPage.clickUploadProfilePictureSection().should("be.visible");
        myAccountPage.selectProfileUploadFile(DogImage);
        myAccountPage.moveCropBox(200, 200, 500, 500);
        myAccountPage.dragCropArea(100, 100, 400, 400);
        myAccountPage.clickCropButton();
        cy.wait(4000);
        myAccountPage.clickProfileUploadBtn();
        cy.wait(10000);
      }
    });
    cy.wait(10000);
    myAccountPage
      .getUploadedProfileImg()
      .should("be.visible")
      .then(($img) => {
        // Extract the src attribute of the uploaded image
        const newProfileSrc = $img.attr("src");
        cy.wrap(newProfileSrc).as("newProfileSrc");
      });
    headerMenu.dropDownMenu();
    headerMenu.selectMyProfile();
    cy.wait(8000);
    cy.get("@newProfileSrc").then((newProfileSrc) => {
      cy.get(".img-circle")
        .should("be.visible")
        .and("have.attr", "src", newProfileSrc);
    });
  });

  it("Verify if the user is able to change the profile image.", () => {
    const plantImage = "cypress/fixtures/images/plant.jpg";
    myAccountPage.profileSection();
    myAccountPage.profilePictureSection();
    cy.wait(4000);
    myAccountPage.clickChangeProfileBtn();
    myAccountPage.clickChangeProfilePictureSection();
    myAccountPage.selectProfileUploadFile(plantImage);
    myAccountPage.moveCropBox(200, 200, 500, 500);
    myAccountPage.dragCropArea(100, 100, 400, 400);

    myAccountPage.clickCropButton();
    cy.wait(4000);
    myAccountPage.clickChangeProfileBtn();
    cy.wait(10000);

    myAccountPage
      .getUploadedProfileImg()
      .should("be.visible")
      .then(($img) => {
        // Extract the src attribute of the uploaded image
        const changedImageSrc = $img.attr("src");
        cy.wrap(changedImageSrc).as("changedImageSrc");
      });
    headerMenu.dropDownMenu();
    headerMenu.selectMyProfile();
    cy.wait(8000);

    cy.get("@changedImageSrc").then((changedImageSrc) => {
      cy.get(".img-circle")
        .should("be.visible")
        .and("have.attr", "src", changedImageSrc);
    });
  });

  it("Verify if an error related to image not being cropped is shown on the change profile flow.", () => {
    const plantImage = "cypress/fixtures/images/plant.jpg";
    myAccountPage.profileSection();
    myAccountPage.profilePictureSection();
    cy.wait(4000);
    myAccountPage.clickChangeProfileBtn();
    myAccountPage.clickChangeProfilePictureSection();
    myAccountPage.selectProfileUploadFile(plantImage);
    myAccountPage.clickChangeProfileBtn();
    cy.wait(4000);
  });

  it("Verify if an image size related error is shown for the change profile flow.", () => {
    const LargeSizeImage = "cypress/fixtures/images/50mb.jpg";
    myAccountPage.profileSection();
    myAccountPage.profilePictureSection();
    cy.wait(4000);
    myAccountPage.clickChangeProfileBtn();
    myAccountPage.clickChangeProfilePictureSection();
    myAccountPage.selectProfileUploadFile(LargeSizeImage);
  });

  it("Verify if the user is able to remove the profile image and check error state.", () => {
    const LargeSizeImage = "cypress/fixtures/images/50mb.jpg";
    myAccountPage.profileSection();
    myAccountPage.profilePictureSection();
    cy.wait(4000);
    myAccountPage.clickChangeProfilePictureSection().should("be.visible");
    myAccountPage.clickRemoveProfileBtn();
    cy.wait(8000);
    headerMenu.dropDownMenu();
    headerMenu.selectMyProfile();
    cy.wait(8000);
    profilePage.userIcon().should("be.visible");
  });

  it("Verify if an image size related error is shown for the upload profile flow.", () => {
    const LargeSizeImage = "cypress/fixtures/images/50mb.jpg";
    myAccountPage.profileSection();
    myAccountPage.profilePictureSection();
    cy.wait(4000);
    //myAccountPage.clickRemoveProfileBtn();
    myAccountPage.clickUploadProfilePictureSection().should("be.visible");
    myAccountPage.selectProfileUploadFile(LargeSizeImage);
  });

  it("Verify if the user is able to add a new profile image.", () => {
    const DogImage = "cypress/fixtures/images/dog.jpg";
    myAccountPage.profileSection();
    myAccountPage.profilePictureSection();
    cy.wait(4000);
    myAccountPage.clickUploadProfilePictureSection().should("be.visible");
    myAccountPage.selectProfileUploadFile(DogImage);
    myAccountPage.moveCropBox(200, 200, 500, 500);
    myAccountPage.dragCropArea(100, 100, 400, 400);
    myAccountPage.clickCropButton();
    cy.wait(4000);
    myAccountPage.clickProfileUploadBtn();
    cy.wait(10000);
    myAccountPage
      .getUploadedProfileImg()
      .should("be.visible")
      .then(($img) => {
        // Extract the src attribute of the uploaded image
        const newProfileSrc = $img.attr("src");
        cy.wrap(newProfileSrc).as("newProfileSrc");
      });
    headerMenu.dropDownMenu();
    headerMenu.selectMyProfile();
    cy.wait(8000);
    cy.get("@newProfileSrc").then((newProfileSrc) => {
      cy.get(".img-circle")
        .should("be.visible")
        .and("have.attr", "src", newProfileSrc);
    });
  });

  it("Verify if the user is able to edit the background from the default four images.", () => {
    const imageNumber = 1;
    myAccountPage.profileSection();
    myAccountPage.backgroundPictureSection();
    cy.wait(5000);
    myAccountPage.selectImage(imageNumber);
    myAccountPage.clickChangeBackgroundBtn();
    cy.wait(10000);
    myAccountPage
      .getCurrentBackground()
      .should("be.visible")
      .then(($img) => {
        const currentBackgroundSrc = $img.attr("src");
        cy.wrap(currentBackgroundSrc).as("currentBackgroundSrc");
      });

    headerMenu.dropDownMenu();
    headerMenu.selectMyProfile();
    cy.wait(8000);
    profilePage.banner().should("be.visible");
    profilePage.getProfileBannerBackground().as("profileBackgroundUrl");

    // .then(($div) => {
    //   const profileBackground = $div.css("background-image");
    //   const profileBackgroundUrl = profileBackground
    //     .replace(/^url\(["']?/, "")
    //     .replace(/["']?\)$/, "");
    //   cy.wrap(profileBackgroundUrl).as("profileBackgroundUrl");
    // });

    cy.get("@currentBackgroundSrc").then((currentBackgroundSrc) => {
      cy.get("@profileBackgroundUrl").then((profileBackgroundUrl) => {
        expect(currentBackgroundSrc).to.equal(profileBackgroundUrl);
      });
    });
  });

  it("Verify if the user is able to change the background picture using the upload method.", () => {
    const BackgroundFile = "cypress/fixtures/images/greenss.jpg";

    myAccountPage.profileSection();
    myAccountPage.backgroundPictureSection();
    cy.wait(5000);
    myAccountPage.clickChangeBackgroundSection();
    myAccountPage.selectBackgroundFile(BackgroundFile);
    myAccountPage.moveCropBox(200, 200, 500, 500);
    myAccountPage.dragCropArea(100, 100, 400, 400);
    myAccountPage.cropMessage();
    myAccountPage.clickCropButton();
    myAccountPage.clickChangeBackgroundBtn();
    cy.wait(10000);
    myAccountPage
      .getCurrentBackground()
      .should("be.visible")
      .then(($img) => {
        const newUploadedBackground = $img.attr("src");
        cy.wrap(newUploadedBackground).as("newUploadedBackground");
      });
    headerMenu.dropDownMenu();
    headerMenu.selectMyProfile();
    cy.wait(8000);
    profilePage
      .banner()
      .should("be.visible")
      .then(($div) => {
        const profileBackground = $div.css("background-image");
        const profileBackgroundUrl = profileBackground
          .replace(/^url\(["']?/, "")
          .replace(/["']?\)$/, "");
        cy.wrap(profileBackgroundUrl).as("profileBackgroundUrl");
      });

    cy.get("@newUploadedBackground").then((newUploadedBackground) => {
      cy.get("@profileBackgroundUrl").then((profileBackgroundUrl) => {
        expect(newUploadedBackground).to.equal(profileBackgroundUrl);
      });
    });
  });

  it("Verify if error messages are shown in the Change Background Picture section.", () => {
    const LargeSizeFile = "cypress/fixtures/images/50mb.jpg";
    myAccountPage.profileSection();
    myAccountPage.backgroundPictureSection();
    cy.wait(5000);
    myAccountPage.clickChangeBackgroundBtn();
    cy.wait(4000);
    myAccountPage.clickChangeBackgroundSection();
    myAccountPage.selectBackgroundFile(LargeSizeFile);
  });

  it("Verify video selection functionality in the I'm Video section through upload or change.", () => {
    const football = "cypress/fixtures/videos/football.mp4";
    const cat = "cypress/fixtures/videos/cat.mp4";
    const footballVideo = football.split("/").pop(); // "football.mp4"
    const catVideo = cat.split("/").pop();

    myAccountPage.profileSection();
    myAccountPage.imVideoSection();
    cy.wait(5000);
    cy.get("body").then(($body) => {
      if ($body.find("video").length > 0) {
        myAccountPage.clickRemoveVideoBtn();
        myAccountPage.removePopupBox().should("be.visible");
        myAccountPage.clickYesBtnRemovePopup();
        cy.wait(5000);
        myAccountPage.uploadVideoText().should("be.visible");
        myAccountPage.clickUploadImVideoBtn();
        onboardSetup4.clickVideoUpload();
        onboardSetup4.videoSelect(football);
        cy.wait(50000);
        profilePage.getUploadedVideo().should("be.visible");
        profilePage
          .getUploadedVideoSrc()
          .should("have.attr", "src")
          .and("include", footballVideo);
      } else {
        myAccountPage.uploadVideoText().should("be.visible");
        myAccountPage.clickUploadImVideoBtn();
        onboardSetup4.clickVideoUpload();
        onboardSetup4.videoSelect(cat);
        cy.wait(50000);
        profilePage.getUploadedVideo().should("be.visible");
        profilePage
          .getUploadedVideoSrc()
          .should("have.attr", "src")
          .and("include", catVideo);
      }
    });
  });

  it("Verify if the video does not get removed after the user clicks 'No' in the My Video popup.", () => {
    myAccountPage.profileSection();
    myAccountPage.imVideoSection();
    cy.wait(5000);
    myAccountPage.removeVideoBtn().should("be.visible");
    myAccountPage.clickRemoveVideoBtn();
    myAccountPage.removePopupBox().should("be.visible");
    myAccountPage.clickNoBtnRemovePopup();
  });

  it("Verify if the user is able to remove the video.", () => {
    myAccountPage.profileSection();
    myAccountPage.imVideoSection();
    cy.wait(5000);
    myAccountPage.removeVideoBtn().should("be.visible");
    myAccountPage.clickRemoveVideoBtn();
    myAccountPage.removePopupBox().should("be.visible");
    myAccountPage.clickYesBtnRemovePopup();
    cy.wait(10000);
    myAccountPage.getUploadImVideoBtn().should("be.visible");
    headerMenu.dropDownMenu();
    headerMenu.selectMyProfile();
    cy.wait(5000);
    profilePage.uploadIamButton().should("be.visible");
  });

  it("Verify if the user is able to add a new video.", () => {
    const waterfall = "cypress/fixtures/videos/waterfall.mp4";
    myAccountPage.profileSection();
    myAccountPage.imVideoSection();
    cy.wait(5000);
    myAccountPage.getUploadImVideoBtn().should("be.visible");
    myAccountPage.clickUploadImVideoBtn();
    onboardSetup4.clickVideoUpload();
    onboardSetup4.videoSelect(waterfall);
    cy.wait(50000);
    profilePage.getUploadedVideo().should("be.visible");
    profilePage
      .getUploadedVideoSrc()
      .should("have.attr", "src")
      .and("include", "waterfall.mp4");
    profilePage.getUploadedVideo().then(($video) => {
      //play the video
      $video[0].play();
    });
    profilePage.getUploadedVideo().should(($video) => {
      const isPaused = $video[0].paused;
      expect(isPaused, "Video is paused").to.be.false; // Ensure the video is not paused, Video should be playing
    });
  });
  it("Verify if the user is able to change the existing video by adding a new one.", () => {
    const football = "cypress/fixtures/videos/football.mp4";
    const VideoSrc = football.split("/").pop(); // Extracts "football.mp4" from the path

    myAccountPage.profileSection();
    myAccountPage.imVideoSection();
    cy.wait(5000);
    myAccountPage.getVideo();
    myAccountPage.getvideoSrc().as("oldvideo");
    myAccountPage.changeVideoBtn().should("be.visible");
    myAccountPage.clickChangeVideoBtn();
    onboardSetup4.clickVideoUpload();
    onboardSetup4.videoSelect(football);
    cy.wait(50000);
    profilePage.getUploadedVideo().should("be.visible");
    cy.get("@oldvideo").then((oldvideo) => {
      profilePage
        .getUploadedVideoSrc()
        .should("have.attr", "src")
        .and("not.eq", oldvideo) // Ensure the new src is different from the old one
        .and("include", VideoSrc); // check new video is uploaded
    });
    profilePage.getUploadedVideo().then(($video) => {
      //play the video
      $video[0].play();
    });
    profilePage.getUploadedVideo().should(($video) => {
      const isPaused = $video[0].paused;
      expect(isPaused, "Video is paused").to.be.false; // Ensure the video is not paused, Video should be playing
    });
  });

  it("Verify Error for New Password Not Meeting Password Policy.", () => {
    const InvalidPassword = "Qa";
    myAccountPage.profileSection();
    myAccountPage.changePaswordSection();
    cy.wait(5000);
    myAccountPage.getNewPasswordTextbox(InvalidPassword).blur();
    myAccountPage.invalidNewPasswordError().should("be.visible");
  });
  it("Verify Error When New Password and Confirm Password Do Not Match.", () => {
    const Password = "Checking@123";
    const ConfirmPassword = " Testing@123";
    myAccountPage.profileSection();
    myAccountPage.changePaswordSection();
    cy.wait(5000);
    myAccountPage.getNewPasswordTextbox(Password);
    myAccountPage.getConfirmPasswordTextbox(ConfirmPassword).blur();
    myAccountPage.passwordNotMatchingError().should("be.visible");
  });

  it("Verify Error for Empty Fields.", () => {
    myAccountPage.profileSection();
    myAccountPage.changePaswordSection();
    cy.wait(5000);
    myAccountPage.selectNewPasswordTextbox().blur();
    myAccountPage.selectConfirmPasswordTextbox().blur();
    myAccountPage.emptyNewPasswordError().should("be.visible");
    myAccountPage.emptyConfirmPasswordError().should("be.visible");
  });
  it("Verify Error for Reusing Previous Password.", () => {
    myAccountPage.profileSection();
    myAccountPage.changePaswordSection();
    myAccountPage.getNewPasswordTextbox(mainPassword);
    myAccountPage.getConfirmPasswordTextbox(mainPassword);
    myAccountPage.clickconfirmPasswordBtn();
    cy.wait(10000);
  });

  it("Verify Successful Password Change with Valid Data.", () => {
    const changedPassword = "Test@124";
    myAccountPage.profileSection();
    myAccountPage.changePaswordSection();
    cy.wait(5000);
    myAccountPage.getNewPasswordTextbox(changedPassword);
    cy.wait(2000);
    myAccountPage.getConfirmPasswordTextbox(changedPassword);
    cy.wait(2000);
    myAccountPage.clickconfirmPasswordBtn();
    cy.wait(10000);
    cy.url().should("include", "login");
    loginPage.emailText(username);
    loginPage.passwordText(mainPassword);
    loginPage.loginButton();
    cy.wait(2000);
    loginPage.loginError().should("be.visible");
    loginPage.passwordText(changedPassword);
    loginPage.loginButton();
    cy.wait(10000);
    cy.url().should("include", "my-account");
    myAccountPage.profileSection();
    myAccountPage.changePaswordSection();
    cy.wait(5000);
    myAccountPage.getNewPasswordTextbox(mainPassword);
    myAccountPage.getConfirmPasswordTextbox(mainPassword);
    myAccountPage.clickconfirmPasswordBtn();
  });

  afterEach(() => {
    // Runs after each test
    cy.wait(2000);
    cy.clearCookies();
    // cy.get(".dropdown").first().click();
    // cy.get(".profileCard").contains("LOGOUT").click();
  });
});
