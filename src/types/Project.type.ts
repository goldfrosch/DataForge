export interface IProject {
  id: number;
  type: "unreal";
  isConnect: boolean;
  projectName: string;
  projectPath: string;
  tables: any[];
}
