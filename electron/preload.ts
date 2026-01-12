const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronEvent", {
  ping: () => ipcRenderer.invoke("ping"),
  loadAllProjects: () => ipcRenderer.invoke("loadAllProjects"),
});
