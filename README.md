# AstGenerator
辅助CodeGenerator实现Ast节点生成操作

## todo
1. 格式问题
- 换行问题如何解决 
- 如何去除生成代码的尾部冒号
- jsx生成时行末存在冒号问题
2. 生成组件中存在children时的处理
3. 异常处理
- 文件是否存在
- 组件名称首字母转大写
- 数组长度
- 对象false等
4. 批量生成页面  p1
5. 组件children递归插入组件  p1
6. 组件找不到时自动引入原生组件(原生组件路径需要配置)               done
- 通过为组件名前缀添加$来区分是否为原生组件
7. 为组件属性添加配置项，对属性为事件的情况提前声明方法
8. 代码生成进度log
9. 第三方组件库导入

## 代码重构 p1
1. 配置分离 done
- 内部配置：组件库位置
- 外部配置：需要组件与产出页面
2. 常量分离
- 代码片段：import const children
3. 主流程分离 done
- 配置读取
- 配置解析
- 输出
4. 工具分离
- 编译方法

##issue
1. 通过join方法将数组字符串变为数组时，parser解析出现问题
- SyntaxError: unknown: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>? (1:8)