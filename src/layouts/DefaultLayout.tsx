import type { PropsWithChildren } from "react";
import * as styles from "./DefaultLayout.css";
import { TitleBar } from "@/components/@Common";

interface DefaultLayoutProps extends PropsWithChildren {}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className={styles.DefaultLayout}>
      <TitleBar />
      {children}
    </div>
  );
}
