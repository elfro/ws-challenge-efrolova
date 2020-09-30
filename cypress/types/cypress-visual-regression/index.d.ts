declare module 'cypress-visual-regression';

declare namespace Cypress {
    interface Chainable {
        compareSnapshot(subject, name, params?)
    }
}
