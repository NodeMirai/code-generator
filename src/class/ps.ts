const fs = require("fs");
import traverse from "@babel/traverse";
import g from "@babel/generator";
import * as t from "@babel/types";

import ComponentSourseFactory, { ComponentSource, Prop } from "../class/cs";
import { AstUtilBase, FsUtil, ConstantUtil, StrUtil } from "./util";
import Logger from "./log";
import { LogColor } from "./constant";
import { ErrorType } from "./constant";
import innerConfig from "../../config/path";
import PsModalFactory from "./psModalFactroy";
import CodeGenerator from "./codeGenerator";
import { pageModel } from "../../config/";

const astUtilBase: AstUtilBase = new AstUtilBase();
const constantUtil: ConstantUtil = new ConstantUtil();
const fsUtil: FsUtil = new FsUtil();
const strUtil: StrUtil = new StrUtil();
const logger: Logger = new Logger();
const csFactory: ComponentSourseFactory = new ComponentSourseFactory();

let count = 0;
class PageSource {
  methodAttrList: Set<string> = new Set();      // 所有方法属性的集合，会自动声明在页面中
  attrCodeList: Set<string> = new Set();        // 属性集合，这里有问题。。。重复属性只获取了一次
  nativeComponentList: Set<string> = new Set(); // 原生组件集合，用于import原生部分
  componentList: Set<string> = new Set();       // 组件名称集合，用于当前页面代码的import部分

  constructor() {}

  generatorAstFromConfig(innerConfig: any, outConfig: any) {
    const {
      type,
      modal,
      filename,
      stylename,
      nativeComponentPath,
      className,
      opt,
      children
    } = outConfig;
    const { componentPath, resolveComponentPath, modelPath } = innerConfig;
    const outModelPath = `${modelPath}/${modal}`;
    const ast = astUtilBase.generatorAst(outModelPath);
    logger.log(LogColor.LOG, `${modal}模板读取ast完成`);

    // fs.writeFileSync('./ast.js', JSON.stringify(ast))

    this.initForest(type, children);
    logger.log(LogColor.LOG, `${filename}初始化森林完成`);
    this.initChildrenAst(resolveComponentPath, children);
    logger.log(
      LogColor.LOG,
      `${filename}完成森林节点中各内部组件ast初始化完成`
    );

    /**
     * 向模板中插入component
     * 1. import
     * 2. class 与 export
     * 3. const 结构语句
     * 4. render中return的div中插入component以及属性
     */
    const PageName = filename[0].toUpperCase() + filename.slice(1);
    traverse(ast, {
      /**
       * import模块引入部分
       */
      ImportDeclaration: path => {
        const tc = path.node.trailingComments;
        if (tc && tc[0].value === "import") {
          this.componentList.forEach(csName => {
            path.insertAfter(
              /**
               * local参数表示本地使用的变量, imported表示实际引入的变量
               * importSpecifier: import { tab(imported) as hehe(local) } from "Hahaha";
               * importDefaultSpecifier: import tab from "Hahaha";
               * ImportNamespaceSpecifier: import * as tab from "Hahaha";
               */
              astUtilBase.getAstByCode(
                `import ${strUtil.convertCamel(
                  csName
                )} from '${componentPath}/${csName}'`
              )
            );
          });
          logger.log(LogColor.LOG, `${filename}内部组件import代码生成完毕`);

          if (!nativeComponentPath || this.nativeComponentList.size === 0)
            return;
          // 原生组件导入
          path.insertAfter(
            astUtilBase.getAstByCode(
              `import {${Array.from(this.nativeComponentList).join(
                ", "
              )}} from '${nativeComponentPath}'`
            )
          );
          logger.log(LogColor.LOG, `${filename}原生组件import代码生成完毕`);
        }
      },
      /**
       * render中属性声明部分与children部分
       * @param path
       */
      ClassMethod: path => {
        const { key } = path.node as any;
        if (key.name === "render") {
          // 获取组件中所有defaultProps名，拼接到变量声明中
          let childrenCode: Array<string> = [];
          const block: any = path.get("body");
          const returnStatement = block
            .get("body")
            .find((item: any) => t.isReturnStatement(item));
          const jsxContainer = returnStatement.get("argument");
          const classNameNode = jsxContainer.node.openingElement.attributes.find(
            (item: any) => t.isJSXAttribute(item)
          );

          if (className) classNameNode.value.value = className;
          children.forEach((cs: ComponentSource) => {
            childrenCode.push(this.insertChild(cs));
          });
          if (this.attrCodeList.size !== 0) {
            block.unshiftContainer(
              "body",
              astUtilBase.getAstByCode(
                `const { ${Array.from(this.attrCodeList).join(
                  ", "
                )} } = this.props`
              )
            );
            logger.log(
              LogColor.LOG,
              `${LogColor.LOG}中render内部props声明完成`
            );
          }

          if (this.methodAttrList.size != 0) {
            traverse(ast, {
              ClassBody: path => {
                const block = path as any
                this.methodAttrList.forEach(methodName => {
                  block.unshiftContainer(
                    'body',
                    t.classMethod('method', t.identifier(methodName), [], t.blockStatement([],[]))
                  )
                })
              }
            })
          }

          const jsxChild = astUtilBase.getAstByCode(childrenCode.join());
          jsxContainer.unshiftContainer("children", jsxChild);
          logger.log(LogColor.LOG, `${LogColor.LOG}中render内部模板声明完成`);
        }
      },
      ClassDeclaration: function(path) {
        path.node.id.name = PageName;
      },
      ExportDefaultDeclaration: function(path: any) {
        path.node.declaration.name = PageName;
      },
      CallExpression: path => {
        const callee: any = path.node.callee;
        if (callee.object && callee.object.name === "ReactDOM") {
          let argument: any = path.node.arguments[0];
          argument.openingElement.name.name = PageName;
        }
      }
    });

    return {
      ast,
      filename,
      stylename
    };
  }

