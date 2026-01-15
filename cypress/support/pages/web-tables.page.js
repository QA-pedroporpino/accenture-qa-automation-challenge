class WebTablesPage {
    visit() {
        cy.visit('/');
        cy.contains('Elements').click();
        cy.contains('Web Tables').click();
    }

    addRecord(user) {
        cy.get('#addNewRecordButton').click();
        cy.get('#firstName').type(user.firstName);
        cy.get('#lastName').type(user.lastName);
        cy.get('#userEmail').type(user.email);
        cy.get('#age').type(user.age);
        cy.get('#salary').type(user.salary);
        cy.get('#department').type(user.department);
        cy.get('#submit').click();
    }

    // Localiza a linha pelo email e busca o botão de ação dentro dela
    clickEditRecord(email) {
        cy.contains('.rt-tr-group', email)
            .find('[title="Edit"]')
            .click();
    }

    clickDeleteRecord(email) {
        cy.contains('.rt-tr-group', email)
            .find('[title="Delete"]')
            .click();
    }

    updateSalary(newSalary) {
        cy.get('#salary').clear().type(newSalary);
        cy.get('#submit').click();
    }

    checkRecordExists(email) {
        cy.contains(email).should('be.visible');
    }

    checkRecordNotExist(email) {
        cy.contains(email).should('not.exist');
    }
}

export default new WebTablesPage();
