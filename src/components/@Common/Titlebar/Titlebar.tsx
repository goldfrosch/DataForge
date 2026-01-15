import classNames from "classnames";
import * as styles from "./Titlebar.css";
import { LucideMaximize, LucideUnderline, X } from "lucide-react";

export function TitleBar() {
  const handleClickToggleMaximize = () => {
    window.windowEvent.toggleMaximize();
  };

  const handleClickMinimalize = () => {
    window.windowEvent.minimize();
  };

  const handleClickExit = () => {
    window.windowEvent.close();
  };

  return (
    <div className={classNames(styles.titlebarLayout, "titlebar")}>
      <div>right</div>
      <div className={styles.titlebarContentLayout}>
        <button
          className={classNames(
            styles.titlebarIconLayout,
            styles.titlebarIconHovered,
            "no-drag"
          )}
          onClick={handleClickMinimalize}
        >
          <LucideUnderline className={styles.titlebarIcon} />
        </button>
        <button
          className={classNames(
            styles.titlebarIconLayout,
            styles.titlebarIconHovered,
            "no-drag"
          )}
          onClick={handleClickToggleMaximize}
        >
          <LucideMaximize className={styles.titlebarIcon} />
        </button>
        <button
          className={classNames(
            styles.titlebarIconLayout,
            styles.titlebarExitIconHovered,
            "no-drag"
          )}
          onClick={handleClickExit}
        >
          <X className={styles.titlebarIcon} />
        </button>
      </div>
    </div>
  );
}
