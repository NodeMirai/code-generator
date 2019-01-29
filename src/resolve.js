const fs = require('fs')
const traverse = require('@babel/traverse').default
const g = require('@babel/generator').default
const t = require('@babel/types')

const {
    generatorAst,
    getAstByCode
} = require('../util')

function generatorAstFromConfig(innerConfig, outConfig) {
    const {
        type,
        name,
        filename,
        opt,
        children
    } = outConfig
    const {
        componentPath,
        resolveComponentPath,
        nativeComponentPath,
        modelPath,
        outPath
    } = innerConfig

    // 拿到模板页
    const outModelPath = `${modelPath}/${name}.jsx`
    const ast = generatorAst(outModelPath)

    /** 
     * 配置解析
     */
    // 根据children获取component
    children.forEach((item, index) => {
        children[index].props = Object.assign([], children[index].props) // 确保配置文件中配置props时不被覆盖
        if (!/\$/.test(item.name)) {
            children[index].ast = generatorAst(`${resolveComponentPath}/${item.name}.jsx`)
            // 首字母单词转大写
            traverse(children[index].ast, {
                Identifier: function (path) {
                    if (path.node.name === 'defaultProps') {
                        const expression = path.findParent((path) => path.key === 'expression');
                        expression.node.right.properties.forEach(item => {
                            children[index].props.push(item.key.name)
                        })
                    }
                }
            });
        }
    })

    /**
     * 向模板中插入component
     * 1. import 
     * 2. class 与 export
     * 3. const 结构语句
     * 4. render中return的div中插入component以及属性
     */
    traverse(ast, {
        // import模块引入部分
        ImportDeclaration: function (path) {
            const tc = path.node.trailingComments
            if (tc && tc[0].value === 'import') {
                let nativeComponentList = []
                // 组件库组件导入
                children.forEach(item => {
                    if (item.name[0] === '$') {
                        // 原生组件使用$开头
                        item.name = item.name.slice(1)
                        nativeComponentList.push(item.name)
                    } else {
                        path.insertAfter(
                            /**
                             * local参数表示本地使用的变量, imported表示实际引入的变量
                             * importSpecifier: import { tab(imported) as hehe(local) } from "Hahaha";
                             * importDefaultSpecifier: import tab from "Hahaha";
                             * ImportNamespaceSpecifier: import * as tab from "Hahaha";
                             */
                            getAstByCode(`import ${item.name} from '${componentPath}'`)[0]
                        );
                    }
                })
                // 原生组件导入
                path.insertAfter(
                    getAstByCode(`import {${nativeComponentList.join(', ')}} from '${nativeComponentPath}'`)[0]
                );
            }
        },
        // render中属性声明部分与children部分
        ClassMethod: function (path) {
            const {
                key
            } = path.node
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
                jsxContainer.unshiftContainer('children', getAstByCode(childrenCode.join())[0]); // 换行符分割
            }
        },
        ClassDeclaration: function (path) {
            path.node.id.name = name
        },
        ExportDefaultDeclaration: function (path) {
            path.node.declaration.name = name
        }
    })

    return {
        ast,
        filename,
    }
}

function generateAstList(innerConfig, outConfigList) {
    // 校验配置类型
    const astList = []

    for (let i = 0; i < outConfigList.length; i++) {
        astList.push(generatorAstFromConfig(innerConfig, outConfigList[i]))
    }
    return astList
}

function output(ast, path) {
    // 输出部分
    const out = g(ast, {
        quotes: "double",
        comments: false,
    })
    fs.writeFileSync(path, out.code)
}

module.exports = {
    generateAstList,
    output
}