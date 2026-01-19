import { defineConfig } from 'tsup';
import path from 'path';

const isDev = process.env.MODE !== 'build';

export default defineConfig({
  entry: ['src/main.ts', 'src/preload.ts'],
  outDir: isDev
    ? path.resolve(__dirname, 'dist')
    : path.resolve(__dirname, '../../dist'),  
  format: ['esm'],
  target: 'es2020',
  clean: false,
});