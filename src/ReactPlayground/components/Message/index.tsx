import { FC, useEffect, useState } from "react";
import style from "./index.module.scss";
import classNames from "classnames";
interface MessageProps {
  type: "error" | "warn";
  content: string;
}

export const Message: FC<MessageProps> = (props) => {
  const { type, content } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if(content){
        setVisible(true);
    }
  }, [content]);
  return visible ? (
    <div className={classNames(style.msg, style[type])}>
      <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
      <button className={style.dismiss} onClick={() => setVisible(false)}>
        X
      </button>
    </div>
  ) : null;
};
