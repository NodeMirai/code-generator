const fs = require('fs');
import traverse from '@babel/traverse';
import g from '@babel/generator';
import * as t from '@babel/types';

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
            // 首字母单词转小写, 约定组件名称全部使用小写
            children[index].ast = generatorAst(`${resolveComponentPath}/${item.name.toLocaleLowerCase()}.jsx`)
            traverse(children[index].ast, {
                Identifier: function (path) {
                    if (path.node.name === 'defaultProps') {
                        const expression = path.findParent((path) => path.key === 'expression');
                        const right = (expression.node as t.AssignmentExpression).right as t.ObjectExpression
                        right.properties.forEach((item: any) => {
                            children[index].props.push(item.key.name)
                        })
                    }
                }
            });
        }
    })


    let childCode = '|'     // 每个树拼接成的组件代码片段
    let attrCodeStr = ''    // 每个树上所有的属性节点
    let jsxAttrCodeStr = ''  // 每个树上组件属性代码片段
    function insertChild(node) {
        node.props = Object.assign([], node.props) // 确保配置文件中配置props时不被覆盖
        jsxAttrCodeStr = ''

        // 拼接props所需属性和jsx标签属性
        node.props.forEach(item2 => {
            if (typeof item2 === 'string') {
                // 仅字符串类型时拼接
                attrCodeStr += item2 + ', '
                jsxAttrCodeStr += `${item2}={${item2}} `
            } else {
                const { name, value } = item2
                jsxAttrCodeStr += `${name}={'${value}'} `
            }
        })
        // 根据jsx是否存在子节点属性确定拼接字符串方式
        if (!node.children || !Array.isArray(node.children) || node.children.length === 0) {
            childCode = childCode.replace('|', `<${node.name} ${jsxAttrCodeStr} />`)
            return childCode
        } else {
            childCode = childCode.replace(/(\|)/, `<${node.name} ${jsxAttrCodeStr} >$1</${node.name}>`)
            // 传入子节点递归children
            for (let i = 0; i < node.children.length; i++) {
                return insertChild(node.children[i])
            }
        }
    }

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

                if (nativeComponentPath === '') return
                // 原生组件导入
                path.insertAfter(
                    getAstByCode(`import {${nativeComponentList.join(', ')}} from '${nativeComponentPath}'`)[0]
                );
            }
        },
        // render中属性声明部分与children部分
        ClassMethod: function (path) {
            if (!children || !Array.isArray(children)) return
            const {
                key
            } = path.node as any
            if (key.name === 'render') {
                // 获取组件中所有defaultProps名，拼接到变量声明中

                let childrenCode = []
                const block: any = path.get('body')
                const returnStatement = block.get('body').find(item => t.isReturnStatement(item))
                const jsxContainer: any = returnStatement.get('argument')

                children.forEach(item1 => {
                    childCode = '|'
                    childCode = insertChild(item1)
                    childrenCode.push(childCode)
                })
                block.unshiftContainer('body', getAstByCode(`const { ${attrCodeStr} } = this.props`)[0]);
                jsxContainer.unshiftContainer('children', getAstByCode(childrenCode.join())[0]); 
            }
        },
        ClassDeclaration: function (path) {
            path.node.id.name = name
        },
        ExportDefaultDeclaration: function (path: any) {
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

export {
    generateAstList,
    output
}