const general = require('../fixtures/pages/general.json')
const createGoalPage = require('../fixtures/pages/createGoalPage.json')
const goalDashboard = require('../fixtures/pages/goalDashboard.json')

describe ('Create a goal', () => {

    // it('User logs in', () => {
    //     cy.visit("https://app.staging.winware.ai/singup");
    //     cy.get('#name').type("tester11");
    //     cy.get('#email').type("dibob92634@bagikanlagi.com");
    //     cy.get('#password').type("Test1111");
    //     cy.get('#ipa-app > section > section > main > div > div.ant-row > div:nth-child(2) > form > div.content-bottom > div > div > div > div > div > button > span').click({force : true});
    //     //cy.get('.ant-btn > span').click({force : true});

    //     cy.get('.ant-row > .ant-btn').click({force : true});
        
    // });

    it('User can  create a goal based on plan upgrade', () => {
        //user logs in
        cy.visit("/signin");
        cy.get(general.emailField).type("dsnaydina@gmail.com");
        cy.get(general.passwordField).type("2211Vfvf");
        cy.get(general.submitButton).click({force : true});
       //user creates a goal
        cy.get(general.createNewGoal).click({force: true});
       cy.contains("What is your goal?").should("exist");
       cy.get(createGoalPage.basedOnPlanUpgrade).click({force: true});
        cy.get(createGoalPage.nextButton).click({force: true});
       cy.contains("Define your victory condition").should("exist");
       cy.get(createGoalPage.fromField).type("free");
       cy.get(createGoalPage.toField).type("pro");
       cy.get(createGoalPage.saveNewGoalButton).click();
       cy.get(createGoalPage.saveNewGoalButton).click();
       cy.contains("Goal: Conversion & Expansion").should("exist");
       //deleting a goal
       cy.get(goalDashboard.dropdownMenu).click({force: true});
       cy.get(goalDashboard.deleteGoalOption).click({force: true});
       cy.contains("Are you sure you want to delete this goal?").should("exist");
       cy.get(goalDashboard.deleteButton).click({force: true});
       cy.contains("No active goals").should("exist");
    
    // no idea why logout is not working
    //    cy.get('#ipa-app > section > aside > div > div > div.ant-col.ant-col-24.bottom-menu > ul > li.ant-menu-item.ant-menu-item-selected > span.ant-menu-title-content').click({force: true});
    //    cy.get('#ipa-app > section > aside > div > div > div.ant-col.ant-col-24.bottom-menu > ul > li.ant-menu-item.ant-menu-item-selected > span.ant-menu-title-content').click({force: true});
    //    cy.contains("Create your account").should("exist");
                
    });

    it('User can create a goal based on a click event', () => {
        // cy.visit("/signin");
        // //cy.get(general.nameField).type("tester11");
        // cy.get(general.emailField).type("dsnaydina@gmail.com");
        // cy.get(general.passwordField).type("2211Vfvf");
        // cy.get(general.submitButton).click({force : true});
        cy.get(general.createNewGoal).click({force: true});
       cy.contains("What is your goal?").should("exist");
       cy.get(createGoalPage.basedOnClickEvent).click({force: true});
       cy.get(createGoalPage.nextButton).click({force: true});
       cy.contains("Define your victory condition").should("exist");
       cy.get(createGoalPage.event).click({force: true});
       cy.get(createGoalPage.saveNewGoalButton).click();
       cy.contains("Based on a click event").should("exist");
       //deleting a goal
       cy.get(goalDashboard.dropdownMenu).click({force: true});
       cy.get(goalDashboard.deleteGoalOption).click({force: true});
       cy.contains("Are you sure you want to delete this goal?").should("exist");
       cy.get(goalDashboard.deleteButton).click({force: true});
       cy.contains("No active goals").should("exist");

    });

    it('User can create a goal based url destination', () => {
        // cy.visit("/signin");
        // cy.get(general.emailField).type("dsnaydina@gmail.com");
        // cy.get(general.passwordField).type("2211Vfvf");
        // cy.get(general.submitButton).click({force : true});
        cy.get(general.createNewGoal).click({force: true});
       cy.contains("What is your goal?").should("exist");
       cy.get(createGoalPage.basedOnUrlDestination).click({force: true});
       cy.get(createGoalPage.nextButton).click({force: true})
      cy.contains("Enter the destination url that will complete your victory condition").should("exist");
       cy.get(createGoalPage.url).type("home");
      cy.get(createGoalPage.saveNewGoalButton).click();
    cy.contains("Based on URL destination").should("exist");
    //    //deleting a goal
       cy.get(goalDashboard.dropdownMenu).click({force: true});
       cy.get(goalDashboard.deleteGoalOption).click({force: true});
       cy.contains("Are you sure you want to delete this goal?").should("exist");
       cy.get(goalDashboard.deleteButton).click({force: true});
       cy.contains("No active goals").should("exist");

    });

    // it('User can delete a goal', () => {
    //     //cy.clearCookies();
    //     cy.visit("/signin");
    //     //cy.get(general.nameField).type("tester11");
    //     cy.get(general.emailField).type("dsnaydina@gmail.com");
    //     cy.get(general.passwordField).type("2211Vfvf");
    //     cy.get(general.submitButton).click({force : true});
    //     cy.get('#ipa-app > section > section > main > div > div.container > div > div:nth-child(1) > div > div > button').click({force: true});
    //     cy.get('body > div:nth-child(3) > div > div > ul > li > span.ant-dropdown-menu-title-content').click({force: true});
    //     cy.contains("Are you sure you want to delete this goal?").should("exist");
    //     cy.get('body > div:nth-child(4) > div > div.ant-modal-wrap > div > div.ant-modal-content > div > div.ant-row.m-t-8 > div:nth-child(2) > button > span').click({force: true});
 
    //     cy.clearCookies();
    // });
});