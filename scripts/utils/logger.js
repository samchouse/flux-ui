module.exports = {
  Logger: class {
    constructor(name) {
      this._name = name;
      (async () => {
        this.chalk = (await import('chalk')).default;
      })();
    }

    _log(message, breaks) {
      process.stdout.write(
        `${this.chalk.cyan(`[${this._name}]`)} ${message}${
          !breaks ? '\n' : '\n'.repeat(breaks)
        }`
      );
    }

    info(message, breaks) {
      this._log(`${this.chalk.cyan('→')} ${message}`, breaks);
    }

    success(message, breaks) {
      this._log(`${this.chalk.green('✓')} ${message}`, breaks);
    }

    error(message, breaks) {
      this._log(`${this.chalk.red('✗')} ${message}`, breaks);
    }
  }
};
