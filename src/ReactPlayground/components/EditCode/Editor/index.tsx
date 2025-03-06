import MonacoEditor, { OnMount } from "@monaco-editor/react";

export default function Editor() {
  const code = `export default function App(){
    return <div>ss</div>
}`;
const handleEditorMount:OnMount = (editor,monaco)=>{
  console.log(editor,monaco)
  // 添加默认快捷键
  editor.addCommand(monaco.KeyMod.CtrlCmd|monaco.KeyCode.KeyJ,()=>{
    editor.getAction('editor.action.formatDocument')?.run()
  })
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    // 这里设置 jsx 为 preserve，也就是输入 <div> 输出 <div>,保留原样，如果时React则输入React.createHtmlElement('div')
    jsx:monaco.languages.typescript.JsxEmit.Preserve,
    esModuleInterop:true
  })
}
  return (
    <MonacoEditor
      height="100%"
      defaultLanguage="typescript"
      defaultValue={code}
      onMount={handleEditorMount}
      path={'tyx.tsx'}
      options={
        {
          fontSize:14,
          scrollBeyondLastLine:false,
          minimap:{
            enabled:false
          },
          scrollbar:{
            verticalScrollbarSize:6,
            horizontalScrollbarSize:6
          }
        }
      }
    ></MonacoEditor>
  );
}
