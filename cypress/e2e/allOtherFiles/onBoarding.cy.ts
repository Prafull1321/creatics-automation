// const serverId = "xwztm1sr"
// const emailDomain = "@xwztm1sr.mailosaur.net"
// let emailAddress

// describe.skip("First test here", function () {
//   this.beforeEach(() => {
//     const baseUrl = Cypress.config("baseUrl");
//     // cy.loginToAuth0ViaSocial('Google');
//     cy.visit("https://testing.creatics.org", {
//       failOnStatusCode: false,
//     });
//     cy.viewport(1200,700);
//   });
//   // userProfiles/3301/create/i-am-video
//   //signup functionality
//   it("Signing Up New user", function () {
//     const randomString = new Date().getTime()
//     emailAddress = `${randomString}${emailDomain}`
//     cy.get(".top-btn > a").click();
//     cy.get("#firstname").type("Shivani");
//     cy.get("#lastname").type("Test");
//     cy.get("#email").type(emailAddress);
//     cy.get("#password").should("be.visible").type("123123");
//     cy.get(".btn").click();
//     cy.wait(3000);
//     cy.get('#exampleInputEmail1').type('123123');
//     cy.get('.btn').click();
//     cy.log('Signup completed successfully')
//       cy.get(':nth-child(1) > .col-md-12').click();
//       // cy.login();
//       // cy.loginToAuth0ViaSocial('Google');
//     // cy.window().then((win) => {
//     //   cy.get('input[type="email"]').type('sanuu1226@gmail.com');
//     //   cy.get('input[type="password"]').type('qwerty1226');
//     // });

//     // setup page1 started
//     cy.get(".skipbtn");
//     cy.get(".imgUpload").click();
//     cy.get("input[type=file]").selectFile("cypress/images/cake.jpg", {
//       force: true,
//     });
//     cy.get("image-cropper.ng-star-inserted")
//       .find("img")
//       .should("be.visible")
//       .trigger("mousedown", 300, 79, { force: true })
//       .trigger("mouseup", { force: true });
//     cy.get(".cropButton").click();
//     cy.get(".inputbox1").type("Foodie, Traveller");
//     cy.get(".submitbtn").click();
//     cy.log('setup page 1 done');

// //     // setup page2 started
//     cy.get(".skipbtn");
//     cy.get(".container > .heading2");
//     cy.get(":nth-child(5) > .slider").click();
//     cy.get(":nth-child(6) > .slider").click();
//     cy.get(":nth-child(7) > .slider").click();
//     cy.get(".bodyClass > :nth-child(4)");
//     cy.get(":nth-child(8) > .slider1").click();
//     cy.get(":nth-child(9) > .slider1").click();
//     cy.get(":nth-child(10) > .slider1").click();
//     cy.get(".submitbtn").click();
//     cy.log('setup page 2 done');

// //     // setup page3 started
//     cy.get(".skipbtn");
//     cy.get(".textClass");
//     cy.get(".imgUpload").click();
//     cy.get("input[type=file]").selectFile("cypress/images/cake.jpg", {
//       force: true,
//     });
//     cy.get("image-cropper.ng-star-inserted")
//       .find("img")
//       .should("be.visible")
//       .trigger("mousedown", 300, 79, { force: true })
//       .trigger("mouseup", { force: true });
//     cy.get(".cropButton").click();
//     cy.get(":nth-child(1) > .col-md-10 > #title").type("Fiction");
//     cy.get("#category").select('dance');
//     cy.get("#description").type(
//       "I Love to dance with my heart out! It is my favourite activity to do"
//     );
//     cy.get(':nth-child(4) > .col-md-10 > #title').type('https://testing.creatics.org');
//     cy.get('.submitbtn').click();
//     cy.log('setup page 3 done');
//     // npx cypress run --browser chrome --record --key 3f72c8e7-a7cf-4279-83b8-beee4ab0e4b2
// //     // setup page4 started
//     cy.get(".skipbtn");
// //     // upload button code for video
//     cy.get('.container-info > .submitbtn').click();
//     cy.get("input[type=file]").selectFile("cypress/images/iav1.mp4", {
//       force: true,
//     });
//     cy.log('setup page 4 done');
//     cy.wait(18000);
    
// //profile page started
//     cy.get('.banner');
//     cy.log('Banner image available');
//     cy.get('.img-circle');
//     cy.log('Profile image available');
//     cy.get('#video1');
//     cy.log('Video available');
//     cy.get('.treasuryTitle-name');
//     cy.log('Treasury name available');
//     cy.get('.sub-name');
//     cy.log('Sub treasury name available');
//     cy.get('.option-icons > :nth-child(1) > img');
//     cy.get('.option-icons > .ng-star-inserted > img');
//     cy.get(':nth-child(3) > img');
//     cy.log('Edit, View, Delete icons available');
//     cy.get('.option-icons > :nth-child(1) > img').click();    //click on edit button
//     // cy.window().then(function (p) {
//     //   cy.stub(p,"prompt").returns("Tutorials Point")
//     //   cy.get('.btn').click();
//     // })
//     cy.window().its('#title').type('Non fiction')
//     // cy.get('.dropDownelemets.ng-star-inserted > .userProfile > .dropdown > .btn').click();    //dropdown open
    
