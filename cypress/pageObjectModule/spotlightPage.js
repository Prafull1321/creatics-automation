class spotlightPage{

    navigateToGroupshare(){
        cy.get("a[href='cinejoy/group-share-info-page']").contains("Group Sharing").click();
    }

}

export default new spotlightPage();