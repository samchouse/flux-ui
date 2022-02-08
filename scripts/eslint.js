const { ESLint } = require('eslint');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const runner = new ESLint({
  cwd: process.cwd(),
  useEslintrc: true,
  ignorePath: args['ignore-path'],
  fix: args.fix
});

const runESLint = async () => {
  const chalk = (await import('chalk')).default;

  const report = await runner.lintFiles(args._);

  if (
    report.reduce(
      (prev, curr) =>
        prev + curr.errorCount + curr.fatalErrorCount + curr.warningCount,
      0
    ) > 0
  ) {
    const formatter = await runner.loadFormatter();
    console.log(formatter.format(report));
    process.exit(1);
  }

  console.log(chalk.greenBright('✔ No ESLint warnings or errors'));
};

runESLint();