import type { IProject } from "./Project.type";

export interface IElectronAPI {
  electronEvent: {
    ping(): void;
    loadAllProjects(): { projects: IProject[] };
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
