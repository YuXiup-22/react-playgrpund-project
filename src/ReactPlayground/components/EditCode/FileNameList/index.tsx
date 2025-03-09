import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../PlaygroundContext";
import { FileNameItem } from "./FileNameItem";
import style from "./FileNameItem/index.module.scss";
import { APP_COMPONENT_FILE_NAME, ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME } from "../../../files";
export default function FileNameList() {
  const {
    files,
    removeFile,
    updateFileName,
    addFile,
    selectedFileName,
    setSelectFileName,
  } = useContext(PlaygroundContext);
  const [tabs, setTabs] = useState([""]);
  const handleEditComplete = (val:string,preVal:string)=>{
    updateFileName(preVal,val)
    setSelectFileName(val)
    setCreating(false)
  }
  const [creating,setCreating] = useState(false)
  const addTab = ()=>{
    addFile('Comp'+Math.random().toString().slice(2,8)+'.tsx')
    setCreating(true)

  }
  const handleRemove = (val:string)=>{
    removeFile(files[val])
    setSelectFileName(ENTRY_FILE_NAME)
  }
  const readonlyFileNames = [ENTRY_FILE_NAME,IMPORT_MAP_FILE_NAME,APP_COMPONENT_FILE_NAME]
  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);
  return (
    <div className={style.tabs}>
      {tabs.map((item, index,arr) => (
        <FileNameItem
          value={item}
          key={item + index}
          readonly={readonlyFileNames.includes(item)}
          creating={creating&&index === arr.length-1}
          actived={item === selectedFileName}
          onClick={() => setSelectFileName(item)}
          onEditComplete={(name)=>handleEditComplete(name,item)}
          onRemove={(e)=>{
            // 防止事件冒泡
            e.stopPropagation()
            handleRemove(item)
          }}
        ></FileNameItem>
      ))}
      <div className={style['tabs-add']} onClick={addTab}>+</div>
    </div>
  );
}
