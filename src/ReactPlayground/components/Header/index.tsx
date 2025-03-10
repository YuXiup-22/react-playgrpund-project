import { useContext } from "react";
import logoImg from "../../../assets/react.svg";
import styles from "./index.module.scss";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { PlaygroundContext } from "../../PlaygroundContext";
export default function Header() {
  const { theme, setTheme } = useContext(PlaygroundContext);
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
      </div>
    </div>
  );
}
