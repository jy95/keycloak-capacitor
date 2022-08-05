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
      p.get("elements").push(j.literal('capacitor'));
      p.get("elements").push(j.literal('capacitor-native'));
    })
    .toSource({quote: 'single'});
}