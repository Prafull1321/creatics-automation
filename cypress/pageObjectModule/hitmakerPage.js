class HitmakerPage {

    // ── Navigation ──────────────────────────────────────────────────

    navigateToHitmaker() {
        cy.get('img[alt="Hitmaker"]').click();
    }

    navigateToHitmakerMainPage() {
        cy.get('button[class="button bannerBtn"]').contains("Join The Journey Free").click();
        cy.url({ timeout: 15000 }).should("include", "/hitmaker");
        cy.contains("Discover and engage with this movie and artists below.").should("be.visible");
    }

    navigateToPreprod() {
        cy.contains("Pre-Production").click();
        cy.contains("Engage With a Feast of Pre-Production Content and Opportunities").should("be.visible");
    }

    navigateToFilming() {
        cy.contains("Filming").click();
        cy.contains("Filming in Motion: Join the Creative Process On Set").should("be.visible");
    }

    navigateToPostprod() {
        cy.contains("Post-Production").click();
        cy.contains("Magic in the Making: Crafting the Final Cut").should("be.visible");
    }

    navigateToRelease() {
        cy.contains("Release").click();
        cy.contains("Get Exclusive Access to the Premiere of Wish U Was 8").should("be.visible");
    }

    // ── Main page content verification ──────────────────────────────

    verifyHitmakerLandingPage() {
        cy.contains("Get Inside the Studio & World Premiere of a Hit Film.", { timeout: 10000 }).should("be.visible");
    }

    verifyPreprodMainPage() {
        cy.contains("Engage With a Feast of Pre-Production Content and Opportunities").should("be.visible");
        cy.contains("Polls & Insider Updates").should("be.visible");
        cy.contains("Reality Show: The Unscripted Star").should("be.visible");
        cy.contains("Ask Jude Anything").should("be.visible");
    }

    verifyFilmingMainPage() {
        cy.contains("Filming in Motion: Join the Creative Process On Set").should("be.visible");
        cy.contains("Polls & Insider Updates").should("be.visible");
        cy.contains("Reality Show: The Unscripted Star").should("be.visible");
        cy.contains("Ask Jude Anything").should("be.visible");
    }

    verifyPostprodMainPage() {
        cy.contains("Reality Show: The Unscripted Star ").should("be.visible");
        cy.contains("Contests").should("be.visible");
        cy.contains("Editor's Room").should("be.visible");
        cy.contains("Polls").should("be.visible");
        cy.contains("Editing Sneak Peeks").should("be.visible");
        cy.contains("Producer Updates").should("be.visible");
        cy.contains("Ask the Team Anything").should("be.visible");
    }

    verifyReleaseMainPage() {
        cy.contains("Get Exclusive Access to the Premiere of Wish U Was 8").should("be.visible");
    }

    // ── Episodes ────────────────────────────────────────────────────

    verifyEpisodePage() {
        cy.get('div[class="episodeCardWrapper clickable"]').first().click();
        cy.contains("Reality Show: The Unscripted Star").should("be.visible");
        cy.get('iframe[class*="video"]', { timeout: 15000 }).should("be.visible");
    }

    navigateToReleaseEpisodePage() {
        cy.get('button[class="eventButton"]').eq(2).click();
        cy.get('a[class="eventButton"]').contains(' Episodes ').click();
    }

    verifyReleaseEpisodePage() {
        cy.contains("Reality Show: The Unscripted Star").should("be.visible");
    }

    verifyEpisodesNavigation(episodeName = 'Ep 2: Viewing Rough Cuts ') {
        cy.get('i[class="bi bi-chevron-left"]').click();
        cy.contains(episodeName).should('be.visible');
    }

    // ── Comments ────────────────────────────────────────────────────

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

    // ── Jewel ───────────────────────────────────────────────────────

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

    cy.get('img[alt="jwel"]').click({force: true});
    }

    // ── Polls & Updates ─────────────────────────────────────────────

    verifyPolls() {
        cy.get('button[class="pollBtn viewAll"]').contains("View All").click();
        cy.get('button[class="filterBtn"]').contains("Polls").click();
        cy.get('h1[class="ng-star-inserted"]').contains("Automation poll").should("be.visible");
    }

    verifyUpdates() {
        cy.get('button[class="pollBtn viewAll"]').contains("View All").click();
        cy.get('button[class="filterBtn"]').contains("Updates").click();
        cy.url().should("include", "polls-updates");
    }

    // ── Ask Team Anything (shared across sections) ──────────────────

    verifyAskTeamAnything(sectionLabel = "Ask Jude Anything", questionText = "Cypress automation test question") {
        const validMessages = [
            'Question submitted successfully',
            'enough Creatics currency to submit a question'
        ];

        cy.window().then((win) => {
            cy.stub(win, 'alert').callsFake((text) => {
                const isValid = validMessages.some((msg) => text.includes(msg));
                expect(isValid, `Unexpected alert message: "${text}"`).to.be.true;
            });
        });

        cy.on('window:confirm', () => true);

        cy.contains(sectionLabel).should("be.visible");
        cy.get('#askQues').type(questionText, { force: true });
        cy.get('button[class="pollBtn askBtn"]').contains("Submit").click();
    }

    // ── Post-Production specific ────────────────────────────────────

    verifyPostprodPollsSneakpeekAndUpdate(commentText = "Cypress automation test comment") {
        cy.contains("Polls").click();
        cy.contains("Editing Sneak Peeks").click();
        cy.contains("Producer Updates").click();
        cy.get('img[alt="comment"]').click();
        cy.get('input[placeholder="Type something..."]').type(commentText);
        cy.get('button[class="sendBtn"]').click();
        cy.contains(commentText, { timeout: 10000 }).should("be.visible");
    }
}

export default new HitmakerPage();
