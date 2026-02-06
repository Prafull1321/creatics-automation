class showcasePage {

    verifyShowcasePage() {
        cy.contains("Features").should("be.visible");

        cy.get("button[class='movienameList']").last().click();

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
        cy.get("div[id='movies1037']").click();
        cy.get('[class="movie_button ng-star-inserted"]').contains("Watch").click();
        cy.wait(6000);
        cy.get('iframe[id="iframeid1"]').click();
        cy.wait(5000);
    }

    naviagteToMovieWatchPage(){
        cy.get('button[class="movie_button"]').contains("Movie Page").click();
    }

    addShowcaseMovieToWatchlist(){
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
        cy.get('div[formcontrolname="rateValue"]').type(8);
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

}

export default new showcasePage();