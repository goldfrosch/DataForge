import classNames from "classnames";
import type { HTMLAttributes } from "react";
import * as styles from "./Chip.css";

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  type: "unreal";
}

export function Chip({ type, children, className, ...props }: ChipProps) {
  return (
    <span {...props} className={classNames(styles.chipStyle[type], className)}>
      {children}
    </span>
  );
}
