describe.skip("template spec", function () {
  this.beforeEach(() => {
    cy.visit("https://creatics.org/", {
      failOnStatusCode: false,
    });
    cy.url().should("eq", "https://creatics.org/");

    //cy.get(".cus-spacing > .ng-star-inserted > div > a").click();
    cy.get("li[class='dropDownelemets ng-star-inserted'] a").click();
    cy.get("#email").type("saurabh.gaikwad@scalevista.com");
    cy.get("#password").type("Saurabh@02");
    cy.get(".btn").click();
  });
  const assertAlertMessage = (expectedMessage) => {
    cy.on("window:alert", (alertMessage) => {
      const normalizedMessage = alertMessage.replace(/\u00a0/g, " ").trim();
      expect([
        "Please select only 3 options",
        "I’m Fan of updated successfully!",
      ]).to.contains(normalizedMessage);
    });
  };
  //   //it('sign-in', () => {
  //     //cy.get('.cus-spacing > .ng-star-inserted > div > a').click()
  //     // cy.get('#email').type('saurabh.gaikwad@scalevista.com')
  //     // cy.get('#password').type('Saurabh@02')
  //     //cy.get('.btn').click()
  //     cy.get('.dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn').click()
  //     cy.get('.profileCard > :nth-child(1) > a').click()
  //     cy.get('.seeTresurey').click()
  //     cy.get('.public-btn').click()
  //     cy.get('.dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn').click()
  //     cy.get('.profileCard > :nth-child(5)').click()
  //     cy.url().should('eq', 'https://creatics.org/');
  //  // })

  it("My Account Name Edit", () => {
    cy.get(
      ".dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn"
    ).click();
    cy.get(".profileCard > :nth-child(3) > a").click();
    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-4").click();
    cy.wait(2000);
    cy.get("button.ng-star-inserted").click();
    cy.wait(2000);
    cy.get("#first-name").should("have.value", "Saurabh1");
    // cy.get("#last-name").type("Gaikwad1");
    // cy.get("#communication-email").type("saurabh@gmail.com");
    // cy.get("form.ng-valid > :nth-child(5)").click();
    // cy.get(".ng-valid > :nth-child(1) > span").should("have.text", "Saurabh1");
    // cy.get(":nth-child(2) > span").should("have.text", "Gaikwad1");
    // cy.get("#mat-expansion-panel-header-5").click();
    // cy.get(".ng-tns-c106-13 > :nth-child(1) > :nth-child(2) > .form-control")
    //   .clear()
    //   .type("This is just reading test");
    // cy.get(".ng-tns-c106-13 > button").click();
    // cy.get(
    //   ".dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn"
    // ).click();
    // cy.get(".profileCard > :nth-child(1) > a").click();
    // cy.get(".username").should("have.text", "Saurabh1");
    // cy.get(".welcome-sub-text > span").should(
    //   "have.text",
    //   "This is just reading test"
    // );
    // cy.get(
    //   ".dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn"
    // ).click();
    // cy.get(".profileCard > :nth-child(5)").click();
    // cy.url().should("eq", "https://creatics.org/");
  });

  // it('Im fan checkbox', ()=> {
  //   cy.get('.dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn').click()
  //   cy.get('.profileCard > :nth-child(3) > a').click()
  //   cy.get('#mat-expansion-panel-header-1').click()
  //   cy.get('#mat-expansion-panel-header-6').click()
  //   cy.wait(2000)
  //   cy.get('.checkbox-container').click()
  //   cy.wait(2000)
  //   cy.get('input[type="checkbox"]').filter(':checked').should('have.length', 3);
  //   cy.get('input[type="checkbox"][name="Film"]').check();
  //   cy.wait(2000)
  //   cy.get('.update-button').click()

  //   cy.on('window:alert',(message)=>{
  //           // Normalize message by removing non-breaking spaces and trimming whitespace
  //     const normalizedMessage = message.replace(/\u00a0/g, ' ').trim();
  //     expect(["Please select only 3 options","I’m Fan of updated successfully!"]).to.contains(normalizedMessage)
  //   })
  //   cy.get('input[type="checkbox"][name="Film"]').uncheck();
  //   cy.wait(2000)
  //   cy.get('.update-button').click()
  //   cy.wait(2000)

  //   // cy.get('input[type="checkbox"][name="Dance"]').check();
  //   // cy.wait(2000)
  //   // cy.get('input[type="checkbox"][name="Music"]').check();
  //   // cy.wait(2000)
  //   // cy.get('input[type="checkbox"]').filter(':checked').should('have.length', 3);
  //   // cy.get('.update-button').click()
  //   // cy.reload()
  //   // cy.get('#mat-expansion-panel-header-1').click()
  //   // cy.get('#mat-expansion-panel-header-6').click()
  //   //cy.get('input[type="checkbox"].ng-touched').should('have.length', 3);

  // it('should handle checkbox state and assert alert message', () => {
  //   // Open profile and expand sections
  //   cy.get('.dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn').click();
  //   cy.get('.profileCard > :nth-child(3) > a').click();
  //   cy.get('#mat-expansion-panel-header-1').click();
  //   cy.get('#mat-expansion-panel-header-6').click();
  //   cy.wait(2000); // Ensure sections are expanded
  //   cy.get('.checkbox-container').click()
  //   cy.wait(2000)

  //   // Check the number of checked checkboxes
  //   cy.get('input[type="checkbox"]').filter(':checked').then(($checkedBoxes) => {
  //     if ($checkedBoxes.length !== 3) {
  //       // Uncheck all checkboxes
  //       cy.get('input[type="checkbox"]').uncheck({ force: true });
  //       cy.wait(2000); // Wait for the state to stabilize

  //       // Check the first 3 checkboxes
  //       cy.get('input[type="checkbox"]').then(($allBoxes) => {
  //         const firstThreeBoxes = $allBoxes.slice(0, 3);
  //         firstThreeBoxes.each((index, checkbox) => {
  //           cy.wrap(checkbox).check({ force: true });
  //         });
  //       });
  //       cy.wait(2000); // Wait for the state to stabilize

  //       // Click the update button and assert alert
  //       cy.get('.update-button').click();
  //       cy.wait(2000)
  //       assertAlertMessage([
  //         "Please select only 3 options",
  //         "I’m Fan of updated successfully!"
  //       ]);
  //     } else {
  //       // If there are exactly 3 checkboxes checked
  //       cy.get('input[type="checkbox"][name="Film"]').check();
  //       cy.wait(2000)
  //       assertAlertMessage([
  //         "Please select only 3 options",
  //         "I’m Fan of updated successfully!"
  //       ]);
  //       cy.get('.update-button').click();
  //       cy.wait(2000)
  //     }
  //   });
  // });

  // it("sign my account", () => {
  //   cy.get(
  //     ".dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn"
  //   ).click();
  //   cy.get(".profileCard > :nth-child(3) > a").click();
  //   cy.get("#mat-expansion-panel-header-1").click();
  //   cy.get("#mat-expansion-panel-header-4").click();

  //   cy.get(".ng-valid > :nth-child(1) > span").then(($el1) => {
  //     const text1 = $el1.text().trim();
  //     if (text1 === "Saurabh1") {
  //       cy.get(
  //         ".dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn"
  //       ).click();
  //       cy.get(".profileCard > :nth-child(5)").click();
  //       cy.url().should("eq", "https://creatics.org/");
  //     } else {
  //       cy.get(":nth-child(2) > span").then(($el2) => {
  //         const text2 = $el2.text().trim();
  //         if (text2 === "Gaikwad") {
  //           cy.get(
  //             ".dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn"
  //           ).click();
  //           cy.get(".profileCard > :nth-child(5)").click();
  //           cy.url().should("eq", "https://creatics.org/");
  //         } else {
  //           cy.get("button.ng-star-inserted").click();
  //         }
  //       });
  //     }
  //   });
  // });

  //     cy.get('.ng-valid > :nth-child(1) > span').then($el => {
  //     const text = $el.text().trim();
  //     if (text === 'Saurabh1') {
  //     cy.get('#logoutButtonId').click();
  //     } else {
  //       cy.get('button.ng-star-inserted').click();
  //   }
  // });
});
//
