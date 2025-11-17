class MyAccountPage {
  myAccountHeading() {
    return cy.get(".heading").contains(" My Account ");
  }

  profileSection() {
    return cy
      .get("#mat-expansion-panel-header-1")
      .contains(" MY PROFILE ")
      .click();
  }
  //------------------------------------------------------------------------
  //My Information Section
  myInformationSection() {
    return cy
      .get("#mat-expansion-panel-header-4")
      .contains(" MY INFORMATION ")
      .click();
  }
  clickEditInformationBtn() {
    cy.contains(" Edit Information ").click();
  }
  clickSaveBtn() {
    cy.contains(" Save").click({ force: true });
  }
  clickCancelBtn() {
    cy.contains(" Cancel ").click();
  }
  typeFirstName(FirstName) {
    return cy.get("#first-name").clear().type(FirstName);
  }
  typeLastName(LastName) {
    return cy.get("#last-name").clear().type(LastName);
  }
  typeCommunication(Mail) {
    return cy.get("#communication-email").clear().type(Mail);
  }
  getFirstNameTextbox() {
    return cy.get("#first-name");
  }
  getLastNameTextbox() {
    return cy.get("#last-name");
  }
  getCommunicationTextbox() {
    return cy.get("#communication-email");
  }
  savedMyInformation(Name) {
    return cy.get(".form-field").contains(Name);
  }
  myInformationSubText() {
    return cy
      .get(".span-field")
      .contains(
        "Please provide a communication email address if you would like to receive notifications via another email address."
      );
  }
  //------------------------------------------------------------------------
  //My Word Section

  myWordSection() {
    return cy
      .get("#mat-expansion-panel-header-5")
      .contains(" MY WORDS ")
      .click();
  }
  myWordSubText() {
    return cy
      .get(".main-desc")
      .contains(
        "Please give us 5-7 words, or short phrases, that paint a picture of who you are and what you love or what you love to do. Please use nouns and verbs. These will appear in the fun 'MY WORDS' button on your profile. Each word/phrase must be separated by a comma."
      );
  }
  getMyWordTextbox(Word) {
    return cy.get('input[type="text"]').clear().type(Word);
  }
  clickUpdateMyWordBtn() {
    cy.contains("Update My Words").click({ force: true });
  }
  //------------------------------------------------------------------------
  //I'm Fan Section
  imFanOfSection() {
    return cy
      .get("#mat-expansion-panel-header-6")
      .contains(" I'M A FAN OF ")
      .click();
  }
  clickUpdateFanBtn() {
    cy.contains("Update I'm A Fan of ").click();
  }
  countSelectedFansOption() {
    return cy.get(`input[type="checkbox"]:checked`).its("length");
  }
  uncheckAllFansOptions() {
    return cy.get('input[type="checkbox"]').uncheck({ force: true });
  }
  uncheckedFanOption() {
    return cy.get('input[type="checkbox"]:not(:checked)').its("length");
  }
  getFanCheckboxContainer() {
    cy.get(".checkbox-container").click({ force: true });
  }
  //------------------------------------------------------------------------
  getFansOption(selector) {
    return cy.contains(selector).find('input[type="checkbox"]');
  }

  selectFansOption(selector) {
    cy.contains(selector).find('input[type="checkbox"]').check({ force: true });
    cy.wait(1000);
  }
  selectFansOptionArray(checkboxSelectors) {
    checkboxSelectors.forEach((selector) => {
      this.selectFansOption(selector);
      cy.wait(1000);
    });
  }
  //------------------------------------------------------------------------
  getCreatorsOption(selector) {
    return cy.contains(selector).find('input[type="checkbox"]');
  }
  selectCreatorsOption(selector) {
    cy.contains(selector).find('input[type="checkbox"]').check({ force: true });
    cy.wait(1000);
  }
  selectCreatorsOptionArray(checkboxSelectors) {
    checkboxSelectors.forEach((selector) => {
      this.selectCreatorsOption(selector);
      cy.wait(1000);
    });
  }

  //------------------------------------------------------------------------
  //I'm Creator Section

  imCreatorOfSection() {
    return cy
      .get("#mat-expansion-panel-header-7")
      .contains(" I'M A CREATOR OF ")
      .click();
  }

  countSelectedCreatorsOption() {
    return cy.get(`input[type="checkbox"]:checked`).its("length");
  }
  uncheckAllCreatorOptions() {
    return cy.get('input[type="checkbox"]').uncheck({ force: true });
  }
  uncheckedCreatorOption() {
    return cy.get('input[type="checkbox"]:not(:checked)').its("length");
  }
  getCreatorCheckboxContainer() {
    cy.get(".checkbox-container").click();
  }
  clickUpdateCreatorBtn() {
    cy.contains(" Update I'm A Creator of ").click();
  }
  //------------------------------------------------------------------------
  //Profile Picture Section

  profilePictureSection() {
    cy.get("#mat-expansion-panel-header-8").click();
  }
  getUploadProfilePictureSection() {
    return cy.get(".vdocaption").contains("Upload Profile Picture");
  }
  clickUploadProfilePictureSection() {
    return cy.get(".vdocaption").contains("Upload Profile Picture").click();
  }
  getChangeProfilePictureSection() {
    return cy.get(".vdocaption").contains("Change Profile Picture");
  }
  clickChangeProfilePictureSection() {
    return cy.get(".vdocaption").contains("Change Profile Picture").click();
  }
  selectProfileUploadFile(Upload) {
    cy.get('input[type="file"]').first().selectFile(Upload, {
      force: true,
    });
  }
  //----------------------
  getCroppingArea() {
    return cy.get(".cropButton.ng-star-inserted");
  }
  dragCropArea(startX, startY, endX, endY) {
    // Simulate mouse events to define the crop area
    this.getCroppingArea()
      .trigger("mousedown", { clientX: startX, clientY: startY })
      .trigger("mousemove", { clientX: endX, clientY: endY })
      .trigger("mouseup");
  }
  //----------------------
  getMoveHandle() {
    return cy.get("div[role='presentation']").click(); // Selector for the move handle
  }
  moveCropBox(startX, startY, endX, endY) {
    // Simulate dragging the move handle to reposition the crop area
    this.getMoveHandle()
      .trigger("mousedown", { clientX: startX, clientY: startY })
      .trigger("mousemove", { clientX: endX, clientY: endY })
      .trigger("mouseup");
  }
  //----------------------
  clickCropButton() {
    cy.get(".cropButton").click();
  }
  //----------------------
  cropMessage() {
    return cy.get(".required").contains("MUST CROP BEFORE SUBMITTING");
  }
  getProfileUploadBtn() {
    return cy.get(".update-button").contains("Upload Profile Picture");
  }
  clickProfileUploadBtn() {
    cy.get(".update-button").contains("Upload Profile Picture").click();
  }
  getChangeProfileBtn() {
    return cy.get(".change-button").contains("Change Profile Picture");
  }
  clickChangeProfileBtn() {
    cy.get(".change-button").contains("Change Profile Picture").click();
  }
  getRemoveProfileBtn() {
    return cy.get(".remove-button").contains("Remove Profile Picture");
  }
  clickRemoveProfileBtn() {
    cy.get(".remove-button").contains("Remove Profile Picture").click();
  }
  getUploadedProfileImg() {
    return cy.get(".profile-picture");
  }
  backgroundPictureSection() {
    cy.get("#mat-expansion-panel-header-9").click();
  }
  //---------------------------------------------------------
  //Background Change Section
  clickChangeBackgroundSection() {
    cy.get(".vdocaption").contains("Change Background Picture ").click();
  }
  selectBackgroundFile(Upload) {
    cy.get('input[type="file"]').first().selectFile(Upload, {
      force: true,
    });
  }
  getChangeBackgroundBtn() {
    return cy.get(".change-button").contains(" Change Background Picture ");
  }
  clickChangeBackgroundBtn() {
    cy.get(".change-button").contains(" Change Background Picture ").click();
  }
  getCurrentBackground() {
    return cy.get("[alt='Current Background']");
  }
  currentBackgroundSrc() {
    return cy.get("[alt='Current Background']").invoke("attr", "src");
  }
  //----------------------
  selectImage(imageNumber) {
    cy.get(`.imageItem img[alt="Image ${imageNumber}"]`).click();
  }
  //------------------------
  selectImage1() {
    cy.get('.imageItem img[alt="Image 1"]').click();
  }
  getImage1Src() {
    const image1Src = "/assets/images/background/myprofilebackground_01.jpg";
    return image1Src;
  }
  //----------------------
  selectImage2() {
    cy.get('.imageItem img[alt="Image 2"]').click();
  }
  getImage2Src() {
    const image2Src = "/assets/images/background/myprofilebackground_02.jpg";
    return image2Src;
  }
  //----------------------
  selectImage3() {
    cy.get('.imageItem img[alt="Image 3"]').click();
  }
  getImage3Src() {
    const image3Src = "/assets/images/background/myprofilebackground_03.jpg";
    return image3Src;
  }
  //----------------------

  selectImage4() {
    cy.get('.imageItem img[alt="Image 4"]').click();
  }
  getImage4Src() {
    const image4Src = "/assets/images/background/myprofilebackground_04.jpg";
    return image4Src;
  }
  //----------------------
  getUploadedBackground() {
    return cy.get(".img");
  }
  saveUploadedBackground(uploadedImage) {
    this.getUploadedImage().then(($img) => {
      const uploadedImageData = $img.attr("src"); // Extract the Base64 data from the 'src' attribute
      cy.wrap(uploadedImageData).as(uploadedImage); // Save it using Cypress alias
    });
  }
  //------------------------------------------------------------------------
  //I'm Video Upload Section

  imVideoSection() {
    return cy
      .get("#mat-expansion-panel-header-10")
      .contains(" I AM VIDEO ")
      .click();
  }
  getUploadImVideoBtn() {
    return cy.contains(" Upload I Am Video ");
  }
  clickUploadImVideoBtn() {
    return cy.contains(" Upload I Am Video ").click();
  }

  changeVideoBtn() {
    return cy.contains("Change I Am Video");
  }

  clickChangeVideoBtn() {
    return cy.contains("Change I Am Video").click();
  }

  removeVideoBtn() {
    return cy.contains("Remove I Am Video");
  }
  clickRemoveVideoBtn() {
    return cy.contains("Remove I Am Video").click();
  }
  getVideo() {
    return cy.get("video[controls]");
  }
  getvideoSrc() {
    return cy.get("video[controls]").invoke("attr", "src");
  }
  removePopupBox() {
    return cy.get(".mat-mdc-dialog-surface.mdc-dialog__surface");
  }
  clickNoBtnRemovePopup() {
    return cy.get(".btn").contains("No").click();
  }
  clickYesBtnRemovePopup() {
    return cy.get(".btn").contains("Yes").click();
  }
  uploadVideoText() {
    return cy
      .get(".main-text")
      .contains("Please click on the button to upload your I am Video.");
  }

  //------------------------------------------------------------------------
  //Change Password Section

  changePaswordSection() {
    cy.get("#mat-expansion-panel-header-11").click();
  }
  selectNewPasswordTextbox() {
    return cy.get("#newPassword").clear();
  }
  getNewPasswordTextbox(NewPAss) {
    return cy.get("#newPassword").clear().type(NewPAss);
  }
  selectConfirmPasswordTextbox() {
    return cy.get("#confirmPassword").clear();
  }
  getConfirmPasswordTextbox(ConfirmPass) {
    return cy.get("#confirmPassword").clear().type(ConfirmPass);
  }
  getConfirmPasswordBtn() {
    return cy.contains("Confirm Password");
  }
  clickconfirmPasswordBtn() {
    return cy.contains("Confirm Password").click();
  }
  passwordNotMatchingError() {
    return cy.get(".error-msg").contains("Passwords do not match");
  }

  emptyConfirmPasswordError() {
    return cy.get(".error-msg").contains("Confirmation password is required.");
  }

  emptyNewPasswordError() {
    return cy.get(".error-msg").contains("Password is required.");
  }

  invalidNewPasswordError() {
    return cy
      .get(".error-msg")
      .contains("Password must be at least 6 characters long.");
  }

  //------------------------------------------------------------
  //More Option

  moreOptionSection() {
    return cy
      .get(".mat-expansion-panel-header-title")
      .contains(" MORE OPTIONS ")
      .click();
  }
  removeButton() {
    return cy.get("#remove-btn1").click();
  }

  removePopup() {
    return cy.get(".modal-content");
  }
  closeRemovePopup() {
    return cy.get(".btn-close").click();
  }
  removePopupNotBtn() {
    return cy.get(".btn").contains("No").click();
  }
  removePopupYesBtn() {
    return cy.get(".btn").contains("Yes").click();
  }
  removePopupConfirmTextbox(Confirm) {
    return cy.get("#confirmationText").type(Confirm);
  }
  removePopupCancelBtn() {
    return cy.get(".btn").contains("Cancel").click();
  }
  removePopupRemoveBtn() {
    return cy.get("#remove-btn").contains("Remove Account");
  }
  selectRemoveBtnPopup() {
    return cy.get("#remove-btn").contains("Remove Account").click();
  }
  removePopupTextError() {
    return cy.get(".ng-star-inserted").contains("Invalid Input...");
  }
  popupAfterUserRemoved() {
    return cy.get(".modal-header");
  }
  closeBtnRemoved2Popup() {
    return cy.get(".btn-close").contains("X").click();
  }
  textInRemoved2Popup() {
    return cy.get(".fs-5").contains("Your account has been removed");
  }
  // gotItBtnRemoved2Popup() {
  //   return cy.get(".d-flex").contains("Got it").click();
  // }
}
export default new MyAccountPage();
