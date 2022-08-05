import type { API, FileInfo } from 'jscodeshift';

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Add our 2 adapters in Keycloak.js original code
  return root
    .find(
      j.VariableDeclarator,
      {
        id: {
          name: "adapters"
        }
      }
    )
    .find(j.ArrayExpression)
    .forEach(p => {
      p.get("elements").push(j.stringLiteral("capacitor"));
      p.get("elements").push(j.stringLiteral("capacitor-native"));
    })
    .toSource();
}