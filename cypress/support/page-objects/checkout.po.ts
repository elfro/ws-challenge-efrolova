import { CheckoutAddressComponent } from './components/checkout-address.component';
import { CheckoutPaymentComponent } from './components/checkout-payment.component';
import { CheckoutConfirmComponent } from './components/checkout-confirm-component';

export class CheckoutPage {
    constructor(public billingAddress: CheckoutAddressComponent = new CheckoutAddressComponent(),
                public paymentInfo: CheckoutPaymentComponent = new CheckoutPaymentComponent(),
                public confirm: CheckoutConfirmComponent = new CheckoutConfirmComponent()) {
    }
}
