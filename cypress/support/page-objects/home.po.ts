export class HomePage {
    private readonly url = '/pages/cnc-test-1.html';
    private readonly _divExperienceViewer = '.ExperienceViewer_experienceViewer_2hSVo';
    private readonly widgetScene = '[class^="scene"]:visible';
    private readonly btnNextScene = '[src$="next_scene.svg"]';
    private readonly btnGoToProduct = '.button-widget a';

    get divExperienceViewer(): string {
        return this._divExperienceViewer;
    }

    openPage() {
        cy.visit(this.url);
    }

    getExperienceViewer() {
        return cy.get(this._divExperienceViewer);
    }

    switchToNextWidgetScene() {
        cy.get(this.btnNextScene).click();
    }

    clickGoToProductBtn() {
        cy.get(this.widgetScene).find(this.btnGoToProduct).as('btn').then(el => {
            const href = (el.attr('href') as string).replace('.com/', '.app/');
            cy.visit(href);
        });
    }
}
