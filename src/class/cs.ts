export interface Prop {
  name: string;
  value: string;
}

export interface CsProps {
  name: string;
  className: string;
  useDefaultProp?: boolean;
  propList: Array<string | Prop>;
  children?: Array<ComponentSource>;
  content?: string;
}

class ComponentSourseFactory {
  generate(type: string, props: CsProps) {
    switch (type) {
      default:
        return new ComponentSource(props);
    }
  }
}


export class ComponentSource {
  name: string;
  className: string;
  useDefaultProp: boolean
  propList: Array<string | Prop>;
  children: Array<ComponentSource>;
  ast: any;
  type: string;
  content: string;
  childCode: string = "|";
  private _astOperate: AstStrategy; // 此处应有默认策略

  constructor(props: CsProps) {
    this.name = props.name;
    this.className = props.className
    this.useDefaultProp = props.useDefaultProp === undefined ? true : props.useDefaultProp
    this.propList = props.propList;
    this.children = props.children;
    this.content = props.content;
  }

  set astOperate(astOperate: AstStrategy) {
    this._astOperate = astOperate;
  }

}

export default ComponentSourseFactory;

class AstStrategy {}
