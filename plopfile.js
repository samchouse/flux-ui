const { version } = require('./package.json');

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
        default: version
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'packages/{{name}}',
        templateFiles: 'templates/component/**/*.hbs',
        base: 'templates/component'
      }
    ]
  });
};

module.exports = config;
