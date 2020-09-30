import './commands';
import '@applitools/eyes-cypress/commands';
const compareSnapshotCommand = require('cypress-visual-regression/dist/command');

compareSnapshotCommand();
