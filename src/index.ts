// Type definitions
export type VariantMap = Record<string, string>;

/**
 * Apply a Tailwind variant prefix to each class in a string.
 * 
 * @param classes - Space-separated Tailwind classes (e.g., "bg-blue-500 text-white")
 * @param variant - Optional variant name. If not provided, classes are returned as-is
 * @returns Classes with variant prefix applied, or classes unchanged if no variant
 * 
 * @example
 * hv("bg-blue-500 text-white", "hover")
 * // "hover:bg-blue-500 hover:text-white"
 * 
 * @example
 * hv("ring-2 ring-offset-2", "focus")
 * // "focus:ring-2 focus:ring-offset-2"
 * 
 * @example
 * hv("px-4 py-2")  // no variant provided
 * // "px-4 py-2"
 */
const hv = (classes: string, variant?: string): string => {
    const normalizedClasses = classes.trim();
    if (!normalizedClasses) return "";
    
    // Normalize spaces regardless of variant
    const tokens = normalizedClasses.split(/\s+/);
    
    if (!variant) return tokens.join(" ");
    
    const normalizedVariant = variant.trim();
    if (!normalizedVariant) return tokens.join(" ");
    
    return tokens
        .map(cl => `${normalizedVariant}:${cl}`)
        .join(" ")
}

/**
 * Apply multiple Tailwind variant prefixes at once.
 * 
 * @param variants - Object mapping variant names to class strings
 * @returns All variants expanded and joined together
 * 
 * @example
 * tv({ 
 *   hover: "bg-blue-500 text-white",
 *   focus: "ring-2 ring-offset-2"
 * })
 * // "hover:bg-blue-500 hover:text-white focus:ring-2 focus:ring-offset-2"
 */
const tv = (variants: VariantMap): string => {
    return Object.entries(variants)
        .map(([variant, classes]) => hv(classes, variant))
        .filter(Boolean)
        .join(" ")
}

export { hv, tv };