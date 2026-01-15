import progressBarPage from "../../support/pages/progress-bar.page";

describe('Progress Bar - Controle de Fluxo', () => {

    beforeEach(() => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        progressBarPage.visit();
    });

    it('deve parar em 25%, completar até 100% e resetar', () => {
        // 1. Iniciar Progress Bar
        progressBarPage.startStop();

        // 2. Parar em 25% (ou mais próximo possível)
        // Usamos uma asserção de "deve ter um valor >= 25" e clicamos.
        // O should() do Cypress irá re-tentar até que a condição seja verdadeira.
        cy.get('.progress-bar').should(($bar) => {
            const val = parseInt($bar.attr('aria-valuenow'));
            if (val >= 25) {
                cy.get('#startStopButton').click();
            }
        });

        // 3. Validar se parou: O botão deve mudar o texto para "Start"
        cy.get('#startStopButton').should('contain', 'Start');

        // 4. Validar o valor final de parada
        cy.get('.progress-bar').invoke('attr', 'aria-valuenow').then((val) => {
            const num = parseInt(val);
            expect(num).to.be.at.least(25);
            cy.log(`Barra interrompida em ${num}%`);
        });

        // 5. Retomar e esperar chegar em 100%
        progressBarPage.startStop();

        // Timeout longo pois a barra é lenta
        cy.get('.progress-bar', { timeout: 20000 })
            .should('have.attr', 'aria-valuenow', '100');

        // 6. Validar botão Reset e clicar
        cy.get('#resetButton').should('be.visible').click();

        // 7. Validar reset
        cy.get('.progress-bar').should('have.attr', 'aria-valuenow', '0');
    });
});
