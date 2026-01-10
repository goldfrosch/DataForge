import { Button } from "@/components/@Common";
import * as styles from "./CategoryHeader.css";
import { Anvil, Plus } from "lucide-react";

export function CategoryHeader() {
  return (
    <div className={styles.categoryHeaderLayout}>
      <div className={styles.categoryHeaderContent}>
        <div className={styles.categoryHeaderInformation}>
          <div className={styles.categoryHeaderIconLayout}>
            <Anvil className={styles.categoryHeaderIcon} />
          </div>
          <div>
            <h1 className={styles.categoryHeaderTitle}>Data Forge</h1>
            <p className={styles.categoryHeaderDescription}>
              Select project to view and edit data
            </p>
          </div>
        </div>
        <Button
          variant="primary"
          size="m"
          className={styles.categoryHeaderAddProjectButton}
        >
          <Plus />
          Add Project
        </Button>
      </div>
    </div>
  );
}
