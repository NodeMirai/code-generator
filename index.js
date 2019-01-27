/**
 * 根据配置文件生成代码
 * 1. 获取配置项
 * 2. 根据配置项找到component和目标模板
 * 3. 分析component，产出ast节点
 * 4. 分析目标模板，将component产出节点插入
 */
const fs = require('fs')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const g = require('@babel/generator').default
const { generatorAst, parser, getAstByCode } = require('./util')

const config = require('./config')
const { type, opt, children } = config

// 拿到模板页
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
// console.log(children)

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
            // 获取组件中所有defaultProps名，拼接到变量声明中
            let attrCodeStr = ''

            let childrenCode = []
            let jsxAttrCodeStr = ''
            let childCode = ''
            const block = path.get('body')
            const returnStatement = block.get('body').find(item => t.isReturnStatement(item))
            const jsxContainer = returnStatement.get('argument')

            children.forEach(item1 => {
                jsxAttrCodeStr = ''
                childCode = ''
                item1.props.forEach(item2 => {
                    attrCodeStr += item2 + ' '
                    jsxAttrCodeStr += `${item2}={${item2}} `
                })
                childCode = `<${item1.name} ${jsxAttrCodeStr} />`
                childrenCode.push(childCode)
            })
            
            block.unshiftContainer('body', getAstByCode(`const { ${attrCodeStr} } = this.props`)[0]);
            jsxContainer.unshiftContainer('children', getAstByCode(childrenCode.join(' '))[0]);  // 换行符分割
            // fs.writeFileSync('./ast.json', JSON.stringify(getAstByCode(childrenCode.join(' '))[0]))
        }
    }
})

const out = g(ast, {
    quotes: "double",
    comments: false,
})

fs.writeFileSync('./output.js', out.code)