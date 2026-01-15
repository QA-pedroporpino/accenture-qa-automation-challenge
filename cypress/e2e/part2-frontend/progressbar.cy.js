describe('Progress Bar', () => {

    beforeEach(() => {

        // Ignora erros de terceiros (ads do demoqa)
        Cypress.on('uncaught:exception', () => false)

        cy.visit('https://demoqa.com/progress-bar')
    })

    it('deve parar <= 25%, completar até 100% e resetar', () => {

        // ▶ Start
        cy.get('#startStopButton').click()

        // Delay curto só pra sair do zero
        cy.wait(700)

        // ⏸ Stop
        cy.get('#startStopButton').click()

        // ✅ Validar TEXTO <= 25%
        cy.get('#progressBar')
            .invoke('text')
            .then(text => {
                const value = Number(text.replace('%', '').trim())
                expect(value).to.be.at.most(25)
            })

        // ▶ Start novamente
        cy.get('#startStopButton').click()

        // ⏳ Esperar chegar a 100%
        cy.get('#progressBar', { timeout: 15000 })
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
