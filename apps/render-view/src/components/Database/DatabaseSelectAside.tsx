import { ArrowLeft, Database, Plus, Settings, Table2 } from "lucide-react";
import { Button } from "../@Common";
import * as styles from "./DatabaseSelectAside.css";
import { useNavigate, useSearchParams } from "react-router";
import type { MouseEventHandler } from "react";
import { POPUP_STATE, useProjectStore } from "@/hooks/UseStore.hook";
import { usePopup } from "@/hooks/UsePopup.hook";
import { useGetTablesHook } from "@/hooks/UseElectronEvent.hook";
import classNames from "classnames";

interface DatabaseSelectAsideProps {
  uuid: number;
}

export function DatabaseSelectAside({ uuid }: DatabaseSelectAsideProps) {
  const { projectObject } = useProjectStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { push } = usePopup();

  const databasePath = projectObject[uuid]?.projectPath ?? "";
  const { data: tables = [] } = useGetTablesHook(databasePath);
  const selectedTableName = searchParams.get("table");

  const handleClickGoBack: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleClickAddTable: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    push(POPUP_STATE.DATABASE_ADD_TABLE_POPUP);
  };

  const handleSelectTable = (tableName: string) => {
    setSearchParams({ table: tableName }, { replace: true });
  };

  const databaseTitle = projectObject[uuid]?.projectName ?? "Unknown Project";

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
        <div className={styles.databaseSelectAsideTableListHeader}>
          <span className={styles.databaseSelectAsideTableTitle}>TABLES</span>
          <Button variant="none" size="s" onClick={handleClickAddTable}>
            <Plus
              className={styles.databaseSelectAsideTableListHeaderAddIcon}
            />
          </Button>
        </div>
        <nav>
          {tables.length === 0 ? (
            <p className={styles.databaseSelectAsideTableEmptyHint}>
              No tables yet. Add one with +
            </p>
          ) : (
            tables.map((table) => (
              <Button
                key={table.name}
                variant="none"
                size="m"
                className={classNames(
                  styles.databaseSelectAsideTableCard,
                  selectedTableName === table.name &&
                    styles.databaseSelectAsideTableCardActive,
                )}
                onClick={() => handleSelectTable(table.name)}
              >
                <Table2 className={styles.databaseSelectAsideSettingsIcon} />
                <span className={styles.databaseSelectAsideTableCardName}>
                  {table.name}
                </span>
                <span className={styles.databaseSelectAsideTableEmpty} />
              </Button>
            ))
          )}
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
