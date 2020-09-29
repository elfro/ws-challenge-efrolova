import {PaymentInfo} from "../../models/payment-info.model";

export class CheckoutPaymentComponent {
    private readonly selectCardType = '#snip-type';
    private readonly inputOwnerName = '#snip-ownerName';
    private readonly inputCardNumber = '#snip-number';
    private readonly inputCVC = '#snip-cvc';
    private readonly selectExpirationMonth = '#snip-expirationMonth';
    private readonly selectExpirationYear = '#snip-expirationYear';

    fillInPaymentInfo(paymentInfo: PaymentInfo) {
        const {cardName, cardNumber, cardType, cardCVC, expirationMonth, expirationYear} = paymentInfo;

        cy.selectValue(this.selectCardType, cardType)
            .clearAndType(this.inputOwnerName, cardName)
            .clearAndType(this.inputCardNumber, cardNumber.toString())
            .clearAndType(this.inputCVC, cardCVC.toString())
            .selectValue(this.selectExpirationMonth, expirationMonth.toString())
            .selectValue(this.selectExpirationYear, expirationYear.toString())
    }
}
