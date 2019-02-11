export interface Prop {
  name: string;
  value: string;
}

interface CsProps {
  name: string;
  propList: Array<string | Prop>;
  children: Array<ComponentSource>;
}

export class ComponentSource {
  name: string;
  propList: Array<string | Prop>;
  children: Array<ComponentSource>;
  ast: any;
  private _astOperate: AstStrategy;  // 此处应有默认策略

  constructor(props: CsProps) {
    this.name = props.name;
    this.propList = props.propList;
    this.children = props.children;
  }

  set astOperate(astOperate: AstStrategy) {
    this._astOperate = astOperate;
  }

}

class ComponentSourseFactory {
  generate(type: string, props: CsProps) {
    switch(type) {
      default:
      return new ComponentSource(props);
    }
  }
}

export default ComponentSourseFactory

class AstStrategy {}
