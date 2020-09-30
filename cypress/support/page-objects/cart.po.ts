import Chainable = Cypress.Chainable;
import { CartItem } from '../models/cart.model';
import { getNumberFromString } from '../helper';

export class CartPage {

    private readonly trCartItem = '.snip-table__item';
    private readonly itemName = '.snip-product__name';
    private readonly itemQty = '.snip-quantity-trigger__text';
    private readonly itemUnitPrice = '[data-bind="unitPrice"]';
    private readonly itemTotalPrice = '[data-bind="totalPrice"]';

    private readonly btnNextStep = '.js-next.snip-btn';

    getCartItems(): Chainable<CartItem[]> {
        const items: CartItem[] = [];

        cy.get(this.trCartItem).each($item => {
            const item: CartItem = {} as CartItem;

            cy.wrap($item).within(() => {
                cy.get(this.itemName).then($el => item.title = $el.text());
                cy.get(this.itemQty).then($el => item.qty = +$el.text());
                cy.get(this.itemUnitPrice).then($el => item.price = getNumberFromString($el.text()));
                cy.get(this.itemTotalPrice).then($el => item.totalPrice = getNumberFromString($el.text()));
            });

            items.push(item);
        })

        return cy.wrap(items);
    }

    goToNextStep() {
        cy.get(this.btnNextStep).click();
    }
}
