import { ProductPage } from '../support/page-objects/product.po';
import { CartPage } from '../support/page-objects/cart-item.po';
import { CheckoutPage } from '../support/page-objects/checkout.po';
import { CartItem } from '../support/models/cart.model';
import { billingAddressData } from '../fixtures/billing-address.data';
import { paymentMethodData } from '../fixtures/payment-method.data';

describe('Full flow of adding a product to the card and submitting order', function () {
    const productPage = new ProductPage();
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();

    before(function () {
        productPage.openPage();
    })

    it('should open the home page, add item to the cart, pass checkout and submit an order successfully', function () {
        const billing = billingAddressData;
        const payment = paymentMethodData;
        const expectedPaymentInfo = {
            ...Cypress._.pick(payment, ['paymentMethod', 'cardName', 'cardType']),
            cardNumber: payment.cardNumber.substr(-4, 4)
        };

        const initialProduct: CartItem = {} as CartItem;
        productPage.getProductInfo().then(product => {
            initialProduct.title = product.title;
            initialProduct.qty = 1;
            initialProduct.price = product.price;
            initialProduct.totalPrice = product.price * initialProduct.qty;
        });
        productPage.addProductToCart();

        cartPage.getCartItems().should('include.deep.ordered.members', [initialProduct]);

        cartPage.goToNextStep();
        checkoutPage.billingAddress.fillInAddress(billing);
        checkoutPage.billingAddress.goToNextStep();
        checkoutPage.paymentInfo.fillInPaymentInfo(payment);
        checkoutPage.paymentInfo.goToNextStep();

        checkoutPage.confirm.getBillingAddressInfo().should('include', billing);
        checkoutPage.confirm.getPaymentInfo().should('include', expectedPaymentInfo);
        checkoutPage.confirm.getItemsInfo().should('include.deep.ordered.members', [initialProduct]);

        checkoutPage.confirm.placeOrder().should(({ requestBody, responseBody }) => {
            expect(requestBody.card).contain({
                number: payment.cardNumber,
                cvc: payment.cardCVC.toString(),
                expirationYear: payment.expirationYear.toString(),
                type: payment.cardType.toLowerCase(),
                ownerName: payment.cardName,
                expirationMonth: Cypress.moment().month(payment.expirationMonth).format('M')
            });

            expect(responseBody.billingAddress).contain({
                address1: billing.address1,
                address2: billing.address2,
                city: billing.city,
                company: billing.companyName,
                country: billing.country,
                fullName: billing.name,
                name: billing.name,
                phone: billing.phone,
                postalCode: billing.zip.toString(),
                province: billing.state
            });
        });
    });
});
