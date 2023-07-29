import chalk from 'chalk';
import { execa } from 'execa';
import fs from 'fs-extra';
import { globby } from 'globby';
import inquirer from 'inquirer';
import path from 'path';

import { workspaces } from '../package.json';

const tag = async (version: string) => {
  await execa('git', ['commit', '-am', `chore(release): ${version}`], {
    cwd: process.cwd()
  });
  await execa('git', ['tag', version, 'main'], {
    cwd: process.cwd()
  });
  await execa('git', ['push']);
  await execa('git', ['push', '--tags']);

  console.log(
    chalk.bgGreen(chalk.black(' SUCCESS ')),
    `Successfully bumped version to ${version}`
  );
};

const release = async (version: string) => {
  await execa('git', ['checkout', 'main']);

  const packageJsons = await globby(
    workspaces.map((ws) => path.join(ws, 'package.json')),
    { cwd: process.cwd() }
  );

  for (const pkgJson of packageJsons) {
    await fs.writeJSON(pkgJson, {
      ...fs.readJsonSync(pkgJson),
      version: version.slice(1)
    });
  }

  await execa('yarn', ['install'], {
    cwd: process.cwd()
  });

  await execa('yarn', ['format'], {
    cwd: process.cwd()
  });

  await tag(version);
};

inquirer
  .prompt([
    {
      type: 'input',
      name: 'version',
      message: 'New version for Flux UI',
      validate: (input: string) =>
        /^v[0-9]+.[0-9]+.[0-9]+(-canary.[0-9]+)?$/.exec(input)
          ? true
          : 'Enter a valid version number'
    }
  ])
  .then(async (answers: { version: string }) => {
    await release(answers.version);
  })
  .catch((err: Error & { isTtyError: boolean }) => {
    if (err.isTtyError) {
      console.error(
        chalk.bgRed(chalk.black(' FAIL ')),
        'Failed to render output'
      );
      return process.exit(1);
    }
    console.error(chalk.bgRed(chalk.black(' FAIL ')), err);
    return process.exit(1);
  });
