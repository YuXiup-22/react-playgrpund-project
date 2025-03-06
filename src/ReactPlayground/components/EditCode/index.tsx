import Editor from "./Editor";
import FileNameList from "./FileNameList";
export default function EditCode() {
  
  return <div style={{display:'flex',height:'100%',flexDirection:'column'}}>
    <FileNameList></FileNameList>
    <Editor></Editor>
  </div>
}