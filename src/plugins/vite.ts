// Plugin for every framework using vite - helps make things simpler for user

import { runExtractor } from "../extractor";
import type { Plugin } from "vite";

export function twVariant() : Plugin {
    return {
        name: "tw-variant",
        buildStart() {
            // run extractor whenever vite starts
            runExtractor()
        },
        handleHotUpdate({ file }) {
            // reruns the exxtractor whenever the file changes
            if(/\.(ts|tsx|js|jsx|vue|svelte)$/.test(file)) {
                runExtractor()
            }
        }
    }
}