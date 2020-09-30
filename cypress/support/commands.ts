import Chainable = Cypress.Chainable;

declare namespace Cypress {
    interface Chainable {
        /**
         * Clear the value of an input and then enter a new one
         * @param { string } selector - Selector of input
         * @param { string } value - Value to type to the input
         * @example
         * cy.clearAndType('.email', 'test@test.com');
         *
         */
        clearAndType(selector: string, value: string): Chainable;

        /**
         * Find select and choose value
         * @param { string } selector - Selector of select
         * @param { string } value - Value to choose
         * @example
         * cy.selectValue('.country', 'Canada');
         *
         */
        selectValue(selector: string, value: string): Chainable;
    }
}

Cypress.Commands.add('clearAndType', function (selector: string, value: string): Chainable {
    return cy.get(selector).clear().type(value);
});
Cypress.Commands.add('selectValue', function (selector: string, value: string): Chainable {
    return cy.get(selector).select(value);
});
