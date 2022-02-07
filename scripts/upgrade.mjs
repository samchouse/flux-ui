import chalk from 'chalk';
import { execa } from 'execa';
import { globby } from 'globby';
import { createRequire } from 'module';
import { run } from 'npm-check-updates';
import path from 'path';

const require = createRequire(import.meta.url);

const logger = console.log;
console.log = () => null;

const getPackageJsons = async () => {
  const { workspaces } = require('../package.json');

  return (
    await globby(
      workspaces.map((ws) => path.join(ws, 'package.json')),
      { cwd: process.cwd() }
    )
  ).concat([path.join(process.cwd(), 'package.json')]);
};

const upgrade = async () => {
  const packageJsons = await getPackageJsons();

  for (const pkgJson of packageJsons) {
    await run({ packageFile: pkgJson, upgrade: true }).catch(() => {
      console.error(
        chalk.bgRed(chalk.black(' FAIL ')),
        `Failed to update ${pkgJson}`
      );
      return process.exit(1);
    });
  }

  await execa('yarn', ['install'], { cwd: process.cwd() });

  logger(
    chalk.bgGreen(chalk.black(' SUCCESS ')),
    'Successfully updated packages'
  );
};

upgrade();
