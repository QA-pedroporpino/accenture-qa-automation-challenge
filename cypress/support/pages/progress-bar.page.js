class ProgressBarPage {

    get startStopButton() { return cy.get('#startStopButton') }
    get progressBar() { return cy.get('#progressBar') }
    get resetButton() { return cy.get('#resetButton') }


    _getPercentValue($el) {
        return Number($el.text().replace('%', '').trim())
    }


    navegar() {
        cy.visit('/')
        cy.contains('.card-body', 'Widgets').click()
        cy.contains('.element-list', 'Progress Bar').click()
    }

    clicarStartStop() {
        this.startStopButton.click()
    }

    esperarProgressoMinimo(valor) {
        cy.get('#progressBar', { timeout: 20000 }).should(($el) => {
            const value = this._getPercentValue($el)
            expect(value).to.be.at.least(valor)
        })
    }

    validarValorIntervalo(min, max) {
        cy.get('#progressBar', { timeout: 10000 }).should(($el) => {
            const value = this._getPercentValue($el)
            expect(value).to.be.at.least(min)
            expect(value).to.be.at.most(max)
        })
    }

    esperarConclusao() {
        cy.get('#progressBar', { timeout: 30000 }).should(($el) => {
            const value = this._getPercentValue($el)
            expect(value).to.eq(100)
        })
    }

    resetar() {
        this.resetButton.click()
    }

    validarReset() {
        this.progressBar.should('contain.text', '0%')
    }
}

export default new ProgressBarPage()
