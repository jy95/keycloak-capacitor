/** @type {import('jest/dist/types')} */
jest.autoMockOff();

import * as fs from 'fs';
import { join } from 'path';

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;
import * as transform from '../update-packageJson';

const transformOptions = {
    originalKeycloakPath: join(__dirname, "..", "__testfixtures__", `update-packageJson.input2.json`)
};

const fetchFile = (testFilePrefix : string, testFileType : 'input' | 'output') => fs.readFileSync(
    join(__dirname, "..", "__testfixtures__", `${testFilePrefix}.${testFileType}.json`),
    "utf8"
);
const input = fetchFile("update-packageJson", "input");
const output = fetchFile("update-packageJson", "output");

defineInlineTest(transform, transformOptions, input, output, 'Should update package.json deps');