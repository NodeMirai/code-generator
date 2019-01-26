/**
 * 根据配置文件生成代码
 * 1. 获取配置项
 * 2. 根据配置项找到component和目标模板
 * 3. 分析component，产出ast节点
 * 4. 分析目标模板，将component产出节点插入
 */
const fs = require('fs')
const babel = require('@babel/core')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const g = require('@babel/generator').default

const config = require('./config')
const { type, opt, children } = config

function generatorAst(src) {
    const sourceCode = fs.readFileSync(src)
    // 获取目标模板
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
const ast = generatorAst(`./src/${type}.jsx`)
fs.writeFileSync('./ast.json', JSON.stringify(ast))

// 根据children获取component
let componentAst = []
children.forEach(item => {
    componentAst.push(generatorAst(`./src/component/${item.name}.jsx`))
})

componentAst.forEach((item, index) => {
    children[index].props = []
    traverse(item, {
        Identifier: function (path) {
            if (path.node.name === 'defaultProps') {
                const expression = path.findParent((path) => path.key === 'expression');
                expression.node.right.properties.forEach(item => {
                    children[index].props.push(item.key.name)
                })
            }
        }
    });
})

console.log(children)
/**
 * 向模板中插入component
 * 1. import 
 * 2. class 与 export
 * 3. const 结构语句
 * 4. render中return的div中插入component以及属性
 */
traverse(ast, {
    // 组件引入节点插入
    ImportDeclaration: function (path) {
        const tc = path.node.trailingComments
        if (tc && tc[0].value === 'import') {
            children.forEach(item => {
                path.insertAfter(
                    /**
                     * local参数表示本地使用的变量, imported表示实际引入的变量
                     * importSpecifier: import { tab(imported) as hehe(local) } from "Hahaha";
                     * importDefaultSpecifier: import tab from "Hahaha";
                     * ImportNamespaceSpecifier: import * as tab from "Hahaha";
                     */
                    t.importDeclaration([t.importSpecifier(t.identifier('hehe'), t.identifier(item.name))], t.StringLiteral('Hahaha'))
                );
            })
        }
    },
    // 找到render方法
    ClassMethod: function (path) {
        const { key } = path.node
        if (key.name === 'render') {
            path.get('body').unshiftContainer('body', t.variableDeclaration('const', [t.variableDeclarator(t.objectPattern([t.objectProperty(t.identifier('hehe') , t.identifier('hehe'))]), t.memberExpression(t.thisExpression(), t.identifier('props')))]));
        }
    }
})

const out = g(ast, {
    retainLines: true,
    compact: false,
    concise: false,
    quotes: "double",
})

fs.writeFileSync('./output.js', out.code)