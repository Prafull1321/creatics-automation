class CinejoyHomepage{

    navigateToCinejoy(){
        return cy.get('a[href="/cinejoy"]').click();
    }
    
    validateBannerImageAndText(){
        return cy.get("img[alt='Cinejoy Home Page']").should("be.visible");
    }

    navigateToCommunityPassportPage(){
        return cy.get("a[href='/cinejoy/passport/community']").filter(':visible').first().click({force: true});
    }    
    
    verifyMyPassportProfilePage(){
        const firstName = "Daniel";
        const lastName = "Howard";
        const bio = "This is Just a Test 101";

        cy.get('div[class="heading gold"]').contains("My Passport Profile").should("be.visible");

        //edit name and bio
        cy.get("img[alt='alt']").click({force: true});
        cy.get("input[placeholder='Add name'][name='firstName']").clear().type(firstName);
        cy.get("input[placeholder='Add name'][name='lastName']").clear().type(lastName);
        cy.get("textarea[placeholder='Add Bio']").clear().type(bio);
        cy.get("button[type='submit']").click();

        //Validate name and bio is displayed on profile
        cy.contains(firstName, { timeout: 15000 }).should('be.visible');
        cy.contains(lastName).should('be.visible');
        cy.contains(bio).should('be.visible');
    }

    navigateToPassportTab(){
        return cy.visit('/cinejoy/passport', { failOnStatusCode: false, timeout: 60000 });
    }

    viewersVoiceFestBtn(){
        return cy.get(".btn_effect").contains("Viewers Voice Fests").click();
    }   

    thrillerFilmFestBtn(){
        return cy.get(".btn_effect").contains("Thriller Film Fest").click();
    }   

    allAccessPassBtn(){
        return cy.get(".btn_effect").contains("All-Access Passes").click();
    }
    
    aboutPage(){
        return cy.get("div[class='list-div-mobile'] span:nth-child(1) a:nth-child(1)").click();
    }

    meetupPage(){
        return cy.get("a[href='/cinejoy/screening-parties']").filter(':visible').first().click();
    }

    joinMeetupButton(){
        return cy.get("span[class='btn_effect']").contains("Join an Artist & Audience Meetup");
    }

    hostMeetupButton(){
        return cy.get("span[class='btn_effect']").contains("Host an Artist & Audience Meetup");
    }

    hostMeetupGetStartedButton(){
        return cy.get("span[class='btn_effect']").contains("Get Started").click();
    }

    selectEventType(eventType){
        cy.get("#mat-select-0").click({force: true});
        return cy.get("mat-option[role='option']").contains(eventType).click({force: true});
    }
    selectShowcaseMovie(){
        cy.get("#mat-select-1").click();
        return cy.get("mat-option[role='option']").first().click({force: true});
    }

    selectSpotlightMovie(){
        cy.get("#mat-select-1").click();
        return cy.get("mat-option[role='option']").first().click({force: true});
        //return cy.get("mat-option[role='option']").contains(selectedMovie).click();
    }

    nextButton(){
        return cy.get("button[type='submit']").contains("Next").click({ force: true });
    }
    
    enterCurrentDateAndTime(){
    const now = new Date();

    // Add 5 minutes to avoid past-time validation
    now.setMinutes(now.getMinutes() + 5);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    // REQUIRED format for datetime-local
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

    cy.get('input[type="datetime-local"]')
        .should('be.visible')
        .clear()
        .type(formattedDateTime)
        .should('have.value', formattedDateTime);
    }

    enterPartyInfo(){
        
        // Select platform
        cy.get("mat-select[id='mat-select-2']").click();
        cy.get("mat-option[id='mat-option-2']").contains("Zoom").click({ force: true });
        
        // Add Zoom url
        cy.get('input[id="mat-input-0"]').type("https://app.zoom.us/wc/87840280574/start?fromPWA=1&pwd=WjbxilkuSQ5OiNRq1z4Qs7GQNyzGHQ.1");
        
        // Add Description
        cy.get("textarea[id='mat-input-2']").type("This is just Test 101");

        //Click Submit
        return cy.get('button[class="btn action-button"]').contains("Submit").click({ force: true });
    }

    verifyThankYouPage(){
        
        // Validate page heading
        cy.get('h2[class="pageheader"]', { timeout: 30000 }).contains("Thank you for Hosting!").should("be.visible");

        // Click on Next Button
        cy.get('button[class="previous action-button-previous"]').contains("Exit").click();
    }

    verifyJoinMeetupPage(){
        cy.get("h1[class='heading']").contains("Join Artist & Audience Meetups").should("be.visible");
    }

    clickJoinButton(){
        cy.get('button[class="web-btn1"]').contains(" JOIN ").click();
    }

    verifyPassportBadgesPage(){
        cy.contains("Spotlight Events").should("be.visible");
        cy.contains("Showcase Films").should("be.visible");
        cy.contains("Artist & Audience Meetup").should("be.visible");
    }

    buyAllAccessPass(){
        // The "event has ended" popup may overlay the page (intermittent).
        // Force-click "Buy Pass" to bypass it — no need to dismiss first.
        cy.get("div[class='mobile-container']")
            .contains('Buy Pass', { timeout: 15000 })
            .click({ force: true });
    }

    // Clicks Buy Now on the All-Access Pass dialog, confirms the Stripe redirect,
    // applies the promotional code on Stripe checkout, and completes the order.
    completeAllAccessPassPurchase(promoCode){
        // Step 1 — Click Buy Now on the pass dialog.
        cy.contains('Buy Now', { timeout: 15000 })
            .should('be.visible')
            .click();

        // Step 2 — Pre-register the cross-origin exception handler for Stripe.
        cy.origin('https://checkout.stripe.com', () => {
            Cypress.on('uncaught:exception', () => false);
        });

        // Step 3 — Confirm the Stripe redirect dialog.
        cy.contains('button', 'OK', { timeout: 15000 })
            .should('be.visible')
            .click();

        // Step 4 — Interact with the Stripe checkout page (cross-origin).
        cy.origin('https://checkout.stripe.com', { args: { promoCode } }, ({ promoCode }) => {
            cy.contains('Add promotion code', { timeout: 30000 }).click();

            cy.get('input[name="promotionCode"]', { timeout: 10000 })
                .should('be.visible')
                .type(promoCode);

            cy.contains('Apply', { timeout: 10000 }).click();
            cy.contains('100% off', { timeout: 10000 }).should('be.visible');

            cy.get('.SubmitButton', { timeout: 15000 })
                .should('not.be.disabled')
                .click();
        });
    }

    navigateToShowcase(){
        cy.get("a[href='/cinejoy/showcase']").filter(':visible').first().click();
    }

    addShowcaseMovieToWatchlist(){
        cy.get('img[alt="Bookmark Image"]').click();

        cy.on('window:confirm', (text) => {
        //expect(text).to.contain('add this event to your Watchlist');
        return true; // clicks OK
        });

        cy.get('button[class="watchlist-button"]').contains("Go to My Watchlist").click();

    }

    navigateToSpotlight(){
        cy.get("a[href='/cinejoy/premiere/lineup']").filter(':visible').first().click();
    }

    navigateToWatchlist(){
        cy.get("a[href='/cinejoy/passholders-watchlist']").contains("My Watchlist").click();
    }

    navigateToMyTickets(){
        // Top-level "My Tickets" link/button on the Cinejoy page.
        // Uses contains() so the click works even if the href differs slightly
        // across environments.
        cy.contains(/^\s*My Tickets\s*$/i, { timeout: 15000 })
            .should('be.visible')
            .click();
    }

}

export default new CinejoyHomepage();