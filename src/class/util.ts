const fs = require('fs')
import * as babel from '@babel/core';
import { ErrorType } from './config'

class AstUtilBase {

    public generatorAst(src: string) {
        let sourceCode = ''
        try {
            sourceCode = fs.readFileSync(src)
        } catch(e) {
            throw new Error(ErrorType.FileNotFound)
        }
        // 获取目标模板
        return this.parser(sourceCode)
    }
    
    parser(sourceCode: string): any {
        const ast = babel.parse(sourceCode, {
            parserOpts: {
                sourceType: 'module',
                plugins: [
                    'classProperties',
                    'jsx',
                ]
            }
        })
        return ast
    }
    
    getAstByCode(sourceCode: string): any {
        return this.parser(sourceCode).program.body
    }

}

class FsUtil {
    copy(from: string, to: string) {
        fs.readFile(from, 'utf-8', (err: Error, data: string) => {
            if (err) throw err
            fs.writeFile(to, data, (err: Error) => {
                if (err) throw err
            })
        })
    }
}

export {
    AstUtilBase,
    FsUtil,
} 