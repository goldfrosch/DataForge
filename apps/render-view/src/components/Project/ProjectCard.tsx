import { useState } from "react";
import { Database, MoreHorizontal, Pencil, Trash2, Wifi } from "lucide-react";
import * as styles from "./ProjectCard.css";
import { Chip, Dropdown, type IDropdownItem } from "../@Common";
import classNames from "classnames";
import type { IProject } from "@/types/Project.type";
import { useNavigate } from "react-router";
import type { MouseEventHandler } from "react";
import { usePopup } from "@/hooks/UsePopup.hook";
import { POPUP_STATE } from "@/hooks/UseStore.hook";
import { RenameProjectPopup } from "./RenameProjectPopup";
import { DeleteProjectConfirmPopup } from "./DeleteProjectConfirmPopup";

const ProjectType = {
  unreal: {
    type: "unreal",
    content: "Unreal Engine",
  },
  unity: {
    type: "unity",
    content: "Unity",
  },
} as const;

interface ProjectCardProps {
  project: IProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const { push } = usePopup();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleRenameClick = () => {
    setMenuOpen(false);
    push(POPUP_STATE.RENAME_PROJECT_POPUP, false, project);
  };

  const handleDeleteClick = () => {
    setMenuOpen(false);
    push(POPUP_STATE.DELETE_PROJECT_POPUP, false, project);
  };

  const dropdownItems: IDropdownItem[] = [
    {
      label: "프로젝트 이름 수정",
      icon: <Pencil size={14} />,
      onClick: handleRenameClick,
    },
    {
      label: "삭제",
      icon: <Trash2 size={14} />,
      danger: true,
      onClick: handleDeleteClick,
    },
  ];

  const handleClickProjectCard: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    if (!project.isConnect) {
      return;
    }

    navigate(`/database/${project.uuid}`);
  };

  const getTablesText = () => {
    const tableCount = project.tableCount;

    if (tableCount <= 0) {
      return "No table";
    }

    if (tableCount === 1) {
      return `${tableCount} table`;
    }

    return `${tableCount} tables`;
  };

  return (
    <>
      <div
        className={
          styles.projectCardLayout[project.isConnect ? "enable" : "disable"]
        }
        role="button"
        onClick={handleClickProjectCard}
      >
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
          <div
            className={styles.projectCardInfoOptionLayout}
            onClick={(e) => e.stopPropagation()}
          >
            <Dropdown
              open={menuOpen}
              onOpenChange={setMenuOpen}
              trigger={
                <div
                  className={styles.projectCardInfoOptionLayout}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setMenuOpen((p) => !p);
                    }
                  }}
                >
                  <MoreHorizontal
                    className={styles.projectCardInfoOptionIcon}
                  />
                </div>
              }
              items={dropdownItems}
            />
          </div>
        </div>
        <div className={styles.projectCardFooterLayout}>
          <Chip type={ProjectType[project.type].type}>
            {ProjectType[project.type].content}
          </Chip>
          <span className={styles.projectCardTableCount}>
            {getTablesText()}
          </span>
          <div className={styles.projectCardFooterEmpty} />
          <span
            className={classNames(
              styles.projectCardConnectedText,
              styles.projectCardConnected[
                project.isConnect ? "connect" : "disconnect"
              ],
            )}
          >
            <Wifi className={styles.projectCardConnectedIcon} />
            <span>{project.isConnect ? "Connected" : "Disconnected"}</span>
          </span>
        </div>
      </div>
      <RenameProjectPopup projectName={project.projectName} />
      <DeleteProjectConfirmPopup projectName={project.projectName} />
    </>
  );
}
