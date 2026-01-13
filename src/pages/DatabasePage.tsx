import { DatabaseSelectAside } from "@/components/Database/DatabaseSelectAside";
import { useParams } from "react-router";

import * as styles from "./DatabasePage.css";

export function DatabasePage() {
  const { uuid } = useParams();

  return (
    <div className={styles.DatabasePageLayout}>
      <DatabaseSelectAside uuid={Number(uuid)} />
      <main className={styles.DatabasePageMainLayout}>{uuid}</main>
    </div>
  );
}