//     // cy.get('.profileCard > :nth-child(4) > a').click(); //logout click
//   });

//   //login and setup pages functionality
// //   it("OnBoarding functionality", function () {
// // //     // login page
// //     cy.get(".cus-spacing > .ng-star-inserted > div > a").click();
// //     // cy.get("#email").type("hafopoh952@bizatop.com");
// //     // cy.get("#password").should("be.visible").type("123123");
// //     // cy.get(".btn").click();
// //     // cy.wait(3000);
// //     // cy.log('Logged in successfully');
// //     cy.get(':nth-child(5) > span').click();
// //     cy.get('#email').type(emailAddress);
// //     cy.get('.btn').click();
// //     cy.get('#exampleInputEmail1').type('123123');
// //     cy.get('.btn').click();
// //   });
// });

// //     // I am video page started
// //     cy.get('.container-info1 > .submitbtn').click();
// //     // step1
// //     cy.get('[style="margin-top: -1%;"]')
// //     cy.get('h1[style="margin-top: 1%;"]')
// //     cy.get('.imgUpload-section1 > :nth-child(1)').click();
// //     cy.get("input[type=file]").eq(1).selectFile("cypress/images/cake.jpg",{force:true});
// //     cy.get('.imagecropbtn').click();        //crop button
// //     cy.get('.imgUpload-section1 > :nth-child(2)').click();
// //     cy.get("input[type=file]").eq(2).selectFile("cypress/images/profile.png",{force:true});
// //     cy.get(':nth-child(2) > .align-center > .imagecropbtn').click();
// //     cy.get('.imgUpload-section1 > :nth-child(3)').click();
// //     cy.get("input[type=file]").eq(3).selectFile("cypress/images/cake.jpg",{force:true});
// //     cy.get(':nth-child(3) > .align-center > .imagecropbtn').click();
// //     cy.get('#upload').click();          //next button

// //     //step2
// //     cy.get('.heading');
// //     cy.get(':nth-child(1) > .video').click();
// //     cy.get("input[type=file]").eq(0).selectFile("cypress/images/city.jpg",{force:true});
// //     cy.get('.imagecropbtn').click();
// //     cy.get('.modal-body > .ng-untouched').type('Pune');
// //     cy.get('.btn').click();

// //     cy.get(':nth-child(2) > .video').click();
// //     cy.get("input[type=file]").eq(2).selectFile("cypress/images/food.jpg",{force:true});
// //     cy.get(':nth-child(2) > .video > .align-center > .imagecropbtn').click();
// //     cy.get('.modal-body > #upload').type('Food dish');
// //     cy.get('.btn').click();

// //     cy.get(':nth-child(3) > .video').click();
// //     cy.get("input[type=file]").eq(4).selectFile("cypress/images/film.jpg",{force:true});
// //     cy.get(':nth-child(3) > .video > .align-center > .imagecropbtn').click();
// //     cy.get('.modal-body > #upload').type('Hamlet');
// //     cy.get('.btn').click();

// //     cy.get('.col-12 > :nth-child(4) > :nth-child(2)').click();
// //     cy.get("input[type=file]").eq(6).selectFile("cypress/images/dance.jpg",{force:true});
// //     cy.get(':nth-child(4) > :nth-child(2) > .align-center > .imagecropbtn').click();
// //     cy.get('.modal-body > #upload').type('Dance');
// //     cy.get('.btn').click();

// //     cy.get(':nth-child(5) > .video').click();
// //     cy.get("input[type=file]").eq(8).selectFile("cypress/images/upload.mp4",{force:true});
// //     cy.get('[style="margin: 1% 3% 1% -10%; cursor: pointer;"]').click();
// //     cy.get('.modal-body > #upload').type('Travelling');
// //     cy.get('.btn').click();
// //     cy.get('#submit-video').click();
// //     cy.wait(3000);
// //     cy.get('.btn-close').click();

// //     cy.get(':nth-child(6) > .video').click();
// //     cy.get("input[type=file]").eq(10).selectFile("cypress/images/upload.mp4",{force:true});
// //     cy.get(':nth-child(6) > .cropButtonDiv > [style="margin: 1% 3% 1% -10%; cursor: pointer;"]').click();
// //     cy.get('.modal-body > #upload').type('Travelling');
// //     cy.get('.btn').click();
// //     cy.get('#submit-video').click();
// //     cy.wait(3000);
// //     cy.get('.btn-close').click();
// //     cy.get(':nth-child(6) > #upload').click();

