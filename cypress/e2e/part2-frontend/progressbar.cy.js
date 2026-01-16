import progressBarPage from '../../support/pages/progress-bar.page'

describe('Progress Bar', () => {

    beforeEach(() => {
        progressBarPage.navegar()
    })

    it('deve parar <= 25%, completar até 100% e resetar', () => {

        // ▶ Start
        progressBarPage.clicarStartStop()

        // ⏳ Esperar chegar a pelo menos 15% para evitar race condition (parar no 0%)
        progressBarPage.esperarProgressoMinimo(15)

        // ⏸ Stop
        progressBarPage.clicarStartStop()

        // ✅ Validar que parou entre 15% e 25%
        progressBarPage.validarValorIntervalo(15, 25)

        // ▶ Start novamente
        progressBarPage.clicarStartStop()

        // ⏳ Esperar chegar a 100%
        progressBarPage.esperarConclusao()

        // 🔁 Reset
        progressBarPage.resetar()

        // ✅ Validar reset
        progressBarPage.validarReset()

    })

})
