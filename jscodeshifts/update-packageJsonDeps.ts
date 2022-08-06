import type { API, FileInfo } from 'jscodeshift';

// Get all dependancies for a given type
function getAllDependancies(file: FileInfo, api: API, options : {
    type: "dependencies" | "devDependencies",
    originalKeycloakPath: string
}) : {
    [key: string]: string
} {
    const j = api.jscodeshift;
    const root = j(file.source);

    // To find out the object containing the dependancies
    const searchCriteriaDeps = {
        key: {
            name: options.type
        }
    };

    return root
        .find(
            j.Property,
            searchCriteriaDeps
        )
        // Replace dependencies
        .find(
            j.Property,
            {
                key: {
                    type: "Identifier"
                },
                value: {
                    type: "Literal"
                }
            }
        )
        .nodes()
        .reduce( (acc, node) => {
            let key = node.key.type === "Identifier" && node.key.name;
            acc[key] = node.value.type === "Literal" && node.value.value;
            return acc;
        }, {});
}

export default function transformer(file: FileInfo, api: API, options : {
    type: "dependencies" | "devDependencies",
    originalKeycloakPath: string,
    [key: string]: any
}) {
    const j = api.jscodeshift;
    const root = j(file.source);

    // Fetch dependancies
    const originalDeps = getAllDependancies(file, api, options);
    const keycloakDeps = getAllDependancies({
        path: "original_keycloak_package.json",
        source: options.originalKeycloakPath
    }, api, options);

    // merge dependancies
    const mergedDeps = Object.assign({}, originalDeps, keycloakDeps);

    // Replace dependancies
    return root
        .find(
            j.Property,
            {
                key: {
                    name: options.type
                }
            }
        )
        .replaceWith(
            nodePath => {
                const { node } = nodePath;
                node.value = j.objectExpression(
                    Object
                        .entries(mergedDeps)
                        .map( ([key, value]) => j.property(
                            "init",
                            j.identifier(key),
                            j.literal(value)
                        ))
                );
                return node;
            }
        )
        .toSource();
}