<div align="center">

<img src="./assets/logo.svg" width="120" alt="tw-variant logo" />

# tw-variant

<p>
  A TypeScript utility for grouping Tailwind variant prefixes.<br/>
  Avoid repeating <code>hover:</code>, <code>focus:</code>, <code>dark:</code> prefixes.
</p>

<p>
  <img src="https://img.shields.io/npm/v/tw-variant?style=for-the-badge" />
  <img src="https://img.shields.io/npm/dm/tw-variant?style=for-the-badge" />
  <img src="https://img.shields.io/npm/l/tw-variant?style=for-the-badge" />
</p>

Visit the NPM package here - https://www.npmjs.com/package/tw-variant

</div>

---

## Install

```sh
npm install tw-variant
```

## Quick Usage

```ts
import { tv } from "tw-variant"

const buttonStyles = tv({
  base: "px-4 py-2 rounded font-medium",
  hover: "bg-blue-600 shadow-lg",
  focus: "ring-2 ring-offset-2",
  active: "scale-95",
  groupHover: "opacity-90"
})

<button className={buttonStyles}>Click me</button>
```

---

## API

### `tv(config)`

Group Tailwind classes by variant and return a single class string.

**Parameters:**
- **`base`** (string, optional): Base classes applied to all states.
- **`[variant]`** (string): Any Tailwind variant (hover, focus, dark, group-hover, etc.). Prefer camelCase keys like `groupHover` for hyphenated variants so quotes are not required.

**Returns:**
- A string with all variant prefixes applied.

**Note:** `tv` has no runtime dependencies and returns a plain class string.

---

## Example

```ts
tv({
  base: "px-4 py-2 rounded",
  hover: "bg-blue-500 text-white shadow-lg",
  focus: "ring-2 ring-offset-2 outline-none"
})

// Output:
// "px-4 py-2 rounded hover:bg-blue-500 hover:text-white hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
```

---

## When to Use It

Use `tv` when you want to keep Tailwind class names readable and avoid repeating variant prefixes across multiple classes.

```tsx
className={tv({
  base: "px-4 py-2 rounded",
  hover: "bg-blue-500 shadow-lg",
  focus: "ring-2 ring-offset-2"
})}
```

This is especially useful for reusable component styles and design system tokens.

---

## Conditional and extra classes

For extra conditional or dynamic classes, keep `tv` focused on variant grouping and compose it with `clsx`:

```tsx
import clsx from "clsx";

const classVariants = tv({
  base: "px-4 py-2 rounded",
  hover: "bg-blue-500 shadow-lg"
});

className={clsx(
  classVariants,
  isDisabled && "opacity-50 cursor-not-allowed",
  customClass
)}
```

Install `clsx` if you need a lightweight utility for conditional class composition.

---

## Compatibility

### Tailwind CSS Versions
Works with Tailwind v1, v2, v3, and v4+.

### JavaScript Frameworks
Works in any framework:
- React / Next.js
- Vue / Nuxt
- Svelte / SvelteKit
- Solid.js
- Angular
- Vanilla JavaScript

### Runtimes
- Node.js 14+
- Bun
- Deno
- Modern browsers (ESM)

---

## Why tv-variant?

- **Single API** — only `tv`
- **Less repetition** — group variant classes
- **Clearer code** — easier to read and maintain
- **Reusable patterns** — define variants once and reuse them

```tsx
import { tv } from "tw-variant";
import clsx from "clsx";

<div className={clsx(
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
- Handle conditional classes (use plain JavaScript or your own helper for that)
- Resolve class conflicts (use `tailwind-merge` or another conflict resolver if needed)
- Validate class names (Tailwind doesn't either)
- Replace `cn()` — it's additive only
