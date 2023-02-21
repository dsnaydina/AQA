
describe ('Create a goal', () => {

    it('User logs in', () => {
        cy.visit("https://app.staging.winware.ai/singup");
        cy.get('#name').type("tester11");
        cy.get('#email').type("dibob92634@bagikanlagi.com");
        cy.get('#password').type("Test1111");
        cy.get('#ipa-app > section > section > main > div > div.ant-row > div:nth-child(2) > form > div.content-bottom > div > div > div > div > div > button > span').click({force : true});
        //cy.get('.ant-btn > span').click({force : true});

        cy.get('.ant-row > .ant-btn').click({force : true});
        
    });
});