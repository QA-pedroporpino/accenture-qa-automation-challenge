describe("API - User Book Flow", () => {
    it("executa o fluxo completo de usuário e livros", () => {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const userName = `pedro.porpino.${timestamp}@test.com`;
        const password = "Accenture123!";

        // Passo 1 - Criar Usuário
        cy.request({
            method: "POST",
            url: "/Account/v1/User",
            body: { userName, password },
        })
            .then((createRes) => {
                expect(createRes.status).to.eq(201);
                Cypress.env("userId", createRes.body.userID);
                Cypress.env("userName", userName);
                Cypress.env("password", password);

                // Passo 2 - Gerar Token
                return cy.request({
                    method: "POST",
                    url: "/Account/v1/GenerateToken",
                    body: { userName, password },
                });
            })
            .then((tokenRes) => {
                expect(tokenRes.body.status).to.eq("Success");
                expect(tokenRes.body.token).to.not.be.null;
                Cypress.env("token", tokenRes.body.token);

                // Passo 3 - Confirmar Autorização
                return cy.request({
                    method: "POST",
                    url: "/Account/v1/Authorized",
                    body: { userName, password },
                });
            })
            .then((authRes) => {
                expect(authRes.status).to.eq(200);
                expect(authRes.body).to.eq(true);

                // Passo 4 - Listar Livros
                return cy.request({
                    method: "GET",
                    url: "/BookStore/v1/Books",
                });
            })
            .then((booksRes) => {
                expect(booksRes.status).to.eq(200);
                expect(booksRes.body.books).to.be.an("array");
                expect(booksRes.body.books.length).to.be.greaterThan(1);

                const [firstBook, secondBook] = booksRes.body.books;
                expect(firstBook).to.have.property("isbn");
                expect(secondBook).to.have.property("isbn");

                Cypress.env("bookIsbns", [firstBook.isbn, secondBook.isbn]);

                const [isbn1, isbn2] = Cypress.env("bookIsbns");

                // Passo 5 - Alugar Livros
                return cy.request({
                    method: "POST",
                    url: "/BookStore/v1/Books",
                    headers: {
                        Authorization: `Bearer ${Cypress.env("token")}`,
                        "Content-Type": "application/json",
                    },
                    body: {
                        userId: Cypress.env("userId"),
                        collectionOfIsbns: [{ isbn: isbn1 }, { isbn: isbn2 }],
                    },
                });
            })
            .then((rentRes) => {
                expect([200, 201]).to.include(rentRes.status);
                const [isbn1, isbn2] = Cypress.env("bookIsbns");

                // Passo 6 - Buscar Detalhes do Usuário
                return cy.request({
                    method: "GET",
                    url: `/Account/v1/User/${Cypress.env(
                        "userId"
                    )}`,
                    headers: {
                        Authorization: `Bearer ${Cypress.env("token")}`,
                        "Content-Type": "application/json",
                    },
                });
            })
            .then((userRes) => {
                expect(userRes.status).to.eq(200);

                expect(userRes.body.userId).to.eq(Cypress.env("userId"));
                expect(userRes.body.username).to.eq(Cypress.env("userName"));
                expect(userRes.body.books).to.be.an("array");
                expect(userRes.body.books.length).to.eq(2);

                const returnedIsbns = userRes.body.books.map((b) => b.isbn);
                const expectedIsbns = Cypress.env("bookIsbns");
                expect(returnedIsbns).to.include.members(expectedIsbns);
            });
    });
});
