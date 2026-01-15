class ProgressBarPage {
    visit() {
        cy.visit('/');
        cy.contains('Widgets').click();
        cy.contains('Progress Bar').click();
    }

    startStop() {
        cy.get('#startStopButton').click();
    }

    reset() {
        cy.get('#resetButton').click();
    }

    // Método mais simples e direto
    getProgressBar() {
        return cy.get('.progress-bar');
    }
}

export default new ProgressBarPage();
