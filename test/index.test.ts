/*
This file contains tests for the hv() and tv() functions. Run this file to verify that all tests pass.
You can add some extra test if something is missed
Or if some new feature is added, you can add tests for it here as well.
*/

import { hv, tv, type VariantMap } from "../src/index.ts";

// Test hv() function
console.log("Testing hv()");

// Basic usage
console.assert(
  hv("bg-blue-500 text-white") === "bg-blue-500 text-white",
  "Basic usage should return classes unchanged"
);

// Custom variant
console.assert(
  hv("ring-2 ring-offset-2", "focus") === "focus:ring-2 focus:ring-offset-2",
  "Custom variant should work"
);

// Group hover
console.assert(
  hv("opacity-100", "group-hover") === "group-hover:opacity-100",
  "group-hover variant should work"
);

// Edge case: empty classes
console.assert(
  hv("") === "",
  "Empty classes should return empty string"
);

// Edge case: only spaces
console.assert(
  hv("   ") === "",
  "Whitespace-only classes should return empty string"
);

// Edge case: empty variant (should return classes unchanged)
console.assert(
  hv("bg-red-500", "") === "bg-red-500",
  "Empty variant should return classes unchanged"
);

// Edge case: multiple spaces between classes
console.assert(
  hv("bg-red-500   text-white") === "bg-red-500 text-white",
  "Multiple spaces should be normalized"
);

// Edge case: leading/trailing spaces
console.assert(
  hv("  bg-red-500 text-white  ") === "bg-red-500 text-white",
  "Leading/trailing spaces should be trimmed"
);

// Edge case: single class
console.assert(
  hv("bg-blue-500") === "bg-blue-500",
  "Single class should work"
);

// Test tv() function
console.log("Testing tv()");

// Basic usage
const result1 = tv({
  hover: "bg-blue-500 text-white",
  focus: "ring-2 ring-offset-2"
});
console.assert(
  result1.includes("hover:bg-blue-500") && 
  result1.includes("focus:ring-2"),
  "Multiple variants should work"
);

// Edge case: empty object
console.assert(
  tv({}) === "",
  "Empty object should return empty string"
);

// Edge case: empty class values
const result2 = tv({
  hover: "",
  focus: "ring-2"
});
console.assert(
  result2 === "focus:ring-2",
  "Empty class values should be filtered out"
);

// Edge case: all empty values
console.assert(
  tv({ hover: "", focus: "" }) === "",
  "All empty values should return empty string"
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
  "group-hover": "opacity-100"
});
console.assert(
  result3.split(" ").length === 4,
  "Many variants should produce correct count"
);

console.log("Yayyy, All tests passed!");