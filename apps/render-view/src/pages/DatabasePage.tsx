import { DatabaseSelectAside } from "@/components/Database/DatabaseSelectAside";
import { useParams } from "react-router";
import { TableDialog } from "@/components/Database/TableDialog";
import { useProjectStore } from "@/hooks/UseStore.hook";

import * as styles from "./DatabasePage.css";

export function DatabasePage() {
  const { uuid } = useParams();
  const { projectObject } = useProjectStore();
  
  const project = uuid ? projectObject[Number(uuid)] : undefined;

  return (
    <div className={styles.DatabasePageLayout}>
      <DatabaseSelectAside uuid={Number(uuid)} />
      <main className={styles.DatabasePageMainLayout}>{uuid}</main>
      {project && <TableDialog projectPath={project.projectPath} />}
    </div>
  );
}
