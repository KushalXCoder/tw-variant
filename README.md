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


## Getting Started (Setup & Build Steps)

### 1. Install

```sh
npm install tw-variant
```

### 2. Tell Tailwind to scan the generated file

  Add to your main CSS:
  ```css
  @source "./.tw-variant-generated.txt";
  ```

### 3. Watch for changes

Install a watcher:
```bash
npm install --save-dev nodemon
```

In your `package.json`:

```json
"scripts": {
  "tw-variant:watch": "npx nodemon --watch src --watch app --ext ts,tsx --exec \"node ./node_modules/tw-variant/extractor.cjs\""
}
```

Run in a separate terminal:
```bash
npm run tw-variant:watch
```

### 5. Production Usage

- **Always run the extractor before your production Tailwind build.**
- The generated file ensures all your dynamic classes are included in the final CSS.
- No runtime or SSR is required for Tailwind to generate the CSS.
- The process is static and build-time only.

---

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
Works with Tailwind v4+

### JavaScript Frameworks
Works in any framework:
- React / Next.js
- Vue / Nuxt
- Svelte / SvelteKit
- Solid.js
- Angular
- Vanilla JavaScript

---

## Why tw-variant?

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


---

## How It Works (Extractor-based, Production-Ready)

- Use the `tv()` function to define Tailwind class variants in a readable, JS-valid way.
- The included extractor script scans your codebase for all `tv({ ... })` calls and writes every possible class to a generated file.
- Tailwind scans this generated file and includes all the necessary CSS in your build.
- No runtime hacks, no SSR required—everything is static and build-time safe.

---

## FAQ

**Q: Why do I need the generated file?**
A: Tailwind only generates CSS for classes it can see at build time. The extractor ensures all your `tv()` classes are visible to Tailwind.

**Q: Can I hide the generated file?**
A: Yes! It’s already dot-prefixed (hidden on most systems). Add it to `.gitignore` so it’s not committed.

**Q: Can I change the output location?**
A: You can, but you must update your Tailwind config or CSS to match the new path.

**Q: Do I need SSR for this to work?**
A: No. All extraction and CSS generation happens at build time.

---

## Summary of Steps

1. Install `tw-variant`.
2. Use `tv()` in your code.
3. Run the extractor (manually or with a watcher) before building Tailwind.
4. Make Tailwind scan the generated file.
5. Build your project as usual—your dynamic classes will work in production!

---

---

## What This Library Does
- Groups variant prefixes to reduce repetition
- Works with any Tailwind variant
- Composes naturally with other utilities
- Zero runtime dependencies
- Full TypeScript support

---

## What This Library Doesn't Do
- Handle conditional classes (use `clsx` for that)
- Resolve class conflicts (use `tailwind-merge` if needed)
- Validate class names (Tailwind doesn't either)
- Replace `cn()` — it's additive only
