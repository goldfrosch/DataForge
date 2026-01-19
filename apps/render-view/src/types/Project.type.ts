export interface IProject {
  uuid: number;
  type: "unreal";
  isConnect: boolean;
  projectName: string;
  projectPath: string;
  tables: any[];
}
