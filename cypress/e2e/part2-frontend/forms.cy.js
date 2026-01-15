describe("Forms - Practice Form", () => {

    beforeEach(() => {
        cy.on('uncaught:exception', (err, runnable) => {
            // Retornar false impede que o Cypress falhe o teste
            // quando ocorrerem exceções não tratadas (comum em sites com ads)
            return false
        })
    })

    it("preenche e submete o formulário com sucesso", () => {

        // Dados dinâmicos para evitar repetição
        const timestamp = Date.now();
        const firstName = `Pedro${timestamp}`;
        const lastName = `Porpino${timestamp}`;
        const email = `pedro.porpino.${timestamp}@test.com`;

        const mobileNumber = Math.floor(
            1000000000 + Math.random() * 9000000000
        ).toString();
        const address = `Rua Cypress QA, ${Math.floor(Math.random() * 1000)}`;


        // Passo 1 - Acessar o site
        cy.visit("/");

        // Passo 2 - Acessar Forms
        cy.contains(".card-body", "Forms").click();
        cy.url().should("include", "/forms");

        // Passo 3 - Acessar Practice Form
        cy.contains("li", "Practice Form").click();
        cy.contains("Student Registration Form").should("be.visible");

        // Passo 4 - Preencher o formulário
        cy.get("#firstName")
            .should("be.visible")
            .type(firstName);

        cy.get("#lastName")
            .should("be.visible")
            .type(lastName);

        cy.get("#userEmail")
            .should("be.visible")
            .type(email);

        cy.get("#gender-radio-2").check({ force: true });

        cy.get("#userNumber")
            .should("be.visible")
            .type(mobileNumber);


        cy.get('#dateOfBirthInput')
            .should('be.visible')
            .click();

        cy.get('.react-datepicker__month-select')
            .select('January');

        cy.get('.react-datepicker__year-select')
            .select('1996');

        cy.get('.react-datepicker__day--014')
            .not('.react-datepicker__day--outside-month')
            .click();

        cy.get('#subjectsInput')
            .should('be.visible')
            .type('Maths{enter}');

        cy.get('#hobbies-checkbox-1').check({ force: true });

        // Passo 5 - Upload de arquivo
        cy.get('#uploadPicture').selectFile('cypress/fixtures/upload.txt');

        cy.get('#currentAddress')
            .should('be.visible')
            .type(address);

        cy.contains('div', 'Select State').click();
        cy.contains('div', 'NCR').click();

        cy.contains('div', 'Select City').click();
        cy.contains('div', 'Delhi').click();

        cy.get('#submit')
            .should('be.visible')
            .click();

        cy.contains("Thanks for submitting the form").should("be.visible");

        cy.get('#closeLargeModal')
            .scrollIntoView()
            .click({ force: true });

    });
});
