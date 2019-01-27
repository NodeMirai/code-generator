const fs = require('fs')
const babel = require('@babel/core')


function generatorAst(src) {
    const sourceCode = fs.readFileSync(src)
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