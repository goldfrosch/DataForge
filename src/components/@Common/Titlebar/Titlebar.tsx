import classNames from "classnames";
import * as styles from "./Titlebar.css";
import { X } from "lucide-react";

export function TitleBar() {
  const handleClickExit = () => {
    console.log("hi");
    window.windowEvent.close();
  };

  return (
    <div className={classNames(styles.titlebarLayout, "titlebar")}>
      <div>right</div>
      <button
        className={classNames(styles.titlebarIconLayout, "no-drag")}
        onClick={handleClickExit}
      >
        <X className={styles.titlebarIcon} />
      </button>
    </div>
  );
}
