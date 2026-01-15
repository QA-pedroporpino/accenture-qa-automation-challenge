import webTablesPage from "../../support/pages/web-tables.page";

describe('Web Tables - CRUD e Automação Dinâmica', () => {

    beforeEach(() => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        webTablesPage.visit();
    });

    const user = {
        firstName: 'Pedro',
        lastName: 'Porpino',
        email: `pedro.${Date.now()}@test.com`,
        age: '28',
        salary: '9000',
        department: 'QA'
    };

    it('deve realizar o fluxo completo de CRUD (Criar, Editar e Deletar)', () => {
        // Create
        webTablesPage.addRecord(user);
        webTablesPage.checkRecordExists(user.email);

        // Edit
        webTablesPage.clickEditRecord(user.email);
        webTablesPage.updateSalary('12000');
        webTablesPage.checkRecordExists('12000');

        // Delete
        webTablesPage.clickDeleteRecord(user.email);
        webTablesPage.checkRecordNotExist(user.email);
    });
});
