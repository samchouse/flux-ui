import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'core',
  target: 'esnext',
  format: ['cjs', 'esm'],
  entryPoints: ['src/index.ts'],
  dts: true,
  clean: true,
  bundle: true,
  minifySyntax: true,
  minifyIdentifiers: true,
  skipNodeModulesBundle: true,
  esbuildOptions: (options) => {
    options.outExtension =
      options.format === 'esm' ? { '.js': '.esm.js' } : { '.js': '.cjs.js' };
  }
});
