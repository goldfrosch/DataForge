import type { IProject } from "./Project.type";

export interface ITable {
  name: string;
  createdAt: string;
}

export interface IElectronAPI {
  electronEvent: {
    ping(): void;
    loadAllProjects(): { projects: IProject[] };
    createTable(projectPath: string, tableName: string): Promise<ITable[]>;
    getTables(projectPath: string): Promise<ITable[]>;
  };
  windowEvent: {
    minimize(): void;
    toggleMaximize(): Promise<boolean>;
    isMaximized(): Promise<boolean>;
    onMaximizeChanged(callback: (isMaximized: boolean) => void): void;
    close(): void;
  };
}

declare global {
  interface Window {
    electronEvent: IElectronAPI["electronEvent"];
    windowEvent: IElectronAPI["windowEvent"];
  }
}
