const getCompareSnapshotsPlugin = require('cypress-visual-regression/dist/plugin');

module.exports = (on, config) => {
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

    getCompareSnapshotsPlugin(on, config);
}

require('@applitools/eyes-cypress')(module);
