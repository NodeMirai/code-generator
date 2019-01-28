const fs = require('fs')
const babel = require('@babel/core')


function generatorAst(src) {
    let sourceCode = ''
    try {
        sourceCode = fs.readFileSync(src)
    } catch(e) {
        // 查不到再说吧
        console.log('error', e)
    }
    // 获取目标模板
    return parser(sourceCode)
}

function parser(sourceCode) {
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

function getAstByCode(sourceCode) {
    return parser(sourceCode).program.body
}

module.exports = {
    generatorAst,
    parser,
    getAstByCode,
}