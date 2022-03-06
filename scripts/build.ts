import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import fs from 'fs';
import { rollup } from 'rollup';
import typescript from 'rollup-plugin-ts';

import { Logger } from './utils/logger';

const swcOptions = {
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: true,
      decorators: false,
      dynamicImport: true
    },
    externalHelpers: true,
    transform: {
      react: {
        runtime: 'automatic'
      }
    },
    loose: false,
    minify: {
      compress: false,
      mangle: true,
      format: {
        comments: true
      }
    },
    target: 'es2022'
  },
  minify: false,
  module: {
    type: 'es6'
  }
};

const bundleDir = (type: string) => `lib/${type}`;

const build = async () => {
  const chalk = (await import('chalk')).default;
  const packageName = require(`${process.cwd()}/package.json`).name;

  const startTime = Date.now();
  const logger = new Logger('build', chalk);

  logger.info(`Building package ${chalk.cyan(packageName)}`);

  try {
    const bundle = await rollup({
      input: 'src/index.ts',
      treeshake: true,
      onwarn(warning, handler) {
        if (['UNUSED_EXTERNAL_IMPORT'].includes(warning.code ?? '')) return;
        return handler(warning);
      },
      plugins: [
        {
          name: 'clean',
          buildStart: () => {
            if (fs.existsSync('lib'))
              fs.rmSync('lib', {
                recursive: true,
                force: true
              });
          }
        },
        commonjs(),
        nodeResolve(),
        typescript({
          transpiler: 'swc',
          swcConfig: swcOptions
        })
      ],
      external: (_) =>
        (_.includes('node_modules') ||
          _.includes('packages') ||
          _.includes('@flux-ui/')) &&
        !_.includes(packageName.split('/')[1]) &&
        !_.includes('@swc/helpers')
    });

    logger.info(`Building to ${chalk.cyan('cjs')} format...`);
    await bundle.write({
      dir: bundleDir('cjs'),
      format: 'cjs'
    });

    logger.info(`Building to ${chalk.cyan('esm')} format...`);
    await bundle.write({
      dir: bundleDir('esm'),
      format: 'esm'
    });

    await bundle.close();

    logger.info(
      `Package ${chalk.cyan(packageName)} was build in ${chalk.green(
        `${((Date.now() - startTime) / 1000).toFixed(2)}s`
      )}`
    );
  } catch (err) {
    logger.error(`Failed to compile package: ${chalk.cyan(packageName)}`);
    process.stdout.write(`${(err as Error).stack}\n`);
    process.exit(1);
  }
};

build();
