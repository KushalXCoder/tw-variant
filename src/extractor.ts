import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const SRC_GLOB = '**/*.{ts,tsx,js,jsx}'
const OUT_FILE = path.resolve(process.cwd(), '.tw-variant-generated.txt')

function normalizeVariant(variant: string): string {
    return variant
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/_/g, '-')
        .toLowerCase()
}

function extractTvClassesFromFile(filePath: string): string[] {
    const code = fs.readFileSync(filePath, 'utf8')
    const classes: string[] = []
    let found = false

    const tvBlockRegex = /\btv\s*\(\s*\{([\s\S]*?)\}\s*\)/g
    let tvMatch

    while ((tvMatch = tvBlockRegex.exec(code)) !== null) {
        const block = tvMatch[1]
        const propRegex = /(\w+)\s*:\s*["'`]([^"'`]*)["'`]/g
        let propMatch

        while ((propMatch = propRegex.exec(block)) !== null) {
            found = true
            const variant = propMatch[1]
            const classList = propMatch[2].trim().split(/\s+/)

            for (const cls of classList) {
                if (!cls) continue
                if (variant === 'base') {
                    classes.push(cls)
                } else {
                    const normalizedVariant = normalizeVariant(variant)
                    if (cls.startsWith(normalizedVariant + ':')) {
                        classes.push(cls)
                    } else {
                        classes.push(`${normalizedVariant}:${cls}`)
                    }
                }
            }
        }
    }

    if (found) {
        console.log(`[tw-variant] Found tv() in: ${filePath}`)
    }

    return classes.filter(cls => !/^[a-zA-Z0-9_-]+:$/.test(cls))
}

export function runExtractor(): void {
    const files = glob.sync(SRC_GLOB, {
        cwd: process.cwd(),
        absolute: true,
        ignore: ['**/node_modules/**', '**/dist/**', '**/.next/**']
    })

    const classSet = new Set<string>()

    for (const file of files) {
        const classes = extractTvClassesFromFile(file)
        for (const cls of classes) classSet.add(cls)
    }

    fs.writeFileSync(OUT_FILE, Array.from(classSet).join('\n'))
    console.log(`[tw-variant] Extracted ${classSet.size} classes to ${OUT_FILE}`)
}


// Uncomment it to test the extractor.ts file

// runExtractor();
