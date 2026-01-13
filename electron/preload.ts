const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronEvent", {
  ping: () => ipcRenderer.invoke("electron:ping"),
  loadAllProjects: () => ipcRenderer.invoke("electron:loadAllProjects"),
});

contextBridge.exposeInMainWorld("windowEvent", {
  minimize: () => ipcRenderer.invoke("win:minimize"),
  toggleMaximize: () => ipcRenderer.invoke("win:toggleMaximize"),
  close: () => ipcRenderer.invoke("win:close"),
});
