# CodeGenerator
为页面modal拼接各原子组件，生成新的页面代码

## feature
1. 批量生成页面  
2. 组件children递归插入组件  
3. 组件找不到时自动引入原生组件(原生组件路径需要配置)   
- 如果原生组件引入路径未配置则不生成引入语句
4. props数组支持两种数据类型       
- 字符串时表示从props中直接获取
- object时通过{ name, value }形式直接拼入代码(value暂时仅支持string) 
5. 组件的递归生成：获取组件位置时如果无组件，则尝试生成该组件，组件生成位置为component目录
6. ComponentSource类中添加content属性用于添加文本
7. 代码生成进度log所需记录部分: npm install -D chalk | yarn add --dev chalk
- 读取xx模版ast
- 初始化xx森林
- 每个xx节点生成ast
- import引入xxx
- render中xxx属性生成
- render中xxx模板生成
8. 通过为组件名前缀添加$来区分是否为原生组件   
9. **生成的页面可以实时预览**
- 必须先通过npm run gc根据modal配置生成页面(预览形式下需要使用单独的modal页，且有挂载功能)
- webpack-dev-server提供访问页面服务，且必须无缓存(webpack已实现)

## todo
1. 格式问题 
- 换行问题如何解决 
- 如何去除生成代码的尾部冒号
- jsx生成时行末存在冒号问题
3. 异常处理
- 文件是否存在
- 组件名称首字母转大写
- 数组长度
- 对象false等
9. 第三方组件库导入
10. 内部组件库定义支持 import {  } from ''形式，避免多行引入


## node项目下使用ts代码重构
1. 创建tsconfig.json，模版如下
```
{
  "compilerOptions": {
      "module": "commonJs",
      "noImplicitAny": true,
      "removeComments": true,
      "preserveConstEnums": true,
      // "outFile": "../../built/local/tsc.js",
      "sourceMap": true,
      "allowJs": true,
      "types": ["node"]   // 依赖@types/node
  },
  "include": [
      "src/**/*"
  ],
  "exclude": [
      "node_modules",
      "**/*.spec.ts"
  ]
}
```
2. 添加node项目下的类型包, 防止require等node环境下的内容无法使用
- yarn add @types/node | npm i @types/node
3. 划分类与接口
4. ts下modules使用方式与es6和commonjs不同

## vscode调试ts下的node项目
1. yarn add --dev typescript ts-node | npm i -D typescript ts-node
2. launch.json中添加如下配置
```
{
    "name": "Current TS File",
    "type": "node",
    "request": "launch",
    "program": "${workspaceRoot}/node_modules/ts-node/dist/bin.js",
    "args": [
    "${relativeFile}"
    ],
    "cwd": "${workspaceRoot}",
    "protocol": "inspector"
}
```

## issue
1. 通过join方法将数组字符串变为数组时，parser解析出现问题
- SyntaxError: unknown: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>? (1:8)
2. 如何覆盖第三方.d.ts
- interface: 利用接口属性合并特性https://stackoverflow.com/questions/47785102/extend-typedefinition-of-a-classes-object?r=SearchResults
3. CommonJs AMD CMD ts中的模块系统
4. promise与setTimeout先后顺序问题
5. babel各插件与env的作用
6. ts下如何避免过多any使用
7. webpack中各devtool代表的意义

## 优化
1. 构造参数过多时如何处理更方便
2. ts参数类型的重复声明问题: 声明为any后可防止属性exist问题