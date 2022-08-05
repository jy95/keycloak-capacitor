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
                        name: "loadAdapter",
                        arguments: []
                    }
                }
            }
        )
        .replaceWith(defaultAssignement => {
            // get the underlying Node
            const { node } = defaultAssignement;

            // use a ternary expression for loadAdapter("capacitor-native")
            node.right = j.conditionalExpression(
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

            // replaceWith should return a Node, not a NodePath
            return node;
        })
        .toSource();
}