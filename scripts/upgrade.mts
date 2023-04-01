import chalk from 'chalk';
import { execa } from 'execa';
import { globby } from 'globby';
import { run } from 'npm-check-updates';
import path from 'path';

import { workspaces } from '../package.json';

const logger = console.log;
console.log = () => null;

const upgrade = async () => {
  const packageJsons = await globby(
    workspaces.map((ws) => path.join(ws, 'package.json')),
    { cwd: process.cwd() }
  );

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

void upgrade();
