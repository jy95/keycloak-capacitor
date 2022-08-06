/** @type {import('jest/dist/types')} */
jest.autoMockOff();

import * as fs from 'fs';
import { join } from 'path';

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;
import * as transform from '../update-adapterTypes';

const transformOptions = {};

const fetchFile = (testFilePrefix : string, testFileType : 'input' | 'output') => fs.readFileSync(
    join(__dirname, "..", "__testfixtures__", `${testFilePrefix}.${testFileType}.d.ts`),
    "utf8"
);
const input = fetchFile("update-adapterTypes", "input");
const output = fetchFile("update-adapterTypes", "output");

defineInlineTest(transform, transformOptions, input, output, 'Should update .d.ts definition');