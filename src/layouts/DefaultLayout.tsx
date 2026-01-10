import type { PropsWithChildren } from "react";
import * as styles from "./DefaultLayout.css";

interface DefaultLayoutProps extends PropsWithChildren {}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return <div className={styles.DefaultLayout}>{children}</div>;
}
