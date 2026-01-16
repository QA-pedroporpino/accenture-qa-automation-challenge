import SortablePage from '../../support/pages/sortable.page'

describe('Sortable - Drag and Drop', () => {

    beforeEach(() => {
        SortablePage.visit()
    })

    it('deve arrastar One para o final da lista', () => {
        // Arrastar "Six" para cima
        SortablePage.dragAndDrop('Six', 'One')

        // Validar que "One" virou o último item
        SortablePage.getLastItem().should('contain.text', 'Five')

        // Arrastar "Five" para baixo, depois de "Six"
        SortablePage.dragAndDrop('Five', 'One')

        // Validar que "One" virou o último item
        SortablePage.getLastItem().should('contain.text', 'Four')

        // Arrastar "Four" para baixo, depois de "Six"
        SortablePage.dragAndDrop('Four', 'One')

        // Validar que "One" virou o último item
        SortablePage.getLastItem().should('contain.text', 'Three')

        // Arrastar "Three" para baixo, depois de "Six"
        SortablePage.dragAndDrop('Three', 'One')

        // Validar que "One" virou o último item
        SortablePage.getLastItem().should('contain.text', 'Two')

        // Arrastar "Two" para baixo, depois de "Six"
        SortablePage.dragAndDrop('Two', 'One')

        // Validar que "One" virou o último item
        SortablePage.getLastItem().should('contain.text', 'One')
    })

})
