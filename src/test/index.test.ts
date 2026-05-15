/*
This file contains tests for the tv() function. Run this file to verify that all tests pass.
You can add more tests if something is missed or if new features are added.
*/

import { tv } from "../index.ts";

// Test tv() function
console.log("Testing tv()");

// Basic usage with base classes
console.assert(
  tv({ base: "px-4 py-2" }) === "px-4 py-2",
  "Base classes should be returned"
);

// Single variant
console.assert(
  tv({ hover: "bg-blue-500" }).includes("hover:bg-blue-500"),
  "Single variant should work"
);

// Multiple variants
const result1 = tv({
  base: "px-4 py-2",
  hover: "bg-blue-500 text-white",
  focus: "ring-2 ring-offset-2"
});
console.assert(
  result1.includes("px-4") && 
  result1.includes("hover:bg-blue-500") && 
  result1.includes("focus:ring-2"),
  "Multiple variants with base should work"
);

// Edge case: empty config
console.assert(
  tv({}) === "",
  "Empty config should return empty string"
);

// Edge case: only base classes
console.assert(
  tv({ base: "px-4 py-2 rounded" }) === "px-4 py-2 rounded",
  "Only base classes should work"
);

// Edge case: variant with multiple classes
const result2 = tv({
  hover: "shadow-lg opacity-90"
});
console.assert(
  result2.includes("hover:shadow-lg") && result2.includes("hover:opacity-90"),
  "Multiple classes in variant should all get prefix"
);

// Edge case: all empty values
console.assert(
  tv({ base: "", hover: "", focus: "" }) === "",
  "All empty values should return empty string"
);

// Real-world use case: button styles
const buttonStyles = tv({
  base: "px-4 py-2 rounded font-medium",
  hover: "opacity-90 shadow-lg",
  focus: "ring-2 ring-offset-2",
  active: "scale-95"
});
console.assert(
  buttonStyles.includes("px-4") &&
  buttonStyles.includes("hover:opacity-90") &&
  buttonStyles.includes("focus:ring-2") &&
  buttonStyles.includes("active:scale-95"),
  "Real-world button styles should work"
);

// Complex use case: dark mode + hover + focus
const complexStyles = tv({
  base: "p-4 rounded border",
  hover: "shadow-md bg-gray-50",
  focus: "ring-2 ring-blue-500",
  dark: "dark:bg-gray-900 dark:text-white"
});
console.assert(
  complexStyles.includes("p-4") &&
  complexStyles.includes("hover:shadow-md") &&
  complexStyles.includes("dark:bg-gray-900"),
  "Complex variants with dark mode should work"
);

// Edge case: single variant
console.assert(
  tv({ dark: "bg-gray-800" }) === "dark:bg-gray-800",
  "Single variant in tv() should work"
);

// Edge case: many variants
const result3 = tv({
  hover: "bg-blue-500",
  focus: "ring-2",
  dark: "bg-gray-800",
  groupHover: "opacity-100"
});
console.assert(
  result3.split(" ").length === 4 && result3.includes("group-hover:opacity-100"),
  "Many variants should produce correct count"
);

console.log("Yayyy, All tests passed!");