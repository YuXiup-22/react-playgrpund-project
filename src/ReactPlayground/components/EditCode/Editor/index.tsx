import MonacoEditor, { EditorProps, OnMount } from "@monaco-editor/react";
import { createATA } from "./ata";
import { editor } from "monaco-editor";
interface EditorFile {
  name: string;
  language: string;
  value: string;
}
interface Props {
  file: EditorFile;
  options?: editor.IStandaloneEditorConstructionOptions;
  onChange?: EditorProps["onChange"];
}
export default function Editor(props: Props) {
  const { file, options, onChange } = props;
  const handleEditorMount: OnMount = (editor, monaco) => {
    console.log(editor, monaco, editor.getValue());
    // 添加默认快捷键
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      // 这里设置 jsx 为 preserve，也就是输入 <div> 输出 <div>,保留原样，如果时React则输入React.createHtmlElement('div')
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    });
    // 把下载文件的回调函数先传进去，当下载后就执行，拿到后添加到ts的默认提示库里面
    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      );
    });
    // 聂荣改变后再获取一次类型
    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });
    // 最开始获取一次类型
    ata(editor.getValue());
  };
  return (
    <MonacoEditor
      height="100%"
      defaultLanguage={file.language}
      value={file.value}
      onMount={handleEditorMount}
      onChange={onChange}
      path={file.name}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
    ></MonacoEditor>
  );
}
