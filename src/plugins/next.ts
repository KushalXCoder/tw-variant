import { runExtractor } from "../extractor";
import { watch } from "chokidar";
import type { NextConfig } from "next";


interface TwVariantOptions {
  dirs?: string[];
}

export function withTwVariant(
  nextConfig: NextConfig = {},
  options: TwVariantOptions = {}
): NextConfig {
  // run once on startup
  runExtractor();

  // Directories to watch, default to '.' if not provided
  const dirs = options.dirs && options.dirs.length > 0 ? options.dirs : ['.'];

  // watch for changes
  watch(dirs, {
    ignored: /(node_modules|dist|\.next|\.git)/,
    persistent: true,
    ignoreInitial: true
  })
  .on('all', (_, filepath) => {
    if (/\.(ts|tsx|js|jsx)$/.test(filepath)) {
      runExtractor();
    }
  });

  return nextConfig;
}