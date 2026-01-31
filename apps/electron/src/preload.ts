import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronEvent", {
  ping: () => ipcRenderer.invoke("electron:ping"),
  loadAllProjects: () => ipcRenderer.invoke("electron:loadAllProjects"),
  createTable: (projectPath: string, tableName: string) =>
    ipcRenderer.invoke("electron:createTable", projectPath, tableName),
  getTables: (projectPath: string) =>
    ipcRenderer.invoke("electron:getTables", projectPath),
});

contextBridge.exposeInMainWorld("dataForgeEvent", {
  ping: () => ipcRenderer.invoke("dataForge:getDataList"),
});

contextBridge.exposeInMainWorld("windowEvent", {
  minimize: () => ipcRenderer.invoke("win:minimize"),
  toggleMaximize: async () => {
    return await ipcRenderer.invoke("win:toggleMaximize");
  },
  isMaximized: async () => {
    return await ipcRenderer.invoke("win:isMaximized");
  },
  onMaximizeChanged: (callback: (isMaximized: boolean) => void) => {
    ipcRenderer.on("win:maximize-changed", (_: any, isMaximized: boolean) => {
      callback(isMaximized);
    });
  },
  close: () => ipcRenderer.invoke("win:close"),
});
