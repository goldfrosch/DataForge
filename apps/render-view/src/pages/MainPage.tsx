import { ProjectList } from "@/components/Project/ProjectList";
import { ProjectListInfo } from "@/components/Project/ProjectListInfo";
import { ProjectListHeader } from "@/components/Project/ProjectListHeader";
import { AddProjectDialog } from "@/components/Project/AddProjectDialog";
import { RenameProjectPopup } from "@/components/Project/RenameProjectPopup";
import { DeleteProjectConfirmPopup } from "@/components/Project/DeleteProjectConfirmPopup";
import {
  useLoadAllProjectsHook,
  useSaveProjectsMutation,
} from "@/hooks/UseElectronEvent.hook";
import { usePopup } from "@/hooks/UsePopup.hook";
import { POPUP_STATE } from "@/hooks/UseStore.hook";

import * as styles from "./MainPage.css";

export function MainPage() {
  const { data } = useLoadAllProjectsHook();
  const projects = data?.projects ?? [];
  const saveProjectsMutation = useSaveProjectsMutation();
  const { currentPopup, popupContext, pop } = usePopup();

  const handleRename = (uuid: number, projectName: string) => {
    const next = projects.map((p) =>
      p.uuid === uuid ? { ...p, projectName } : p,
    );
    saveProjectsMutation.mutate({ projects: next });
  };

  const handleDelete = (uuid: number) => {
    const next = projects.filter((p) => p.uuid !== uuid);
    saveProjectsMutation.mutate({ projects: next });
  };

  return (
    <>
      <ProjectListHeader />
      <ProjectListInfo list={projects} />
      <main className={styles.mainPageLayout}>
        <ProjectList list={projects} />
      </main>
      <AddProjectDialog />
      <RenameProjectPopup
        isOpen={currentPopup === POPUP_STATE.RENAME_PROJECT_POPUP}
        onClose={pop}
        projectName={popupContext?.projectName ?? ""}
        onConfirm={(newName) => {
          if (popupContext) {
            handleRename(popupContext.uuid, newName);
          }
          pop();
        }}
      />
      <DeleteProjectConfirmPopup
        isOpen={currentPopup === POPUP_STATE.DELETE_PROJECT_POPUP}
        onClose={pop}
        projectName={popupContext?.projectName ?? ""}
        onConfirm={() => {
          if (popupContext) {
            handleDelete(popupContext.uuid);
          }
          pop();
        }}
      />
    </>
  );
}
