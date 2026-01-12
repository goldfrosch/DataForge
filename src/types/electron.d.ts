import type { IProject } from "./Project.type";

export interface IElectronAPI {
  electronEvent: {
    ping(): void;
    loadAllProjects(): { projects: IProject[] };
  };
}

declare global {
  interface Window {
    electronEvent: IElectronAPI["electronEvent"];
  }
}
