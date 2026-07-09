class OnboardSetup1 {
  clickWelcomeGetStarted() {
    cy.contains("Welcome to Creatics").should("be.visible");
    cy.contains("button", "Get Started").should("be.visible").click();
  }

  getPageHeading() {
    return cy
      .get(".heading1")
      .contains("Welcome to Creatics - Let's Get Started!");
  }

  clickStep1Skip() {
    cy.get(".skipbtn").click();
  }

  clickUploadProfile() {
    cy.get(".imgUpload").click();
  }
  uploadProfileButton() {
    return cy.get(".imgUpload");
  }
  //----------------------
  getProfileImageSelect(filePath) {
    cy.get('input[type="file"]').selectFile(filePath, { force: true });
  }
  //----------------------
  getCroppingArea() {
    return cy.get("div[role='presentation']");
  }
  dragCropArea(startX, startY, endX, endY) {
    this.getCroppingArea()
      .trigger("mousedown", { clientX: startX, clientY: startY, force: true })
      .trigger("mousemove", { clientX: endX, clientY: endY, force: true })
      .trigger("mouseup", { force: true });
  }
  //----------------------
  getMoveHandle() {
    return cy.get(".move");
  }
  moveCropBox(startX, startY, endX, endY) {
    this.getMoveHandle()
      .trigger("mousedown", { clientX: startX, clientY: startY, force: true })
      .trigger("mousemove", { clientX: endX, clientY: endY, force: true })
      .trigger("mouseup", { force: true });
  }
  //----------------------
  clickCropButton() {
    cy.get(".cropButton").click();
  }
  //----------------------
  getUploadedImage() {
    return cy.get(".img");
  }
  saveUploadedImage(uploadedImage) {
    this.getUploadedImage().then(($img) => {
      const uploadedImageData = $img.attr("src"); // Extract the Base64 data from the 'src' attribute
      cy.wrap(uploadedImageData).as(uploadedImage); // Save it using Cypress alias
    });
  }
  //----------------------
  getWordsTextbox(wordtext) {
    return cy.get(".inputbox1").clear().type(wordtext);
  }

  myWordTextboxValue() {
    return cy.get(".inputbox1");
  }
  getWordsTextCount() {
    return cy.get(".inputbox1").invoke("val");
  }

  clickProfileSubmit() {
    return cy.get(".submitbtn").click();
  }
  submitButtonState() {
    return cy.get(".submitbtn");
  }
}

class OnboardSetup2 {
  clickBackArrowBtn() {
    return cy.get(".backArrow").click();
  }
  backArrowBtn() {
    return cy.get(".backArrow");
  }

  step2PageHeading() {
    cy.get(".heading1").contains("Share Your Interests");
  }

  getNotificationPopup() {
    return cy.get(".custom-dialog-container.ng-tns-c3692996703-0.ng-star-inserted");
  }

  clickPopupLink() {
    cy.get(".ng-tns-c34-0").click();
  }

  clickPopupGotItButton() {
    cy.get(".custom-button").click();
  }

  clickBackButtonOnInterest() {
    cy.get(".backArrow").click();
  }

  clickSkipInterest() {
    cy.get(".skipbtn").click();
  }

  getFansElements() {
    return cy.get(".slider");
  }

  fansBackgroundColorCount(expectedCount, color) {
    let count = 0;
    cy.get(".slider")
      .each(($el) => {
        cy.wrap($el)
          .invoke("css", "background-color")
          .then((bgColor) => {
            if (bgColor === color) {
              // Check if the background color matches
              count++;
            }
          });
      })
      .then(() => {
        expect(count).to.equal(expectedCount); // Assert that the count matches the expected count
      });
  }
  creatorsBackgroundColorCount(expectedCount, color) {
    let count = 0;
    cy.get(".slider1")
      .each(($el) => {
        cy.wrap($el)
          .invoke("css", "background-color")
          .then((bgColor) => {
            if (bgColor === color) {
              // Check if the background color matches
              count++;
            }
          });
      })
      .then(() => {
        expect(count).to.equal(expectedCount); // Assert that the count matches the expected count
      });
  }

  //-----------------------
  selectFanOption(selectImFan) {
    const options = Array.isArray(selectImFan) ? selectImFan : [selectImFan];
    cy.get(".slider")
      .filter((index, element) => {
        const imFanText = Cypress.$(element).text().trim();
        return options.includes(imFanText);
      })
      .then((filteredElements) => {
        cy.wrap(filteredElements).each((el) => {
          cy.wrap(el).click();
        });
      });
  }
  //-----------------------
  selectCreatorOption(selectImCreator) {
    const options = Array.isArray(selectImCreator)
      ? selectImCreator
      : [selectImCreator];
    cy.get(".slider1")
      .filter((index, element) => {
        const imCreatorText = Cypress.$(element).text().trim();
        return options.includes(imCreatorText);
      })
      .then((filteredElements) => {
        cy.wrap(filteredElements).each((el) => {
          cy.wrap(el).click();
        });
      });
  }
  //-----------------------
  clickInterestSubmit() {
    cy.get(".submitbtn").click();
  }
  clickableFansElements(expectedCount) {
    cy.get(".slider")
      .closest("label")
      .find('input[type="checkbox"].ng-valid')
      .should("have.length", expectedCount);
  }
  clickableCreatorsElements(expectedCount) {
    cy.get(".slider1")
      .closest("label")
      .find('input[type="checkbox"].ng-valid')
      .should("have.length", expectedCount);
  }
  fansDisabledOption(count) {
    cy.get(".slider")
      .closest("label")
      .find('input[type="checkbox"][disabled]') // Filter checkboxes that are selected
      .should("have.length", count);
  }
  creatorsDisabledOption(count) {
    cy.get(".slider1")
      .closest("label")
      .find('input[type="checkbox"][disabled]') // Filter checkboxes that are selected
      .should("have.length", count);
  }
}

