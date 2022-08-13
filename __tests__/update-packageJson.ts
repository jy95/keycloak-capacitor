/** @type {import('jest/dist/types')} */

import { readFile } from 'fs/promises';
import { join } from 'path';
import { updateDependancies } from "../update-packageJson";

const generatePath = (testFilePrefix : string, testFileType : 'input' | 'input2' | 'output') => join(
    __dirname, 
    "..", 
    "__testfixtures__", 
    `${testFilePrefix}.${testFileType}.json`
)

const fetchFile = (testFilePrefix : string, testFileType : 'input' | 'input2' | 'output') => readFile(
    generatePath(testFilePrefix, testFileType),
    "utf8"
);

const input = generatePath("update-packageJson", "input");
const input2 = generatePath("update-packageJson", "input2");

describe("Update package.json", () => {

    beforeEach(() => {    
        // Reset mocks
        jest.resetAllMocks();
    });

    test("Complex example", async () => {
        const actual = await updateDependancies(input, input2);
        const expected = JSON.parse(await fetchFile("update-packageJson", "output"))
        expect(actual).toEqual(expected);
    })

})