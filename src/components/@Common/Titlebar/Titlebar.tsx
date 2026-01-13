import classNames from "classnames";
import * as styles from "./Titlebar.css";
import { LucideUnderline, X } from "lucide-react";

export function TitleBar() {
  const handleClickMinimalize = () => {
    console.log("hi");
    window.windowEvent.minimize();
  };

  const handleClickExit = () => {
    console.log("hi");
    window.windowEvent.close();
  };

  return (
    <div className={classNames(styles.titlebarLayout, "titlebar")}>
      <div>right</div>
      <div className={styles.titlebarContentLayout}>
        <button
          className={classNames(styles.titlebarIconLayout, "no-drag")}
          onClick={handleClickMinimalize}
        >
          <LucideUnderline className={styles.titlebarIcon} />
        </button>
        <button
          className={classNames(styles.titlebarIconLayout, "no-drag")}
          onClick={handleClickExit}
        >
          <X className={styles.titlebarIcon} />
        </button>
      </div>
    </div>
  );
}
