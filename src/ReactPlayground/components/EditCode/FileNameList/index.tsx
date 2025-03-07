import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../PlaygroundContext";
import { FileNameItem } from "./FileNameItem";
import style from "./FileNameItem/index.module.scss";
export default function FileNameList() {
  const {
    files,
    removeFile,
    updateFileName,
    addFile,
    selectedFileName,
    setSelectFileName
  } = useContext(PlaygroundContext)
  const [tabs,setTabs] = useState([''])
  useEffect(()=>{
    setTabs(Object.keys(files))
  },[files])
  return <div className={style.tabs}>
    {
      tabs.map((item,index)=>(
        
        <FileNameItem value={item} key={item+index} actived={item===selectedFileName} onClick={()=>setSelectFileName(item)}></FileNameItem>
      ))
    }
  </div>
}