export interface PaymentInfo {
    paymentMethod: string,
    cardName: string,
    cardType: string,
    cardNumber: number,
    cardCVC: number,
    expirationYear: number,
    expirationMonth: number
}
