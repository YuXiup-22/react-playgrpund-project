import { useContext } from "react";
import Editor from "./Editor";
import FileNameList from "./FileNameList";
import { PlaygroundContext } from "../../PlaygroundContext";
// 防抖函數，在editor編輯器中只有組後一次執行結束后才更新onChange
function debounce(func,delay) {
    let timer 
    return function (...args) {
      clearTimeout(timer)
      timer = setTimeout(()=>{
        func(...args)
      },delay)
    }
}
export default function EditCode() {
  //   const file = {
  //     name: "yuxi.tsx",
  //     value: `export default function App(){
  //     return <div>ss</div>
  // }`,
  //     language: "typescript",
  //   };
  const { files, selectedFileName, setFiles,theme } = useContext(PlaygroundContext);
  const file = files[selectedFileName];
  const onEditorChange = (value?: string) => {
    console.log(value, "change");
    files[file.name].value = value!
    setFiles({...files})
  };
  return (
    <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
      <FileNameList></FileNameList>
      <Editor file={file} onChange={debounce(onEditorChange,500)} options={{
        theme:`vs-${theme}`
      }}></Editor>
    </div>
  );
}
