import { ArrowLeft, Database, Settings, Table2 } from "lucide-react";
import { Button } from "../@Common";
import * as styles from "./DatabaseSelectAside.css";
import { useNavigate } from "react-router";
import type { MouseEventHandler } from "react";
import { useProjectStore } from "@/hooks/UseStore.hook";

interface DatabaseSelectAsideProps {
  uuid: number;
}

export function DatabaseSelectAside({ uuid }: DatabaseSelectAsideProps) {
  const { projectObject } = useProjectStore();
  const navigate = useNavigate();

  const handleClickGoBack: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const databaseTitle = projectObject[uuid]?.projectName ?? "Unknown Project";
  const databasePath = projectObject[uuid]?.projectPath ?? "unknown_path";

  return (
    <aside className={styles.databaseSelectAsideLayout}>
      <div className={styles.databaseSelectAsideHeader}>
        <Button
          variant="none"
          size="m"
          className={styles.databaseSelectAsideBackButton}
          onClick={handleClickGoBack}
        >
          <ArrowLeft className={styles.databaseSelectAsideBackButtonIcon} />
          <span>All Databases</span>
        </Button>
      </div>
      <div className={styles.databaseSelectAsideInfomation}>
        <div className={styles.databaseSelectAsideInfomationIconLayout}>
          <Database className={styles.databaseSelectAsideInfomationIcon} />
        </div>
        <div className={styles.databaseSelectAsideInfomationBox}>
          <h3 className={styles.databaseSelectAsideInfomationTitle}>
            {databaseTitle}
          </h3>
          <p className={styles.databaseSelectAsideInfomationDescription}>
            {databasePath}
          </p>
        </div>
      </div>
      <div className={styles.databaseSelectAsideTableList}>
        <span className={styles.databaseSelectAsideTableTitle}>TABLES</span>
        <nav>
          <Button
            variant="none"
            size="m"
            className={styles.databaseSelectAsideTableCard}
          >
            <Table2 className={styles.databaseSelectAsideSettingsIcon} />
            <span>table_name</span>
            <span className={styles.databaseSelectAsideTableEmpty} />
            <span className={styles.databaseSelectAsideTableRowCount}>150</span>
          </Button>
        </nav>
      </div>
      <div className={styles.databaseSelectAsideSettings}>
        <Button
          variant="none"
          size="m"
          className={styles.databaseSelectAsideSettingsButton}
        >
          <Settings className={styles.databaseSelectAsideSettingsIcon} />
          <span>Settings</span>
        </Button>
      </div>
    </aside>
  );
}
