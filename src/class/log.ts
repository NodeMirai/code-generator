import chalk from 'chalk'

const log = console.log.bind(this)

class Logger {
  private _log: Function = log
  
  set logger(logger: Function) {
    this._log = logger
  }

  log(color: string, content: string) {
    this._log(chalk[color](content))
  }
}

export default Logger