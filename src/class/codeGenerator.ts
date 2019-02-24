const fs = require('fs')
import innerConfig from '../../config/path';
import { PageSource } from './ps'
import Logger from './log'

const { outPath, modalLog } = innerConfig

class CodeGenerator {
  public static main(innerConfig: any, config: any): void {
    // 删除输出文件
    if (fs.existsSync(modalLog)) fs.unlinkSync(modalLog)
    const ps = new PageSource()
    const { ast, filename } = ps.generatorAstFromConfig(innerConfig, config)
    ps.output(ast, outPath, filename)
  }
}

export default CodeGenerator