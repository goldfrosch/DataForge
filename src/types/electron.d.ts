export interface IElectronAPI {
  ipcRenderer: {
    on(channel: string, func: (...args: unknown[]) => void): void;
    off(channel: string, func: (...args: unknown[]) => void): void;
    send(channel: string, ...args: unknown[]): void;
    invoke(channel: string, ...args: unknown[]): Promise<unknown>;
  };
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
    ipcRenderer: IElectronAPI["ipcRenderer"];
  }
}
