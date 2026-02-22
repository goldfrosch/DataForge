import { useState } from "react";
import { Popup } from "@/components/@Common/Popup/Popup";
import { Button } from "@/components/@Common/Button/Button";
import * as styles from "./AddProjectDialog.css";
import { usePopup } from "@/hooks/UsePopup.hook";
import { POPUP_STATE } from "@/hooks/UseStore.hook";
import { useAddProjectMutation } from "@/hooks/UseElectronEvent.hook";

function getFolderNameFromPath(filePath: string): string {
  const normalized = filePath.replace(/\\/g, "/");
  const segments = normalized.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? "New Project";
}

export function AddProjectDialog() {
  const [projectPath, setProjectPath] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState<"unreal" | "unity">("unreal");
  const { currentPopup, pop } = usePopup();
  const addProjectMutation = useAddProjectMutation();

  const handleBrowse = async () => {
    const path = await window.electronEvent.showOpenDirectoryDialog();
    if (path) {
      setProjectPath(path);
      setProjectName(getFolderNameFromPath(path));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() || !projectPath.trim()) return;
    try {
      await addProjectMutation.mutateAsync({
        projectName: projectName.trim(),
        projectPath: projectPath.trim(),
        type: projectType,
      });
      setProjectPath("");
      setProjectName("");
      setProjectType("unreal");
      pop();
    } catch (error) {
      console.error("Failed to add project:", error);
      // alert("프로젝트 추가에 실패했습니다.");
    }
  };

  const handleClose = () => {
    pop();
  };

  return (
    <Popup
      isOpen={currentPopup === POPUP_STATE.ADD_PROJECT_POPUP}
      onClose={handleClose}
      title="Add Project"
      closeOnOverlayClick={false}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="project-path" className={styles.label}>
            Project folder
          </label>
          <div className={styles.pathRow}>
            <input
              type="text"
              id="project-path"
              value={projectPath}
              readOnly
              placeholder="Select a folder"
              className={`${styles.input} ${styles.pathInput}`}
            />
            <Button
              type="button"
              variant="none"
              size="m"
              onClick={handleBrowse}
            >
              Browse
            </Button>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="project-name" className={styles.label}>
            Project name
          </label>
          <input
            type="text"
            id="project-name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="e.g. MyGame"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="project-type" className={styles.label}>
            Engine type
          </label>
          <select
            id="project-type"
            value={projectType}
            onChange={(e) =>
              setProjectType(e.target.value as "unreal" | "unity")
            }
            className={styles.input}
          >
            <option value="unreal">Unreal Engine</option>
            <option value="unity">Unity</option>
          </select>
        </div>
        <div className={styles.formActions}>
          <Button type="button" variant="none" size="m" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="m"
            disabled={
              !projectName.trim() ||
              !projectPath.trim() ||
              addProjectMutation.isPending
            }
          >
            {addProjectMutation.isPending ? "Adding..." : "Add Project"}
          </Button>
        </div>
      </form>
    </Popup>
  );
}
