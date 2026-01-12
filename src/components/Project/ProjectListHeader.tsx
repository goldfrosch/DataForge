import { Button } from "@/components/@Common";
import * as styles from "./ProjectListHeader.css";
import { Anvil, Download, Plus } from "lucide-react";

export function ProjectListHeader() {
  return (
    <div className={styles.projectListHeaderLayout}>
      <div className={styles.projectListHeaderContent}>
        <div className={styles.projectListHeaderInformation}>
          <div className={styles.projectListHeaderIconLayout}>
            <Anvil className={styles.projectListHeaderIcon} />
          </div>
          <div>
            <h1 className={styles.projectListHeaderTitle}>Data Forge</h1>
            <p className={styles.projectListHeaderDescription}>
              Select project to view and edit data
            </p>
          </div>
        </div>
        <div className={styles.projectListHeaderEmpty} />
        <Button
          variant="primary"
          size="m"
          className={styles.projectListHeaderAddProjectButton}
        >
          <Plus />
          Add Project
        </Button>
        <Button
          variant="primary"
          size="m"
          className={styles.projectListHeaderAddProjectButton}
        >
          <Download />
          Load Project
        </Button>
      </div>
    </div>
  );
}
