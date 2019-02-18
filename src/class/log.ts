import chalk from 'chalk'

const log = console.log.bind(this)
const chalkTmp = chalk as any
class Logger {
  private _log: Function = log
  
  set logger(logger: Function) {
    this._log = logger
  }

  log(color: string, content: string) {
    this._log(chalkTmp[color](content))
  }
}

export default Logger