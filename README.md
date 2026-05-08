# tw-variant

A TypeScript utility for grouping Tailwind variant prefixes. **Stop repeating `hover:`, `focus:`, `dark:` prefixes.**

---

## Install

```sh
npm install tw-variant
```

## Quick Usage

```ts
import { tv } from "tw-variant"

// Group classes by variant - no more repetition!
const buttonStyles = tv({
  base: "px-4 py-2 rounded font-medium",
  hover: "bg-blue-600 shadow-lg",
  focus: "ring-2 ring-offset-2",
  active: "scale-95"
})

// Use in your component
<button className={buttonStyles}>Click me</button>
```

---

## The Problem It Solves

### ❌ Without tv-variant (Repetitive)
```tsx
className="px-4 py-2 rounded hover:bg-blue-600 hover:shadow-lg focus:ring-2 focus:ring-offset-2 active:scale-95"
```

### ✅ With tv-variant (Clean)
```tsx
className={tv({
  base: "px-4 py-2 rounded",
  hover: "bg-blue-600 shadow-lg",
  focus: "ring-2 ring-offset-2",
  active: "scale-95"
})}
```

---

## API

### `tv(config)`

Group Tailwind classes by variant to avoid repeating variant prefixes.

**Parameters:**
- **`base`** (string, optional): Base classes applied to all states
- **`[variant]`** (string): Any Tailwind variant (hover, focus, dark, group-hover, etc.)

**Returns:** String with all variant prefixes applied

### Examples

**Simple component styling:**
```ts
tv({
  base: "px-4 py-2 rounded",
  hover: "bg-blue-500 shadow-lg"
})
// "px-4 py-2 rounded hover:bg-blue-500 hover:shadow-lg"
```

**Multiple variants:**
```ts
tv({
  base: "px-4 py-2 rounded font-medium",
  hover: "opacity-90 shadow-lg",
  focus: "ring-2 ring-blue-500",
  dark: "dark:bg-gray-800 dark:text-white"
})
```

**Reusable component patterns:**
```ts
// Define once
export const buttonVariants = tv({
  base: "px-4 py-2 rounded font-medium transition",
  hover: "opacity-90 shadow-lg",
  focus: "ring-2 ring-offset-2",
  active: "scale-95",
  disabled: "opacity-50 cursor-not-allowed"
});

// Use everywhere
<button className={buttonVariants}>Save</button>
<button className={buttonVariants}>Delete</button>
<button className={buttonVariants}>Submit</button>
```

**With cn() for merging:**
```ts
import { tv } from "tw-variant";
import { cn } from "@/lib/utils"; // your cn utility

const cardVariants = tv({
  base: "p-4 rounded border",
  hover: "shadow-lg bg-gray-50",
  focus: "ring-2 ring-blue-500"
});

<div className={cn("max-w-md", cardVariants)}>
  Card content
</div>
```

---

## Real-World Use Cases

### Component Library
```ts
export const buttonBase = tv({
  base: "px-3 py-2 rounded font-semibold transition",
  hover: "shadow-md",
  focus: "outline-none ring-2"
});

export const buttonPrimary = tv({
  base: buttonBase,
  hover: "bg-blue-600",
  focus: "ring-blue-500"
});
```

### Design System
```ts
export const formFieldVariants = {
  default: tv({
    base: "px-3 py-2 border rounded",
    focus: "border-blue-500 ring-2 ring-blue-200"
  }),
  error: tv({
    base: "px-3 py-2 border border-red-500 rounded",
    focus: "ring-2 ring-red-200"
  }),
  success: tv({
    base: "px-3 py-2 border border-green-500 rounded",
    focus: "ring-2 ring-green-200"
  })
};
```

---

## Compatibility

### Tailwind CSS Versions
**All versions** — Works with Tailwind v1, v2, v3, and v4+

This library is **version-agnostic**. It's pure string manipulation.

### JavaScript Frameworks
Works with any framework:
- **React** / **Next.js**
- **Vue** / **Nuxt**
- **Svelte** / **SvelteKit**
- **Solid.js**
- **Angular**
- Vanilla JavaScript

### Runtimes
- Node.js 14+
- Bun
- Deno
- Modern browsers (ESM)

---

## Why tv-variant?

✅ **Simple** — One function, one clear purpose  
✅ **Readable** — Group related styles together  
✅ **Maintainable** — Change variants in one place  
✅ **Reusable** — Extract into constants or exports  
✅ **Zero Dependencies** — Pure string concatenation  
✅ **Tiny** — Less than 1KB gzipped

### Module Formats
Exports:
- **ESM** (`dist/index.mjs`) — for modern bundlers and runtimes
- **CommonJS** (`dist/index.js`) — for Node.js and older environments
- **TypeScript** (`dist/index.d.ts`) — full type definitions

---

## Real-World Examples

### With React
```jsx
import { hv, tv } from "tw-variant"

export function Button({ variant = "primary" }) {
  const stateClasses = tv({
    hover: "shadow-lg -translate-y-1",
    focus: "ring-2 ring-offset-2",
    active: "scale-95"
  })
  
  return (
    <button className={`px-4 py-2 rounded transition-all ${stateClasses}`}>
      Click me
    </button>
  )
}
```

### Composing with `cn` (clsx / tailwind-merge)
```jsx
import { cn } from "./lib/utils"  // your existing cn
import { hv, tv } from "tw-variant"

<div className={cn(
  "p-4 rounded-lg border transition-all",
  tv({
    hover: "shadow-lg",
    focus: "ring-2",
    dark: "bg-gray-900 border-gray-700"
  })
)} />
```

### Reusable variant configs
```ts
// design-system/variants.ts
import { tv, type VariantMap } from "tw-variant"

export const cardHover: VariantMap = {
  hover: "shadow-xl -translate-y-1 border-blue-300",
  focus: "ring-2 ring-blue-400",
  dark: "bg-gray-800"
}

// Then use anywhere
export const cardClasses = tv(cardHover)
```

---

## Important: Tailwind Scanning

Since `hv()` and `tv()` generate classes **at runtime**, Tailwind's JIT scanner may not detect them during build time.

---

## What This Library Does
- Groups variant prefixes to reduce repetition
- Works with any Tailwind variant
- Composes naturally with other utilities
- Zero dependencies
- Full TypeScript support

---

## What This Library Doesn't Do
- Handle conditional classes (use `clsx` for that)
- Resolve class conflicts (use `tailwind-merge` for that)
- Validate class names (Tailwind doesn't either)
- Replace `cn()` — it's additive only
