import practiceFormPage from "../../support/pages/practice-form.page";

describe("Forms - Practice Form", () => {

    beforeEach(() => {
        practiceFormPage.visit();
    })

    it("preenche e submete o formulário com sucesso", () => {

        // Dados dinâmicos para evitar repetição
        const timestamp = Date.now();
        const firstName = `Pedro`;
        const lastName = `Porpino`;
        const email = `pedro.porpino.${timestamp}@test.com`;

        const mobileNumber = Math.floor(
            1000000000 + Math.random() * 9000000000
        ).toString();
        const address = `Rua Cypress QA, ${Math.floor(Math.random() * 100)}`;


        // Passo 1 a 3 - Acessar o site e navegar até o formulário
        practiceFormPage.visit();

        // Passo 4 - Preencher o formulário
        practiceFormPage.fillName(firstName, lastName);
        practiceFormPage.fillEmail(email);
        practiceFormPage.selectGender('Female');
        practiceFormPage.fillMobileNumber(mobileNumber);

        practiceFormPage.setDateOfBirth('14', 'January', '1996');
        practiceFormPage.fillSubjects('Maths');
        practiceFormPage.selectHobbies('Sports');

        // Passo 5 - Upload de arquivo
        practiceFormPage.uploadPicture('cypress/fixtures/upload.txt');

        practiceFormPage.fillCurrentAddress(address);
        practiceFormPage.selectStateAndCity('NCR', 'Delhi');

        // Passo 6 - Submeter e Validar
        practiceFormPage.submit();
        practiceFormPage.validateSuccessMessage();
        practiceFormPage.closeModal();

    });
});
