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
10. 对h5与taro两种情况下各输出变量的变化进行封装
- taro：输出文件必须以js为后缀，且js文件名与文件夹名一致
11. 各文件名的统一管理
- 组件文件名  -> initChildrenAst中
- 代码中import 标签 导出一致 
12. **如果propList属性名以on开头则视为事件，将该事件代码自动声明在组件中**

## todo
4. 第三方组件库导入
5. 内部组件库定义支持 import {  } from ''形式，避免多行引入
6. **缺少eslint代码规范**
7. **公共逻辑缺少单元测试与集成测试，需要最终生成代码测试覆盖率报告**
8. 生成的组件放到对应文件夹中
9. 生成的页面代码放入文件夹中，文件夹中加入style.scss样式
10. 异步流程promise封装
11. **使用eslint或者editorconfig等工具直接格式化ast代码**

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
8. yarn.lock与package-lock的作用
9. sass在webpack中loader的顺序为  
{ loader: 'style-loader', options: { sourceMap: true } }  
{ loader: 'css-loader', options: { sourceMap: true } }  
{ loader: 'postcss-loader', options: { sourceMap: true } }
{ loader: 'sass-loader', options: { sourceMap: true } }
10. JSON.stringify(path)由于path对象中存在pathPath，循环引用会报错

## 优化
1. 构造参数过多时如何处理更方便
2. ts参数类型的重复声明问题: 声明为any后可防止属性exist问题

## 开发流程
1. 划分页面自组件
2. 针对子组件分别开发,将开发完成的组件放入components中, 补全defaultProps
3. 全部组件开发完毕后

## bug list
1. **filename与cs的name相同时，生成代码会出现变量名重复的问题 close**
3. **children中name相同时重复引入组件代码重复  close**
7. **组件与模板读取、webpack配置和输出时需要兼容js与jsx两种后缀：暂时仅使用js后缀   close**
8. **cs名称使用中线分割时，生成的import与模板jsx部分以及导出部分需要处理name名称    close**  
   例如'image-swiper' -> 'ImageSwiper'


2. webpack多文件打包时，如果其中一个文件抛出异常需要如何处理
4. initChildrenAst方法捕获异常处理存在问题，仅保证了defaultProps无法获取，而没有终止该cs的其他逻辑，应该把对应cs生成后清除
5. ast遍历时获取节点结构流程硬编码，导致model内结构变化时报错
6. webpack启动server，url 'appoint/'与'appoint'行为不一致