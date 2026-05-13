// tw-variant extractor script
// Scans for tv({ ... }) calls with static strings and generates .tw-variant-generated.txt

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const SRC_GLOB = '**/*.{ts,tsx}';
const OUT_FILE = path.resolve(process.cwd(), '.tw-variant-generated.txt');

function extractTvClassesFromFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });
  const classes = [];
  let found = false;
  traverse(ast, {
    CallExpression(path) {
      if (
        path.node.callee.name === 'tv' &&
        path.node.arguments.length === 1 &&
        path.node.arguments[0].type === 'ObjectExpression'
      ) {
        found = true;
        for (const prop of path.node.arguments[0].properties) {
          if (
            prop.type === 'ObjectProperty' &&
            prop.key.type === 'Identifier' &&
            prop.value.type === 'StringLiteral'
          ) {
            const variant = prop.key.name;
            const classList = prop.value.value.trim().split(/\s+/);
            for (const cls of classList) {
              if (!cls) continue; // skip empty
              // Avoid double prefixing (e.g. dark:dark:bg-gray-900)
              if (variant === 'base') {
                classes.push(cls);
              } else if (cls.startsWith(variant + ':')) {
                classes.push(cls);
              } else {
                classes.push(`${variant}:${cls}`);
              }
            }
          }
        }
      }
    },
  });
  if (found) {
    console.log(`[extractor] Found tv() in: ${filePath}`);
    console.log(`[extractor] Classes:`, classes);
  }
  // Remove lines like 'hover:' or 'focus:' (no class after colon)
  return classes.filter(cls => !/^[a-zA-Z0-9_-]+:$/.test(cls));
}

function runExtractor() {
  const files = glob.sync(SRC_GLOB, {
    cwd: process.cwd(),
    absolute: true,
    ignore: ['**/node_modules/**', '**/dist/**', '**/.next/**']
  });
  console.log(`[extractor] Scanning files:`, files);
  const classSet = new Set();
  for (const file of files) {
    const classes = extractTvClassesFromFile(file);
    for (const cls of classes) {
      classSet.add(cls);
    }
  }
  fs.writeFileSync(OUT_FILE, Array.from(classSet).join('\n'));
  console.log(`Extracted ${classSet.size} classes to ${OUT_FILE}`);
}

runExtractor();
