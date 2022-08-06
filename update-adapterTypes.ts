import type { API, FileInfo } from 'jscodeshift';

export const parser = 'ts'
export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  return root
    // Find correct export
    .find(
        j.TSInterfaceDeclaration,
        {
            id: {
                name: "KeycloakInitOptions"
            }
        }
    )
    // Find adaptor signature
    .find(
        j.TSPropertySignature,
        {
            key: {
                name: "adapter"
            }
        }
    )
    // Find types declaration
    .find(
        j.TSUnionType
    )
    .replaceWith(
        nodePath => {
            const { node } = nodePath;
            // add new adaptors
            node.types.push(j.tsLiteralType(j.stringLiteral("capacitor")));
            node.types.push(j.tsLiteralType(j.stringLiteral("capacitor-native")))

            return node;
        }
    )
    .toSource({ quote: 'single' })
}