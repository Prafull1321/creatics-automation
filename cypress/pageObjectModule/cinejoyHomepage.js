class CinejoyHomepage{

    navigateToCinejoy(){
        return cy.get('a[href="/cinejoy"]').click();
    }
    
    validateBannerImageAndText(){
        return cy.get("img[alt='Cinejoy Home Page']").should("be.visible");
    }

    navigateToCommunityPassportPage(){
        return cy.get("a[href='/cinejoy/passport/community']").contains("PASSPORTS").click({force: true});
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
        cy.wait(12000);

        //Validate name and bio is displayed on profile
        cy.contains(firstName).should('be.visible');
        cy.contains(lastName).should('be.visible');
        cy.contains(bio).should('be.visible');
    }

    navigateToPassportTab(){
        return cy.get('a[href="/cinejoy/passport"]').contains("Passport").click({force: true});
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
        //return cy.get("div[class='web-view'] div[class='nav-div'] span:nth-child(4) a:nth-child(1)").click();
        return cy.get("a[href='/cinejoy/screening-parties']").contains("Meetups").click();
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
    selectShowcaseMovie(selectedMovie){
        cy.get("#mat-select-1").click();
        //return cy.get("mat-option[role='option']").first().click({force: true});
        return cy.get("mat-option[role='option']").contains(selectedMovie).click();
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
        cy.wait(2000);
        cy.get('h2[class="pageheader"]').contains("Thank you for Hosting!").should("be.visible");

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
        cy.get("div[class='mobile-container'] div[class='bg-black'] button[class='btn all-access-btn btn-lg fw-bold ng-star-inserted']").click();
        cy.contains("Unlock All Spotlight Events and Showcase Movies").should("be.visible");
        //cy.get('span[class="mdc-button__label"]').contains(" Buy Now ").click();
        //cy.wait(10000);
        //cy.get("span[class='mdc-button__label']").contains("OK").should('be.visible').click();
        //cy.get("input[placeholder='Add promotion code']").click();
    }

    navigateToShowcase(){
        cy.get("a[href='/cinejoy/showcase']").contains(" SHOWCASE film screenings!").click();
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
        cy.get("a[href='/cinejoy/premiere/lineup']").contains(" Attend live SPOTLIGHT events!").click();
    }

    navigateToWatchlist(){
        cy.get("a[href='/cinejoy/passholders-watchlist']").contains("My Watchlist").click();
    }

    removeWatchlistMovies(){

    }


}

export default new CinejoyHomepage();