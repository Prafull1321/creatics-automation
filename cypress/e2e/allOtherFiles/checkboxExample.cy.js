// describe('template spec', function () {
//   this.beforeEach( () => {
//     cy.visit('https://creatics.org/',{

//       failOnStatusCode:false
//     }
//   )
//   cy.url().should('eq', 'https://creatics.org/');

//   cy.get('.cus-spacing > .ng-star-inserted > div > a').click()
//   cy.get('#email').type('saurabh.gaikwad@scalevista.com')
//   cy.get('#password').type('Saurabh@01')
//   cy.get('.btn').click()
//   })

// it('Im Fan alert assertion',()=>{

//   cy.get('.dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn').click();
//     cy.get('.profileCard > :nth-child(3) > a').click();
//     cy.get('#mat-expansion-panel-header-1').click();
//     cy.get('#mat-expansion-panel-header-6').click();
//     cy.wait(2000); // Ensure sections are expanded
//     cy.get('.checkbox-container').click()
//     cy.wait(2000)

//     cy.get('input[type="checkbox"]').filter(':checked').should('have.length', 3);

//     cy.get('input[type="checkbox"]').uncheck({ force: true });
//     cy.wait(1000);

//     cy.on('window:alert',(message)=>{
//                 // Normalize message by removing non-breaking spaces and trimming whitespace
//           const normalizedMessage = message.replace(/\u00a0/g, ' ').trim();
//           expect(["Please select only 3 options","I’m Fan of updated successfully!"]).to.contains(normalizedMessage)
//         })

//     cy.get('.checkbox-group > :nth-child(1) > .ng-valid').check()
//     cy.get('.update-button').click()
//     cy.wait(2000)
//     cy.get(':nth-child(3) > .ng-valid').check()
//     cy.get('.update-button').click()
//     cy.wait(2000)
//     cy.get(':nth-child(5) > .ng-valid').check()
//     cy.get('.update-button').click()
//     cy.wait(2000)
//     cy.get(':nth-child(7) > .ng-untouched').check()
//     cy.get('.update-button').click()
//     cy.wait(2000)

//     cy.get('.dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn').click();
//     cy.get('.profileCard > :nth-child(1) > a').click();

// })
// });

describe.skip("template spec", function () {
  beforeEach(() => {
    cy.visit("https://creatics.org/", {
      failOnStatusCode: false,
    });
    cy.url().should("eq", "https://creatics.org/");

    cy.get(".cus-spacing > .ng-star-inserted > div > a").click();
    cy.get("#email").type("saurabh.gaikwad@scalevista.com");
    cy.get("#password").type("Saurabh@02");
    cy.get(".btn").click();

    cy.on("window:alert", (message) => {
      const normalizedMessage = message.replace(/\u00a0/g, " ").trim();
      expect([
        "Please select only 3 options",
        "I’m Creator of updated successfully!",
        "I’m Fan of updated successfully!",
      ]).to.contains(normalizedMessage);
    });
  });

  it("Im Fan alert assertion", () => {
    cy.get(
      ".dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn"
    ).click();
    cy.get(".profileCard > :nth-child(3) > a").click();
    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-6").click();
    cy.wait(2000);
    cy.get(".checkbox-container").click();
    cy.wait(2000);

    // Check that three checkboxes are checked initially
    cy.get('input[type="checkbox"]')
      .filter(":checked")
      .should("have.length", 3);

    // Uncheck all checkboxes
    cy.get('input[type="checkbox"]').uncheck({ force: true });

    // Handle alert messages
    // cy.on("window:alert", (message) => {
    //   const normalizedMessage = message.replace(/\u00a0/g, " ").trim();
    //   expect([
    //     "Please select only 3 options",
    //     "I’m Fan of updated successfully!",
    //   ]).to.contains(normalizedMessage);
    // });

    // Function to check a checkbox and click update button
    const checkAndSubmit = (selector) => {
      cy.get(selector).check({ force: true });
      cy.get(".update-button").click();
      cy.wait(2000);
    };

    // Check checkboxes and click update button
    const checkboxes = [
      'input[type="checkbox"][name="Film"]',
      'input[type="checkbox"][name="Fashion"]',
      'input[type="checkbox"][name="Dance"]',
      'input[type="checkbox"][name="Music"]',
    ];

    checkboxes.forEach((selector) => {
      checkAndSubmit(selector);
    });

    // Go back to the user profile
    cy.get(
      ".dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn"
    ).click();
    cy.get(".profileCard > :nth-child(1) > a").click();

    const expectedTexts = ["Dance", "Film", "Fashion"];

    expectedTexts.forEach((expectedText) => {
      cy.contains("div.comming-soon-btn", expectedText)
        .should("be.visible")
        .invoke("text")
        .then((text) => {
          expect(text.replace(/\u00a0/g, " ").trim()).to.equal(expectedText);
        });
    });
  });

  it("Im Creator alert assertion", () => {
    cy.get(
      ".dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn"
    ).click();
    cy.get(".profileCard > :nth-child(3) > a").click();
    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-7").click();
    cy.wait(2000);
    cy.get(".checkbox-group").click();
    cy.wait(2000);

    cy.get('input[type="checkbox"]').uncheck({ force: true });

    // cy.on("window:alert", (message) => {
    //   const normalizedMessage = message.replace(/\u00a0/g, " ").trim();
    //   expect([
    //     "Please select only 3 options",
    //     "I’m Creator of updated successfully!",
    //   ]).to.contains(normalizedMessage);
    // });

    const checkAndSubmitCreator = (selector) => {
      cy.get(selector).check({ force: true });
      cy.get(".update-button").click();
      cy.wait(2000);
    };

    const checkboxesCreator = [
      'input[type="checkbox"][name="Art & Design"]',
      'input[type="checkbox"][name="Television"]',
      'input[type="checkbox"][name="Music"]',
      'input[type="checkbox"][name="Virtual Reality"]',
    ];

    checkboxesCreator.forEach((selector) => {
      checkAndSubmitCreator(selector);
    });

    cy.reload();
    cy.get("#mat-expansion-panel-header-1").click();
    cy.get("#mat-expansion-panel-header-7").click();
    cy.wait(2000);
    cy.get(".checkbox-group").click();
    cy.wait(2000);

    cy.get('input[type="checkbox"]')
      .filter(":checked")
      .should("have.length", 3);
    cy.get(
      ".dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn"
    ).click();
    cy.get(".profileCard > :nth-child(1) > a").click();

    const expectedTextsCreators = ["Art & Design", "Television", "Music"];
    expectedTextsCreators.forEach((expectedTextCreator) => {
      cy.contains("div.comming-soon-btn", expectedTextCreator)
        // .should("be.visible")
        .invoke("text")
        .then((text) => {
          expect(text.replace(/\u00a0/g, " ").trim()).to.equal(
            expectedTextCreator
          );
        });
    });
  });
});
