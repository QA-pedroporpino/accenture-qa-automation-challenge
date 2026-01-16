// Import commands.js using ES2015 syntax:
// import './commands'

// Global handler for uncaught exceptions
// This is common in sites with third-party ads like demoqa.com
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
})
