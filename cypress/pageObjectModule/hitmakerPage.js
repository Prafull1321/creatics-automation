class HitmakerPage {

    navigateToHitmaker(){
        cy.get('div[class="img1 ng-star-inserted"]').click();
    }

    naviagteToHitmakerMainPage(){
        cy.get('button[class="button bannerBtn"]').contains("Join The Journey Free").click();
        cy.contains("Discover and engage with this movie and artists below.").should("be.visible");
    }

    navigateToPreprod(){
        cy.contains("Pre-Production").click();
        cy.contains("Engage With a Feast of Pre-Production Content and Opportunities.").should("be.visible");
    }

    navigateToFilming(){
        cy.contains("Filming").click();
        cy.contains("Filming in Motion: Join the Creative Process On Set").should("be.visible");
    }

    navigateToPostprod(){
        cy.contains("Post-Production").click();
        cy.contains("Magic in the Making: Crafting the Final Cut").should("be.visible");
    }

    navigateToRelease(){
        cy.contains("Release").click();
        cy.contains("Get Exclusive Access to the Premiere of Wish U Was 8").should("be.visible");
    }

    verifyEpisodePage(){
        cy.get('div[class="episodeCardWrapper clickable"]').click({ multiple: true });
        cy.contains("Reality Show: The Unscripted Star").should("be.visible");
        cy.get('iframe[class="video ng-star-inserted"]').click();
    }

    navigateToReleaseEpisodePage(){
        cy.get('button[class="eventButton"]').eq(2).click();
        cy.get('a[class="eventButton"]').contains(' Episodes ').click();
    
    } 

    verifyReleaseEpisodePage(){
        cy.contains("Reality Show: The Unscripted Star").should("be.visible");
        cy.get('iframe[class="video ng-star-inserted"]').click();
    }

    verifyEpisodesNavigation(){
        cy.get('i[class="bi bi-chevron-left"]').click();
        cy.contains('Ep 3: Pre-Release Interview').should('be.visible');
    }

    verifyCommentSection(){
        cy.get('textarea[placeholder="Type Something..."]').type("This is test 101");
        cy.get('[class="submitBtn"]').contains("Submit").click();
        cy.wait(2000);
        cy.get('[class="commentBody"]').contains("This is test 101").should("be.visible");
        cy.get('[class="reply"]').contains(" Reply ").click();
        cy.get('[placeholder="Write a reply..."]').type("This is reply test 101");
        cy.get('[class="replySendBtn"]').contains("Send").click();
        cy.contains("This is reply test 101").should("be.visible");
    }

    jewelFunction() {
    const validMessages = [
        'Congratulations, you got 5 currency points!',
        'Update already Jeweled!'
    ];

    // Stub the alert BEFORE the click using cy.window()
    cy.window().then((win) => {
        cy.stub(win, 'alert').callsFake((text) => {
            const isValid = validMessages.some((msg) => text.includes(msg));
            expect(isValid, `Unexpected alert message: "${text}"`).to.be.true;
        });
    });

    cy.on('window:confirm', () => true);

    cy.get('img[alt="jwel"]').click({ multiple: true });
    }

    verifyPolls(){
        cy.get('button[class="pollBtn viewAll"]').contains("View All").click();
        cy.get('button[class="filterBtn"]').contains("Polls").click();
        cy.get('h1[class="ng-star-inserted"]').contains("Automation poll").should("be.visible");
    }

    verifyAskTeamAnything(){
        cy.contains("Ask Jude Anything").should("be.visible");
        cy.get('#askQues').type("This is a test 101" , { force: true });
        cy.get('button[class="pollBtn askBtn"]').contains("Submit").click();
        cy.window().then((win) => {
        cy.stub(win, 'alert').callsFake((text) => {
        const validMessages = [
            'Question submitted successfully',
            'enough Creatics currency to submit a question'  // partial, avoids apostrophe issue
        ];

        const isValid = validMessages.some((msg) => text.includes(msg));
        expect(isValid, `Unexpected alert message: "${text}"`).to.be.true;
            });
        });

    cy.on('window:confirm', () => true);
    }

    verifyUpdates(){
        cy.get('button[class="pollBtn viewAll"]').contains("View All").click();
        cy.get('button[class="filterBtn"]').contains("Updates").click();
        cy.url().should("include", "polls-updates");
    }

    verifyPostprodPollsSneakpeekAndUpdate(){
        cy.contains("Polls").click();
        cy.contains("Editing Sneak Peeks").click();
        cy.contains("Producer Updates").click();
        cy.get('img[alt="comment"]').click();
        cy.get('input[placeholder="Type something..."]').type("This is test 101");
        cy.get('button[class="sendBtn"]').click();
        cy.wait(2000);
        cy.contains("This is test 101");
    }

    verifyAskTeamAnythingPostprod(){
        cy.contains("Ask the Team Anything").should("be.visible").click();
        cy.get('#askQues').type("This is a test 101" , { force: true });
        cy.get('button[class="pollBtn askBtn"]').contains("Submit").click();
        cy.window().then((win) => {
        cy.stub(win, 'alert').callsFake((text) => {
        const validMessages = [
            'Question submitted successfully',
            'enough Creatics currency to submit a question'  // partial, avoids apostrophe issue
        ];

        const isValid = validMessages.some((msg) => text.includes(msg));
        expect(isValid, `Unexpected alert message: "${text}"`).to.be.true;
            });
        });

    cy.on('window:confirm', () => true);
    }

}

export default new HitmakerPage();