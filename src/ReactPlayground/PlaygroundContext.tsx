import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { fileName2Language,compress,uncompress } from "./utils";
import { initFiles } from "./files";
// 多个文件数据，editor、preiview组件都需要拿到数据，所以使用context
export interface File {
  name: string;
  language: string;
  value: string;
}
export interface Files {
  [key: string]: File;
}
type Theme = 'dark'|'light'
export interface PlaygroundContext {
  files: Files;
  theme:Theme;
  setTheme:(theme:Theme)=>void
  selectedFileName: string;
  setSelectFileName: (fileName: string) => void;
  setFiles: (files: Files) => void;
  addFile: (name: string) => void;
  removeFile: (file: File) => void;
  updateFileName: (oldFileName: string, newFileName: string) => void;
}

export const PlaygroundContext = createContext<PlaygroundContext>({
  selectedFileName: "App.tsx",
} as PlaygroundContext);
const getFilesFromUrl = ()=>{
  let files:Files|undefined
  try {
    const hash =uncompress(window.location.hash.slice(1))
    files = JSON.parse(hash)
  } catch (error) {
    console.log(error)
  }
  return files
}
// 提供一个PlaygroundProvider组件，使得数据能在多个组件中共享
export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [files, setFiles] = useState<Files>(getFilesFromUrl()||initFiles);
  const [selectedFileName, setSelectFileName] = useState("App.tsx");
  const [theme,setTheme]  = useState('light')
  const addFile = (name: string) => {
    files[name] = {
      name,
      value: "",
      language: fileName2Language(name),
    };
    setFiles({ ...files });
  };
  const removeFile = (file: File) => {
    delete files[file.name];
    setFiles({ ...files });
  };
  const updateFileName = (oldFileName: string, newFileName: string) => {
    if (
      !files[oldFileName] ||
      newFileName === undefined ||
      newFileName === null
    )
      return;
    const { [oldFileName]: value, ...rest } = files;
    const newFile = {
      [newFileName]: {
        ...value,
        name: newFileName,
        language: fileName2Language(newFileName),
      },
    };
    setFiles({
      ...rest,
      ...newFile,
    });
  };
  useEffect(()=>{
    const hash = compress(JSON.stringify(files))
    // 把url里不支持的字符做转换
    window.location.hash = hash
  },[files])
  return (
    <PlaygroundContext.Provider
      value={{
        files,
        selectedFileName,
        setFiles,
        addFile,
        updateFileName,
        removeFile,
        setSelectFileName,
        theme,
        setTheme
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};
