import { timeout } from "rxjs";
import cinejoyHomepage from "../../pageObjectModule/cinejoy/cinejoyHomepage";
import loginPage from "../../pageObjectModule/loginPage";

describe("CineJoy Testcases.", function() {
    const username = "1cg0deu51s@cmhvzylmfc.com";
    const mainPassword = "Test@123";
    const Production_URL = "https://creatics.org/";
      const Mobile_1_URL = "https://mobile.creatics.org/";
      const Mobile_2_URL = "https://mobilej21.creatics.org/";
      const Dev_URL = "https://dev.creatics.org/";
      const logInURL = "https://dev.creatics.org/userProfiles";
      const BASE_URL = Production_URL;
    
      beforeEach(() => {         
        loginPage.visit(BASE_URL);
        //cy.get('.dropDownelemets.ng-star-inserted', { timeout: 20000 }).should('be.visible');
        loginPage.assertUrl(BASE_URL);
        loginPage.signInOption();
        loginPage.emailText(username);
        loginPage.passwordText(mainPassword);
        cy.wait(2000);
        loginPage.loginButton();
        cy.wait(5000);
        cinejoyHomepage.navigateToCinejoy();
        cy.get("img[alt='Cinejoy Home Page']", {timeout: 10000}).should("be.visible");
    
        cy.on("window:alert", (message) => {
          const normalizedMessage = message
            // .replace(/[\u00a0\n\*\*]+/g, " ")
            .replace(/\u00a0/g, " ")
            .replace(/\n/g, " ")
            .trim();
          expect([
            "First Name can't be blank",
            "Last Name can't be blank",
            "Enter Valid Communication Email Address",
          ]).to.contains(normalizedMessage);
        });
      });


        it("Verify homepage baner and all tabs", () => {
          cinejoyHomepage.validateBannerImageAndText();
          cy.contains('Viewers Voice Fests').should("be.visible");
          cy.contains('Thriller Film Fest').should("be.visible");
          cy.contains('How To').should("be.visible");
          cy.contains('Individual Tix').should("be.visible");
          cy.contains('All-Access Passes').should("be.visible");
        });

        it("Verify Passport page of cinejoy", () => {
          cinejoyHomepage.navigateToPassportPage();
          cy.contains("Community Passports", {timeout: 10000}).should("be.visible");
          cy.contains(' Trending ').should("be.visible");
          cy.contains('Like Minded').should("be.visible");
          cy.contains('New').should("be.visible");
          cy.contains('Discover').should("be.visible");
            
        });

        it("Verify about page of cinejoy", () => {
          cinejoyHomepage.aboutPage();
          cy.contains(" About CINEJOY on CREATICS ").should("be.visible");
          cy.scrollTo('bottom');
          cy.get(".event-image").should('exist').and('be.visible');
          cy.get('.event-image').then(($video) => {
          const video = $video[0]
          video.muted = true
          video.play()
          cy.wait(1000);
          expect(video.paused).to.eq(false)
          video.pause()
          expect(video.paused).to.eq(true)
          })
        });

        it("Verify Meetups page of cinejoy", () => {
          cinejoyHomepage.meetupPage();
          cy.contains("Cinejoy Artist & Audience Meetups").should("be.visible");
          cinejoyHomepage.joinMeetupButton().should('be.visible');
          cinejoyHomepage.hostMeetupButton().should('be.visible');
        });

        it.only("Verify Host Meetup flow for type showcase", () => {
          const eventType = "Showcase";
          const SelectedMovie = "ALL THERE IS";
          cinejoyHomepage.meetupPage();
          cinejoyHomepage.hostMeetupButton().click();
          cy.contains("Host Artist & Audience Meetups").should("be.visible");
          cinejoyHomepage.hostMeetupGetStartedButton();
          cinejoyHomepage.selectEventType(eventType);
          cinejoyHomepage.selectMovie(SelectedMovie);
          cinejoyHomepage.nextButton();
        });














afterEach(() => {
    // Runs after each test
    cy.wait(2000);
    cy.clearCookies();
  });

});