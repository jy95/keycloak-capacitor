#!/usr/bin/env ts-node

import { readFile, writeFile } from 'fs/promises';

async function toJSON(path : string) {
    let payload = await readFile(path, "utf-8");
    return JSON.parse(payload);
}

type dependanciesType = "dependencies" | "devDependencies";

// Find all dependancies of given type
function getAllDependancies(packageJson : { [x: string]: any }, type: dependanciesType) : {[x: string]: string} {
    return Object
        .entries(
            packageJson[type] || {}
        )
        .reduce(
            (acc, [name, version]) => {
                acc[name] = version;
                return acc;
            },
            {}
        )
}

export async function updateDependancies(forkPackage: string, keycloakPackage: string) {
    try {
        // read files
        let current = await toJSON(forkPackage);
        let original = await toJSON(keycloakPackage);

        // Begin processing
        let dependanciesList : dependanciesType[] = ['dependencies', 'devDependencies']
        let newDependancies : {
            [x in dependanciesType] : {[x: string] : string}
        } = dependanciesList.reduce( 
            (acc, depType) => {

            // Fetch dependancies
            const originalDeps = getAllDependancies(current, depType);
            const keycloakDeps = getAllDependancies(original, depType);

            // merge dependancies
            acc[depType] = Object.assign({}, originalDeps, keycloakDeps);
            return acc;
        }, {} as any);

        // Update original file
        let updatedJSON = Object.assign({}, current, newDependancies);

        return Promise.resolve(updatedJSON);
    } catch (error) {
        return Promise.reject(error);
    }

}

export default async function main() {
    const myArguments = process.argv.slice(2);
    const [forkPackage, keycloakPackage] = myArguments;
    const updatedJSON = await updateDependancies(forkPackage, keycloakPackage);
    await writeFile(forkPackage, updatedJSON);
}