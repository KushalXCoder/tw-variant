import { processTv } from "./core";

export default function twVariantBabelPlugin() {
  return {
    visitor: {
      CallExpression(path: any) {
        // only intercept tv() calls
        if (path.node.callee.name !== "tv") return;

        const args = path.node.arguments;
        if (args.length !== 1 || args[0].type !== "ObjectExpression") return;

        // extract the object properties
        const config: Record<string, string> = {};
        for (const prop of args[0].properties) {
          if (
            prop.type !== "ObjectProperty" ||
            prop.value.type !== "StringLiteral"
          ) return; // bail if not a simple string — leave it for runtime

          const key =
            prop.key.type === "Identifier"
              ? prop.key.name
              : prop.key.value;

          config[key] = prop.value.value;
        }

        // run the same logic as tv()
        const result = processTv(config);

        // replace the entire tv({...}) call with a plain string
        path.replaceWith({
          type: "StringLiteral",
          value: result,
        });
      },
    },
  };
}