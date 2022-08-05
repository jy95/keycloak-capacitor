import type { API, FileInfo } from 'jscodeshift';

export default function transformer(file: FileInfo, api: API) {
    const j = api.jscodeshift;
    const root = j(file.source);

    // Replace default loadAdapter by our code
    return root
        .find(
            j.AssignmentExpression, 
            {
                left: {
                    type: "Identifier",
                    name: "adapter"
                },
                right: {
                    type: "CallExpression",
                    callee: {
                        type: "Identifier",
                        name: "loadAdapter"
                    },
                    arguments: []
                }
            }
        )
        // filter needed as loadAdapter is used twice
        .filter(path => path.node.right.type === "CallExpression" && path.node.right.arguments.length === 0)
        .forEach(p => {
            // p is a path in AST to a node that matches
		    // p.node references the AST node directly
            p.get("right").replace(
                j.conditionalExpression(
                    j.logicalExpression(
                        '||', 
                        j.memberExpression(j.identifier("window"), j.identifier("Capacitor")),
                        j.memberExpression(j.identifier("window"), j.identifier("capacitor"))
                    ),
                    j.callExpression(j.identifier("loadAdapter"), [
                        j.literal("capacitor-native")
                    ]),
                    j.callExpression(j.identifier("loadAdapter"), [])
                )
            )
        })
        .toSource();
}