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

## Getting Started

### 1. Install

```sh
npm install tw-variant
```

### 2. Tell Tailwind to scan the generated file

Add to your main CSS:

```css
@source "./.tw-variant-generated.txt";
```

### 3. Set up your framework plugin

#### Next.js

In your `next.config.ts`:

```ts
import { withTwVariant } from 'tw-variant/next';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // your existing config
}

module.exports = withTwVariant(nextConfig);
```

The extractor runs automatically on dev start and before every production build. No separate terminal, no extra scripts.

---

#### Vite (React, Vue, Svelte, SolidJS, Nuxt, SvelteKit, Astro)

In your `vite.config.ts`:

```ts
import { twVariant } from 'tw-variant/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [twVariant()]
});
```

Same as Next.js - extractor runs automatically on dev start and on every build.

---

#### Manual (any other setup)

If you're not using Next.js or Vite, run the extractor manually:

```bash
# run once
npx tw-variant-extract

# watch for changes during development
npx tw-variant-extract --watch
```

Or add to your `package.json` scripts:

```json
"scripts": {
  "dev": "tw-variant-extract --watch & your-dev-command",
  "build": "tw-variant-extract && your-build-command"
}
```

## Editor Support

For Tailwind class autocomplete inside tv(), add this to your VS Code settings.json:

```ts
{
  "tailwindCSS.experimental.classRegex": [
    ["tv\\(([^)]*)\\)", "\"([^\"]*)\"|'([^']*)'|`([^`]*)`"]
  ]
}
```
---

## How It Works

- `tv()` groups your Tailwind classes by variant in a readable object.
- The included extractor scans your codebase for all `tv({...})` calls and writes every expanded class to `.tw-variant-generated.txt`.
- Tailwind scans that file and includes all the necessary CSS in your build.
- The Next.js and Vite plugins run the extractor automatically — no manual steps needed.
- No runtime hacks, no SSR required — everything is static and build-time safe.

## Quick Usage

```ts
import { tv } from "tw-variant";

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

### Framework Support

| Framework | Setup |
|---|---|
| Next.js | `tw-variant` - `withTwVariant()` in `next.config.ts` |
| Vite + React | `tw-variant` - `twVariant()` plugin in `vite.config.ts` |
| Vue / Nuxt | `tw-variant` - `twVariant()` plugin in `vite.config.ts` |
| Svelte / SvelteKit | `tw-variant` - `twVariant()` plugin in `vite.config.ts` |
| Solid.js / SolidStart | `tw-variant` - `twVariant()` plugin in `vite.config.ts` |
| Astro | `tw-variant` - `twVariant()` plugin in `vite.config.ts` |
| Any other | `npx tw-variant-extract` CLI |

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

## FAQ

**Q: Why do I need the generated file?**
A: Tailwind only generates CSS for classes it can see at build time. The extractor ensures all your `tv()` classes are visible to Tailwind.

**Q: Can I hide the generated file?**
A: Yes. Add `.tw-variant-generated.txt` to your `.gitignore` — it gets regenerated automatically on every dev start and build.

**Q: Do I need to run any extra scripts?**
A: No — if you use the Next.js or Vite plugin, everything runs automatically. For other setups use the CLI.

**Q: Does it support dynamic class values?**
A: No. `tv()` only works with static string values known at build time. For dynamic classes use `clsx` alongside `tv()`.

**Q: Do I need SSR for this to work?**
A: No. All extraction and CSS generation happens at build time.

---

## Limitations

`tv()` only supports static string values. Dynamic values cannot be extracted at build time.

```ts
// ✅ works
tv({ hover: "bg-blue-500 text-white" })

// ❌ won't work — dynamic value
tv({ hover: isActive ? "bg-blue-500" : "bg-red-500" })
```

For dynamic classes, use `clsx` alongside `tv()`:

```ts
className={clsx(
  tv({ base: "px-4 py-2 rounded" }),
  isActive && "bg-blue-500"
)}
```

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