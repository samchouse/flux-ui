import chalk from 'chalk';
import { execa } from 'execa';
import fs from 'fs-extra';
import { globby } from 'globby';
import inquirer from 'inquirer';
import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);

const getPackageJsons = async () => {
  const { workspaces } = require('../package.json');

  return (
    await globby(
      workspaces.map((ws) => path.join(ws, 'package.json')),
      { cwd: process.cwd() }
    )
  ).concat([path.join(process.cwd(), 'package.json')]);
};

const release = async (version) => {
  const packageJsons = await getPackageJsons();

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

const tag = async (version) => {
  await execa('git', ['checkout', 'main']);
  await execa('git', ['commit', '-am', `chore(release): ${version}`], {
    cwd: process.cwd()
  });
  await execa('git', ['tag', version, 'main'], {
    cwd: process.cwd()
  });
  await execa('git', ['push', '--all']);

  console.log(
    chalk.bgGreen(chalk.black(' SUCCESS ')),
    `Successfully bumped version to ${version}`
  );
};

inquirer
  .prompt([
    {
      type: 'input',
      name: 'version',
      message: 'New version for Flux UI',
      validate: (input) =>
        input.match(/^v[0-9]+.[0-9]+.[0-9]+(-canary.[0-9]+)?$/)
          ? true
          : 'Enter a valid version number'
    }
  ])
  .then(async (answers) => {
    await release(answers.version);
  })
  .catch((err) => {
    if (err.isTtyError) {
      console.error(
        chalk.bgRed(chalk.black(' FAIL ')),
        'Failed to render output'
      );
      return process.exit(1);
    } else {
      console.error(chalk.bgRed(chalk.black(' FAIL ')), err);
      return process.exit(1);
    }
  });
