import { HomePage } from '../support/page-objects/home.po';
import { ProductPage } from '../support/page-objects/product.po';
import { CartPage } from '../support/page-objects/cart.po';
import { CartItem } from '../support/models/cart.model';
import { CheckoutAddressPage } from '../support/page-objects/checkout-address.po';
import { CheckoutPaymentPage } from '../support/page-objects/checkout-payment.po';
import { CheckoutConfirmPage } from '../support/page-objects/checkout-confirm.po';
import { billingAddressData } from '../fixtures/billing-address.data';
import { paymentMethodData } from '../fixtures/payment-method.data';

describe('The whole flow of adding a product to the card and submitting order', function () {
    const homePage = new HomePage();
    const productPage = new ProductPage();
    const cartPage = new CartPage();
    const billingAddressPage = new CheckoutAddressPage();
    const paymentInfoPage = new CheckoutPaymentPage();
    const confirmPage = new CheckoutConfirmPage();

    it('should open the home page, go to details product page, add item to the cart, pass checkout and submit an order successfully', function () {
        const billing = billingAddressData;
        const payment = paymentMethodData;
        const expectedPaymentInfo = {
            ...Cypress._.pick(payment, ['paymentMethod', 'cardName', 'cardType']),
            cardNumber: payment.cardNumber.substr(-4, 4)
        };
        const initialProduct: CartItem = {} as CartItem;

        homePage.openPage();
        homePage.switchToNextWidgetScene();
        homePage.clickGoToProductBtn();
        productPage.getProductInfo().then(product => {
            initialProduct.title = product.title;
            initialProduct.qty = 1;
            initialProduct.price = product.price;
            initialProduct.totalPrice = product.price * initialProduct.qty;
        });
        productPage.addProductToCart();

        cartPage.getCartItems().should('include.deep.ordered.members', [initialProduct]);

        cartPage.goToNextStep();
        billingAddressPage.fillInAddress(billing);
        billingAddressPage.goToNextStep();
        paymentInfoPage.fillInPaymentInfo(payment);
        paymentInfoPage.goToNextStep();

        confirmPage.getBillingAddressInfo().should('include', billing);
        confirmPage.getPaymentInfo().should('include', expectedPaymentInfo);
        confirmPage.getItemsInfo().should('include.deep.ordered.members', [initialProduct]);
        confirmPage.placeOrder().should(({ requestBody, responseBody }) => {
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
