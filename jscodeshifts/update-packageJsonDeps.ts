import type { API, FileInfo, Collection } from 'jscodeshift';

// Get all dependancies for a given type
function getAllDependancies(root: Collection<any>, api: API, options : {
    type: "dependencies" | "devDependencies"
}) : {
    [key: string]: string
} {
    const j = api.jscodeshift;

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
    originalKeycloakAST: any,
    [key: string]: any
}) {
    const j = api.jscodeshift;
    // AST
    const mainRoot = j(file.source);
    const originalKeycloak = j(options.originalKeycloakAST);

    // Fetch dependancies
    const originalDeps = getAllDependancies(mainRoot, api, options);
    const keycloakDeps = getAllDependancies(originalKeycloak, api, options);

    // merge dependancies
    const mergedDeps = Object.assign({}, originalDeps, keycloakDeps);

    // Replace dependancies
    return mainRoot
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