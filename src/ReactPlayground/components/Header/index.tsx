import { useContext } from "react";
import logoImg from "../../../assets/react.svg";
import styles from "./index.module.scss";
import { MoonOutlined, SunOutlined,ShareAltOutlined,DownloadOutlined } from "@ant-design/icons";
import { PlaygroundContext } from "../../PlaygroundContext";
import copy from "copy-to-clipboard";
import { message } from "antd";
import { downloadFiles } from "../../utils";
export default function Header() {
  const { theme, setTheme,files } = useContext(PlaygroundContext);
  const handleShareLink = ()=>{
    copy(window.location.href)
    message.success('分享链接已复制')
  }
  const handleDownload =async ()=>{
    await downloadFiles(files)
    message.success('下载完成')
  }
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img alt="logo" src={logoImg}></img>
        <span>React Playground</span>
      </div>
      <div>
        {theme === "light" && (
          <SunOutlined
            title="切换暗色主题"
            className={styles.theme}
            onClick={() => setTheme("dark")}
          ></SunOutlined>
        )}
        {theme === "dark" && (
          <MoonOutlined
            title="切换亮色主题"
            className={styles.theme}
            onClick={() => setTheme("light")}
          ></MoonOutlined>
        )}
        {
          <ShareAltOutlined
          style={{marginLeft:'10px'}}
            title="分享链接"
            onClick={handleShareLink}
          ></ShareAltOutlined>
        }
        <DownloadOutlined
          style={{marginLeft:'10px'}}
          title="下载文件"
          onClick={handleDownload}
        ></DownloadOutlined>
      </div>
    </div>
  );
}
