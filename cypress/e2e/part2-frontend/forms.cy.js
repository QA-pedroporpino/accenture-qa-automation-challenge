import practiceFormPage from "../../support/pages/practice-form.page";

describe("Forms - Practice Form", () => {

    it("preenche e submete o formulário com sucesso", () => {
        // Obtém dados dinâmicos centralizados no Page Object
        const user = practiceFormPage.generateUserData();

        // Passo 1 a 3 - Acessar o site e navegar até o formulário
        practiceFormPage.visit();

        // Passo 4 - Preencher o formulário usando o objeto de dados
        practiceFormPage.fillName(user.firstName, user.lastName);
        practiceFormPage.fillEmail(user.email);
        practiceFormPage.selectGender(user.gender);
        practiceFormPage.fillMobileNumber(user.mobileNumber);

        practiceFormPage.setDateOfBirth(user.date.day, user.date.month, user.date.year);
        practiceFormPage.fillSubjects(user.subject);
        practiceFormPage.selectHobbies(user.hobby);

        // Passo 5 - Upload de arquivo
        practiceFormPage.uploadPicture(user.picturePath);

        practiceFormPage.fillCurrentAddress(user.address);
        practiceFormPage.selectStateAndCity(user.state, user.city);

        // Passo 6 - Submeter e Validar
        practiceFormPage.submit();
        practiceFormPage.validateSuccessMessage();
        practiceFormPage.closeModal();
    });
});
