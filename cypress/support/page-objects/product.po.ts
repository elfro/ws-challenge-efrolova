import Chainable = Cypress.Chainable;
import { Product } from "../models/product.model";
import { getNumberFromString } from "../helper";

export class ProductPage {
    readonly url = '/products/product_2/';

    private readonly title = '.header';
    private readonly price = 'h5';
    private readonly buttonAddToCart = '.snipcart-add-item';

    openPage() {
        cy.visit(this.url);
    }

    addProductToCart() {
        cy.get(this.buttonAddToCart).click();
    }

    getProductInfo(): Chainable<Product> {
        const product: Product = { title: '', price: NaN };

        cy.get(this.title).then($el => product.title = $el.text());
        cy.get(this.price).then($el => product.price = getNumberFromString($el.text()));

        return cy.wrap(product);
    }
}
