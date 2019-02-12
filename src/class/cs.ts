import traverse from '@babel/traverse';
import { AstUtilBase } from './util'

const astUtilBase = new AstUtilBase()

export interface Prop {
  name: string;
  value: string;
}

interface CsProps {
  name: string;
  propList: Array<string | Prop>;
  children: Array<ComponentSource>;
}

class ComponentSourseFactory {
  generate(type: string, props: CsProps) {
    switch(type) {
      default:
      return new ComponentSource(props);
    }
  }
}

const csFactory: ComponentSourseFactory = new ComponentSourseFactory()

export class ComponentSource {
  name: string;
  propList: Array<string | Prop>;
  children: Array<ComponentSource>;
  ast: any;
  type: string;
  private _astOperate: AstStrategy;  // 此处应有默认策略

  constructor(props: CsProps) {
    this.name = props.name;
    this.propList = props.propList;
    this.children = props.children;
  }

  set astOperate(astOperate: AstStrategy) {
    this._astOperate = astOperate;
  }

  /**
   * 初始化森林节点中每个内部组件库的ast，并拼接好对应的defaultProps
   * @param resolveComponentPath 
   * @param children 
   */
  public static initChildrenAst(resolveComponentPath: string, children: Array<ComponentSource>) {
    if (!children || children.length === 0)  return
    /** 
     * 配置解析
     */
    // 根据children获取component
    children.forEach((cs: ComponentSource) => {
        cs.propList = Object.assign([], cs.propList) // 确保配置文件中配置props时不被覆盖
        
        // 如果是原生组件,则不查找defaultProps
        if (!/\$/.test(cs.name)) {
            // 首字母单词转小写, 约定组件名称全部使用小写
            cs.ast = astUtilBase.generatorAst(`${resolveComponentPath}/${cs.name.toLocaleLowerCase()}.jsx`)
            traverse(cs.ast, {
                Identifier: function (path) {
                    if (path.node.name === 'defaultProps') {
                        const expression: any = path.findParent((path) => path.key === 'expression');
                        const right = expression.node.right
                        right.properties.forEach((item: any) => {
                            cs.propList.push(item.key.name)
                        })
                    }
                }
            });
        }
        ComponentSource.initChildrenAst(resolveComponentPath, cs.children)
    })
  }

  /**
   * 初始化森林方法
   * @param type 
   * @param children 
   */
  public static initForest(type: string, children: Array<ComponentSource>) {
    // 递归终止条件
    if (!children || children.length === 0) return
    // 初始化每个节点对象
    for (let i = 0; i < children.length; i++) {
        const cs = csFactory.generate(type, children[i])
        children[i] = cs
        ComponentSource.initForest(cs.type, cs.children)
    }
  }
  
}

export default ComponentSourseFactory

class AstStrategy {}
