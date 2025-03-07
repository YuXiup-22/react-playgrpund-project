import { Files } from "./PlaygroundContext";
import { fileName2Language } from "./utils";
import main from "./template/main.tsx?raw";
import App from "./template/App.tsx?raw";
import AppCss from "./template/App.css?raw";
import importMap from "./template/import-map.json?raw";
// app 文件名
export const APP_COMPONENT_FILE_NAME = "App.tsx";

// esm模塊映射文件名
export const IMPORT_MAP_FILE_NAME = "import-map.json";

// app入口文件名
export const ENTRY_FILE_NAME = "main.tsx";

export const initFiles: Files = {
  [ENTRY_FILE_NAME]: {
    name: ENTRY_FILE_NAME,
    language: fileName2Language(ENTRY_FILE_NAME),
    value: main,
  },
  [APP_COMPONENT_FILE_NAME]: {
    name: APP_COMPONENT_FILE_NAME,
    language: fileName2Language(APP_COMPONENT_FILE_NAME),
    value: App,
  },
  "App.css": {
    name: "App.css",
    language: "css",
    value: AppCss,
  },
  [IMPORT_MAP_FILE_NAME]: {
    name: IMPORT_MAP_FILE_NAME,
    language: fileName2Language(IMPORT_MAP_FILE_NAME),
    value: importMap,
  },
  'app2.css':{
    name:'app2.css',
    language:'css',
    value:AppCss
  },
  'app3.css':{
    name:'app3.css',
    language:'css',
    value:AppCss
  },
  'app4.css':{
    name:'app4.css',
    language:'css',
    value:AppCss
  },
  'app5.css':{
    name:'app5.css',
    language:'css',
    value:AppCss
  },
};
