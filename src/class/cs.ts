interface Prop {
  name: string;
  value: string;
}

class ComponentSource {
  name: string;
  propList: Array<string | Prop>;
  children: Array<string | ComponentSource>;
  private _astOperate: AstStrategy;  // 此处应有默认策略

  constructor(props) {
    const { name, propList, children } = props;
    this.name = name;
    this.propList = propList;
    this.children = children;
  }

  set astOperate(astOperate: AstStrategy) {
    this._astOperate = astOperate;
  }

}

class ComponentSourseFactory {
  generate(type, props) {
    switch(type) {
      default:
      return new ComponentSource(props);
    }
  }
}

export default ComponentSourseFactory

class AstStrategy {}
