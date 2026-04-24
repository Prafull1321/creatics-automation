class spotlightPage{

    navigateToGroupshare(){
        cy.get("a[href='cinejoy/group-share-info-page']").contains("Group Sharing").click();
        cy.contains("How to Group Share a Live Spotlight Event").should("be.visible");
    }

    clickOnHostAGroupShare(){
        cy.get("button[style='margin-right: 50px;']").contains("HOST A GROUP SHARE").click();
        cy.get('p[class="title"]').contains("HOST A GROUP SHARE").should("be.visible");
    }

    clickOnAttendAGroupShare(){
        cy.get("button[style='margin-right: 50px;']").contains("ATTEND A GROUP SHARE").click();
        cy.get('p[class="title"]').contains("ATTEND A GROUP SHARE").should("be.visible");
    }

    clickOnBuyTicket() {
        cy.contains('a[href="/cinejoy/premiere/lineup"]', 'BUY TICKETS').invoke('removeAttr', 'target').click();
        cy.location('pathname').should('eq', '/cinejoy/premiere/lineup');
    }

    clickOnMoreInfo(){
        cy.get('[id="btn3"]').contains(" More Info ").click();
    }

    verifyVideoPlayback() {
        cy.get('div[class="PlayButton_module_playButtonWrapper__b9d5abe0"]', { timeout: 15000 }).click({ force: true });

        cy.get('iframe[src*="vimeo"]', { timeout: 15000 }).should('be.visible');
    }

    addSpotlightMovieToWatchlist(){
        cy.get('img[alt="Bookmark Image"]').first().should('be.visible').click({ force: true });

        cy.on('window:confirm', () => true);

        // After clicking bookmark, either watchlist button or All-Access Pass popup appears
        cy.get('body', { timeout: 10000 }).should(($body) => {
            const hasBuyPass = $body.find('button:contains("Buy Pass")').length > 0;
            const hasWatchlist = $body.find('button.watchlist-button').length > 0;
            expect(hasBuyPass || hasWatchlist).to.be.true;
        }).then(($body) => {
            if ($body.find('button:contains("Buy Pass")').length > 0) {
                cy.log('Watchlist requires All-Access Pass — closing popup');
                cy.wrap(false).as('movieAddedToWatchlist');
                cy.get('body').type('{esc}');
            } else {
                cy.wrap(true).as('movieAddedToWatchlist');
                cy.get('button.watchlist-button').contains("Go to My Watchlist").click();
            }
        });
    }

    removeMovieFromWatchlist(){
        cy.get('@movieAddedToWatchlist').then((added) => {
            if (!added) {
                cy.log('Skipping removal — movie was not added (All-Access Pass required)');
                return;
            }
            cy.on('window:confirm', () => true);
            cy.get('button[class="dynamic-button"]').contains(" Spotlight Premiere Events ").click();
            cy.get('i[class="bi bi-trash delete"]').first().click({ force: true });
        });
    }

}

export default new spotlightPage();