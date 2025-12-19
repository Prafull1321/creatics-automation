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

}

export default new CinejoyHomepage();