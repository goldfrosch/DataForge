import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronEvent", {
  ping: () => ipcRenderer.invoke("electron:ping"),
  loadAllProjects: () => ipcRenderer.invoke("electron:loadAllProjects"),
  showOpenDirectoryDialog: () =>
    ipcRenderer.invoke("electron:showOpenDirectoryDialog"),
  addProject: (project: {
    projectName: string;
    projectPath: string;
    type: "unreal" | "unity";
    isConnect?: boolean;
  }) => ipcRenderer.invoke("electron:addProject", project),
  saveProjects: (config: { projects: unknown[] }) =>
    ipcRenderer.invoke("electron:saveProjects", config),
  createTable: (projectPath: string, tableName: string) =>
    ipcRenderer.invoke("electron:createTable", projectPath, tableName),
  getTables: (projectPath: string) =>
    ipcRenderer.invoke("electron:getTables", projectPath),
  getTableData: (projectPath: string, tableName: string) =>
    ipcRenderer.invoke("electron:getTableData", projectPath, tableName),
  saveTableData: (
    projectPath: string,
    tableName: string,
    payload: { columns: { id: string; name: string; type: string }[]; rows: Record<string, string | number | boolean>[] },
  ) =>
    ipcRenderer.invoke(
      "electron:saveTableData",
      projectPath,
      tableName,
      payload,
    ),
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
