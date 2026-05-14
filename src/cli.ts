#!/usr/bin/env node
import chokidar from 'chokidar';
import { runExtractor } from './extractor';

const isWatch = process.argv.includes('--watch');

runExtractor();

// get --dirs argument, default to '.' if not provided
const dirsArg = process.argv.find(a => a.startsWith('--dirs='));
const dirs = dirsArg ? dirsArg.replace('--dirs=', '').split(',') : ['.'];

if (isWatch) {
  console.log(`[tw-variant] Watching ${dirs.join(', ')} for changes...`);

  chokidar.watch(dirs, {
    ignored: /(node_modules|dist|\.next|\.git)/,
    persistent: true,
    ignoreInitial: true
  })
  .on('all', (event, filepath) => {
    if (/\.(ts|tsx|js|jsx)$/.test(filepath)) {
      runExtractor()
    }
  });
}