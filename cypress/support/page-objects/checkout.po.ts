import {CheckoutAddressComponent} from "./components/checkout-address.component";
import {CheckoutPaymentComponent} from "./components/checkout-payment.component";

export class CheckoutPage {
    // Footer
    private readonly btnNextStep = '#snipcart-next';
    private readonly buttonPlaceOrder    = '.js-next.snip-btn';


    // Confirm
    private readonly columnContent = '.snip-static__content';
    private readonly indexAddressColumn = 1;
    private readonly indexPaymentInfoColumn = 2;

    // name = 1, email = 2, company = 3, address1 = 4, address2 = 5, {city, state, country} = 6, zip = 7, phone = 8
    // Payment method = 1, Name on card = 2, Card type = 3, Card number = 4

    constructor(public billingAddress: CheckoutAddressComponent = new CheckoutAddressComponent(),
                public paymentInfo: CheckoutPaymentComponent = new CheckoutPaymentComponent()) {
        this.definePayXHR();
    }

    private definePayXHR() {
        cy.server()
        cy.route({
            method: 'POST',
            url: '**/api/cart/*/pay',
        }).as('postOrder');
    }
}
