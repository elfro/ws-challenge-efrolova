import Chainable = Cypress.Chainable;
import {CartItem} from "../models/cart.model";
import {getPriceFromString} from "../helper";

export class CartPage {

    private readonly nodeMainCartContent = '#snipcart-main-content';

    private readonly cartSubtotal = '#snipcart-amount';
    private readonly trCartItem = '.snip-table__item';
    private readonly itemName = '.snip-product__name';
    private readonly itemQty = '.snip-quantity-trigger__text';
    private readonly itemUnitPrice = '[data-bind="unitPrice"]';
    private readonly itemTotalPrice = '[data-bind="totalPrice"]';

    private readonly buttonNextStep = '.js-next.snip-btn';

    getCartItems(): Chainable<CartItem[]> {
        const items: CartItem[] = [];

        cy.get(this.trCartItem).each($item => {
            const item: CartItem = {title: '', price: NaN, qty: NaN, totalPrice: NaN}

            cy.wrap($item).within(() => {
                cy.get(this.itemName).then($el => item.title = $el.text());
                cy.get(this.itemQty).then($el => item.qty = +$el.text());
                cy.get(this.itemUnitPrice).then($el => item.price = getPriceFromString($el.text()));
                cy.get(this.itemTotalPrice).then($el => item.totalPrice = getPriceFromString($el.text()));
            });

            items.push(item);
        })

        return cy.wrap(items);
    }

    goToNextStep() {
        cy.get(this.buttonNextStep).click();
    }
}
