class ResetConfirm {
  confirmationPageTitle() {
    return cy
      .get(".card-title")
      .contains("Reset Password")
      .should("be.visible");
  }
  confirmSubtitle() {
    cy.get(".card-body")
      .contains(
        "Please enter and re-enter your new password. Must be between 6 and 30 characters in length. "
      )
      .should("be.visible");
  }
  fillResetPassword(password) {
    return cy.get("#exampleInputEmail1").first().clear().type(password);
  }
  fillConfirmPassword(confirmpass) {
    return cy
      .get("input[formcontrolname='confrimPassword']")
      .clear()
      .type(confirmpass);
  }
  confirmVerifyButton() {
    cy.get(".btn").contains("Verify").should("be.visible").click();
  }
  emptyResetPassword() {
    return cy
      .get(".text-danger")
      .contains(" Password is required ")
      .should("be.visible");
  }
  emptyConfirmPassword() {
    return cy
      .get(".text-danger")
      .contains(" Confirm Password is required ")
      .should("be.visible");
  }
  passwordMismatchError() {
    return cy
      .get(".text-danger")
      .contains(" Both passwords are not the same ")
      .should("be.visible");
  }
  invalidResetPassword() {
    return cy
      .get("input[formcontrolname='password'] + span.text-danger")
      .contains(" Password must between 6 to 30 charactes long ")
      .should("be.visible");
  }

  invalidConfirmPassword() {
    return cy
      .get("input[formcontrolname='confrimPassword'] + span.text-danger")
      .contains(" Password must between 6 to 30 charactes long ")
      .should("be.visible");
  }
  oldPasswordError() {
    return cy
      .get(".err-msg")
      .contains("Cannot use current password again.")
      .should("be.visible");
  }
}
export default new ResetConfirm();
