import { ESLint } from 'eslint';
import minimist from 'minimist';
import path from 'path';

const args = minimist(process.argv.slice(2));
const runner = new ESLint({
  fix: args.fix,
  useEslintrc: true,
  cwd: process.cwd(),
  ignorePath: path.join(__dirname, '../.gitignore')
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