  insertChild(cs: ComponentSource): string {
    let jsxAttrCodeStr = ""; // 每个树上组件属性代码片段
    if (cs.name[0] === "$") cs.name = cs.name.slice(1);
    const camelName = strUtil.convertCamel(cs.name);
    // 拼接props所需属性和jsx标签属性
    cs.propList.forEach((prop: string | Prop) => {
      if (typeof prop === "string") {
        if (strUtil.isMethodAttr(prop)) {
          let propTmp = prop;
          if (this.methodAttrList.has(prop)) {
            prop = prop + ++count;
          }
          this.methodAttrList.add(prop);
          jsxAttrCodeStr += `${propTmp}={this.${prop}} `;
        } else {
          this.attrCodeList.add(prop);
          jsxAttrCodeStr += `${prop}={${prop}} `;
        }
      } else {
        let { name, value } = prop;
        if (strUtil.isMethodAttr(name)) {
          let propTmp = name;
          if (this.methodAttrList.has(name)) {
            name = name + ++count;
          }
          this.methodAttrList.add(name);
          jsxAttrCodeStr += `${propTmp}={this.${name}} `;
        } else {
          this.attrCodeList.add(name);
          jsxAttrCodeStr += `${name}='${value}' `;
        }
      }
    });
    // 根据jsx是否存在子节点属性确定拼接字符串方式
    if ((!cs.children || !Array.isArray(cs.children)) && !cs.content) {
      cs.childCode = cs.childCode.replace(
        "|",
        `<${camelName} ${jsxAttrCodeStr} />`
      );
      return cs.childCode;
    }
    if (cs.content || (cs.children && cs.children.length === 0)) {
      cs.childCode = cs.childCode.replace(
        "|",
        `<${camelName} ${jsxAttrCodeStr} >${cs.content}</${camelName}>`
      );
      return cs.childCode;
    } else {
      const childrenCode = [];
      // 传入子节点递归children
      for (let i = 0; i < cs.children.length; i++) {
        childrenCode.push(this.insertChild(cs.children[i]));
        cs.childCode = null;
      }
      return `<${camelName} ${jsxAttrCodeStr} >${childrenCode.join()}</${camelName}>`;
    }
  }

