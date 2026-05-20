// Plugin for every framework using vite - helps make things simpler for user

import { runExtractor } from "../extractor";
import type { Plugin } from "vite";


interface TwVariantOptions {
    dirs?: string[];
}

export function twVariant(options: TwVariantOptions = {}): Plugin {
    // Directories to watch, default to '.' if not provided
    const dirs = options.dirs && options.dirs.length > 0 ? options.dirs : ['.'];

    function isInDirs(file: string) {
        // If dirs is ['.'], always true
        if (dirs.length === 1 && dirs[0] === '.') return true;
        return dirs.some(dir => file.startsWith(dir + '/') || file.startsWith(dir + '\\'));
    }

    return {
        name: "tw-variant",
        buildStart() {
            // run extractor whenever vite starts
            runExtractor();
        },
        handleHotUpdate({ file }) {
            // reruns the extractor whenever the file changes in specified dirs
            if (isInDirs(file) && /\.(ts|tsx|js|jsx|vue|svelte)$/.test(file)) {
                runExtractor();
            }
        }
    };
}