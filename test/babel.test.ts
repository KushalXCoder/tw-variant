// test/babel.test.ts
import * as babel from "@babel/core";
import twVariantBabelPlugin from "../src/babel";

const code = `
const styles = tv({ 
  base: "px-4 py-2", 
  hover: "bg-blue-500" 
});
`;

const result = babel.transformSync(code, {
  plugins: [twVariantBabelPlugin],
  filename: "test.ts"
});

console.log("Transformed code:");
console.log(result?.code);

// Should output: const styles = "px-4 py-2 hover:bg-blue-500";