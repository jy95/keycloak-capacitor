/** @type {import('jest/dist/types')} */
jest.autoMockOff();

const defineSnapshotTestFromFixture = require('jscodeshift/dist/testUtils').defineSnapshotTestFromFixture;

const transform = require('../jscodeshifts/update-keycloak');
const transformOptions = {};

defineSnapshotTestFromFixture(__dirname, transform, transformOptions, 'update-keycloak', 'Should turn keycloak.js to keycloak-capacitor');