import { nodeResolve } from '@rollup/plugin-node-resolve';
import { ModuleFormat, Plugin, RollupOptions, rollup } from 'rollup';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import { swc } from 'rollup-plugin-swc3';

import { Logger } from './utils/logger';

const build = async () => {
  const chalk = (await import('chalk')).default;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packageName = require(`${process.cwd()}/package.json`).name as string;

  const startTime = Date.now();
  const logger = new Logger('build', chalk);

  logger.info(`Building ${chalk.cyan(packageName)}`);

  try {
    const sharedPlugins = [
      nodeResolve(),
      swc({
        module: {
          type: 'es6'
        },
        jsc: {
          minify: {
            mangle: false,
            compress: false,
            format: {
              comments: 'all'
            }
          }
        }
      })
    ];
    const bundles: {
      outputs: { name: string; format: ModuleFormat }[];
      plugins: Plugin[];
    }[] = [
      {
        outputs: [
          { name: 'cjs', format: 'cjs' },
          { name: 'esm', format: 'esm' }
        ],
        plugins: [
          del({
            targets: ['lib/']
          }),
          ...sharedPlugins
        ]
      },
      {
        outputs: [{ name: 'types', format: 'esm' }],
        plugins: [
          ...sharedPlugins,
          dts({
            tsconfig: `${process.cwd()}/tsconfig.build.json`
          })
        ]
      }
    ];

    for (const bundleOptions of bundles) {
      const rollupOptions: RollupOptions = {
        input: 'src/index.ts',
        external: (id) =>
          id.includes('node_modules') || id.includes('@flux-ui/')
      };

      const bundle = await rollup({
        ...rollupOptions,
        plugins: bundleOptions.plugins
      });

      for (const output of bundleOptions.outputs) {
        logger.info(`Done building for target: ${chalk.cyan(output.name)}`);
        await bundle.write({
          dir: `lib/${output.name}`,
          format: output.format
        });
      }

      await bundle.close();
    }

    logger.info(
      `${chalk.cyan(packageName)} built in ${chalk.green(
        `${((Date.now() - startTime) / 1000).toFixed(2)}s`
      )}`
    );
  } catch (err) {
    logger.error(`Failed to compile package: ${chalk.cyan(packageName)}`);
    console.error(err);
    process.exit(1);
  }
};

void build();
