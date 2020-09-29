export class HomePage {
    private readonly buttonGoToProduct = '.button-widget a';

    goToProduct() {
        cy.get(this.buttonGoToProduct).click();
    }
}
