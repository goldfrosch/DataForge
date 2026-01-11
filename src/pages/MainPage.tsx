import { ProjectList } from "@/components/Project/ProjectList";
import { ProjectListHeader } from "@/components/Project/ProjectListHeader";
import type { IProject } from "@/types/Project.type";

import * as styles from "./MainPage.css";

const PROJECT_MOCK_LIST: IProject[] = [
  {
    id: 1,
    type: "unreal",
    isConnect: true,
    projectName: "test",
    projectPath: "D:/test/test",
    tables: [],
  },
  {
    id: 2,
    type: "unreal",
    isConnect: true,
    projectName: "test",
    projectPath: "D:/test/test",
    tables: [2, 2, 2],
  },
  {
    id: 3,
    type: "unreal",
    isConnect: true,
    projectName: "test",
    projectPath: "D:/test/test",
    tables: [1],
  },
  {
    id: 4,
    type: "unreal",
    isConnect: false,
    projectName: "test",
    projectPath: "D:/test/test",
    tables: [3, 4],
  },
];

export function MainPage() {
  return (
    <>
      <ProjectListHeader />
      <main className={styles.mainPageLayout}>
        <ProjectList list={PROJECT_MOCK_LIST} />
      </main>
    </>
  );
}
