import { hv, normalizeVariant } from "./core";

// Type definitions
export type VariantMap = Record<string, string>;

/**
 * Apply multiple Tailwind variant prefixes at once.
 * Groups classes by variant to avoid repetition.
 * 
 * @param config - Object mapping variant names to class strings
 * @returns All variants expanded and joined together
 * 
 * @example
 * tv({ 
 *   base: "px-4 py-2",
 *   hover: "bg-blue-500 text-white shadow-lg",
 *   focus: "ring-2 ring-offset-2"
 * })
 * // "px-4 py-2 hover:bg-blue-500 hover:text-white hover:shadow-lg focus:ring-2 focus:ring-offset-2"
 * 
 * @example
 * tv({ 
 *   hover: "opacity-90 shadow-lg",
 *   focus: "ring-2 ring-offset-2",
 *   active: "scale-95",
 *   groupHover: "opacity-90"
 * })
 * // "hover:opacity-90 hover:shadow-lg focus:ring-2 focus:ring-offset-2 active:scale-95 group-hover:opacity-90"
 */
const tv = (
    config: VariantMap & { base?: string }
): string => {
    const { base = "", ...variants } = config;
    
    const variantsResult = Object.entries(variants)
        .map(([variant, classes]) => hv(classes, normalizeVariant(variant)))
        .filter(Boolean)
        .join(" ");
    
    if (base.trim() && variantsResult) {
        return base.trim() + " " + variantsResult;
    }
    return base.trim() || variantsResult;
}

export { tv };