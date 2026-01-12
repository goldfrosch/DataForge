import { Database, Server, Wifi } from "lucide-react";
import * as styles from "./ProjectListInfo.css";
import classNames from "classnames";
import type { IProject } from "@/types/Project.type";

interface PropectListInfoProps {
  list: IProject[];
}

export function ProjectListInfo({ list }: PropectListInfoProps) {
  const totalProjectsCount = list.length;
  const totalConnected = list.filter((item) => item.isConnect).length;
  const totalTables = list.reduce((prev, cur) => {
    return prev + cur.tables.length;
  }, 0);

  return (
    <div className={styles.projectListInfoLayout}>
      <div className={styles.projectListInfoContent}>
        <div className={styles.projectListInfoDataLayout}>
          <span className={styles.projectListDetailInfoLayout}>
            <Server className={styles.projectListDetailInfoDataIcon} />
            <span className={styles.projectListDetailInfoCountText}>
              {totalProjectsCount}
            </span>
            <span>projects</span>
          </span>
          <span className={styles.projectListDetailInfoLayout}>
            <Wifi
              className={classNames(
                styles.projectListDetailInfoDataIcon,
                styles.projectListDetailInfoConnectIcon
              )}
            />
            <span className={styles.projectListDetailInfoCountText}>
              {totalConnected}
            </span>
            <span>connected</span>
          </span>
          <span className={styles.projectListDetailInfoLayout}>
            <Database className={styles.projectListDetailInfoDataIcon} />
            <span className={styles.projectListDetailInfoCountText}>
              {totalTables}
            </span>
            <span>total tables</span>
          </span>
        </div>
      </div>
    </div>
  );
}
