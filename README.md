# tw-variant

A TypeScript utility for grouping Tailwind variant prefixes. **Zero dependencies. Zero runtime overhead.**

---

## Install

```sh
npm install tw-variant
```

## Quick Usage

```ts
import { hv, tv } from "tw-variant"

// Apply variant to multiple classes at once
hv("bg-blue-500 text-white scale-105", "hover")
// "hover:bg-blue-500 hover:text-white hover:scale-105"

// Apply multiple variants in one go
tv({
  hover: "bg-blue-500 text-white",
  focus: "ring-2 ring-offset-2",
  dark: "bg-gray-800 text-gray-100"
})
// "hover:bg-blue-500 hover:text-white focus:ring-2 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-100"
```

---

## API

### `hv(classes, variant?)`

Apply a variant prefix to each class in a string.

- **`classes`** (string): Space-separated Tailwind classes
- **`variant`** (string, optional): Variant name (hover, focus, dark, etc.)
- **Returns**: String with variant prefix applied to every class, or classes unchanged if no variant

```ts
hv("bg-blue-500 text-white", "hover")
// "hover:bg-blue-500 hover:text-white"

hv("px-4 py-2")  // no variant
// "px-4 py-2"
```

### `tv(variants)`

Apply multiple variants at once.

- **`variants`** (object): Mapping of variant names to class strings
- **Returns**: All variants expanded and joined together

```ts
tv({
  hover: "bg-blue-500 text-white",
  focus: "ring-2",
  dark: "bg-gray-800"
})
// "hover:bg-blue-500 hover:text-white focus:ring-2 dark:bg-gray-800"
```

---

## Compatibility

### Tailwind CSS Versions
**All versions** — Works with Tailwind v1, v2, v3, and v4+

This library is **version-agnostic**. It's pure string manipulation, so it works wherever Tailwind works.

### JavaScript Frameworks
Works with any framework:
- **React** / **Next.js**
- **Vue** / **Nuxt**
- **Svelte** / **SvelteKit**
- **Solid.js** / **SolidStart**
- **Angular**
- **Qwik**
- Vanilla JavaScript

### Build Tools & Runtimes
Runs on:
- **Node.js** 14+
- **Bun**
- **Deno**
- Modern browsers (ESM)
- Any environment with JavaScript

### Package Managers
Install via:
- npm
- yarn
- pnpm
- bun

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
