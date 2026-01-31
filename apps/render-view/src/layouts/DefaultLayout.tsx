import type { PropsWithChildren } from "react";
import * as styles from "./DefaultLayout.css";
import { Titlebar } from "@/components/@Common";

interface DefaultLayoutProps extends PropsWithChildren {}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className={styles.defaultLayout}>
      <Titlebar title={"DataForge"} />
      <div id="default-body" className={styles.defaultBody}>
        {children}
      </div>
    </div>
  );
}
