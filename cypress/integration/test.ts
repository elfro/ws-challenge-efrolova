import {ProductPage} from "../support/page-objects/product.po";
import {CartPage} from "../support/page-objects/cart-item.po";
import {CartItem} from "../support/models/cart.model";

describe('test', function () {
    const productPage = new ProductPage();
    const cartPage = new CartPage();

    before(function () {
        productPage.openPage();
    })

    it('google', function () {
        productPage.getProductInfo().then(product => {
            const expectedItem: CartItem = {
                ...product,
                qty: 1,
                totalPrice: product.price
            };

            productPage.addProductToCart();
            cartPage.getCartItems().should('include.deep.ordered.members', [expectedItem]);

            cartPage.goToNextStep();
        });
    });
});
