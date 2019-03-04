const fs = require("fs");
import * as babel from "@babel/core";
import { pageModel } from "../../config/index";
import { ErrorType, Postfix } from "./constant";

class AstUtilBase {
  generatorAst(src: string) {
    let sourceCode = "";
    try {
      sourceCode = fs.readFileSync(src);
    } catch (e) {
      throw new Error(ErrorType.FileNotFound);
    }
    // 获取目标模板
    return this.parser(sourceCode);
  }

  parser(sourceCode: string): any {
    const ast = babel.parse(sourceCode, {
      parserOpts: {
        sourceType: "module",
        plugins: ["classProperties", "jsx"]
      }
    });
    return ast;
  }

  getAstByCode(sourceCode: string): any {
    return this.parser(sourceCode).program.body[0];
  }
}

class ConstantUtil {
  getPostfix(pageModel: string) {
    switch (pageModel) {
      case "-r":
        return Postfix.JSX;
      case "-p":
        return Postfix.JSX;
      case "-t":
        return Postfix.JS;
    }
  }
}

class FsUtil {
  copy(from: string, to: string) {
    fs.readFile(from, "utf-8", (err: Error, data: string) => {
      if (err) throw err;
      fs.writeFile(to, data, (err: Error) => {
        if (err) throw err;
      });
    });
  }
}

class StrUtil {

  /**
   * '-'分割改为首字母大写
   * @param str 
   */
  convertCamel(str: string) {
    return str
      .split('-')
      .map((item: string) => item[0].toUpperCase() + item.slice(1))
      .join('')
  }

  /**
   * 判断字符串是否为方法命名
   * 判断依据：onXXX
   */
  isMethodAttr(str: string) {
    if (!str || str.length < 3) return false
    if (str.slice(0,2) !== 'on') return false
    const char2 = str.charAt(2)
    if ( char2 < 'A' || char2 > 'Z' ) return false
    return true
  }
}

export { 
    AstUtilBase, 
    FsUtil,
    ConstantUtil, 
    StrUtil,
};
