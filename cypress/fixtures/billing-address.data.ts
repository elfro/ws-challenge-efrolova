import * as faker from 'faker';
import { BillingAddress } from '../support/models/billing-address.model';
import { Countries } from './enums/countries.enum';
import { States } from './enums/states.enum';

export const billingAddressData: BillingAddress = {
    name: faker.name.findName(),
    companyName: faker.company.companyName(),
    address1: faker.address.streetAddress(),
    address2: faker.address.streetAddress(),
    city: faker.address.city(),
    country: Countries.USA,
    state: States.USA_CA,
    zip: +faker.address.zipCode('#####'),
    phone: faker.phone.phoneNumber('123#######'),
    email: faker.internet.email()
}
