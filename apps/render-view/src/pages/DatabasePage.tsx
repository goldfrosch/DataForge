import { DatabaseSelectAside } from "@/components/Database/DatabaseSelectAside";
import { TableEditor } from "@/components/Database/TableEditor/TableEditor";
import { useParams, useSearchParams } from "react-router";
import { TableDialog } from "@/components/Database/TableDialog";
import { useProjectStore } from "@/hooks/UseStore.hook";

import * as styles from "./DatabasePage.css";

export function DatabasePage() {
  const { uuid } = useParams();
  const [searchParams] = useSearchParams();
  const { projectObject } = useProjectStore();

  const project = uuid ? projectObject[Number(uuid)] : undefined;
  const tableName = searchParams.get("table");

  return (
    <div className={styles.DatabasePageLayout}>
      <DatabaseSelectAside uuid={Number(uuid ?? 0)} />
      <main className={styles.DatabasePageMainLayout}>
        {project && tableName ? (
          <TableEditor
            projectPath={project.projectPath}
            tableName={tableName}
          />
        ) : (
          <div className={styles.DatabasePageEmpty}>
            <p>Select a table from the sidebar to view and edit data.</p>
          </div>
        )}
      </main>
      {project && <TableDialog projectPath={project.projectPath} />}
    </div>
  );
}
