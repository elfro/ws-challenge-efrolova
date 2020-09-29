export interface PaymentInfo {
    paymentMethod: string,
    cardName: string,
    cardType: string,
    cardNumber: string,
    cardCVC: number,
    expirationYear: number,
    expirationMonth: string
}
