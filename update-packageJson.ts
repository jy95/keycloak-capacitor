import type { API, FileInfo } from 'jscodeshift';
import * as fs from 'fs';
import { basename } from 'path';
const { parse } = require('json-estree-ast');

import updatePackageJsonDeps from "./jscodeshifts/update-packageJsonDeps";

export default function transformer(file : FileInfo, api : API, options) {
    const fixes = ["dependencies", "devDependencies"];
    let src = file.source;
    let secondInput = fs.readFileSync(options.originalKeycloakPath, "utf8");
    const originalKeycloakAST = parse(
        secondInput,
        {
            loc: true,
            source: basename(options.originalKeycloakPath)
        }
    )

    fixes.forEach(dependanciesType => {
        if (typeof(src) === "undefined") { return; }
        const nextSrc = updatePackageJsonDeps({ ...file, source:src }, api, {
            type: dependanciesType as "dependencies" | "devDependencies",
            originalKeycloakAST: originalKeycloakAST
        });

        if (nextSrc) {
            src = nextSrc;
        }
    });
    return src;
};

export const parser = require('json-estree-ast');