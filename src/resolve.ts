const fs = require('fs');
import traverse from '@babel/traverse';
import g from '@babel/generator';
import * as t from '@babel/types';

import { ComponentSource, Prop } from './class/cs'
import { AstUtilBase } from '../util'

const astUtilBase: AstUtilBase = new AstUtilBase()

let childCode = '|'     // 每个树拼接成的组件代码片段
let attrCodeStr = ''    // 每个树上所有的属性节点
let jsxAttrCodeStr = ''  // 每个树上组件属性代码片段
function insertChild(cs: ComponentSource): string {
    jsxAttrCodeStr = ''

    // 拼接props所需属性和jsx标签属性
    cs.propList.forEach((prop: string | Prop) => {
        if (typeof prop === 'string') {
            // 仅字符串类型时拼接
            attrCodeStr += prop + ', '
            jsxAttrCodeStr += `${prop}={${prop}} `
        } else {
            const { name, value } = prop
            jsxAttrCodeStr += `${name}={'${value}'} `
        }
    })
    // 根据jsx是否存在子节点属性确定拼接字符串方式
    if (!cs.children || !Array.isArray(cs.children)) {
        childCode = childCode.replace('|', `<${cs.name} ${jsxAttrCodeStr} />`)
        return childCode
    } if (cs.children.length === 0) {
        childCode = childCode.replace('|', `<${cs.name} ${jsxAttrCodeStr} ></${cs.name}>`)
        return childCode
    } else {
        childCode = childCode.replace(/(\|)/, `<${cs.name} ${jsxAttrCodeStr} >$1</${cs.name}>`)
        // 传入子节点递归children
        for (let i = 0; i < cs.children.length; i++) {
            return insertChild(cs.children[i])
        }
    }
}

function generateAstList(innerConfig: any, outConfigList: any) {
    // 校验配置类型
    const astList = []
    attrCodeStr = ''
    childCode = '|'
    for (let i = 0; i < outConfigList.length; i++) {
        astList.push(generatorAstFromConfig(innerConfig, outConfigList[i]))
    }
    return astList
}

function generatorAstFromConfig(innerConfig: any, outConfig: any) {
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
    } = innerConfig

    const outModelPath = `${modelPath}/${name}.jsx`
    const ast = astUtilBase.generatorAst(outModelPath)

    ComponentSource.initForest(type, children)
    ComponentSource.initChildrenAst(resolveComponentPath, children)

    /**
     * 向模板中插入component
     * 1. import 
     * 2. class 与 export
     * 3. const 结构语句
     * 4. render中return的div中插入component以及属性
     */
    traverse(ast, {
        /**
         * import模块引入部分
         */
        ImportDeclaration: function (path) {
            const tc = path.node.trailingComments
            if (tc && tc[0].value === 'import') {
                let nativeComponentList: Array<string> = []
                // 组件库组件导入
                children.forEach((cs: ComponentSource) => {
                    if (cs.name[0] === '$') {
                        // 原生组件使用$开头
                        cs.name = cs.name.slice(1)
                        nativeComponentList.push(cs.name)
                    } else {
                        path.insertAfter(
                            /**
                             * local参数表示本地使用的变量, imported表示实际引入的变量
                             * importSpecifier: import { tab(imported) as hehe(local) } from "Hahaha";
                             * importDefaultSpecifier: import tab from "Hahaha";
                             * ImportNamespaceSpecifier: import * as tab from "Hahaha";
                             */
                            astUtilBase.getAstByCode(`import ${cs.name} from '${componentPath}'`)[0]
                        );
                    }
                })

                if (nativeComponentPath === '') return
                // 原生组件导入
                path.insertAfter(
                    astUtilBase.getAstByCode(`import {${nativeComponentList.join(', ')}} from '${nativeComponentPath}'`)[0]
                );
            }
        },
        /**
         * render中属性声明部分与children部分
         * @param path 
         */
        ClassMethod: function (path) {
            const {
                key
            } = path.node as any
            if (key.name === 'render') {
                // 获取组件中所有defaultProps名，拼接到变量声明中

                let childrenCode: Array<string> = []
                const block: any = path.get('body')
                const returnStatement = block.get('body').find((item: any) => t.isReturnStatement(item))
                const jsxContainer: any = returnStatement.get('argument')

                children.forEach((cs: ComponentSource) => {
                    childCode = '|'
                    childCode = insertChild(cs)
                    childrenCode.push(childCode)
                })
                block.unshiftContainer('body', astUtilBase.getAstByCode(`const { ${attrCodeStr} } = this.props`)[0]);
                jsxContainer.unshiftContainer('children', astUtilBase.getAstByCode(childrenCode.join())[0]); 
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

function output(ast: any, path: string) {
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