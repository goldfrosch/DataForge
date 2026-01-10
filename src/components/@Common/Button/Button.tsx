import type { ButtonHTMLAttributes } from "react";
import * as styles from "./Button.css";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary";
  size: "m";
}

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        styles.buttonStyle[variant],
        styles.buttonSize[size],
        className
      )}
    >
      {children}
    </button>
  );
}
