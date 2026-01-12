import { ProjectList } from "@/components/Project/ProjectList";
import { ProjectListInfo } from "@/components/Project/ProjectListInfo";
import { ProjectListHeader } from "@/components/Project/ProjectListHeader";
import type { IProject } from "@/types/Project.type";

import * as styles from "./MainPage.css";

const PROJECT_MOCK_LIST: IProject[] = [
  {
    id: 1,
    type: "unreal",
    isConnect: true,
    projectName: "MagicCoder",
    projectPath: "D:\\Unreal\\MagicCoder",
    tables: [2, 2, 2],
  },
  {
    id: 2,
    type: "unreal",
    isConnect: true,
    projectName: "Project. ISG",
    projectPath: "D:\\Unreal\\ProjectISG-Client",
    tables: [5, 4, 2, 3, 4, 7, 2],
  },
  {
    id: 3,
    type: "unreal",
    isConnect: true,
    projectName: "Project. MS",
    projectPath: "D:\\Unreal\\ProjectMS-Client",
    tables: [],
  },
  {
    id: 4,
    type: "unreal",
    isConnect: false,
    projectName: "Project. Island",
    projectPath: "D:\\Unreal\\IslandGenerator",
    tables: [2],
  },
];

export function MainPage() {
  return (
    <>
      <ProjectListHeader />
      <ProjectListInfo list={PROJECT_MOCK_LIST} />
      <main className={styles.mainPageLayout}>
        <ProjectList list={PROJECT_MOCK_LIST} />
      </main>
    </>
  );
}
