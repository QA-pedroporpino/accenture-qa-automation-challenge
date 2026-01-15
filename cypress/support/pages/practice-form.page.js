class PracticeFormPage {
    visit() {
        cy.visit("/");
        cy.contains(".card-body", "Forms").click();
        cy.url().should("include", "/forms");
        cy.contains("li", "Practice Form").click();
        cy.contains("Student Registration Form").should("be.visible");
    }

    fillName(firstName, lastName) {
        cy.get("#firstName").should("be.visible").type(firstName);
        cy.get("#lastName").should("be.visible").type(lastName);
    }

    fillEmail(email) {
        cy.get("#userEmail").should("be.visible").type(email);
    }

    selectGender(gender = 'Female') {
        // gender-radio-1: Male, 2: Female, 3: Other
        const genderId = gender === 'Male' ? 1 : gender === 'Female' ? 2 : 3;
        cy.get(`#gender-radio-${genderId}`).check({ force: true });
    }

    fillMobileNumber(number) {
        cy.get("#userNumber").should("be.visible").type(number);
    }

    setDateOfBirth(day, month, year) {
        cy.get('#dateOfBirthInput').should('be.visible').click();
        cy.get('.react-datepicker__month-select').select(month);
        cy.get('.react-datepicker__year-select').select(year);
        cy.get(`.react-datepicker__day--0${day}`)
            .not('.react-datepicker__day--outside-month')
            .click();
    }

    fillSubjects(subject) {
        cy.get('#subjectsInput').should('be.visible').type(`${subject}{enter}`);
    }

    selectHobbies(hobby = 'Sports') {
        // 1: Sports, 2: Reading, 3: Music
        const hobbyId = hobby === 'Sports' ? 1 : hobby === 'Reading' ? 2 : 3;
        cy.get(`#hobbies-checkbox-${hobbyId}`).check({ force: true });
    }

    uploadPicture(filePath) {
        cy.get('#uploadPicture').selectFile(filePath);
    }

    fillCurrentAddress(address) {
        cy.get('#currentAddress').should('be.visible').type(address);
    }

    selectStateAndCity(state, city) {
        cy.contains('div', 'Select State').click();
        cy.contains('div', state).click();
        cy.contains('div', 'Select City').click();
        cy.contains('div', city).click();
    }

    submit() {
        cy.get('#submit').should('be.visible').click();
    }

    validateSuccessMessage() {
        cy.contains("Thanks for submitting the form").should("be.visible");
    }

    closeModal() {
        cy.get('#closeLargeModal')
            .scrollIntoView()
            .click({ force: true });
    }
}

export default new PracticeFormPage();
