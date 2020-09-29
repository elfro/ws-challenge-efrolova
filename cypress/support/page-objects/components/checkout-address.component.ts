import { BillingAddress } from '../../models/billing-address.model';

export class CheckoutAddressComponent {
    private readonly nodeBillingStep = '#snipcart-billingaddress-form';
    private readonly inputName = '#snip-name';
    private readonly inputCompany = '#snip-company';
    private readonly inputAddressFirst = '#snip-address1';
    private readonly inputAddressSecond = '#snip-address2';
    private readonly inputCity = '#snip-city';
    private readonly selectCountry = '#snip-country';
    private readonly selectState = '#snipprovince';
    private readonly inputZip = '#snip-postalCode';
    private readonly inputPhone = '#snip-phone';
    private readonly inputEmail = '#snip-email';
    private readonly btnNextStep = '#snipcart-next';

    fillInAddress(address: BillingAddress) {
        const { name, companyName, address1, address2, city, country, email, phone, state, zip } = address;
        cy.clearAndType(this.inputName, name)
            .clearAndType(this.inputCompany, companyName)
            .clearAndType(this.inputAddressFirst, address1)
            .clearAndType(this.inputAddressSecond, address2)
            .clearAndType(this.inputCity, city)
            .selectValue(this.selectCountry, country)
            .selectValue(this.selectState, state)
            .clearAndType(this.inputZip, zip.toString())
            .clearAndType(this.inputPhone, phone.toString())
            .clearAndType(this.inputEmail, email)
    }

    goToNextStep() {
        cy.get(this.btnNextStep).click();
    }
}
