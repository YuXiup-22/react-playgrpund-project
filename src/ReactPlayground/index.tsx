import { Allotment } from "allotment";
import "allotment/dist/style.css"
import Header from "./components/Header";
import Preview   from "./components/Preview";
import EditCode from "./components/EditCode";
import { useContext } from "react";
import { PlaygroundContext } from "./PlaygroundContext";
import './index.scss'
export default function ReactPlayground() {
  const { theme,setTheme } = useContext(PlaygroundContext)
  return <div className={theme} style={{height:'100vh',display:'flex',flexDirection:'column'}}>
    <Header></Header>
    <Allotment defaultSizes={[100,100]}>
      <Allotment.Pane minSize={0}>
          <EditCode></EditCode>
      </Allotment.Pane>
      <Allotment.Pane minSize={0}>
          <Preview></Preview>
      </Allotment.Pane>
    </Allotment>
  </div>
}