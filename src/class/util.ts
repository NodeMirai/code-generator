const fs = require('fs')
import * as babel from '@babel/core';

class AstUtilBase {

    public generatorAst(src: string) {
        let sourceCode = ''
        try {
            sourceCode = fs.readFileSync(src)
        } catch(e) {
            // 查不到再说吧
            console.log('error', e)
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

export {
    AstUtilBase
} 