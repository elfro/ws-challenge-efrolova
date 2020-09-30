import { HomePage } from '../support/page-objects/home.po';

describe('CNC Experience Viewer Visual test with Applitools', function () {
    const homePage = new HomePage();

    beforeEach(function () {
        cy.eyesOpen({
            matchLevel: 'Exact',
            browser: [{
                name: 'chrome',
                width: 1920,
                height: 1080
            }]
        });
        homePage.openPage();
    })

    it('should check the experience viewer', function () {
        homePage.getExperienceViewer()
            .eyesCheckWindow({
                target: 'region',
                selector: {
                    type: 'css',
                    selector: homePage.divExperienceViewer
                },
                tag: 'experience viewer'
            })
    });

    afterEach(function () {
        cy.eyesClose();
    });
});
