const fs = require('fs-extra');

const { version } = require('./package.json');

/** @type {import('plop').CustomActionFunction} */
const moveESLintRc = async (answers) => {
  await fs.move(
    `packages/${answers.name}/.eslintrc.hbs`,
    `packages/${answers.name}/.eslintrc`
  );

  return 'Updated ESLint config';
};

/** @type {import('plop').CustomActionFunction} */
const updateLockfile = async () => {
  const { execa } = await import('execa');

  await execa('yarn', ['install'], {
    cwd: process.cwd()
  });

  return 'Updated lockfile';
};

const config = (/** @type {import('plop').NodePlopAPI} */ plop) => {
  plop.setHelper(
    'normalize',
    (name) => `${name[0].toUpperCase()}${name.slice(1)}`
  );

  plop.setGenerator('component', {
    description: 'New Flux UI component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "New component's name"
      },
      {
        type: 'input',
        name: 'version',
        message: "New component's version",
        default: version,
        when: () => false
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'packages/{{name}}',
        templateFiles: 'templates/component/**/(.)?*.hbs',
        base: 'templates/component'
      },
      moveESLintRc,
      updateLockfile
    ]
  });
};

module.exports = config;
