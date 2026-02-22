/**
 * 창 제어 IPC (minimize, maximize, close).
 */

import { ipcMain } from "electron";
import type { BrowserWindow } from "electron";

export function registerWindowIpc(win: BrowserWindow | null): void {
  ipcMain.handle("win:minimize", () => win?.minimize());

  ipcMain.handle("win:toggleMaximize", () => {
    if (win?.isMaximized()) {
      win.unmaximize();
    } else {
      win?.maximize();
    }
    return win?.isMaximized() ?? false;
  });

  ipcMain.handle("win:isMaximized", () => win?.isMaximized() ?? false);
  ipcMain.handle("win:close", () => win?.close());
}
