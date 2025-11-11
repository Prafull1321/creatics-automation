class ResetPassword {
  resetPasswordTitle() {
    return cy
      .get(".card-title")
      .contains("Password Reset")
      .should("be.visible");
  }
  fillEmailText(Email) {
    return cy.get("#email").type(Email);
  }
  emailMeButton() {
    return cy.get(".btn").click();
  }
  emailTextEmpty() {
    return cy
      .get(".text-danger")
      .contains(" Email is required ")
      .should("be.visible");
  }
  unregisteredEmailError() {
    return cy
      .get(".err-msg")
      .contains(
        "Email address is not registered, please enter a registered email OR "
      )
      .should("be.visible");
  }
  newAccountCreate() {
    return cy.get(".err-msg").contains("Create a new account").click();
  }
  emailInvalidError() {
    return cy
      .get(".text-danger")
      .contains(" Enter a valid email address ")
      .should("be.visible");
  }
}

export default new ResetPassword();
