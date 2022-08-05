import type { API, FileInfo } from 'jscodeshift';

import updateAdaptersList from './update-keycloak-adapters-list';
import initAdapators from './update-keycloak-loadAdapter';
import addAdaptors from './update-keycloak-add-adaptors';

export default function transformer(file : FileInfo, api : API, options) {
    const fixes = [updateAdaptersList, initAdapators, addAdaptors];
    let src = file.source;
    fixes.forEach(fix => {
        if (typeof(src) === "undefined") { return; }
        const nextSrc = fix({ ...file, source:src }, api/*, options*/);

        if (nextSrc) {
            src = nextSrc;
        }
    });
    return src;
};