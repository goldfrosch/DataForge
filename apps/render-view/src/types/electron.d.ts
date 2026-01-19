import type { IProject } from "./Project.type";

export interface IElectronAPI {
  electronEvent: {
    ping(): void;
    loadAllProjects(): { projects: IProject[] };
  };
  windowEvent: {
    minimize(): void;
    onToggleMaximize(callback: (isMaximized: boolean) => void): void;
    toggleMaximize(): void;
    close(): void;
  };
}

declare global {
  interface Window {
    electronEvent: IElectronAPI["electronEvent"];
    windowEvent: IElectronAPI["windowEvent"];
  }
}
