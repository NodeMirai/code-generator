/**
 * 根据配置文件生成代码
 * 1. 获取配置项
 * 2. 根据配置项找到component和目标模板
 * 3. 分析component，产出ast节点
 * 4. 分析目标模板，将component产出节点插入
 */
import innerConfig from './config/path';
import config from './config';
import { PageSource } from './src/class/ps';

const { outPath } = innerConfig

const astList = []
const ps = new PageSource()

for (let i = 0; i < config.length; i++) {
  astList.push(ps.generatorAstFromConfig(innerConfig, config[i]))
}

for (let i = 0; i < astList.length; i++) {
  const { ast, filename } = astList[i]
  ps.output(ast, `${outPath}/${filename}`)
}