/** @type {import('jest/dist/types')} */
jest.autoMockOff();

const defineTest = require('jscodeshift/dist/testUtils').defineTest;
defineTest(__dirname, 'update-keycloak');