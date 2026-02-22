import type { IProject } from "./Project.type";

export interface ITable {
  name: string;
  createdAt: string;
}

import type { ITableData } from "./TableData.type";

export interface IElectronAPI {
  electronEvent: {
    ping(): void;
    loadAllProjects(): { projects: IProject[] };
    createTable(projectPath: string, tableName: string): Promise<ITable[]>;
    getTables(projectPath: string): Promise<ITable[]>;
    getTableData(projectPath: string, tableName: string): Promise<ITableData | null>;
    saveTableData(
      projectPath: string,
      tableName: string,
      payload: ITableData,
    ): Promise<void>;
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
