const { contextBridge, ipcRenderer, ipcMain } = require("electron");

contextBridge.exposeInMainWorld("electronEvent", {
  ping: () => ipcRenderer.invoke("electron:ping"),
  loadAllProjects: () => ipcRenderer.invoke("electron:loadAllProjects"),
});

ipcMain;

contextBridge.exposeInMainWorld("windowEvent", {
  minimize: () => ipcRenderer.invoke("win:minimize"),
  onToggleMaximize: (callback: (isMaximized: boolean) => void) => 
    ipcRenderer.on("win:toggleMaximize", (_: any, value: any) => {
      callback(value);
    }),
  toggleMaximize: () => {
    ipcRenderer.send("win:toggleMaximize");
  },
  close: () => ipcRenderer.invoke("win:close"),
});
