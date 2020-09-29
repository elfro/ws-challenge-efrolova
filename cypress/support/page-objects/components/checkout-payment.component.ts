import { PaymentInfo } from '../../models/payment-info.model';

export class CheckoutPaymentComponent {
    private readonly selectCardType = '#snip-type';
    private readonly inputOwnerName = '#snip-ownerName';
    private readonly inputCardNumber = '#snip-number';
    private readonly inputCVC = '#snip-cvc';
    private readonly selectExpirationMonth = '#snip-expirationMonth';
    private readonly selectExpirationYear = '#snip-expirationYear';
    private readonly btnNextStep = '#snipcart-paymentmethod-pay';

    fillInPaymentInfo(paymentInfo: PaymentInfo) {
        const { cardName, cardNumber, cardType, cardCVC, expirationMonth, expirationYear } = paymentInfo;

        cy.selectValue(this.selectCardType, cardType)
            .clearAndType(this.inputOwnerName, cardName)
            .clearAndType(this.inputCardNumber, cardNumber)
            .clearAndType(this.inputCVC, cardCVC.toString())
            .selectValue(this.selectExpirationMonth, expirationMonth)
            .selectValue(this.selectExpirationYear, expirationYear.toString())
    }

    goToNextStep() {
        cy.get(this.btnNextStep).click();
    }
}
