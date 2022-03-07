const fs = require('fs-extra');
const { camelCase } = require('lodash');

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
  // Helpers
  plop.setHelper('normalize', (text) => startCase(text));
  plop.setHelper('capitalize', (text) => {
    const camel = camelCase(text);
    return camel[0].toUpperCase() + camel.slice(1);
  });

  // Generators
  plop.setGenerator('component', {
    description: 'New Flux UI component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "New component's name"
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
