/**
 * 只用于代码编译，并返回编译后
 */
import { transform } from "@babel/standalone";
import { File, Files } from "../../PlaygroundContext";
import { ENTRY_FILE_NAME } from "../../files";
import { PluginObj } from "@babel/core";
// 在编译文件之前，先引入react
const beforeTransfromCode = (code:string,filename:string)=>{
  let _code = code
  const regexReact = /import\s+React/g
  if((filename.endsWith('.tsx')||filename.endsWith('.jsx'))&&!regexReact.test(code)){
    _code = `import React from 'react';\n${code}`
  }
  return _code
}
export const babelTransform = (
  code: string,
  filename: string,
  files: Files
) => {
  const _code = beforeTransfromCode(code,filename)
  let result = "";

  try {
    result = transform(_code, {
      presets: ["typescript", "react"], //对tsx,jsx语法做处理
      filename,
      plugins: [customResolver(files)], //处理引入文件的编译，使用blob url代替imoport里的文件
      retainLines: true, //retainLines 是编译后保持原有行列号不变
    }).code!;
  } catch (error) {
    console.log("编译出错", error);
  }
  return result;
};
const getModuleFile = (files: Files, modulePath: string) => {
  let moduleName = modulePath.split("./").pop() || "";
  // 处理 ./App这种情况的路径，需要找到对应的App.tsx
  if (!moduleName.startsWith(".")) {
    // 找到某文件代码中要映入文件的地址
    const realModuleName = Object.keys(files)
      .filter((key) => {
        return (
          key.endsWith(".tsx") ||
          key.endsWith(".ts") ||
          key.endsWith(".jsx") ||
          key.endsWith(".js")
        );
      }).find((key) => {
        return key.split(".").includes(moduleName);
      });
    if (realModuleName) {
      moduleName = realModuleName;
    }
  }
  return files[moduleName];
};
const json2Js = (file:File)=>{
  const js = `export default ${file.value}`
  return URL.createObjectURL(new Blob([js],{
    type:'application/javascript'
  }))
}
const css2Js = (file:File)=>{
  const randomId = new Date().getTime()
  const js = `
  (()=>{
    const stylesheet = document.createElement('style')
    stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
    document.head.appendChild(stylesheet)

    const styles = document.createTextNode(\`${file.value}\`)
    stylesheet.innerHTML = ''
    stylesheet.appendChild(styles)
  })()
  `

  return URL.createObjectURL(new Blob([js],{
    type:'application/javascript'
  }))
}
function customResolver(files: Files): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value;
        if (modulePath.startsWith(".")) {
          // 找到对应的文件
          const file = getModuleFile(files, modulePath);
          if(!file) return
          if (file.name.endsWith(".css")) {
            path.node.source.value = css2Js(file)
          } else if (file.name.endsWith(".json")) {
            path.node.source.value = json2Js(file)
          } else {
            // 将转换为blob url引入
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(file.value, file.name, files)], {
                type: "application/javascript",
              })
            );
          }
        }
      },
    },
  };
}
export const compile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME];
  return babelTransform(main.value, ENTRY_FILE_NAME, files);
};
