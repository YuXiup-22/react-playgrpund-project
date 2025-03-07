import classNames from "classnames";
import { FC, useState } from "react";
import styles from "./index.module.scss";
export interface FileNameProps {
  value: string;
  actived: boolean;
  onClick: () => void;
}

export const FileNameItem: FC<FileNameProps> = (props) => {
  const { value, actived, onClick } = props;
  const [name, setName] = useState(value);

  return (
    <div
      className={classNames(
        styles["tab-item"],
        actived ? styles.actived : null
      )}
      onClick={onClick}
    >
      <span>{name}</span>
    </div>
  );
};
