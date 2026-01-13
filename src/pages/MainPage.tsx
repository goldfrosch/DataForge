import { ProjectList } from "@/components/Project/ProjectList";
import { ProjectListInfo } from "@/components/Project/ProjectListInfo";
import { ProjectListHeader } from "@/components/Project/ProjectListHeader";
import { useLoadAllProjectsHook } from "@/hooks/UseElectronEvent.hook";

import * as styles from "./MainPage.css";

export function MainPage() {
  const { data } = useLoadAllProjectsHook();
  const projects = data?.projects ?? [];

  return (
    <>
      <ProjectListHeader />
      <ProjectListInfo list={projects} />
      <main className={styles.mainPageLayout}>
        <ProjectList list={projects} />
      </main>
    </>
  );
}
