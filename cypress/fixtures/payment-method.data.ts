import * as faker from 'faker';
import { PaymentInfo } from '../support/models/payment-info.model';
import { CardTypes } from './enums/card-types.enum';

export const paymentMethodData: PaymentInfo = {
    cardType: CardTypes.VISA,
    cardName: faker.name.findName(),
    cardNumber: '4242424242424242',
    cardCVC: +faker.finance.creditCardCVV(),
    expirationMonth: faker.date.month(),
    expirationYear: Cypress.moment().add(2, 'y').year(),
    paymentMethod: 'Credit card'
}