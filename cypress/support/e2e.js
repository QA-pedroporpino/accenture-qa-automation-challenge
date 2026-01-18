// Global handler for uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
    // Ignora apenas erros de scripts de anúncios do DemoQA
    if (err.message.includes('adsbygoogle') || err.message.includes('Script error')) {
        return false
    }
    // Mantém falha para erros reais da aplicação
})
