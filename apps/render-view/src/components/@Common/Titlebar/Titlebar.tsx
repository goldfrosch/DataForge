import classNames from "classnames";
import * as styles from "./Titlebar.css";
import { LucideMaximize, LucideUnderline, X } from "lucide-react";

interface TitlebarProps {
  title: string;
}

export function Titlebar({title}: TitlebarProps) {
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
      <div className={styles.titlebarRightLayout}>
        <div className={styles.titlebarThumbnailLayout} />
      </div>
      <div className={styles.titlebarCenterLayout}>{title}</div>
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
