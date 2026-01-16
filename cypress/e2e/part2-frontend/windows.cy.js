describe('Browser Windows - New Window', () => {



    it('deve abrir nova janela e validar o conteúdo', () => {
        // 1. Acessar o site
        cy.visit('/');

        // 2. Navegar até Alerts, Frame & Windows
        cy.contains('Alerts, Frame & Windows').click();

        // 3. Clicar em Browser Windows
        cy.contains('Browser Windows').click();

        // 4. Interceptar o window.open
        cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen');
        });

        // 5. Clicar no botão New Window
        cy.get("#windowButton").click();

        // 6. Capturar a URL que seria aberta
        cy.get('@windowOpen').should('have.been.called');

        cy.get('@windowOpen').then((stub) => {
            const url = stub.getCall(0).args[0];

            // 7. Visitar a URL da nova janela
            cy.visit(url);

            // 8. Validar o conteúdo
            cy.contains('This is a sample page').should('be.visible');
        });
    });
});
