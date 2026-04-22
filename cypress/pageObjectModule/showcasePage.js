class showcasePage {

    navigateToFeaturesPage(){
        cy.contains("Features").should("be.visible").click();
    }

    verifyShowcasePage() {
        cy.contains("Features").should("be.visible").click();
        

        //cy.get("button[class='movienameList']").last().click();

    // Get selected movie text
        cy.get("[class='movienameList selectedMovie']")
        .invoke("text")
        .then((expectedMovie) => {

        const expMovieText = expectedMovie.trim();

        // Get description heading text
            cy.get("div[class='description-div'] h1")
            .invoke("text")
            .then((actualText) => {

            const actualMovieText = actualText.trim();

            expect(actualMovieText).to.eq(expMovieText);
            cy.log(`Expected: ${expMovieText}`);
            cy.log(`Actual: ${actualMovieText}`);
            });
        });
    }

    verifyMovieDetails(){
        cy.get("button[class='movienameList']").first().click();

    // Get selected movie text
        cy.get("[class='movienameList selectedMovie']")
        .invoke("text")
        .then((expectedMovie) => {

        const expMovieText = expectedMovie.trim();

        // Get description heading text
            cy.get("div[class='description-div'] h1")
            .invoke("text")
            .then((actualText) => {

            const actualMovieText = actualText.trim();

            expect(actualMovieText).to.eq(expMovieText);
            cy.log(`Expected: ${expMovieText}`);
            cy.log(`Actual: ${actualMovieText}`);
            });
        });
    }

    navigateToWatchPage(){
        //cy.get("div[id='movies1037']").click();
        cy.get('[class="movie_button ng-star-inserted"]').contains("Watch").click();
        cy.wait(6000);
        cy.get('iframe[id="iframeid1"]').click();
        cy.wait(5000);
    }

    naviagteToMoviePage(){
        cy.contains('Features').click();
        cy.get('button[class="movie_button"]').contains("Movie Page").click();
    }

    addShowcaseMovieToWatchlist(){
        cy.contains('Features').click();
        cy.get('button[class="pass-btn ng-star-inserted"]').should('be.visible').click();

        cy.on('window:confirm', (text) => {
        return true; // clicks OK
        });

        cy.get('button[class="watchlist-button"]').contains("Go to My Watchlist").click();
    }

    removeMovieFromWatchlist(){
        
        cy.get('button[class="dynamic-button"]').contains(" Showcase Screenings ").click();
        
        cy.get('i[class="bi bi-trash delete"]').first().click({ force: true });

        cy.on('window:confirm', () => true);

        //cy.contains('No Showcase Movies Added Yet', { timeout: 15000 }).should('be.visible');
    }

    verifyMovieRate(){
        cy.get('button[type="button"]').contains(" Rate ").click();
        cy.wait(1000);
        cy.contains("My Ratings").should("be.visible");
        cy.get('input[formcontrolname="rateValue"]').type(8);
        cy.get('button[class="btnclose ng-star-inserted"]').contains(" Rate ").click();
        cy.contains(" Thank You for Your Rating! You have rated 8 for this movie ").should("be.visible");
        cy.get('button[type="button"]').contains("Close").click();
    }

    validateRatingSubmitted(){
        cy.get('button[type="button"]').contains(" Rate ").click();
        cy.contains(" Thank You for Your Rating! You have rated 8 for this movie ").should("be.visible");
    }

    verifyTrailerPlayAndPause(){
        cy.get('div[class="vp-target content-area-sibling-enabled hidden"]').click();
        cy.wait(5000);
        cy.get('video[crossorigin="anonymous"]').then(($video) => {
          const video = $video[0]
          video.muted = true
          video.play()
          cy.wait(4000);
          expect(video.paused).to.eq(false)
          video.pause()
          expect(video.paused).to.eq(true)
          })
    }

    verifyCastCrewAndMoreInfo(){
        cy.contains("Principal Cast").should("be.visible");
        cy.contains("Director(s)").should("be.visible");
        cy.contains("Screenwriter(s)").should("be.visible");
        cy.get('[class="nav-link"]').contains("More Info").click();
        cy.contains("Country of Origin").should("be.visible");
        cy.contains("Languages").should("be.visible");
        cy.contains("Year of Release").should("be.visible");
    }

    // --- Buy Flow ---

    // Iterates through the Features movie list to find a movie with an
    // available Buy button, selects it, and captures the title.
    selectBuyableMovieAndCapture(alias = "selectedMovie"){
        cy.contains("Features").should("be.visible").click();
        cy.wait(2000);

        // Count the movies, then iterate using index-based re-queries
        // to avoid stale DOM references.
        cy.get("button[class='movienameList']").its('length').then((count) => {
            const tryMovie = (index) => {
                if (index >= count) {
                    throw new Error("No showcase movie with a Buy button found");
                }
                // Re-query the element each time to avoid detached DOM errors.
                cy.get("button[class='movienameList']").eq(index).click();
                cy.wait(1000);

                cy.get('body').then(($body) => {
                    if ($body.find("button:contains('Buy')").length > 0) {
                        cy.get("[class='movienameList selectedMovie']")
                            .invoke("text")
                            .then((text) => cy.wrap(text.trim()).as(alias));
                    } else {
                        tryMovie(index + 1);
                    }
                });
            };
            tryMovie(0);
        });
    }

    // Click the Buy button on the currently displayed showcase movie.
    clickBuyButton(){
        cy.contains('button', 'Buy', { timeout: 15000 })
            .should('be.visible')
            .click();
    }

    // Clicks Buy Now on the ticket purchase modal, confirms the Stripe redirect,
    // applies the promotional code on the Stripe checkout page, and completes.
    applyPromoCodeAndBuy(promoCode){
        // Step 1 — Click Buy Now on the initial ticket modal.
        cy.contains('button', 'Buy Now', { timeout: 15000 })
            .should('be.visible')
            .click();

        // Step 2 — Pre-register the cross-origin exception handler so it's
        // in place before the Stripe page loads and throws expressCheckout error.
        cy.origin('https://checkout.stripe.com', () => {
            Cypress.on('uncaught:exception', () => false);
        });

        // Step 3 — Confirm the Stripe redirect dialog ("Please click OK to proceed").
        cy.contains('button', 'OK', { timeout: 15000 })
            .should('be.visible')
            .click();

        // Step 4 — Interact with the Stripe checkout page (cross-origin).
        cy.origin('https://checkout.stripe.com', { args: { promoCode } }, ({ promoCode }) => {
            // Click "Add promotion code" to reveal the input.
            cy.contains('Add promotion code', { timeout: 30000 }).click();

            // Enter the promotional code.
            cy.get('input[name="promotionCode"]', { timeout: 10000 })
                .should('be.visible')
                .type(promoCode);

            // Apply the promotion code and wait for discount to reflect.
            cy.contains('Apply', { timeout: 10000 }).click();
            cy.contains('100% off', { timeout: 10000 }).should('be.visible');

            // Click "Complete order" (Stripe shows this when total is $0).
            cy.get('.SubmitButton', { timeout: 15000 })
                .should('not.be.disabled')
                .click();
        });
    }

    // Validates that a ticket matching the captured movie title exists in
    // the My Tickets modal. Scoped to the modal so it doesn't match the
    // background movie list (which is covered by the overlay).
    validateTicketInMyTickets(alias = "selectedMovie"){
        cy.get(`@${alias}`).then((movieTitle) => {
            cy.get('ngb-modal-window', { timeout: 15000 })
                .should('be.visible')
                .contains(movieTitle)
                .should('be.visible');
        });
    }

}

export default new showcasePage();