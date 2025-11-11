class ProfileMenu {
  siteLogo() {
    cy.get('[alt="creatics_logo"]').first().click();
  }
  dropDownMenu() {
    cy.get(".dropdown").first().click();
  }
  selectMyProfile() {
    cy.get(".profileCard").contains("MY PROFILE").click();
  }
  selectMyInbox() {
    cy.get(".profileCard").contains("MY INBOX").click();
  }
  selectMyAccount() {
    cy.get(".profileCard").contains("MY ACCOUNT").click();
  }
  selectNotification() {
    cy.get(".profileCard").contains("NOTIFICATIONS").click();
  }
  selectLogout() {
    cy.get(".profileCard").contains("LOGOUT").click();
  }
  userFirstName() {
    return cy.get(".username");
  }
}

export default new ProfileMenu();