class OnboardSetup3 {
  treasuryPageTitle() {
    return cy.get(".heading1");
  }
  //----------------------
  clickSkipTreasury() {
    cy.get(".skipbtn").click();
  }
  //----------------------
  enterTitleText(text) {
    cy.get("#title").first().clear().type(text);
  }
  getTitleTextCount() {
    return cy.get("#title").invoke("val");
  }
  getTitleTextboxValue() {
    return cy.get("#title");
  }
  //----------------------
  selectCategoryOption(text) {
    cy.get("#category").select(text);
  }
  getCategoryText() {
    return cy.get("#category").find("option:selected");
  }
  optionSelectedCategory() {
    return cy.get("#category option:selected");
  }
  //----------------------
  enterDescriptionText(text) {
    return cy.get("#description").clear().type(text);
  }
  getDescriptionTextCount() {
    return cy.get("#description").invoke("val");
  }
  getDescriptionTextValue() {
    return cy.get("#description");
  }

  //----------------------
  enterLinkText(text) {
    cy.get('input[name="link"]').clear().type(text);
  }
  clearLinkText() {
    cy.get('input[name="link"]').clear();
  }
  invalidLinkError() {
    return cy.get(".alert").contains("Please provide valid URL");
  }
  emptyLinkError() {
    return cy.get(".alert").contains("Please provide URL");
  }
  getLinkTextValue() {
    return cy.get('input[name="link"]');
  }
  //----------------------
  clickImageUploadButton() {
    cy.get(".imgUpload").click();
  }
  uploadImageButton() {
    return cy.get(".imgUpload");
  }
  //----------------------
  selectTreasuryImage(text) {
    cy.get('input[type="file"]').selectFile(text, { force: true });
  }
  //----------------------
  getCroppingArea() {
    return cy.get("div[role='presentation']");
  }
  //----------------------
  dragCropArea(startX, startY, endX, endY) {
    this.getCroppingArea()
      .should("be.visible")
      .trigger("mousedown", { clientX: startX, clientY: startY, force: true })
      .trigger("mousemove", { clientX: endX, clientY: endY, force: true })
      .trigger("mouseup", { force: true });
  }
  //----------------------
  getMoveHandle() {
    return cy.get(".move");
  }
  moveCropBox(startX, startY, endX, endY) {
    this.getMoveHandle()
      .trigger("mousedown", { clientX: startX, clientY: startY, force: true })
      .trigger("mousemove", { clientX: endX, clientY: endY, force: true })
      .trigger("mouseup", { force: true });
  }
  //----------------------
  clickTreasuryImageCrop() {
    cy.get(".cropButton").click();
  }
  //----------------------
  getUploadedImage() {
    return cy.get(".imgClass");
  }
  saveUploadedImage(uploadedImage) {
    this.getUploadedImage().then(($img) => {
      const uploadedImageData = $img.attr("src"); // Extract the Base64 data from the 'src' attribute
      cy.wrap(uploadedImageData).as(uploadedImage); // Save it using Cypress alias
    });
  }
  //----------------------
  clickTreasurySubmit() {
    return cy.get(".submitbtn").click();
  }
  //----------------------
  getSubmitButton() {
    return cy.get(".submitbtn");
  }
  //----------------------
  clickTreasuryBackButton() {
    cy.get(".backArrow").click();
  }
  //----------------------
}

class OnboardSetup4 {
  clickSkipVideoPage() {
    return cy.get(".skipbtn").click();
  }
  communityHeading() {
    return cy.get(".heading1").contains("Connect with Community");
  }
  communnitySubText() {
    return cy
      .get(".textClass")
      .contains(
        "Upload a short I Am Video that speaks to something(s) you love or do. This can be anything such as a video about cooking, your dog, or something you love to create or experience."
      );
  }
  communityPageBack() {
    cy.get(".backArrow").click();
  }
  clickVideoUpload() {
    return cy.get(".submitbtn").contains("Upload").click();
  }
  clickReadMore() {
    return cy.get('button[type="button"]').contains(" Read More ").click();
  }
  clickReadLess() {
    return cy.get('button[type="button"]').contains(" Read Less ").click();
  }
  videoSelect(video) {
    cy.get("input[type=file]", { timeout: 120000 }).selectFile(video, {
      force: true,
    });
  }
  readMoreSubText() {
    return cy
      .get(".limitTextHeight2")
      .contains(
        " Share your unique personality with the community by uploading a short video about yourself. Whether it's a quick selfie or a creative masterpiece, we want to see what you love and what makes you, well, you! Show us your passions, hobbies, or simply your amazing personality. "
      );
  }
  subTextHidden() {
    return cy.get(".limitTextHeight");
  }
  clickVideoCreate() {
    cy.get(".submitbtn").contains("Create");
  }
}

// Export all classes
export const onboardSetup1 = new OnboardSetup1();
export const onboardSetup2 = new OnboardSetup2();
export const onboardSetup3 = new OnboardSetup3();
export const onboardSetup4 = new OnboardSetup4();
