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
        cy.get('vp-preview VideoThumbnail_module_videoThumbnail__836d3344 VideoThumbnail_module_cover__836d3344', { timeout: 15000 }).click({ force: true });

        cy.get('iframe[src*="vimeo"]', { timeout: 15000 }).should('be.visible');
    }

    addSpotlightMovieToWatchlist(){
        cy.get('img[alt="Bookmark Image"]').first().should('be.visible').click({ force: true });

        cy.on('window:confirm', (text) => {
        //expect(text).to.contain('add this event to your Watchlist');
        return true; // clicks OK
        });

        cy.get('button[class="watchlist-button"]').contains("Go to My Watchlist").click();
    }

    removeMovieFromWatchlist(){
        cy.get('button[class="dynamic-button"]').contains(" Spotlight Premiere Events ").click();
        cy.get('i[class="bi bi-trash delete"]').first().click({ force: true });

        // Handle confirm delete message
        cy.on('window:confirm', (text) => {
        return true; // clicks OK
        });
        cy.wait(10000);
         // Handle alert for delete
        cy.on('window:alert', (text) => {
            //expect(text).to.contain('Event deleted successfully');
            return true; // clicks OK
        });

        cy.contains('No Content Added Yet', { timeout: 15000 }).should('be.visible');
    }

}

export default new spotlightPage();