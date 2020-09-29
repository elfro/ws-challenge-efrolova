/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on) => {
    on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
            launchOptions.args.push('--disable-dev-shm-usage');
            launchOptions.args.push('--cast-initial-screen-width=1920');
            launchOptions.args.push('--cast-initial-screen-height=1080');

            return launchOptions;
        }

        if (browser.name === 'electron' && browser.isHeadless) {
            launchOptions.preferences.width = 1920;
            launchOptions.preferences.height = 1080;

            return launchOptions;
        }
    });
}
