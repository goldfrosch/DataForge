export interface IProject {
  uuid: number;
  type: "unreal" | "unity";
  isConnect: boolean;
  projectName: string;
  projectPath: string;
  tableCount: number;
}
