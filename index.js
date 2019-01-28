/**
 * 根据配置文件生成代码
 * 1. 获取配置项
 * 2. 根据配置项找到component和目标模板
 * 3. 分析component，产出ast节点
 * 4. 分析目标模板，将component产出节点插入
 */
const innerConfig = require('./config/inner')
const config = require('./config')
const { generatorAstFromConfig, output } = require('./src/resolve')

const { filename } = config
const { outPath } = innerConfig

const ast = generatorAstFromConfig(innerConfig, config)

output(ast, `${outPath}/${filename}`)