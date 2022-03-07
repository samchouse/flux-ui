import { ChalkInstance } from 'chalk';

export class Logger {
  private name: string;
  private chalk: ChalkInstance;

  constructor(name: string, chalk: ChalkInstance) {
    this.name = name;
    this.chalk = chalk;
  }

  private log(message: string, breaks?: number) {
    process.stdout.write(
      `${this.chalk.cyan(`[${this.name}]`)} ${message}${
        !breaks ? '\n' : '\n'.repeat(breaks)
      }`
    );
  }

  info(message: string, breaks?: number) {
    this.log(`${this.chalk.cyan('→')} ${message}`, breaks);
  }

  success(message: string, breaks?: number) {
    this.log(`${this.chalk.green('✓')} ${message}`, breaks);
  }

  error(message: string, breaks?: number) {
    this.log(`${this.chalk.red('✗')} ${message}`, breaks);
  }
}
