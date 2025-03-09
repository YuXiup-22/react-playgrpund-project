import classNames from "classnames";
import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
export interface FileNameProps {
  value: string;
  actived: boolean;
  creating: boolean;
  readonly: boolean;
  onClick: () => void;
  onEditComplete: (name: string) => void;
  onRemove: MouseEventHandler;
}

export const FileNameItem: FC<FileNameProps> = (props) => {
  const {
    value,
    actived,
    readonly,
    onClick,
    onEditComplete,
    creating,
    onRemove,
  } = props;
  const [name, setName] = useState(value);
  const [editing, setEditing] = useState(creating);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDoubleClick = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };
  const handleInputBlur = () => {
    setEditing(false);
    // 修改files中的name
    onEditComplete(name);
  };

  useEffect(() => {
    if (creating) {
      inputRef.current?.focus();
    }
  }, [creating]);
  return (
    <div
      className={classNames(
        styles["tab-item"],
        actived ? styles.actived : null
      )}
      onClick={onClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          className={styles["tab-item-input"]}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleInputBlur}
        ></input>
      ) : (
        <>
          <span onDoubleClick={readonly?()=>{}:handleDoubleClick}>{name}</span>
          {!readonly ? (
            <span style={{ marginLeft: 5, display: "flex" }} onClick={onRemove}>
              <svg width="12" height="12" viewBox="0 0 24 24">
                <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </span>
          ) : null}
        </>
      )}
    </div>
  );
};
