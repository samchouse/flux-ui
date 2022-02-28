import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { JsMinifyOptions, JscConfig, Options } from '@swc/core';
import { rollup } from 'rollup';
import swc from 'rollup-plugin-swc';

const bundleFile = (type: 'cjs' | 'esm') => `dist/index.${type}.js`;
const extensions = ['.ts', '.tsx'];
const external = (_: string) =>
  _.includes('node_modules') && !_.includes('@swc/helpers');

const build = async () => {
  const swcOptions: Omit<Options, 'jsc'> & {
    jsc: Omit<JscConfig, 'minify'> & {
      minify: JsMinifyOptions;
    };
  } = {
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

  const bundle = await rollup({
    input: 'src/index.ts',
    plugins: [
      nodeResolve({
        extensions
      }),
      commonjs({
        exclude: 'node_modules',
        ignoreGlobal: true
      }),
      swc({
        swcrc: false,
        ...swcOptions
      })
    ],
    external,
    treeshake: true
  });

  await bundle.write({
    file: bundleFile('cjs'),
    format: 'cjs'
  });
  await bundle.write({
    file: bundleFile('esm'),
    format: 'esm'
  });

  await bundle.close();
};

build();
