class SortablePage {
    visit() {
        // Ignora erros externos (ads do DemoQA)
        Cypress.on('uncaught:exception', () => false)

        cy.visit('/')

        // Acessar Interactions
        cy.contains('.card-body', 'Interactions').click()

        // Clicar em Sortable no menu lateral
        cy.contains('.element-list li', /^Sortable$/).click()

        // Confirmar que está na página correta
        cy.contains('h1', 'Sortable').should('be.visible')

        // Garantir aba List ativa (escopado corretamente)
        cy.get('.nav.nav-tabs').contains(/^List$/).click()
    }

    dragAndDrop(from, to) {
        cy.get('#demo-tabpane-list')
            .contains('.list-group-item', from)
            .trigger('mousedown', { which: 1 })

        cy.get('#demo-tabpane-list')
            .contains('.list-group-item', to)
            .trigger('mousemove')
            .trigger('mouseup')
    }

    getLastItem() {
        return cy.get('#demo-tabpane-list .list-group-item').last()
    }
}

export default new SortablePage()
