/**
 *
 * preview组件内部，分为编译部分和结果展示部分
 * 1.先通过babel_standalone 在浏览器中编译为可运行的浏览器代码
 * 将编译后的结果显示出来通过editor
 *    1-1.
 * 2.再者将编译后的结果拿到后，创建新的html页面，使用iframe预览结果
 *
 *
 *
 */
import { useContext, useEffect, useState } from "react";
import Editor from "../EditCode/Editor";
import { PlaygroundContext } from "../../PlaygroundContext";
import { compile } from "./compiler";
import iframeRaw from "./iframeRaw.html?raw";
import { IMPORT_MAP_FILE_NAME } from "../../files";
export default function Preview() {
  const { files } = useContext(PlaygroundContext);
  console.log(files,'files更新')
  const [compilerCode, setCompilerCode] = useState("");
  const [iframeUrl, setIframeUrl] = useState('');
  useEffect(() => {
    const res = compile(files);
    console.log(res,'files更新,编译后的结果')
    setCompilerCode(res);
  }, [files]);
  // 为什么files文件变化监听可以如此深层次，

  const getIframUrl = () => {
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
      )
      .replace(
        '<script type="module" id="appsrc"></script>',
        `
        <script type="module" id="appsrc">${compilerCode}</script>
        `
      );
    return URL.createObjectURL(
      new Blob([res], {
        type: "text/html",
      })
    );
  };

  useEffect(() => {
    setIframeUrl(getIframUrl());
  }, [files[IMPORT_MAP_FILE_NAME], compilerCode]);
  return (
    <div style={{ height: "100%" }}>
      <iframe
        src={iframeUrl}
        style={{
          width: "100%",
          height: "100%",
          padding: 0,
          border: "none",
        }}
      ></iframe>
    </div>
  //   <Editor
  // file={{
  //   name:'dist.js',
  //   language:'javascript',
  //   value:compilerCode
  // }}
  // ></Editor>
  );
  
}
