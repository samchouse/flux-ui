const fs = require('fs');
const { rollup } = require('rollup');
const typescript = require('rollup-plugin-ts');
const { Logger } = require('./utils/logger');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

const logger = new Logger('build');

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
      compress: {
        arguments: true,
        arrows: true,
        booleans: true,
        booleans_as_integers: false,
        collapse_vars: true,
        comparisons: true,
        computed_props: true,
        conditionals: true,
        dead_code: true,
        directives: true,
        drop_console: true,
        drop_debugger: true,
        evaluate: true,
        expression: false,
        hoist_funs: false,
        hoist_props: true,
        hoist_vars: false,
        if_return: true,
        join_vars: true,
        keep_classnames: false,
        keep_fargs: true,
        keep_fnames: false,
        keep_infinity: false,
        loops: true,
        negate_iife: true,
        properties: true,
        reduce_funcs: false,
        reduce_vars: false,
        side_effects: true,
        switches: true,
        typeofs: true,
        unsafe_arrows: false,
        unsafe_comps: false,
        unsafe_Function: false,
        unsafe_math: false,
        unsafe_symbols: false,
        unsafe_methods: false,
        unsafe_proto: false,
        unsafe_regexp: false,
        unsafe_undefined: false,
        unused: true
      },
      mangle: true
    },
    target: 'es2022'
  },
  minify: false,
  module: {
    type: 'es6'
  }
};

const bundleDir = (type) => `dist/${type}`;

const build = async () => {
  const chalk = (await import('chalk')).default;
  const packageName = require(`${process.cwd()}/package.json`).name;

  const startTime = Date.now();

  logger.info(`Building package ${chalk.cyan(packageName)}`);

  try {
    const bundle = await rollup({
      input: 'src/index.ts',
      plugins: [
        {
          name: 'clean',
          buildStart: () => {
            if (fs.existsSync('dist'))
              fs.rmSync('dist', {
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
        (_.includes('node_modules') || _.includes('packages')) &&
        !_.includes(packageName.split('/')[1]) &&
        !_.includes('@swc/helpers'),
      treeshake: true
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
    process.stdout.write(`${err.toString('minimal')}\n`);
    process.exit(1);
  }
};

build();
