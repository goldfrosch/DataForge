import { Button } from "@/components/@Common";
import * as styles from "./ProjectListHeader.css";
import { Anvil, FolderOpen, Plus } from "lucide-react";
import { usePopup } from "@/hooks/UsePopup.hook";
import { POPUP_STATE } from "@/hooks/UseStore.hook";

export function ProjectListHeader() {
  const { push } = usePopup();

  const handleAddProject = () => {
    push(POPUP_STATE.ADD_PROJECT_POPUP);
  };

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
          onClick={handleAddProject}
        >
          <Plus />
          Add Project
        </Button>
        <Button
          variant="primary"
          size="m"
          className={styles.projectListHeaderAddProjectButton}
          onClick={handleAddProject}
        >
          <FolderOpen />
          Load Project
        </Button>
      </div>
    </div>
  );
}
