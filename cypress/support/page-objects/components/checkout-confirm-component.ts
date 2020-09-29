import Chainable = Cypress.Chainable;
import { BillingAddress } from '../../models/billing-address.model';
import { PaymentInfo } from '../../models/payment-info.model';
import { CartPage } from '../cart-item.po';
import { CartItem } from '../../models/cart.model';
import { getSubstringAfterSeparator } from '../../helper';

export class CheckoutConfirmComponent {
    private readonly btnPlaceOrder = '.js-submit';

    // Confirm
    private readonly columnContent = '.snip-static__content';
    private readonly indexAddressColumn = 0;
    private readonly indexPaymentInfoColumn = 1;
    private readonly columnRow = 'p';

    constructor(private itemsComponent = new CartPage()) {
    }

    // name = 1, email = 2, company = 3, address1 = 4, address2 = 5, {city, state, country} = 6, zip = 7, phone = 8
    getBillingAddressInfo(): Chainable<BillingAddress> {
        const address: BillingAddress = {} as BillingAddress;
        cy.get(this.columnContent).eq(this.indexAddressColumn).within(() => {
            cy.get(this.columnRow).eq(0).then($el => address.name = $el.text());
            cy.get(this.columnRow).eq(1).then($el => address.email = $el.text());
            cy.get(this.columnRow).eq(2).then($el => address.companyName = $el.text());
            cy.get(this.columnRow).eq(3).then($el => address.address1 = $el.text());
            cy.get(this.columnRow).eq(4).then($el => address.address2 = $el.text());
            cy.get(this.columnRow).eq(5).then($el => {
                const arr = $el.text().split(', ');
                address.city = arr[0];
                address.state = arr[1];
                address.country = arr[2];
            });
            cy.get(this.columnRow).eq(6).then($el => address.zip = +$el.text());
            cy.get(this.columnRow).eq(7).then($el => address.phone = $el.text());
        });

        return cy.wrap(address);
    }

    // Payment method = 1, Name on card = 2, Card type = 3, Card number = 4
    getPaymentInfo(): Chainable<PaymentInfo> {
        const paymentInfo: PaymentInfo = {} as PaymentInfo;
        cy.get(this.columnContent).eq(this.indexPaymentInfoColumn).within(() => {
            cy.get(this.columnRow).eq(0).then($el => paymentInfo.paymentMethod = getSubstringAfterSeparator($el.text()));
            cy.get(this.columnRow).eq(1).then($el => paymentInfo.cardName = getSubstringAfterSeparator($el.text()));
            cy.get(this.columnRow).eq(2).then($el => paymentInfo.cardType = getSubstringAfterSeparator($el.text()));
            cy.get(this.columnRow).eq(3).then($el => paymentInfo.cardNumber = getSubstringAfterSeparator($el.text()));
        });

        return cy.wrap(paymentInfo);
    }

    getItemsInfo(): Chainable<CartItem[]> {
        return this.itemsComponent.getCartItems();
    }

    placeOrder() {
        this.definePayXHR();

        return cy.get(this.btnPlaceOrder).click().wait('@postOrder');
    }

    private definePayXHR() {
        cy.server();
        cy.route({
            method: 'POST',
            url: '**/api/cart/*/pay',
        }).as('postOrder');
    }
}
