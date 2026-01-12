import { Database, MoreHorizontal, Wifi } from "lucide-react";
import * as styles from "./ProjectCard.css";
import { Chip } from "../@Common";
import classNames from "classnames";
import type { IProject } from "@/types/Project.type";

const ProjectType = {
  unreal: {
    type: "unreal",
    content: "Unreal Engine",
  },
} as const;

interface ProjectCardProps {
  project: IProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getTablesText = () => {
    const tableCount = project.tables.length;

    if (tableCount <= 0) {
      return "No table";
    }

    if (tableCount === 1) {
      return `${tableCount} table`;
    }

    return `${tableCount} tables`;
  };

  return (
    <button className={styles.projectCardLayout} disabled={!project.isConnect}>
      <div className={styles.projectCardHeader}>
        <div className={styles.projectCardInfoLayout}>
          <div className={styles.projectCardIconLayout}>
            <Database className={styles.projectCardIcon} />
          </div>
          <div className={styles.projectCardInfoContentLayout}>
            <h3 className={styles.projectCardInfoTitle}>
              {project.projectName}
            </h3>
            <p className={styles.projectCardInfoDescription}>
              {project.projectPath}
            </p>
          </div>
        </div>
        <button className={styles.projectCardInfoOptionLayout}>
          <MoreHorizontal className={styles.projectCardInfoOptionIcon} />
        </button>
      </div>
      <div className={styles.projectCardFooterLayout}>
        <Chip type={ProjectType[project.type].type}>
          {ProjectType[project.type].content}
        </Chip>
        <span className={styles.projectCardTableCount}>{getTablesText()}</span>
        <div className={styles.projectCardFooterEmpty} />
        <span
          className={classNames(
            styles.projectCardConnectedText,
            styles.projectCardConnected[
              project.isConnect ? "connect" : "disconnect"
            ]
          )}
        >
          <Wifi className={styles.projectCardConnectedIcon} />
          <span>{project.isConnect ? "Connected" : "Disconnected"}</span>
        </span>
      </div>
    </button>
  );
}
