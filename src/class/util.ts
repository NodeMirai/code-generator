const fs = require("fs");
import * as babel from "@babel/core";
import { pageModal } from "../../config/index";
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
  getPostfix(pageModal: string) {
    switch (pageModal) {
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

export { 
    AstUtilBase, 
    FsUtil,
    ConstantUtil, 
};
