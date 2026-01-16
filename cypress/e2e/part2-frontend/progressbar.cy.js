describe('Progress Bar', () => {

    beforeEach(() => {

        // Ignora erros de terceiros (ads do demoqa)
        Cypress.on('uncaught:exception', () => false)

        cy.visit('/')
        // 2. Navegar até Alerts, Frame & Windows
        cy.contains('.card-body', 'Widgets').click();

        // 3. Clicar em Progress Bar
        cy.contains('.element-list', 'Progress Bar').click();
    })

    it('deve parar <= 25%, completar até 100% e resetar', () => {

        // ▶ Start
        cy.get('#startStopButton').click()

        // ✅ Validar TEXTO <= 25%
        cy.get('#progressBar')
            .invoke('text')
            .then(text => {
                const value = Number(text.replace('%', '').trim())
                expect(value).to.be.at.most(25)
            })

        // ⏸ Stop
        cy.get('#startStopButton').click()

        // ▶ Start novamente
        cy.get('#startStopButton').click()

        // ⏳ Esperar chegar a 100%
        cy.get('#progressBar', { timeout: 90000 })
            .should('contain.text', '100%')

        // 🔁 Reset
        cy.get('#resetButton')
            .scrollIntoView()
            .should('be.visible')
            .click()

        // ✅ Validar reset
        cy.get('#progressBar')
            .should('contain.text', '0%')

    })

})
