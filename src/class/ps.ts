const fs = require('fs');
import traverse from '@babel/traverse';
import g from '@babel/generator';
import * as t from '@babel/types';

import { ComponentSource, Prop } from '../class/cs'
import { AstUtilBase, FsUtil } from './util'
import Logger from './log'
import { LogColor } from './config'

const astUtilBase: AstUtilBase = new AstUtilBase()
const fsUtil: FsUtil = new FsUtil()
const logger: Logger = new Logger()

class PageSource {
    childCode: string;
    attrCodeStr: string;
    childrenCode: Array<string>

    constructor() {
        this.attrCodeStr = ''
    }

    insertChild(cs: ComponentSource): string {
        let jsxAttrCodeStr = ''  // 每个树上组件属性代码片段
        if (cs.name[0] === '$') cs.name = cs.name.slice(1)
        // 拼接props所需属性和jsx标签属性
        cs.propList.forEach((prop: string | Prop) => {
            if (typeof prop === 'string') {
                // 仅字符串类型时拼接
                this.attrCodeStr += prop + ', '
                jsxAttrCodeStr += `${prop}={${prop}} `
            } else {
                const { name, value } = prop
                jsxAttrCodeStr += `${name}='${value}' `
            }
        })
        // 根据jsx是否存在子节点属性确定拼接字符串方式
        if ((!cs.children || !Array.isArray(cs.children)) && !cs.content) {
            cs.childCode = cs.childCode.replace('|', `<${cs.name} ${jsxAttrCodeStr} />`)
            return cs.childCode
        } if (cs.content || (cs.children && cs.children.length === 0) ) {
            cs.childCode = cs.childCode.replace('|', `<${cs.name} ${jsxAttrCodeStr} >${cs.content}</${cs.name}>`)
            return cs.childCode
        } else {
            const childrenCode = []
            // 传入子节点递归children
            for (let i = 0; i < cs.children.length; i++) {
                childrenCode.push(this.insertChild(cs.children[i]))
                cs.childCode = null
            }
            return `<${cs.name} ${jsxAttrCodeStr} >${childrenCode.join()}</${cs.name}>`
        }
    }

    generatorAstFromConfig(innerConfig: any, outConfig: any) {
        const {
            type,
            modal,
            filename,
            stylename,
            opt,
            children
        } = outConfig
        const {
            componentPath,
            resolveComponentPath,
            nativeComponentPath,
            modelPath,
        } = innerConfig
    
        const outModelPath = `${modelPath}/${modal}`
        const ast = astUtilBase.generatorAst(outModelPath)
        logger.log(LogColor.LOG,`${modal}模板读取ast完成`)
    
        ComponentSource.initForest(type, children)
        logger.log(LogColor.LOG,`${filename}初始化森林完成`)
        ComponentSource.initChildrenAst(resolveComponentPath, children)
        logger.log(LogColor.LOG,`${filename}完成森林节点中各内部组件ast初始化完成`)
    
        /**
         * 向模板中插入component
         * 1. import 
         * 2. class 与 export
         * 3. const 结构语句
         * 4. render中return的div中插入component以及属性
         */
        const PageName = filename[0].toUpperCase() + filename.slice(1)
        traverse(ast, {
            /**
             * import模块引入部分
             */
            ImportDeclaration: function (path) {
                const tc = path.node.trailingComments
                if (tc && tc[0].value === 'import') {
                    let nativeComponentList: Set<string> = new Set()
                    // 组件库组件导入
                    children.forEach((cs: ComponentSource) => {
                        if (cs.name[0] === '$') {
                            // 原生组件使用$开头
                            cs.name = cs.name.slice(1)
                            nativeComponentList.add(cs.name)
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
                    logger.log(LogColor.LOG,`${filename}内部组件import代码生成完毕`)

                    if (nativeComponentPath === '') return
                    // 原生组件导入
                    path.insertAfter(
                        astUtilBase.getAstByCode(`import {${Array.from(nativeComponentList).join(', ')}} from '${nativeComponentPath}'`)[0]
                    );
                    logger.log(LogColor.LOG,`${filename}原生组件import代码生成完毕`)
                }
            },
            /**
             * render中属性声明部分与children部分
             * @param path 
             */
            ClassMethod: (path) => {
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
                        childrenCode.push(this.insertChild(cs))
                    })
                    block.unshiftContainer('body', astUtilBase.getAstByCode(`const { ${this.attrCodeStr} } = this.props`)[0]);
                    logger.log(LogColor.LOG,`${LogColor.LOG}中render内部props声明完成`)
                    jsxContainer.unshiftContainer('children', astUtilBase.getAstByCode(childrenCode.join())[0]); 
                    logger.log(LogColor.LOG,`${LogColor.LOG}中render内部模板声明完成`)
                }
            },
            ClassDeclaration: function (path) {
                path.node.id.name = PageName
            },
            ExportDefaultDeclaration: function (path: any) {
                path.node.declaration.name = PageName
            },
            CallExpression: (path) => {
                const callee: any = path.node.callee
                if (callee.object && callee.object.name === 'ReactDOM') {
                    let argument: any = path.node.arguments[0]
                    argument.openingElement.name.name = PageName
                }
            }
        })
    
        return {
            ast,
            filename,
            stylename
        }
    }

    output(ast: any, path: any) {
        const { stylePath, outPath, filename, stylename } = path
        // 输出部分
        const out = g(ast, {
            quotes: "double",
            comments: false,
        })
        const dirPath = outPath + '/' + filename
        // 待整理
        fs.mkdir(dirPath, { recursive: true }, (err: Error) => {
            // if (err) throw err 文件夹存在的情况下删除文件重建
            fs.writeFile(dirPath + '/index.jsx', out.code, (err: Error) => {
                if (err) throw err
                logger.log('yellow', `${filename}已生成到${outPath}`)
            })

            const styleFilename = stylename || 'style.scss'
            const componentStyle = dirPath + '/style.scss'
            // 判断组件文件夹中是否存在样式文件，存在则不进行复制操作
            fs.access(componentStyle, fs.constants.F_OK, (err: Error) => {
                if (err) fsUtil.copy(stylePath + '/' + styleFilename, componentStyle)
            });
        })
    }
}

export {
    PageSource
}