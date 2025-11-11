class ResetVerify {
  verificationPageTitle() {
    return cy.get(".card-title").contains("Verification Code");
  }
  verificationSubTitle() {
    return cy
      .get(".ng-untouched")
      .contaains(
        "'We've sent a code to your email account. Please enter that code below. "
      )
      .should("be.visible");
  }
  fillVerificationOTP(otp) {
    return cy.get("#exampleInputEmail1").clear().type(otp);
  }
  resendVerificationEmail() {
    return cy.get(".resend-txt").contains("Resend Email").click();
  }
  verifyOtpButton() {
    return cy.get(".btn").contains("Verify Now").click();
  }
  otpTextEmptyError() {
    return cy
      .get(".text-danger")
      .contains(" Verification code is required ")
      .should("be.visible");
  }
  invalidOtpError() {
    return cy
      .get(".err-msg")
      .contains("Please provide valid code")
      .should("be.visible");
  }
}
export default new ResetVerify();
