class ProfilePage {
  getFullNameText() {
    return cy.get(".welcome-text");
  }
  getMyWordText() {
    return cy.get(".welcome-sub-text");
  }

  //----------------------------------------------------
  imageCircle() {
    return cy.get(".img-circle");
  }
  clickChangeProfileBtn() {
    return cy.get(".span-content").click();
  }
  uploadProfilePopup() {
    return cy.get(".mat-mdc-dialog-surface mdc-dialog__surface");
  }
  uploadProfilePopupTitle() {
    return cy.get("vdocaption ng-star-inserted");
  }
  clickProfilePopupUpload() {
    return cy.get(".icons").click();
  }
  selectUploadProfilePopupImage(ImageFile) {
    return cy.get(".form-control").selectFile(ImageFile, { force: true });
  }
  getUploadProfilePopupCroppedImage() {
    return cy.get(".move").click();
  }
  clickUploadedProfilePopupCropBtn() {
    return cy.get(".cropButton").contains(" CROP ").click();
  }
  clickUploadProfilePopupDismissBtn() {
    return cy.get(".mat-button-wrapper").click();
  }
  uploadProfilePopupSaveBtn() {
    return cy.get(".btn btn-primary save-treasury-btn universal-button-gradient").contains("Save");
  }
  clickUploadProfilePopupSaveBtn() {
    return cy.get(".btn").contains("Save").click();
  }
  //--------------------------
  banner() {
    return cy.get(".banner");
  }
  getProfileBannerBackground() {
    return cy
      .get(".banner")
      .invoke("css", "background-image")
      .then((background) => {
        return background.replace(/^url\(["']?/, "").replace(/["']?\)$/, "");
      });
  }

  clickChangeBackgroundBtn() {
    cy.get(".change-cover-tag").contains("Change Cover").click();
  }
  selectBackgroundFile(ImageFile) {
    return cy.get('[type="file"]').selectFile(ImageFile, { force: true });
  }
  //--------------------------
  getFanText(expectedTextFan) {
    return cy
      .contains("div.award-header", "I'm a fan of:")
      .next() // Move to the next sibling (the container with the buttons)
      .contains("div.comming-soon-btn", expectedTextFan);
    // .invoke("text"); // Simply return the text
  }

  getCreatorText(expectedTextCreator) {
    return cy
      .contains("div.award-header", "I'm a creator of:")
      .next() // Move to the next sibling (the container with the buttons)
      .contains("div.comming-soon-btn", expectedTextCreator);
    // .invoke("text"); // Simply return the text
  }
  getAwardsSection() {
    return cy.contains("div.award-header", "Awards & Badges");
  }

  creatorEmptyButton() {
    return cy.get(".comming-soon-btn").contains("Coming Soon ");
  }

  fanEmptyButton() {
    return cy.get(".comming-soon-btn").contains("Coming Soon ");
  }

  userIcon() {
    return cy.get("img.user-icon");
  }
  //--------------------------------------------------------------------
  treasury(treasuryTitle) {
    return cy.get(".treasuryTitle-name").contains(treasuryTitle);
  }
  clickTreasuryCard(treasuryTitle) {
    return cy.get(".treasuryTitle-name").contains(treasuryTitle).click();
  }
  treasurySubName(SubName) {
    return cy.get(".sub-name").contains(SubName);
  }
  treasuryCards() {
    return cy.get("#tresures .card");
  }
  seeTreasuryBtn() {
    return cy.get(".seeTresurey").contains("  SEE MY TREASURY");
  }
  addNewTreasuryCards() {
    return cy.get('[alt="..."]');
  }
  clickNewTreasuryCards() {
    return cy.get('[alt="..."]').click();
  }
  treasuryPopup() {
    return cy.get(".mat-mdc-dialog-surface.mdc-dialog__surface");
  }
  treasuryPopupHeader() {
    return cy.get(".mat-dialog-title").contains("Upload a Treasure");
  }
  treasuryPopupSubText() {
    return cy
      .get(".mat-dialog-content")
      .contains(
        " Treasures are creative works you love, including your own or those you've discovered. Add your favorite creations, such as books, movies, tech, art, and music, to your Treasury. Start by sharing your first Treasure now."
      );
  }
  treasuryPopupCategory() {
    return cy.get(".check-group input[type='radio']");
  }
  selectCategoryInTreasuryPopup(TreasuryText) {
    return cy.get(".check-group input[type='radio']").check(TreasuryText);
  }
  typeTreasuryPopupTitleText(TitleText) {
    return cy.get("#title").clear().type(TitleText);
  }
  treasuryPopupTitleCharater() {
    return cy.get("#title");
  }
  clickTreasuryPopupImageOption() {
    return cy.get(".vdocaption").contains(" Upload Treasury Picture ").click();
  }
  clickTreasuryPopupChangeImage() {
    return cy.get(".vdocaption").contains(" Change Treasury Picture ").click();
  }

  selectTreasuryPopupImage(ImageFile) {
    return cy.get("#fileupload").selectFile(ImageFile, { force: true });
  }
  getTreasuryPopupCroppedImage() {
    return cy.get("div[role='presentation']").click();
  }
  cropTreasuryPopupImage() {
    return cy.get(".btn").contains("CROP").click();
  }

  getCroppedTreasuryPopupImage() {
    return cy.get(".items-center").next();
  }
  typeTreasuryPopupDescription(Description) {
    return cy.get('[formcontrolname="description"]').clear().type(Description);
  }
  treasuryPopupDescriptionCharater() {
    return cy.get('[formcontrolname="description"]');
  }
  getTreasuryPopupLinkTextBox() {
    return cy.get("#link");
  }
  typeTreasuryPopupLinkText(linktext) {
    return cy.get("#link").clear().type(linktext);
  }
  treasuryPopupLinkCharater() {
    return cy.get("#link");
  }
  emptyLinkErrroTreasuryPopup() {
    return cy.get(".text-danger").contains(" URL is required ");
  }
  invalidLinkErrroTreasuryPopup() {
    return cy.get(".text-danger").contains(" Enter a valid URL ");
  }
  treasuryPopupCloseBtn() {
    return cy.get(".btn").contains("Close");
  }
  clickTreasuryPopupCloseBtn() {
    return cy.get(".btn").contains("Close").click();
  }
  treasuryPopupSaveBtn() {
    return cy.get(".btn").contains("Save");
  }
  clickTreasuryPopupSaveBtn() {
    return cy.get(".btn").contains("Save").click();
  }
  //--------------------------------
  treasuryConfirmPopup() {
    return cy.get(".mat-mdc-dialog-surface.mdc-dialog__surface");
  }
  treasuryConfirmPopupNoOption() {
    return cy.get("button[color='primary']").click();
  }
  treasuryConfirmPopupYesOption() {
    return cy.get("button[type='submit']").click();
  }
  confirmPopupHideQuestion() {
    return cy
      .get(".mat-mdc-dialog-surface.mdc-dialog__surface")
      .contains("Are you sure you want to hide this Treasure?");
  }

  confirmPopupUnHideQuestion() {
    return cy
      .get(".mat-mdc-dialog-surface.mdc-dialog__surface")
      .contains("Are you sure you want to un-hide this Treasure?");
  }
  confirmpopupDeleteQuestion() {
    return cy
      .get(".mat-mdc-dialog-surface.mdc-dialog__surface")
      .contains("Are you sure you want to delete this Treasure?");
  }

  clickCardsHideOption(treasuryTitle) {
    return cy
      .get(".treasuryTitle-name")
      .contains(treasuryTitle)
      .parents(".card")
      .find('.option-icons [title="Hide"]')
      .click();
  }
  treasuryHideOption(treasuryTitle) {
    return cy
      .get(".treasuryTitle-name")
      .contains(treasuryTitle)
      .parents(".card")
      .find('.option-icons [title="Hide"]');
  }
  //-------------------------------------
  clickCardsUnHideOption(treasuryTitle) {
    return cy
      .get(".treasuryTitle-name")
      .contains(treasuryTitle)
      .parents(".card")
      .find('.option-icons [title="Un-Hide"]')
      .click();
  }
  treasuryUnHideOption(treasuryTitle) {
    return cy
      .get(".treasuryTitle-name")
      .contains(treasuryTitle)
      .parents(".card")
      .find('.option-icons [title="Un-Hide"]');
  }

  //-------------------------------------
  treasuryCardDeleteOption(treasuryTitle) {
    return cy
      .get(".treasuryTitle-name")
      .contains(treasuryTitle)
      .parents(".card")
      .find('.option-icons [title="Delete"]');
  }
  clickCardsDeleteOption(treasuryTitle) {
    return cy
      .get(".treasuryTitle-name")
      .contains(treasuryTitle)
      .parents(".card")
      .find('.option-icons [title="Delete"]')
      .click();
  }
  treasuryDeletePopup() {
    return cy.get(".mat-mdc-dialog-surface mdc-dialog__surface");
  }
  treasuryDeleteNoOption() {
    return cy.get(".mat-button-wrapper").click();
  }
  treasuryDeleteYesOption() {
    return cy.get(".btn").contains("Yes").click();
  }
  clickCardsEditOption(treasuryTitle) {
    return cy
      .get(".treasuryTitle-name")
      .contains(treasuryTitle)
      .parents(".card")
      .find('.option-icons [title="Edit"]')
      .click();
  }
  treasuryCardEditOption(treasuryTitle) {
    return cy
      .get(".treasuryTitle-name")
      .contains(treasuryTitle)
      .parents(".card")
      .find('.option-icons [title="Edit"]');
  }

  treasuryAccessPopup() {
    return cy.get(".mat-mdc-dialog-surface.mdc-dialog__surface");
  }
  treasuryAccessPopupTitle(popupTitle) {
    return cy.get("mat-mdc-dialog-title mdc-dialog__title popup-title ng-star-inserted").contains(popupTitle);
  }
  treasuryAccessPopupSubText(Subtext) {
    return cy.get(".desc-dialog").contains(Subtext);
  }
  clickTreasuryAccessPopupDismissBtn() {
    return cy.get(".mdc-button__label").click();
  }
  treasuryAccessPopupImage() {
    return cy.get("#imgForTreasury");
  }
  clickTreasuryAccessPopupLink() {
    return cy.contains("link").click();
  }

  //--------------------------------------------------------------------
  uploadIamButton() {
    return cy.get(".btn-iam").contains("Upload IAM video ");
  }
  clickUploadIamButton() {
    return cy.get(".btn-iam").contains("Upload IAM video ").click();
  }
  getUploadedVideo() {
    return cy.get("#video1");
  }
  getUploadedVideoEditBtn() {
    return cy.get(".videoEdit");
  }
  clickEditUploadedVideo() {
    cy.get(".videoEdit").click();
  }
  getUploadedVideoSrc() {
    return cy.get("#video1 source");
  }
  //----------------------------------------------------
  clickPublicButton() {
    return cy.get(".public-btn").contains("Public View").click();
  }
  getPublicButton() {
    return cy.get(".public-btn").contains("Public View");
  }
  clickPrivateButton() {
    return cy.get(".public-btn").contains("Private View").click();
  }
  getPrivateButton() {
    return cy.get(".public-btn").contains("Private View");
  }
}

export default new ProfilePage();
