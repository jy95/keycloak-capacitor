#!/usr/bin/env ts-node

import { writeFile } from 'fs/promises';
import { updateDependancies } from './update-packageJson';

async function main() {
    // 3 instead of 2 as I had to use -- to be use arguments are properly passed here
    const myArguments = process.argv.slice(3);
    const [forkPackage, keycloakPackage] = myArguments;
    console.log("Bumping package.json");
    const updatedJSON = await updateDependancies(forkPackage, keycloakPackage);
    await writeFile(forkPackage, JSON.stringify(updatedJSON, null, 4));
    console.log("Package.json updated")
}

// npx ts-node update-packageJsonScript.ts -- __testfixtures__/update-packageJson.input.json __testfixtures__/update-packageJson.input2.json
main();