  /**
   * 初始化森林节点中每个内部组件库的ast，并拼接好对应的defaultProps
   * @param resolveComponentPath
   * @param children
   */
  initChildrenAst(
    resolveComponentPath: string,
    children: Array<ComponentSource>
  ) {
    if (!children || children.length === 0) return;
    /**
     * 配置解析
     */
    // 根据children获取component
    children.forEach((cs: ComponentSource) => {
      cs.propList = cs.propList || [];

      // 如果是原生组件,则不查找defaultProps
      if (cs.name[0] !== "$") {
        this.componentList.add(cs.name);
        try {
          // 首字母单词转小写, 约定组件名称全部使用小写
          cs.ast = astUtilBase.generatorAst(
            `${resolveComponentPath}/${cs.name.toLocaleLowerCase()}/index.js`
          );
        } catch (e) {
          switch (e.message) {
            case ErrorType.FileNotFound:
              /**
               * 组件不存在时，需要递归生成
               * 1. 在组件模型工厂中根据name查找对应的PageSource
               * 2. 如果不存在，则将该组件记录在特定文件中，以便后续添加
               */
              const psModalFactory = new PsModalFactory();
              const psModal = psModalFactory.generate(cs.name);
              if (psModal !== undefined) {
                CodeGenerator.main(innerConfig, psModal);
              } else {
                // 输出记录下来
                fs.appendFile(
                  innerConfig.modalLog,
                  `${cs.name}不在模型库中\n`,
                  (err: Error) => {
                    if (err) throw err;
                    console.log(`${cs.name}不存在`);
                  }
                );
              }
              break;
            default:
          }
        } finally {
          traverse(cs.ast, {
            Identifier: function(path: any) {
              if (path.node.name === "defaultProps") {
                path.container.value.properties.forEach((item: any) => {
                  const isPropExist = cs.propList.some(prop => {
                    const name = item.key.name;
                    if (typeof prop === "string") {
                      return prop === name;
                    } else {
                      return prop.name === name;
                    }
                  });
                  if (!isPropExist) {
                    cs.propList.push(item.key.name);
                  }
                });
              }
            }
          });
        }
      } else {
        this.nativeComponentList.add(cs.name.slice(1));
      }
      this.initChildrenAst(resolveComponentPath, cs.children);
    });
  }

  /**
   * 初始化森林方法
   * @this.initChildrenAst
   * @param children
   */
  initForest(type: string, children: Array<ComponentSource>) {
    // 递归终止条件
    if (!children || children.length === 0) return;
    // 初始化每个节点对象
    for (let i = 0; i < children.length; i++) {
      const cs = csFactory.generate(type, children[i]);
      children[i] = cs;
      this.initForest(cs.type, cs.children);
    }
  }

  output(ast: any, path: any) {
    const { stylePath, outPath, filename, stylename } = path;
    // 输出部分
    const out = g(ast, {
      quotes: "double",
      comments: false
    });
    const dirPath = outPath + "/" + filename;
    // 待整理
    fs.mkdir(dirPath, { recursive: true }, (err: Error) => {
      // if (err) throw err 文件夹存在的情况下删除文件重建
      const path = `${dirPath}/${
        pageModel === "-t" ? filename : "index"
      }${constantUtil.getPostfix(pageModel)}`;
      const code = out.code.replace(/>(,|;)\s?/gm, ">");

      fs.writeFileSync(path, code);
      logger.log("yellow", `${filename}已生成到${outPath}`);

      const styleFilename = stylename || "style.scss";
      const componentStyle = dirPath + "/style.scss";
      // 判断组件文件夹中是否存在样式文件，存在则不进行复制操作
      fs.access(componentStyle, fs.constants.F_OK, (err: Error) => {
        if (err) fsUtil.copy(stylePath + "/" + styleFilename, componentStyle);
      });
    });
  }
}

export { PageSource };
