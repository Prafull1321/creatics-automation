describe(   "Verify AI Login Test Cases", () => {
    const Testing_URL = "https://testing.creatics.org/";

    it("Verify AI Login flow", () => {
        cy.prompt([
            'Visit the Testing URL and click on the "Sign In" button.',
            'Identify the email input field and enter a valid email address "dhirenparmar703@gmail.com".',
            'Identify the password input field and enter a valid password "Test@124".',
            'Identify the "Sign In" button and click it.'
            //'Assert that the user is successfully logged in by checking for a user profile name as Dhiren on homepage.'
        ])
    })
})