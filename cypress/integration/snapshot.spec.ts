import { HomePage } from '../support/page-objects/home.po';

describe('CNC Experience Viewer Visual test', function () {
    const homePage = new HomePage();

    beforeEach(function () {
        homePage.openPage();
    })

    it('should compare snapshots', function () {
        cy.get(homePage.divExperienceViewer)
            .compareSnapshot('Baseline', 0.3);
    });
});
