import { useEffect, useState } from "react";
import classNames from "classnames";
import * as styles from "./Titlebar.css";
import { LucideMinimize2, LucideMaximize2, X, LucideMinus } from "lucide-react";

interface TitlebarProps {
  title: string;
}

export function Titlebar({title}: TitlebarProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    // 초기 최대화 상태 가져오기
    window.windowEvent.isMaximized().then(setIsMaximized);

    // 최대화 상태 변경 이벤트 리스너 등록
    window.windowEvent.onMaximizeChanged((maximized) => {
      setIsMaximized(maximized);
    });
  }, []);

  const handleClickToggleMaximize = async () => {
    const maximized = await window.windowEvent.toggleMaximize();
    setIsMaximized(maximized);
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
          <LucideMinus className={styles.titlebarIcon} />
        </button>
        <button
          className={classNames(
            styles.titlebarIconLayout,
            styles.titlebarIconHovered,
            "no-drag"
          )}
          onClick={handleClickToggleMaximize}
        >
          {
            isMaximized ?
            <LucideMinimize2 className={styles.titlebarIcon} /> 
            : <LucideMaximize2 className={styles.titlebarIcon} />
            }
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
