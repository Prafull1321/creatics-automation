class CinejoyHomepage{

    navigateToCinejoy(){
        return cy.get("body > app-root:nth-child(1) > div:nth-child(1) > app-router-outlet:nth-child(2) > div:nth-child(2) > div:nth-child(1) > app-logged-in-homepage:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > a:nth-child(1) > img:nth-child(1)").click();
    }
    
    validateBannerImageAndText(){
        return cy.get("img[alt='Cinejoy Home Page']").should("be.visible");
    }

    navigateToPassportPage(){
        return cy.get("div[class='nav-div'] span:nth-child(3) a:nth-child(1)").click({force: true});
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
        cy.get("#mat-select-0").click();
        return cy.get("mat-option[id='mat-option-1']").contains(eventType).click();
    }
    selectMovie(selectedMovie){
        cy.get("#mat-select-1").click();
        return cy.get("mat-option[role='option']").contains(selectedMovie).click();
    }

    nextButton(){
        return cy.get("button[type='submit']").contains("Next").click();
    }
    

}

export default new CinejoyHomepage();