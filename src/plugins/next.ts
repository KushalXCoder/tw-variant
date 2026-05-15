import { runExtractor } from "../extractor";
import { watch } from "chokidar";
import type { NextConfig } from "next";

export function withTwVariant(nextConfig: NextConfig = {}): NextConfig {
  // run once on startup
  runExtractor()

  // watch for changes
  watch('.', {
    ignored: /(node_modules|dist|\.next|\.git)/,
    persistent: true,
    ignoreInitial: true
  })
  .on('all', (_, filepath) => {
    if (/\.(ts|tsx|js|jsx)$/.test(filepath)) {
      runExtractor()
    }
  });

  return nextConfig;
}